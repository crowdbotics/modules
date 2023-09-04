import axios from "axios";
import localOptions from "../options";

const BASE_URL = localOptions.BASE_URL;
const ACCESS_TOKEN = localOptions.USER_TOKEN;

export const createPost = (payload) => {
  const config = {
    method: "post",
    maxBodyLength: Infinity,
    url: `${BASE_URL}/modules/social-feed/create-post/`,
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Token ${ACCESS_TOKEN}`
    },
    data: payload
  };
  return axios.request(config);
};

export const getFollowers = () => {
  const config = {
    method: "get",
    maxBodyLength: Infinity,
    url: `${BASE_URL}/modules/social-feed/my-followers/`,
    headers: {
      Authorization: `Token ${ACCESS_TOKEN}`
    }
  };
  return axios.request(config);
};

export const getFollowing = () => {
  const config = {
    method: "get",
    maxBodyLength: Infinity,
    url: `${BASE_URL}/modules/social-feed/my-following/`,
    headers: {
      Authorization: `Token ${ACCESS_TOKEN}`
    }
  };
  return axios.request(config);
};

export const followUser = (id) => {
  const config = {
    method: "post",
    maxBodyLength: Infinity,
    url: `${BASE_URL}/modules/social-feed/follow/${id}/`,
    headers: {
      Authorization: `Token ${ACCESS_TOKEN}`
    }
  };
  return axios.request(config);
};

export const unFollowUser = (id) => {
  const config = {
    method: "post",
    maxBodyLength: Infinity,
    url: `${BASE_URL}/modules/social-feed/unfollow/${id}/`,
    headers: {
      Authorization: `Token ${ACCESS_TOKEN}`
    }
  };
  return axios.request(config);
};

export const getPostDetails = (id) => {
  const config = {
    method: "get",
    maxBodyLength: Infinity,
    url: `${BASE_URL}/modules/social-feed/post/${id}/`,
    headers: {
      Authorization: `Token ${ACCESS_TOKEN}`
    }
  };
  return axios.request(config);
};

export const getMyFeed = () => {
  const config = {
    method: "get",
    maxBodyLength: Infinity,
    url: `${BASE_URL}/modules/social-feed/my-feed/`,
    headers: {
      Authorization: `Token ${ACCESS_TOKEN}`
    }
  };
  return axios.request(config);
};

export const likePost = (id) => {
  const config = {
    method: "post",
    maxBodyLength: Infinity,
    url: `${BASE_URL}/modules/social-feed/like-post/`,
    headers: {
      Authorization: `Token ${ACCESS_TOKEN}`
    },
    data: {
      post_id: id
    }
  };
  return axios.request(config);
};

export const unLikePost = (id) => {
  const config = {
    method: "post",
    maxBodyLength: Infinity,
    url: `${BASE_URL}/modules/social-feed/unlike-post/`,
    headers: {
      Authorization: `Token ${ACCESS_TOKEN}`
    },
    data: {
      post_id: id
    }
  };
  return axios.request(config);
};

export const getUserProfile = (id) => {
  const config = {
    method: "get",
    maxBodyLength: Infinity,
    url: `${BASE_URL}/modules/social-feed/profile/${id}/`,
    headers: {
      Authorization: `Token ${ACCESS_TOKEN}`
    }
  };
  return axios.request(config);
};

export const likeComment = (id) => {
  const config = {
    method: "post",
    maxBodyLength: Infinity,
    url: `${BASE_URL}/modules/social-feed/like-comment/`,
    headers: {
      Authorization: `Token ${ACCESS_TOKEN}`
    },
    data: {
      comment_id: id
    }
  };
  return axios.request(config);
};

export const unLikeComment = (id) => {
  const config = {
    method: "post",
    maxBodyLength: Infinity,
    url: `${BASE_URL}/modules/social-feed/unlike-comment/`,
    headers: {
      Authorization: `Token ${ACCESS_TOKEN}`
    },
    data: {
      comment_id: id
    }
  };
  return axios.request(config);
};

export const addComment = (payload) => {
  const config = {
    method: "post",
    maxBodyLength: Infinity,
    url: `${BASE_URL}/modules/social-feed/post-comment/`,
    headers: {
      Authorization: `Token ${ACCESS_TOKEN}`
    },
    data: {
      comment: payload?.comment,
      ref_comment: payload?.ref_comment,
      post_id: payload?.post_id
    }
  };
  return axios.request(config);
};

export const api = {
  createPost,
  getFollowers,
  getFollowing,
  followUser,
  unFollowUser,
  getPostDetails,
  getMyFeed,
  likePost,
  unLikePost,
  getUserProfile,
  likeComment,
  unLikeComment,
  addComment
};
