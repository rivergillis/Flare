import { combineReducers } from 'redux';
import PostListReducer from './PostListReducer';
import PostViewReducer from './PostViewReducer';

// Combine all the reducers together into one big reducer.
const rootReducer = combineReducers({
  PostListReducer,
  PostViewReducer,
  // ,[ANOTHER REDUCER], [ANOTHER REDUCER] ....
});

export default rootReducer;
