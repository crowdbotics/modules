import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "./api";
import { Alert } from "react-native";
import { mapErrors } from "../utils";

export const createPost = createAsyncThunk(
  "social/createPost",
  async (payload) => {
    try {
      const response = await api.createPost(payload);
      return response.data;
    } catch (error) {
      Alert.alert("Error", mapErrors(error));
      throw new Error();
    }
  }
);

export const getFollowers = createAsyncThunk(
  "social/getFollowers",
  async () => {
    try {
      const response = await api.getFollowers();
      return response.data;
    } catch (error) {
      Alert.alert("Error", mapErrors(error));
      throw new Error();
    }
  }
);

export const getFollowing = createAsyncThunk(
  "social/getFollowing",
  async () => {
    try {
      const response = await api.getFollowing();
      return response.data;
    } catch (error) {
      Alert.alert("Error", mapErrors(error));
      throw new Error();
    }
  }
);

export const followUser = createAsyncThunk("social/followUser", async (id) => {
  try {
    const response = await api.followUser(id);
    return response.data;
  } catch (error) {
    Alert.alert("Error", mapErrors(error));
    throw new Error();
  }
});

export const unFollowUser = createAsyncThunk(
  "social/unFollowUser",
  async (id) => {
    try {
      const response = await api.unFollowUser(id);
      return response.data;
    } catch (error) {
      Alert.alert("Error", mapErrors(error));
      throw new Error();
    }
  }
);

export const getPostDetails = createAsyncThunk(
  "social/getPostDetails",
  async (id) => {
    try {
      const response = await api.getPostDetails(id);
      return response.data;
    } catch (error) {
      Alert.alert("Error", mapErrors(error));
      throw new Error();
    }
  }
);

export const getMyFeed = createAsyncThunk("social/getMyFeed", async () => {
  try {
    const response = await api.getMyFeed();
    return response.data;
  } catch (error) {
    Alert.alert("Error", mapErrors(error));
    throw new Error();
  }
});

export const likePost = createAsyncThunk("social/likePost", async (id) => {
  try {
    const response = await api.likePost(id);
    return response.data;
  } catch (error) {
    Alert.alert("Error", mapErrors(error));
    throw new Error();
  }
});

export const unLikePost = createAsyncThunk("social/unLikePost", async (id) => {
  try {
    const response = await api.unLikePost(id);
    return response.data;
  } catch (error) {
    Alert.alert("Error", mapErrors(error));
    throw new Error();
  }
});

export const getUserProfile = createAsyncThunk(
  "social/getUserProfile",
  async (id) => {
    try {
      const response = await api.getUserProfile(id);
      return response.data;
    } catch (error) {
      Alert.alert("Error", mapErrors(error));
      throw new Error();
    }
  }
);

export const likeComment = createAsyncThunk(
  "social/likeComment",
  async (id) => {
    try {
      const response = await api.likeComment(id);
      return response.data;
    } catch (error) {
      Alert.alert("Error", mapErrors(error));
      throw new Error();
    }
  }
);

export const unLikeComment = createAsyncThunk(
  "social/unLikeComment",
  async (id) => {
    try {
      const response = await api.unLikeComment(id);
      return response.data;
    } catch (error) {
      Alert.alert("Error", mapErrors(error));
      throw new Error();
    }
  }
);

export const addComment = createAsyncThunk(
  "social/addComment",
  async (payload) => {
    try {
      const response = await api.addComment(payload);
      return response.data;
    } catch (error) {
      Alert.alert("Error", mapErrors(error));
      throw new Error();
    }
  }
);

const initialState = {
  createPost: {
    entities: [],
    api: {
      loading: "idle",
      error: null
    }
  },
  getFollowers: {
    entities: [],
    api: {
      loading: "idle",
      error: null
    }
  },
  getFollowing: {
    entities: [],
    api: {
      loading: "idle",
      error: null
    }
  },
  followUser: {
    entities: [],
    api: {
      loading: "idle",
      error: null
    }
  },
  unFollowUser: {
    entities: [],
    api: {
      loading: "idle",
      error: null
    }
  },
  getPostDetails: {
    entities: [],
    api: {
      loading: "idle",
      error: null
    }
  },
  getMyFeed: {
    entities: [],
    api: {
      loading: "idle",
      error: null
    }
  },
  getUserProfile: {
    entities: [],
    api: {
      loading: "idle",
      error: null
    }
  }
};

