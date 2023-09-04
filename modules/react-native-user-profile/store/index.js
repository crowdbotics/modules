import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "./api";

export const getUserById = createAsyncThunk(
  "userProfile/getUserById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.getUserById(id);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getUsers = createAsyncThunk(
  "userProfile/getUsers",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await api.getUsers(payload);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateUserById = createAsyncThunk(
  "userProfile/updateUserById",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await api.updateUserById(payload);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const initialState = { users: {}, api: { loading: "idle", error: null } };

export const slice = createSlice({
  name: "userProfile",
  initialState: initialState,
  reducers: {},
  extraReducers: {
    [getUserById.pending]: (state) => {
      if (state.api.loading === "idle") {
        state.api.loading = "pending";
      }
    },
    [getUserById.fulfilled]: (state, action) => {
      if (state.api.loading === "pending") {
        state.users[action.payload.id] = action.payload;
        state.api.loading = "idle";
      }
    },
    [getUserById.rejected]: (state, action) => {
      if (state.api.loading === "pending") {
        state.api.error = action.error;
        state.api.loading = "idle";
      }
    }
  },
  [getUsers.pending]: (state) => {
    if (state.api.loading === "idle") {
      state.api.loading = "pending";
    }
  },
  [getUsers.fulfilled]: (state, action) => {
    if (state.api.loading === "pending") {
      action.payload.map((user) => {
        state.users[user.id] = user;
        return user;
      });
      state.api.loading = "idle";
    }
  },
  [getUsers.rejected]: (state, action) => {
    if (state.api.loading === "pending") {
      state.api.error = action.error;
      state.api.loading = "idle";
    }
  },
  [updateUserById.pending]: (state, action) => {
    if (state.api.loading === "idle") {
      state.api.loading = "pending";
    }
  },
  [updateUserById.fulfilled]: (state, action) => {
    if (state.api.loading === "pending") {
      state.users[action.payload.id] = action.payload;
      state.api.loading = "idle";
    }
  },
  [updateUserById.rejected]: (state, action) => {
    if (state.api.loading === "pending") {
      state.api.error = action.error;
      state.api.loading = "idle";
    }
  }
});
