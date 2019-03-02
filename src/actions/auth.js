import * as types from './types';

export const loginUser = (username, password) => dispatch => {
  dispatch({ type: types.BEGIN_LOGIN });
  console.log('loginuser');
};