export const slice = createSlice({
  name: "social",
  initialState: initialState,
  reducers: {},
  extraReducers: {
    [createPost.pending]: (state) => {
      if (state.createPost.api.loading === "idle") {
        state.createPost.api.loading = "pending";
        state.createPost.api.error = null;
      }
    },
    [createPost.fulfilled]: (state, action) => {
      if (state.createPost.api.loading === "pending") {
        state.createPost.entities = action.payload;
        state.createPost.api.loading = "idle";
      }
    },
    [createPost.rejected]: (state, action) => {
      if (state.createPost.api.loading === "pending") {
        state.createPost.api.error = action.error;
        state.createPost.api.loading = "idle";
      }
    },
    [getFollowers.pending]: (state) => {
      if (state.getFollowers.api.loading === "idle") {
        state.getFollowers.api.loading = "pending";
        state.getFollowers.api.error = null;
      }
    },
    [getFollowers.fulfilled]: (state, action) => {
      if (state.getFollowers.api.loading === "pending") {
        state.getFollowers.entities = action.payload;
        state.getFollowers.api.loading = "idle";
      }
    },
    [getFollowers.rejected]: (state, action) => {
      if (state.getFollowers.api.loading === "pending") {
        state.getFollowers.api.error = action.error;
        state.getFollowers.api.loading = "idle";
      }
    },
    [getFollowing.pending]: (state) => {
      if (state.getFollowing.api.loading === "idle") {
        state.getFollowing.api.loading = "pending";
        state.getFollowing.api.error = null;
      }
    },
    [getFollowing.fulfilled]: (state, action) => {
      if (state.getFollowing.api.loading === "pending") {
        state.getFollowing.entities = action.payload;
        state.getFollowing.api.loading = "idle";
      }
    },
    [getFollowing.rejected]: (state, action) => {
      if (state.getFollowing.api.loading === "pending") {
        state.getFollowing.api.error = action.error;
        state.getFollowing.api.loading = "idle";
      }
    },
    [followUser.pending]: (state) => {
      if (state.followUser.api.loading === "idle") {
        state.followUser.api.loading = "pending";
        state.followUser.api.error = null;
      }
    },
    [followUser.fulfilled]: (state, action) => {
      if (state.followUser.api.loading === "pending") {
        state.followUser.entities = action.payload;
        state.followUser.api.loading = "idle";
      }
    },
    [followUser.rejected]: (state, action) => {
      if (state.followUser.api.loading === "pending") {
        state.followUser.api.error = action.error;
        state.followUser.api.loading = "idle";
      }
    },
    [unFollowUser.pending]: (state) => {
      if (state.unFollowUser.api.loading === "idle") {
        state.unFollowUser.api.loading = "pending";
        state.unFollowUser.api.error = null;
      }
    },
    [unFollowUser.fulfilled]: (state, action) => {
      if (state.unFollowUser.api.loading === "pending") {
        state.unFollowUser.entities = action.payload;
        state.unFollowUser.api.loading = "idle";
      }
    },
    [unFollowUser.rejected]: (state, action) => {
      if (state.unFollowUser.api.loading === "pending") {
        state.unFollowUser.api.error = action.error;
        state.unFollowUser.api.loading = "idle";
      }
    },
    [getPostDetails.pending]: (state) => {
      if (state.getPostDetails.api.loading === "idle") {
        state.getPostDetails.api.loading = "pending";
        state.getPostDetails.api.error = null;
      }
    },
    [getPostDetails.fulfilled]: (state, action) => {
      if (state.getPostDetails.api.loading === "pending") {
        state.getPostDetails.entities = action.payload;
        state.getPostDetails.api.loading = "idle";
      }
    },
    [getPostDetails.rejected]: (state, action) => {
      if (state.getPostDetails.api.loading === "pending") {
        state.getPostDetails.api.error = action.error;
        state.getPostDetails.api.loading = "idle";
      }
    },
    [getMyFeed.pending]: (state) => {
      if (state.getMyFeed.api.loading === "idle") {
        state.getMyFeed.api.loading = "pending";
        state.getMyFeed.api.error = null;
      }
    },
    [getMyFeed.fulfilled]: (state, action) => {
      if (state.getMyFeed.api.loading === "pending") {
        state.getMyFeed.entities = action.payload;
        state.getMyFeed.api.loading = "idle";
      }
    },
    [getMyFeed.rejected]: (state, action) => {
      if (state.getMyFeed.api.loading === "pending") {
        state.getMyFeed.api.error = action.error;
        state.getMyFeed.api.loading = "idle";
      }
    },

    [getUserProfile.pending]: (state) => {
      state.getUserProfile.entities = [];
      if (state.getUserProfile.api.loading === "idle") {
        state.getUserProfile.api.loading = "pending";
        state.getUserProfile.api.error = null;
      }
    },
    [getUserProfile.fulfilled]: (state, action) => {
      if (state.getUserProfile.api.loading === "pending") {
        state.getUserProfile.entities = action.payload;
        state.getUserProfile.api.loading = "idle";
      }
    },
    [getUserProfile.rejected]: (state, action) => {
      if (state.getUserProfile.api.loading === "pending") {
        state.getUserProfile.api.error = action.error;
        state.getUserProfile.api.loading = "idle";
      }
    }
  }
});
