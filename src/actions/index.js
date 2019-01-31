import * as types from './types';

// sample data!
const data = { this: 'is', sample: 'data' };

export function getData() {
  console.log('Fetching data! wait a sec');
  return dispatch => {
    setTimeout(() => {
      dispatch({ type: types.DATA_AVAILABLE, data: data });
    }, 2000);
  };
}
