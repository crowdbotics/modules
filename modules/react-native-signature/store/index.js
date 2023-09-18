import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "./api";

export const saveSignature = createAsyncThunk(
  "signature/saveSignature",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await api.saveSignature(payload);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const initialState = {
  token: null,
  api: { loading: "idle", error: null }
};
export const slice = createSlice({
  name: "signautre",
  initialState: initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(saveSignature.pending, state => {
        if (state.api.loading === "idle") {
          state.api.loading = "pending";
          state.api.error = null;
        }
      })
      .addCase(saveSignature.fulfilled, (state, action) => {
        if (state.api.loading === "pending") {
          state.api.loading = "idle";
        }
      })
      .addCase(saveSignature.rejected, (state, action) => {
        if (state.api.loading === "pending") {
          state.api.error = action.error;
          state.api.loading = "idle";
        }
      });
  }
});
