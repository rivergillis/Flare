import * as types from '../actions/types';

const INITIAL_STATE = {
  post: {},
  postComments: {},
  postReposts: {},
  currentSubscription: null,
};

const PostViewReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.FETCH_COMMENT_SUCCESS: {
      const newPostComment = { ...state.postComments, ...action.payload };
      return { ...state, postComments: newPostComments };
    }
    case types.SUBSCRIBE_FETCH_COMMENT_LIST: {
      return { ...state, currentSubscription: action.payload };
    }
    case types.FETCH_POST_REPOSTS_SUCCESS: {
      const newPostReposts = { ...state.postReposts, ...action.payload };
      return { ...state, postReposts: newPostReposts };
    }
    default:
      return state;
  }
};

export default PostViewReducer;
