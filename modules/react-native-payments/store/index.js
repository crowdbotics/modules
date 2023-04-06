import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "./api";

export const fetchPaymentSheetParams = createAsyncThunk(
  "payments/fetchPaymentSheetParams",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await api.fetchPaymentSheetParams(payload);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchPaymentHistory = createAsyncThunk(
  "payments/fetchPaymentHistory",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await api.fetchPaymentHistory(payload);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const initialState = {
  paymentsHistory: [],
  paymentsSheetParams: {},
  api: { loading: "idle", error: null }
};
export const slice = createSlice({
  name: "payments",
  initialState: initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchPaymentSheetParams.pending, state => {
        if (state.api.loading === "idle") {
          state.api.loading = "pending";
          state.api.error = null;
        }
      })
      .addCase(fetchPaymentSheetParams.fulfilled, (state, action) => {
        if (state.api.loading === "pending") {
          state.paymentsSheetParams = action.payload;
          state.api.loading = "idle";
        }
      })
      .addCase(fetchPaymentSheetParams.rejected, (state, action) => {
        if (state.api.loading === "pending") {
          state.api.error = action.error;
          state.api.loading = "idle";
        }
      })
      .addCase(fetchPaymentHistory.pending, state => {
        if (state.api.loading === "idle") {
          state.api.loading = "pending";
          state.api.error = null;
        }
      })
      .addCase(fetchPaymentHistory.fulfilled, (state, action) => {
        if (state.api.loading === "pending") {
          state.paymentsHistory = action.payload;
          state.api.loading = "idle";
        }
      })
      .addCase(fetchPaymentHistory.rejected, (state, action) => {
        if (state.api.loading === "pending") {
          state.api.error = action.error;
          state.api.loading = "idle";
        }
      });
  }
});
