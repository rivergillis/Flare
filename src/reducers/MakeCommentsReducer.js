import * as types from '../actions/types';

// if we have no state, use INITIAL_STATE
const INITIAL_STATE = {
  isCommenting: false,
  commentSuccess: false,
};

const AuthReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.CREATE_COMMENT:
      return { ...state, isCommenting: true, commentSuccess: false };
    case types.CREATE_COMMENT_SUCCESS:
      return { ...state, isCommenting: false, commentSuccess: true };
    case types.ACK_COMMENT_SUCCESS:
      return { ...state, commentSuccess: false };
    default:
      return state;
  }
};

export default AuthReducer;