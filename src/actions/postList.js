import firebase from 'firebase';
// eslint-disable-next-line
import firestore from 'firebase/firestore';
import * as types from './types';

// These are help functions, don't export them
const getPostListSuccess = (dispatch, querySnapshot) => {
  console.log('got the posts');
  // Stuff all the posts into an array and dispatch them as a payload
  const posts = [];
  querySnapshot.forEach(doc => {
    const data = doc.data();

    // Store the firebase document ID with each post, so that we can easily grab comments.
    const postDocId = doc.id;
    data.docId = postDocId;

    posts.push(data);
  });

  dispatch({ type: types.FETCH_POST_SUCCESS, payload: posts });
};

const getPostListFail = error => {
  // TODO: Dispatch the error and do something useful.
  console.log(error);
};

// Redux thunk lets use return a function that takes in dispatch as
// an arg. Use this to keep the chain of requests going.
export const fetchPostList = () => dispatch => {
  console.log('fetching the posts...');
  dispatch({ type: types.FETCH_POST_LIST });
  firebase
    .firestore()
    .collection('posts')
    .get()
    .then(querySnapshot => getPostListSuccess(dispatch, querySnapshot))
    .catch(error => getPostListFail(error));
};
