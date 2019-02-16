import * as types from '../actions/types';

// if we have no state, use INITIAL_STATE
const INITIAL_STATE = { posts: [], loadingPostList: false };

// look at the action type
// depending on the type, return A NEW STATE OBJECT
// never alter the original state object.

const PostListReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.FETCH_POST_LIST:
      return { ...state, loadingPostList: true };
    case types.FETCH_POST_SUCCESS:
      return { ...state, posts: action.posts, loadingPostList: false };
    default:
      return state;
  }
};

export default PostListReducer;
