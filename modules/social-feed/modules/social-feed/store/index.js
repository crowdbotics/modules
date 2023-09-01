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
      console.log(response);
      return response.data;
    } catch (error) {
      console.log("ERROR", error.response);
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
      console.log(response);
      return response.data;
    } catch (error) {
      console.log("ERROR", error.response);
      Alert.alert("Error", mapErrors(error));
      throw new Error();
    }
  }
);

export const followUser = createAsyncThunk("social/followUser", async (id) => {
  try {
    const response = await api.followUser(id);
    console.log(response);
    return response.data;
  } catch (error) {
    console.log("ERROR", error.response);
    Alert.alert("Error", mapErrors(error));
    throw new Error();
  }
});

export const unFollowUser = createAsyncThunk("social/unFollowUser", async (id) => {
  try {
    const response = await api.unFollowUser(id);
    console.log(response);
    return response.data;
  } catch (error) {
    console.log("ERROR", error.response);
    Alert.alert("Error", mapErrors(error));
    throw new Error();
  }
});

const initialState = {
  createPost: {
    entities: [],
    api: {
      loading: "idle",
      error: null,
    },
  },
  getFollowers: {
    entities: [],
    api: {
      loading: "idle",
      error: null,
    },
  },
  getFollowing: {
    entities: [],
    api: {
      loading: "idle",
      error: null,
    },
  },
  followUser: {
    entities: [],
    api: {
      loading: "idle",
      error: null,
    },
  },
  unFollowUser: {
    entities: [],
    api: {
      loading: "idle",
      error: null,
    },
  },
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
  },
});
