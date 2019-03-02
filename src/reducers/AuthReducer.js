import * as types from '../actions/types';

// if we have no state, use INITIAL_STATE
const INITIAL_STATE = { user: null, loggingIn: false };

const AuthReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.BEGIN_LOGIN:
      return { ...state, loggingIn: true };
    case types.LOGIN_SUCCESS:
      return { ...state, loggingIn: false, user: action.payload };
    default:
      return state;
  }
};

export default AuthReducer;
