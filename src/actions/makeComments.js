import firebase from 'firebase';
// eslint-disable-next-line
import firestore from 'firebase/firestore';
import { GeoFirestore } from 'geofirestore';

import * as types from './types';

export const ackCommentSuccess = () => dispatch => {
  dispatch({ type: types.ACK_COMMENT_SUCCESS });
};

const createCommentSuccess = (docRef, dispatch) => {
  console.log(docRef);
  dispatch({ type: types.CREATE_COMMENT_SUCCESS });
};

// Try to create and upload a new comment to firebase
export const createComment = (commentText, username, postDocId) => {
  return dispatch => {
    console.log('Making comment...');
    dispatch({ type: types.CREATE_COMMENT });
    //const { navigation } = this.props;
    //const post = navigation.getParam('postDocId', null);
    const userId = firebase.auth().currentUser.uid;
    const docData = {
      ownerUsername: username,
      ownerId: userId,
      createdOn: new Date(),
      text: commentText,
    };
    firebase
      .firestore()
      .collection('posts')
      .doc(postDocId)
      .collection('comments')
      .add({
        ...docData,
      })
      .then(docRef => createCommentSuccess(docRef, dispatch))
      .catch(err => console.log(err));
  };
};
