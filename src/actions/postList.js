import firebase from 'firebase';
// eslint-disable-next-line
import firestore from 'firebase/firestore';
import { GeoFirestore } from 'geofirestore';
import * as types from './types';
import { fetchPostComments } from './postComments';

// These are help functions, don't export them
const getPostListSuccess = (dispatch, querySnapshot) => {
  console.log('got the posts');
  console.log(querySnapshot);

  // Stuff all the posts into an array and dispatch them as a payload
  const posts = [];
  querySnapshot.forEach(doc => {
    const data = doc.data();

    // Store the firebase document ID with each post, so that we can easily grab comments.
    const postDocId = doc.id;
    data.docId = postDocId;
    posts.push(data);

    // Since we have the posts here, lets go ahead and get the comments
    fetchPostComments(dispatch, postDocId);
  });

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
    querySnapshot => getPostListSuccess(dispatch, querySnapshot),
    error => getPostListFail(error)
  );
  dispatch({ type: types.SUBSCRIBE_FETCH_POST_LIST, payload: subscription });
};
