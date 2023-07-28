import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "./apis";

export const adduser = createAsyncThunk(
  "profile/adduser",
  async ({ data, token }, { rejectWithValue }) => {
    try {
      const response = await api.adduser(data, token);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        "response" in error ? error.response.data : { detail: error.message }
      );
    }
  }
);

export const getUser = createAsyncThunk(
  "profile/getUser",
  async ({ token }, { rejectWithValue }) => {
    try {
      const response = await api.getUser(token);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        "response" in error ? error.response.data : { detail: error.message }
      );
    }
  }
);

export const deleteUser = createAsyncThunk(
  "profile/deleteUser",
  async ({ token }, { rejectWithValue }) => {
    try {
      const response = await api.deleteUser(token);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        "response" in error ? error.response.data : { detail: error.message }
      );
    }
  }
);

const initialState = {
  user: {},
  api: { loading: "idle", error: null }
};
export const slice = createSlice({
  name: "profile",
  initialState: initialState,
  reducers: {},
  extraReducers: {
    [adduser.pending]: (state) => {
      if (state.api.loading === "idle") {
        state.api.loading = "pending";
        state.api.error = null;
      }
    },
    [adduser.fulfilled]: (state, action) => {
      if (state.api.loading === "pending") {
        state.api.loading = "idle";
      }
    },
    [adduser.rejected]: (state, action) => {
      if (state.api.loading === "pending") {
        state.api.loading = "idle";
      }
    },
    [getUser.pending]: (state) => {
      if (state.api.loading === "idle") {
        state.api.loading = "pending";
        state.api.error = null;
      }
    },
    [getUser.fulfilled]: (state, action) => {
      if (state.api.loading === "pending") {
        state.user = action.payload;
        state.api.loading = "idle";
      }
    },
    [getUser.rejected]: (state, action) => {
      if (state.api.loading === "pending") {
        state.api.loading = "idle";
      }
    },
    [deleteUser.pending]: (state) => {
      if (state.api.loading === "idle") {
        state.api.loading = "pending";
        state.api.error = null;
      }
    },
    [deleteUser.fulfilled]: (state, action) => {
      if (state.api.loading === "pending") {
        state.api.loading = "idle";
      }
    },
    [deleteUser.rejected]: (state, action) => {
      if (state.api.loading === "pending") {
        state.api.loading = "idle";
      }
    }
  }
});

export default slice.reducer;
