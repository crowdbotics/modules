import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "./api";

export const fetchPrivacy = createAsyncThunk(
  "privacy/fetchPrivacy",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await api.fetchPrivacy(payload);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const initialState = {
  token: null,
  userPrivacy: [],
  api: { loading: "idle", error: null }
};
export const slice = createSlice({
  name: "privacy",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPrivacy.pending, (state) => {
        if (state.api.loading === "idle") {
          state.api.loading = "pending";
          state.api.error = null;
        }
      })
      .addCase(fetchPrivacy.fulfilled, (state, action) => {
        if (state.api.loading === "pending") {
          state.userPrivacy = action.payload;
          state.api.loading = "idle";
        }
      })
      .addCase(fetchPrivacy.rejected, (state, action) => {
        if (state.api.loading === "pending") {
          state.api.error = action.error;
          state.api.loading = "idle";
        }
      });
  }
});
