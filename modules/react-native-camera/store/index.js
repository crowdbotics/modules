import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "./api";

export const fetchUserImages = createAsyncThunk(
  "camera/fetchUserImages",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await api.fetchUserImages(payload);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const uploadImage = createAsyncThunk(
  "camera/uploadImage",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await api.uploadImage(payload);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const initialState = {
  token: null,
  iamges: [],
  api: { loading: "idle", error: null }
};

export const slice = createSlice({
  name: "camera",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserImages.pending, (state) => {
        if (state.api.loading === "idle") {
          state.api.loading = "pending";
          state.api.error = null;
        }
      })
      .addCase(fetchUserImages.fulfilled, (state, action) => {
        if (state.api.loading === "pending") {
          state.images = action.payload;
          state.api.loading = "idle";
        }
      })
      .addCase(fetchUserImages.rejected, (state, action) => {
        if (state.api.loading === "pending") {
          state.api.error = action.error;
          state.api.loading = "idle";
        }
      })
      .addCase(uploadImage.pending, (state) => {
        if (state.api.loading === "idle") {
          state.api.loading = "pending";
          state.api.error = null;
        }
      })
      .addCase(uploadImage.fulfilled, (state, action) => {
        if (state.api.loading === "pending") {
          state.api.loading = "idle";
        }
      })
      .addCase(uploadImage.rejected, (state, action) => {
        if (state.api.loading === "pending") {
          state.api.error = action.error;
          state.api.loading = "idle";
        }
      });
  }
});
