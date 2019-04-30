import firebase from 'firebase';
// eslint-disable-next-line
import firestore from 'firebase/firestore';
import * as types from './types';

import { fetchPostComments } from '../actions/postSubData';

// Filter the comments that we found
const filterCommentList = (dispatch, querySnapshot) => {
  console.log('got the comments');
  console.log(querySnapshot);
  const postDocId = querySnapshot.doc.postDocId;
  const comments = fetchPostComments(dispatch, postDocId);
  dispatch({ type: types.FETCH_COMMENT_SUCCESS, payload: comments });
};

const getCommentsFail = error => {
  console.log(error);
};

// Create a subscription to fetch comments for a post
export const subscribeFetchComments = (
  currentSubscription,
  postDocId
) => dispatch => {
  if (currentSubscription) {
    console.log('Cancelling old query subscription');
    currentSubscription();
  }

  console.log('Creating new query subscription...');
  const query = firebase
    .firestore()
    .collection('posts')
    .doc(postDocId)
    .get();

  const subscription = query.onSnapshot(
    querySnapshot => filterCommentList(dispatch, querySnapshot),
    error => getCommentsFail(error)
  );
  dispatch({ type: types.SUBSCRIBE_FETCH_COMMENT_LIST, payload: subscription });
};
