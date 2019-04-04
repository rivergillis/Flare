import firebase from 'firebase';
// eslint-disable-next-line
import firestore from 'firebase/firestore';
import geolib from 'geolib';
import { GeoFirestore } from 'geofirestore';
import * as types from './types';
import { fetchPostComments, fetchPostReposts } from './postSubData';

export const setFetchPostInitialLoad = initialLoad => dispatch => {
  dispatch({ type: types.SET_POST_INITIAL_LOAD, payload: initialLoad });
};

// https://stackoverflow.com/questions/563406/add-days-to-javascript-date
const addDays = (date, days) => {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
};

// Determines whether we can display the post, based on geofencing and expiration date
// TODO: consider using doc.distance from the querySnapshot (measured in km)
const canDisplayPost = (post, userLat, userLong) => {
  const dist = geolib.getDistance(
    { latitude: userLat, longitude: userLong },
    {
      latitude: post.coordinates.latitude,
      longitude: post.coordinates.longitude,
    }
  );

  // Post too far away.
  const allowableDist = 200 * post.reposts;
  if (dist > allowableDist) {
    return false;
  }

  // Post too old
  const expirationDate = addDays(post.createdOn.toDate(), post.reposts);
  if (new Date() > expirationDate) {
    // Delete posts that are too old.
    firebase
      .firestore()
      .collection('posts')
      .doc(post.docId)
      .delete()
      .then(() => console.log(`deleted post ${post.docId} for being too old.`))
      .catch(err => console.log(err));
    return false;
  }

  return true;
};

// These are help functions, don't export them
const filterPostList = (dispatch, userLat, userLong, querySnapshot) => {
  const startTime = new Date().getMilliseconds();
  console.log('got the posts');
  console.log(querySnapshot);

  // Stuff all the posts into an array and dispatch them as a payload
  const posts = [];
  querySnapshot.forEach(doc => {
    const data = doc.data();

    // Store the firebase document ID with each post, so that we can easily grab comments.
    const postDocId = doc.id;
    data.docId = postDocId;

    // Add the post to our list and fetch the comments if we can display it
    if (canDisplayPost(data, userLat, userLong)) {
      posts.push(data);
      // Since we have the posts here, lets go ahead and get the comments
      fetchPostComments(dispatch, postDocId);
      fetchPostReposts(dispatch, postDocId);
    }
  });

  console.log(
    `Done filtering posts in ${new Date().getMilliseconds() - startTime}ms`
  );

  // Sort the posts by date
  posts.sort((a, b) => b.createdOn.toDate() - a.createdOn.toDate());

  dispatch({ type: types.FETCH_POST_SUCCESS, payload: posts });
};

const getPostListFail = error => {
  // TODO: Dispatch the error and do something useful.
  console.log(error);
};

// Set up a subscription to watch for new posts.
export const subscribeFetchPostList = (
  lat,
  long,
  currentSubscription
) => dispatch => {
  if (currentSubscription) {
    console.log('Cancelling old query subscription');
    currentSubscription(); // Calling the function will cancel it.
  }

  const gfs = new GeoFirestore(firebase.firestore());

  console.log('Creating new query subscription...');
  const query = gfs
    .collection('posts')
    .near({ center: new firebase.firestore.GeoPoint(lat, long), radius: 200 });
  const subscription = query.onSnapshot(
    querySnapshot => filterPostList(dispatch, lat, long, querySnapshot),
    error => getPostListFail(error)
  );
  dispatch({ type: types.SUBSCRIBE_FETCH_POST_LIST, payload: subscription });
};

export const repostPost = (post, canRepost) => dispatch => {
  console.log('repopo');
  const userId = firebase.auth().currentUser.uid;

  firebase
    .firestore()
    .collection('posts')
    .doc(post.docId)
    .collection('reposts')
    .doc(userId)
    .set({ reposted: canRepost })
    .then(() => console.log(`set to ${canRepost}`))
    .catch(err => console.log(err));
};
