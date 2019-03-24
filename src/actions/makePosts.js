import firebase from 'firebase';
// eslint-disable-next-line
import firestore from 'firebase/firestore';
import { GeoFirestore } from 'geofirestore';

import * as types from './types';

const createPostSuccess = (docRef, dispatch) => {
  console.log(docRef);
  dispatch({ type: types.CREATE_POST_SUCCESS });
};

export const createPost = (postText, geoLat, geoLong) => dispatch => {
  console.log('Making post...');
  dispatch({ type: types.CREATE_POST });

  const userId = firebase.auth().currentUser.uid;
  const docData = {
    ownerId: userId, // todo: might need to use regular firestore to add this to the root of the doc for querying?
    createdOn: new Date(),
    reposts: 1,
    text: postText,
  };

  const gfs = new GeoFirestore(firebase.firestore());
  gfs
    .collection('posts')
    .add({
      ...docData,
      coordinates: new firebase.firestore.GeoPoint(geoLat, geoLong),
    })
    .then(docRef => createPostSuccess(docRef, dispatch))
    .catch(err => console.log(err));
};
