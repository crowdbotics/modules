import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "./api";


export const getForms = createAsyncThunk(
    "typform/getForms",
    async (payload, { rejectWithValue }) => {
      try {
        const response = await api.getForms(payload);
        return response.data;
      } catch (error) {
        return rejectWithValue(error.response.data);
      }
    }
  );

export const createWebHook = createAsyncThunk(
    "typform/createWebHook",
    async (payload, { rejectWithValue }) => {
      try {
        const response = await api.createWebHook(payload);
        return response.data;
      } catch (error) {
        return rejectWithValue(error.response.data);
      }
    }
  );

export const getWebHook = createAsyncThunk(
    "typform/getWebHook",
    async (payload, { rejectWithValue }) => {
      try {
        const response = await api.getWebHook(payload);
        return response.data;
      } catch (error) {
        return rejectWithValue(error.response.data);
      }
    }
  );
  
export const getResponses = createAsyncThunk(
    "typform/getResponses",
    async (payload, { rejectWithValue }) => {
      try {
        const response = await api.getResponses(payload);
        return response.data;
      } catch (error) {
        return rejectWithValue(error.response.data);
      }
    }
  );
  

const initialState = {
    forms: [],
    responses: [],
    webhook:[],
    token: null,
    user: {},
    api: { loading: "idle", error: null }
  };
export const slice = createSlice({
    name: "typform",
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
          .addCase(getForms.pending, (state) => {
            if (state.api.loading === "idle") {
              state.api.loading = "pending";
              state.api.error = null;
            }
          })
          .addCase(getForms.fulfilled, (state, action) => {
            if (state.api.loading === "pending") {
              state.forms = action.payload;
              state.api.loading = "idle";
            }
          })
          .addCase(getForms.rejected, (state, action) => {
            if (state.api.loading === "pending") {
              state.api.error = action.error;
              state.api.loading = "idle";
            }
          })
          .addCase(createWebHook.pending, (state) => {
            if (state.api.loading === "idle") {
              state.api.loading = "pending";
              state.api.error = null;
            }
          })
          .addCase(createWebHook.fulfilled, (state, action) => {
            if (state.api.loading === "pending") {
              state.api.loading = "idle";
            }
          })
          .addCase(createWebHook.rejected, (state, action) => {
            if (state.api.loading === "pending") {
              state.api.error = action.error;
              state.api.loading = "idle";
            }
          })
          .addCase(getWebHook.pending, (state) => {
            if (state.api.loading === "idle") {
              state.api.loading = "pending";
              state.api.error = null;
            }
          })
          .addCase(getWebHook.fulfilled, (state, action) => {
            if (state.api.loading === "pending") {
              state.webhook = action.payload;
              state.api.loading = "idle";
            }
          })
          .addCase(getWebHook.rejected, (state, action) => {
            if (state.api.loading === "pending") {
              state.api.error = action.error;
              state.api.loading = "idle";
            }
          })
          .addCase(getResponses.pending, (state) => {
            if (state.api.loading === "idle") {
              state.api.loading = "pending";
              state.api.error = null;
            }
          })
          .addCase(getResponses.fulfilled, (state, action) => {
            if (state.api.loading === "pending") {
              state.responses = action.payload;
              state.api.loading = "idle";
            }
          })
          .addCase(getResponses.rejected, (state, action) => {
            if (state.api.loading === "pending") {
              state.api.error = action.error;
              state.api.loading = "idle";
            }
          })
    }})
