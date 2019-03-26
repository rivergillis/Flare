import * as types from '../actions/types';

// if we have no state, use INITIAL_STATE
const INITIAL_STATE = {
  isPosting: false,
  postSuccess: false,
};

const AuthReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.CREATE_POST:
      return { ...state, isPosting: true, postSuccess: false };
    case types.CREATE_POST_SUCCESS:
      return { ...state, isPosting: false, postSuccess: true };
    case types.ACK_POST_SUCCESS:
      return { ...state, postSuccess: false };
    default:
      return state;
  }
};

export default AuthReducer;
