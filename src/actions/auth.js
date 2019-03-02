import firebase from 'firebase';
import * as types from './types';

// firebase
//   .auth()
//   .createUserWithEmailAndPassword(email, password)
//   .then(user => ...)
//   .catch(error => console.log(error))

export const ackLoginFail = () => dispatch => {
  dispatch({ type: types.ACK_LOGIN_FAIL });
};

export const loginUserSuccess = (dispatch, user) => {
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
