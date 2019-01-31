import * as types from '../actions/types';

// if we have no state, use INITIAL_STATE
const INITIAL_STATE = { data: [], loading: true };

// look at the action type
// depending on the type, return A NEW STATE OBJECT
// never alter the original state object.

const DataReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.DATA_AVAILABLE:
      return { ...state, data: action.data, loading: false };
    default:
      return state;
  }
};

export default DataReducer;
