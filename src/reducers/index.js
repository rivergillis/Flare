import { combineReducers } from 'redux';
import PostListReducer from './PostListReducer';
import AuthReducer from './AuthReducer';
import MakePostReducer from './MakePostReducer';
import MakeCommentsReducer from './MakeCommentsReducer';
// Combine all the reducers together into one big reducer.
const rootReducer = combineReducers({
  PostListReducer,
  AuthReducer,
  MakePostReducer,
  MakeCommentsReducer,
  // ,[ANOTHER REDUCER], [ANOTHER REDUCER] ....
});

export default rootReducer;
