import axios from "axios";
const BASE_URL = "";

export const createPost = (payload) => {
  const config = {
    method: "post",
    maxBodyLength: Infinity,
    url: `${BASE_URL}/modules/social-feed/create-post/`,
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Token d73f809b5ba4b09d2d5b64a81045c8fe2aceae53`,
    },
    data: payload,
  };
  return axios.request(config);
};

export const getFollowers = () => {
  const config = {
    method: "get",
    maxBodyLength: Infinity,
    url: `${BASE_URL}/modules/social-feed/my-followers/`,
    headers: {
      Authorization: `Token d73f809b5ba4b09d2d5b64a81045c8fe2aceae53`,
    },
  };
  return axios.request(config);
};

export const getFollowing = () => {
  const config = {
    method: "get",
    maxBodyLength: Infinity,
    url: `${BASE_URL}/modules/social-feed/my-following/`,
    headers: {
      Authorization: `Token d73f809b5ba4b09d2d5b64a81045c8fe2aceae53`,
    },
  };
  return axios.request(config);
};

export const followUser = (id) => {
  const config = {
    method: "post",
    maxBodyLength: Infinity,
    url: `${BASE_URL}/modules/social-feed/follow/${id}/`,
    headers: {
      Authorization: `Token d73f809b5ba4b09d2d5b64a81045c8fe2aceae53`,
    },
  };
  return axios.request(config);
};

export const unFollowUser = (id) => {
  const config = {
    method: "post",
    maxBodyLength: Infinity,
    url: `${BASE_URL}/modules/social-feed/unfollow/${id}/`,
    headers: {
      Authorization: `Token d73f809b5ba4b09d2d5b64a81045c8fe2aceae53`,
    },
  };
  return axios.request(config);
};

export const api = {
  createPost,
  getFollowers,
  getFollowing,
  followUser,
  unFollowUser
};
