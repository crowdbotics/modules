import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "./api";

export const eventList = createAsyncThunk(
  "events/eventList",
  async (accessToken) => {
    const response = await api.getEventListing(accessToken);
    return response.data;
  }
);

const initialState = { events: [], api: { loading: "idle", error: null } };

export const slice = createSlice({
  name: "events",
  initialState: initialState,
  reducers: {},
  extraReducers: {
    [eventList.pending]: (state) => {
      if (state.api.loading === "idle") {
        state.api.loading = "pending";
        state.api.error = null;
      }
    },
    [eventList.fulfilled]: (state, action) => {
      if (state.api.loading === "pending") {
        state.events = action.payload.value;
        state.api.loading = "idle";
      }
    },
    [eventList.rejected]: (state, action) => {
      if (state.api.loading === "pending") {
        state.api.error = action.error;
        state.api.loading = "idle";
      }
    }
  }
});
