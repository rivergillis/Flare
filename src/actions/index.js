import * as types from './types';

// sample data!
const data = { this: 'is', sample: 'data' };

export const getData = () => dispatch => {
  console.log('Fetching data! wait a sec');
  setTimeout(() => {
    dispatch({ type: types.DATA_AVAILABLE, data });
  }, 2000);
};
