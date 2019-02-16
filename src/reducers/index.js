import { combineReducers } from 'redux';
import PostListReducer from './PostListReducer';

// Combine all the reducers together into one big reducer.
const rootReducer = combineReducers({
  PostListReducer,
  // ,[ANOTHER REDUCER], [ANOTHER REDUCER] ....
});

export default rootReducer;
