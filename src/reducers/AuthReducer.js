import * as types from '../actions/types';

// if we have no state, use INITIAL_STATE
const INITIAL_STATE = {
  user: null,
  userData: null, // userData.docId contains the document ID for the user
  loggingIn: false,
  failedLogin: false,
  creatingUser: false,
  failedCreatingUser: false,
  savingUserData: false,
};

const AuthReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.BEGIN_LOGIN:
      return { ...state, loggingIn: true, failedLogin: false };
    case types.LOGIN_SUCCESS:
      return {
        ...state,
        user: action.payload,
        loggingIn: false,
        failedLogin: false,
        creatingUser: false,
        failedCreatingUser: false,
      };
    case types.FETCH_USER_DATA_SUCCESS:
      return { ...state, userData: action.payload };
    case types.LOGIN_FAIL:
      return { ...state, loggingIn: false, failedLogin: true };
    case types.ACK_LOGIN_FAIL:
      return { ...INITIAL_STATE };
    case types.BEGIN_CREATE_USER:
      return { ...state, creatingUser: true, failedCreatingUser: false };
    case types.CREATE_USER_FAIL:
      return { ...state, creatingUser: false, failedCreatingUser: true };
    case types.SAVE_USER_DATA:
      return { ...state, savingUserData: true };
    case types.SAVE_USER_DATA_SUCCESS:
      return { ...state, userData: action.payload, savingUserData: false };
    default:
      return state;
  }
};

export default AuthReducer;
