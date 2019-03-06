import * as types from '../actions/types';

// if we have no state, use INITIAL_STATE
const INITIAL_STATE = {
  isPosting: false,
};

const AuthReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.CREATE_POST:
      return { ...state, isPosting: true };
    case types.CREATE_POST_SUCCESS:
      return { ...state, isPosting: false };
    default:
      return state;
  }
};

export default AuthReducer;
