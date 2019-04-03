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
