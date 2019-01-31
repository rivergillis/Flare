import { combineReducers } from 'redux';
import DataReducer from './DataReducer';

// Combine all the reducers together into one big reducer.
const rootReducer = combineReducers({
  DataReducer,
  // ,[ANOTHER REDUCER], [ANOTHER REDUCER] ....
});

export default rootReducer;
