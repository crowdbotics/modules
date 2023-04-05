import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "./api";

export const sendQuery = createAsyncThunk(
  "contact/sendQuery",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await api.sendQuery(payload);
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
  name: "contact",
  initialState: initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(sendQuery.pending, state => {
        if (state.api.loading === "idle") {
          state.api.loading = "pending";
          state.api.error = null;
        }
      })
      .addCase(sendQuery.fulfilled, (state, action) => {
        if (state.api.loading === "pending") {
          state.api.loading = "idle";
        }
      })
      .addCase(sendQuery.rejected, (state, action) => {
        if (state.api.loading === "pending") {
          state.api.error = action.error;
          state.api.loading = "idle";
        }
      });
  }
});
