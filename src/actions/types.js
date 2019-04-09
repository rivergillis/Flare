// This file contains all the types for redux (actions and reducers) to use.
// Types are just strings.

export const SUBSCRIBE_FETCH_POST_LIST = 'subscribe_fetch_post_list';
export const FETCH_POST_SUCCESS = 'fetch_post_success';
export const SET_POST_INITIAL_LOAD = 'set_post_initial_load';

export const FETCH_POST_COMMENTS = 'fetch_post_comments';
export const FETCH_POST_COMMENTS_SUCCESS = 'fetch_post_comments_success';
export const FETCH_POST_REPOSTS = 'fetch_post_reposts';
export const FETCH_POST_REPOSTS_SUCCESS = 'fetch_post_reposts_success';

export const UPDATE_REPOST_CACHE = 'update_repost_cache';

export const BEGIN_LOGIN = 'begin_login';
export const LOGIN_SUCCESS = 'login_success';
export const FETCH_USER_DATA_SUCCESS = 'fetch_user_data_success';
export const LOGIN_FAIL = 'login_fail';
export const ACK_LOGIN_FAIL = 'ack_login_fail';

export const BEGIN_CREATE_USER = 'begin_create_user';
export const CREATE_USER_FAIL = 'create_user_fail';

export const SAVE_USER_DATA = 'save_user_data';
export const SAVE_USER_DATA_SUCCESS = 'save_user_data_success';

export const CREATE_POST = 'create_post';
export const CREATE_POST_SUCCESS = 'create_post_success';
export const ACK_POST_SUCCESS = 'ack_post_success';
export const CREATE_COMMENT = 'create_comment';
export const CREATE_COMMENT_SUCCESS = 'create_comment_success';
export const ACK_COMMENT_SUCCESS = 'ack_comment_success';

export const SET_SORT_METHOD = 'set_sort_method';
export const SORT_POST_CACHE = 'sort_post_cache';
