import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "./api";

export const getQr = createAsyncThunk(
  "qrcode/getQr",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await api.getQr(payload);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const initialState = {
  token: null,
  qrCode: {},
  api: { loading: "idle", error: null }
};
export const slice = createSlice({
  name: "qrcode",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getQr.pending, (state) => {
        if (state.api.loading === "idle") {
          state.api.loading = "pending";
          state.api.error = null;
        }
      })
      .addCase(getQr.fulfilled, (state, action) => {
        if (state.api.loading === "pending") {
          state.qrCode = action.payload;
          state.api.loading = "idle";
        }
      })
      .addCase(getQr.rejected, (state, action) => {
        if (state.api.loading === "pending") {
          state.api.error = action.error;
          state.api.loading = "idle";
        }
      });
  }
});
