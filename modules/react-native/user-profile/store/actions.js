import * as types from './constants';


export const user_read = (id, token) => ({
  type: types.USER_READ,
  id,
  token,
});

export const user_read_succeeded = (response, starter) => ({
  type: types.USER_READ_SUCCEEDED,
  response,
  starter
});

export const user_read_failed = (response, starter) => ({
  type: types.USER_READ_FAILED,
  response,
  starter
});

export const user_list = token => ({
  type: types.USER_LIST,
  token,
});

export const user_list_succeeded = (response, starter) => ({
  type: types.USER_LIST_SUCCEEDED,
  response,
  starter
});

export const user_list_failed = (response, starter) => ({
  type: types.USER_LIST_FAILED,
  response,
  starter
});

export const user_update = (data, token) => ({
  type: types.USER_UPDATE,
  data,
  token,
});

export const user_update_succeeded = (response, starter) => ({
  type: types.USER_UPDATE_SUCCEEDED,
  response,
  starter
});

export const user_update_failed = (response, starter) => ({
  type: types.USER_UPDATE_FAILED,
  response,
  starter
});
