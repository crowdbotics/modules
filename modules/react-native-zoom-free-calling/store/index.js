import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "./api";

export const getOauthToken = createAsyncThunk(
  "zoom/getOauthToken",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await api.getOauthToken(payload);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getCurrentUser = createAsyncThunk(
  "zoom/getCurrentUser",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await api.getCurrentUser(payload);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const createMeeting = createAsyncThunk(
  "zoom/createMeeting",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await api.createMeeting(payload);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getMeetingList = createAsyncThunk(
  "zoom/getMeetingList",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await api.getMeetingList(payload);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const initialState = {
  authToken: {},
  meetings: [],
  user: {},
  api: { loading: "idle", error: null }
};
export const slice = createSlice({
  name: "zoom",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getOauthToken.pending, (state) => {
        if (state.api.loading === "idle") {
          state.api.loading = "pending";
          state.api.error = null;
        }
      })
      .addCase(getOauthToken.fulfilled, (state, action) => {
        if (state.api.loading === "pending") {
          state.authToken = action.payload;
          state.api.loading = "idle";
        }
      })
      .addCase(getOauthToken.rejected, (state, action) => {
        if (state.api.loading === "pending") {
          state.api.error = action.error;
          state.api.loading = "idle";
        }
      })
      .addCase(getCurrentUser.pending, (state) => {
        if (state.api.loading === "idle") {
          state.api.loading = "pending";
          state.api.error = null;
        }
      })
      .addCase(getCurrentUser.fulfilled, (state, action) => {
        if (state.api.loading === "pending") {
          state.user = action.payload;
          state.api.loading = "idle";
        }
      })
      .addCase(getCurrentUser.rejected, (state, action) => {
        if (state.api.loading === "pending") {
          state.api.error = action.error;
          state.api.loading = "idle";
        }
      })
      .addCase(createMeeting.pending, (state) => {
        if (state.api.loading === "idle") {
          state.api.loading = "pending";
          state.api.error = null;
        }
      })
      .addCase(createMeeting.fulfilled, (state, action) => {
        if (state.api.loading === "pending") {
          state.api.loading = "idle";
        }
      })
      .addCase(createMeeting.rejected, (state, action) => {
        if (state.api.loading === "pending") {
          state.api.error = action.error;
          state.api.loading = "idle";
        }
      })
      .addCase(getMeetingList.pending, (state) => {
        if (state.api.loading === "idle") {
          state.api.loading = "pending";
          state.api.error = null;
        }
      })
      .addCase(getMeetingList.fulfilled, (state, action) => {
        if (state.api.loading === "pending") {
          state.meetings = action.payload;
          state.api.loading = "idle";
        }
      })
      .addCase(getMeetingList.rejected, (state, action) => {
        if (state.api.loading === "pending") {
          state.api.error = action.error;
          state.api.loading = "idle";
        }
      });
  }
});
