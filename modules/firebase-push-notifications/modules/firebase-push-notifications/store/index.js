import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "./api";

export const fetchNotifications = createAsyncThunk(
  "fcm/fetchNotifications",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await api.fetchNotifications(payload);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const registerDeviceInfoAPI = createAsyncThunk(
  "fcm/registerDeviceInfoAPI",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await api.registerDeviceInfoAPI(payload);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const initialState = {
  token: null,
  notifications: [],
  api: { loading: "idle", error: null }
};
export const slice = createSlice({
  name: "fcm",
  initialState: initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchNotifications.pending, state => {
        if (state.api.loading === "idle") {
          state.api.loading = "pending";
          state.api.error = null;
        }
      })
      .addCase(fetchNotifications.fulfilled, (state, action) => {
        if (state.api.loading === "pending") {
          state.notifications = action.payload;
          state.api.loading = "idle";
        }
      })
      .addCase(fetchNotifications.rejected, (state, action) => {
        if (state.api.loading === "pending") {
          state.api.error = action.error;
          state.api.loading = "idle";
        }
      })
      .addCase(registerDeviceInfoAPI.pending, state => {
        if (state.api.loading === "idle") {
          state.api.loading = "pending";
          state.api.error = null;
        }
      })
      .addCase(registerDeviceInfoAPI.fulfilled, (state, action) => {
        if (state.api.loading === "pending") {
          state.api.loading = "idle";
        }
      })
      .addCase(registerDeviceInfoAPI.rejected, (state, action) => {
        if (state.api.loading === "pending") {
          state.api.error = action.error;
          state.api.loading = "idle";
        }
      });
  }
});
