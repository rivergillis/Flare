import * as types from '../actions/types';

// if we have no state, use INITIAL_STATE
const INITIAL_STATE = {
  posts: [],
  postComments: {},
  postReposts: {},
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
    case types.FETCH_POST_REPOSTS_SUCCESS: {
      const newPostReposts = { ...state.postReposts, ...action.payload };
      return { ...state, postReposts: newPostReposts };
    }
    case types.UPDATE_REPOST_CACHE: {
      const { postId, isReposted, userId } = action.payload;
      const newPostReposts = { ...state.postReposts };
      const newPosts = [...state.posts];

      // Update the repost count
      const indexToUpdate = newPosts.findIndex(
        postObj => postObj.docId === postId
      );
      if (isReposted) {
        newPosts[indexToUpdate].numReposts += 1;
      } else {
        newPosts[indexToUpdate].numReposts -= 1;
      }

      // Update userHasReposted and the postReposts array
      newPostReposts[postId].userHasReposted = isReposted;
      if (isReposted) {
        newPostReposts[postId].reposts.push({ reposted: true, docId: userId });
        return { ...state, postReposts: newPostReposts };
      }
      const filtered = newPostReposts[postId].reposts.filter(repoObj => {
        return repoObj.docId !== userId;
      });
      newPostReposts[postId].reposts = filtered;
      return { ...state, postReposts: newPostReposts };
    }
    default:
      return state;
  }
};

export default PostListReducer;
