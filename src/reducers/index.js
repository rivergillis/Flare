import { combineReducers } from 'redux';
import PostListReducer from './PostListReducer';
import AuthReducer from './AuthReducer';

// Combine all the reducers together into one big reducer.
const rootReducer = combineReducers({
  PostListReducer,
  AuthReducer,
  // ,[ANOTHER REDUCER], [ANOTHER REDUCER] ....
});

export default rootReducer;
