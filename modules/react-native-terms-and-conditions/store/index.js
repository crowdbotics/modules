import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "./api";

export const fetchTerms = createAsyncThunk(
  "terms/fetchTerms",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await api.fetchTerms(payload);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const initialState = {
  token: null,
  userTerms: [],
  api: { loading: "idle", error: null }
};
export const slice = createSlice({
  name: "terms",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTerms.pending, (state) => {
        if (state.api.loading === "idle") {
          state.api.loading = "pending";
          state.api.error = null;
        }
      })
      .addCase(fetchTerms.fulfilled, (state, action) => {
        if (state.api.loading === "pending") {
          state.userTerms = action.payload;
          state.api.loading = "idle";
        }
      })
      .addCase(fetchTerms.rejected, (state, action) => {
        if (state.api.loading === "pending") {
          state.api.error = action.error;
          state.api.loading = "idle";
        }
      });
  }
});
