import firebase from 'firebase';
// eslint-disable-next-line
import firestore from 'firebase/firestore';
import * as types from './types';

// Takes the document id from a post and fetches the comments.
// Called from postList::getPostListSuccess
// TODO: change this to be a subscription on each post's comments
export const fetchPostComments = async (dispatch, postDocId) => {
  console.log(`fetching comments for post ${postDocId}...`);
  dispatch({ type: types.FETCH_POST_COMMENTS, payload: postDocId });
  try {
    const commentsQuerySnapshot = await firebase
      .firestore()
      .collection('posts')
      .doc(postDocId)
      .collection('comments')
      .get();

    const comments = [];
    commentsQuerySnapshot.forEach(doc => {
      const data = doc.data();
      const commentDocId = doc.id;
      data.docId = commentDocId;
      comments.push(data);
    });

    // Use the post document id as the key for the comments array
    dispatch({
      type: types.FETCH_POST_COMMENTS_SUCCESS,
      payload: { [postDocId]: comments },
    });
  } catch (err) {
    console.log(err);
  }
};

// Fetch every repost for a certain post document
export const fetchPostReposts = async (dispatch, postDocId) => {
  console.log(`fetching reposts for post ${postDocId}...`);
  dispatch({ type: types.FETCH_POST_REPOSTS, payload: postDocId });
  try {
    const repostsQuerySnapshot = await firebase
      .firestore()
      .collection('posts')
      .doc(postDocId)
      .collection('reposts')
      .get();

    const reposts = [];
    let userHasReposted = false;
    repostsQuerySnapshot.forEach(doc => {
      const data = doc.data();
      const repostDocId = doc.id;
      data.docId = repostDocId;
      // Only count reposts that are true (not undone)
      if (data.reposted) {
        // Check if the current user has reposted it
        if (data.docId === firebase.auth().currentUser.uid) {
          userHasReposted = true;
        }
        reposts.push(data);
      }
    });

    // Use the post document id as the key for the comments array
    dispatch({
      type: types.FETCH_POST_REPOSTS_SUCCESS,
      payload: { [postDocId]: { reposts, userHasReposted } },
    });
  } catch (err) {
    console.log(err);
  }
};
