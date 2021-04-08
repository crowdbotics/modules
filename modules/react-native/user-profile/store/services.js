import axios from 'axios';

const SERVICE_URL = "https://your-app.botics.co"

const usersAPI = axios.create({
  baseURL: SERVICE_URL, // your app back-end url
  headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
});

function user_read(action) {
  return usersAPI.get(`/api/v1/user/${action.id}/`);
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
