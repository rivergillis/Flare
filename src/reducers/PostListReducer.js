import * as types from '../actions/types';

// if we have no state, use INITIAL_STATE
const INITIAL_STATE = {
  posts: [],
  postComments: {},
  currentSubscription: null,
  initialLoad: false,
};

// look at the action type
// depending on the type, return A NEW STATE OBJECT
// never alter the original state object.

const PostListReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.SET_POST_INITIAL_LOAD:
      return { ...state, initialLoad: action.payload };
    case types.SUBSCRIBE_FETCH_POST_LIST:
      return { ...state, currentSubscription: action.payload };
    case types.FETCH_POST_SUCCESS:
      return { ...state, posts: action.payload, initialLoad: false };
    case types.FETCH_POST_COMMENTS_SUCCESS: {
      // TODO: Put these directly into the posts object
      const newPostComments = { ...state.postComments, ...action.payload };
      return { ...state, postComments: newPostComments };
    }
    default:
      return state;
  }
};

export default PostListReducer;
