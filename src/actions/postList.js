import * as types from './types';

// Redux thunk lets use return a function that takes in dispatch as
// an arg. Use this to keep the chain of requests going.
export const fetchPostList = () => dispatch => {
  console.log(dispatch);
};
