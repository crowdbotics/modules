
import * as types from './constants';

const INITIAL_STATE = {
  api: {
    isLoading: false,
    errors: null,
  },
  users: [],
};

export default function userReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case types.USER_READ:
      return Object.assign({}, state, {
        api: {
          isLoading: true,
          errors: null,
        },
      });
    case types.USER_READ_SUCCEEDED:
      return Object.assign({}, state, {
        api: {
          isLoading: false,
          errors: null,
        },
        users: [
          ...state.users?.filter(record => record.id !== action.response.data.id),
          action.response.data,
        ],
      });
    case types.USER_READ_FAILED:
      return Object.assign({}, state, {
        api: {
          isLoading: false,
          errors: action.response.message,
        },
      });
    case types.USER_LIST:
      return Object.assign({}, state, {
        api: {
          isLoading: true,
        },
      });
    case types.USER_LIST_SUCCEEDED:
      return Object.assign({}, state, {
        api: {
          isLoading: false,
        },
        users: action.response.data,
      });
    case types.USER_LIST_FAILED:
      return Object.assign({}, state, {
        api: {
          isLoading: false,
          errors: action.response.message,
        },
      });
    case types.USER_UPDATE:
      return Object.assign({}, state, {
        api: {
          isLoading: true,
        },
      });
    case types.USER_UPDATE_SUCCEEDED:
      return Object.assign({}, state, {
        api: {
          isLoading: false,
        },
        users: [
          ...state.users.filter(record => record.id !== action.response.data.id),
          action.response.data,
        ],
      });
    case types.USER_UPDATE_FAILED:
      return Object.assign({}, state, {
        api: {
          isLoading: false,
          errors: action.response.message,
        },
      });
    default:
      return state;
  }
}
