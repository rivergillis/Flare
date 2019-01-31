// this file is how the redux store is created
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

// Import the big combined reducer.
import reducers from './reducers/index';

// Connect our store to the reducers
export default createStore(reducers, applyMiddleware(thunk));
