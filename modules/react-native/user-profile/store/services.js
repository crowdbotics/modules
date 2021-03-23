import axios from 'axios';
import { appConfig } from '../../../config/app';

const usersAPI = axios.create({
  baseURL: appConfig.emailAuthAPIEndPoint, // your app back-end url
  headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
});

function user_read(action) {
  return usersAPI.get(`/api/v1/user/${action.id}/`, null, {
    headers: {
      Authorization: `Token ${action.token}`,
    },
  });
}

function user_update(action) {
  return usersAPI.patch(`/api/v1/user/${action.data.id}/`, null, {
    data: action.data,
    headers: {
      Authorization: `Token ${action.token}`,
    },
  });
}

function user_list(action) {
  return usersAPI.get(`/api/v1/user/`, null, {
    headers: {
      Authorization: `Token ${action.token}`,
    },
  });
}

export default {
  user_read,
  user_list,
  user_update,
};
