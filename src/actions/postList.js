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

// Redux thunk lets use return a function that takes in dispatch as
// an arg. Use this to keep the chain of requests going.
export const fetchPostList = (lat, long) => dispatch => {
  console.log('fetching the posts...');
  dispatch({ type: types.FETCH_POST_LIST });
  const gfs = new GeoFirestore(firebase.firestore());

  // note: radius in km
  gfs
    .collection('posts')
    .near({ center: new firebase.firestore.GeoPoint(lat, long), radius: 200 })
    .get()
    .then(querySnapshot => getPostListSuccess(dispatch, querySnapshot))
    .catch(error => getPostListFail(error));
};
