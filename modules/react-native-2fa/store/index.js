import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "./api";

export const getCode = createAsyncThunk(
  "2fa/getCode",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await api.getCode(payload);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const sendVerification = createAsyncThunk(
  "2fa/sendVerification",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await api.sendVerification(payload);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const verifyCode = createAsyncThunk(
  "2fa/verifyCode",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await api.verifyCode(payload);
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const initialState = {
  token: null,
  otpCode: {},
  api: { loading: "idle", error: null }
};
export const slice = createSlice({
  name: "2fa",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCode.pending, (state) => {
        if (state.api.loading === "idle") {
          state.api.loading = "pending";
          state.api.error = null;
        }
      })
      .addCase(getCode.fulfilled, (state, action) => {
        if (state.api.loading === "pending") {
          state.otpCode = action.payload;
          state.api.loading = "idle";
        }
      })
      .addCase(getCode.rejected, (state, action) => {
        if (state.api.loading === "pending") {
          state.api.error = action.error;
          state.api.loading = "idle";
        }
      })
      .addCase(sendVerification.pending, (state) => {
        if (state.api.loading === "idle") {
          state.api.loading = "pending";
          state.api.error = null;
        }
      })
      .addCase(sendVerification.fulfilled, (state, action) => {
        if (state.api.loading === "pending") {
          state.api.loading = "idle";
        }
      })
      .addCase(sendVerification.rejected, (state, action) => {
        if (state.api.loading === "pending") {
          state.api.error = action.error;
          state.api.loading = "idle";
        }
      })
      .addCase(verifyCode.pending, (state) => {
        if (state.api.loading === "idle") {
          state.api.loading = "pending";
          state.api.error = null;
        }
      })
      .addCase(verifyCode.fulfilled, (state, action) => {
        if (state.api.loading === "pending") {
          state.api.loading = "idle";
        }
      })
      .addCase(verifyCode.rejected, (state, action) => {
        if (state.api.loading === "pending") {
          state.api.error = action.error;
          state.api.loading = "idle";
        }
      });
  }
});
