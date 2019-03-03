import firebase from 'firebase';
import * as types from './types';

const fetchUserData = async dispatch => {
  const userId = firebase.auth().currentUser.uid;
  try {
    const querySnapshot = await firebase
      .firestore()
      .collection('users')
      .where('userId', '==', userId)
      .get();

    if (querySnapshot.size !== 1) {
      throw new Error('Could not get user data');
    }

    let userData = null;
    querySnapshot.forEach(doc => {
      userData = doc.data();
      userData.docId = doc.id;
    });

    dispatch({ type: types.FETCH_USER_DATA_SUCCESS, payload: userData });
  } catch (err) {
    console.log(err);
  }
};

export const ackLoginFail = () => dispatch => {
  dispatch({ type: types.ACK_LOGIN_FAIL });
};

export const loginUserSuccess = async (dispatch, user) => {
  await fetchUserData(dispatch);
  dispatch({ type: types.LOGIN_SUCCESS, payload: user });
};

export const loginUser = (email, password) => dispatch => {
  dispatch({ type: types.BEGIN_LOGIN });
  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then(user => loginUserSuccess(dispatch, user))
    .catch(error => {
      console.log(error);
      dispatch({ type: types.LOGIN_FAIL });
    });
};

// TODO: Save this in the database somewhere?
export const createUserAndLogin = (email, password) => dispatch => {
  dispatch({ type: types.BEGIN_CREATE_USER });
  firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then(user => loginUserSuccess(dispatch, user))
    .catch(error => {
      console.log(error);
      dispatch({ type: types.CREATE_USER_FAIL });
    });
};
