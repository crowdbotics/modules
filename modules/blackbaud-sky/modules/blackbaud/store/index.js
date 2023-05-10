import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "./api";

export const eventList = createAsyncThunk(
  "events/eventList",
  async (accessToken) => {
    const response = await api.getEventListing(accessToken);
    return response.data;
  }
);

export const eventDetails = createAsyncThunk(
  "events/eventDetails",
  async (data) => {
    const response = await api.getEventDetails(data.token, data.id);
    return response.data;
  }
);

export const attendeeList = createAsyncThunk(
  "events/attendeeList",
  async (data) => {
    const response = await api.getAttendeeList(data.token, data.id);
    console.log("respoinse ATTENDEE LIST", response);
    return response.data;
  }
);

const initialState = {
  events: [],
  api: { loading: "idle", error: null },
  accessToken: "",
  eventDetailApi: { loading: "idle", error: null },
  attendeeListApi: { loading: "idle", error: null },
  eventDetails: false,
  attendeeList: []
};

export const slice = createSlice({
  name: "events",
  initialState: initialState,
  reducers: {
    saveAccessToken(state, action) {
      state.accessToken = action.payload;
    }
  },
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
    },
    [eventDetails.pending]: (state, action) => {
      if (state.eventDetailApi.loading === "idle") {
        state.eventDetailApi.loading = "pending";
        state.eventDetailApi.error = null;
      }
    },
    [eventDetails.fulfilled]: (state, action) => {
      if (state.eventDetailApi.loading === "pending") {
        state.eventDetails = action.payload;
        state.eventDetailApi.loading = "idle";
      }
    },
    [eventDetails.rejected]: (state, action) => {
      if (state.eventDetailApi.loading === "pending") {
        state.eventDetailApi.error = action.error;
        state.eventDetailApi.loading = "idle";
      }
    },
    [attendeeList.pending]: (state, action) => {
      if (state.attendeeListApi.loading === "idle") {
        state.attendeeListApi.loading = "pending";
        state.attendeeListApi.error = null;
      }
    },
    [attendeeList.fulfilled]: (state, action) => {
      if (state.attendeeListApi.loading === "pending") {
        state.attendeeList = action.payload.value;
        state.attendeeListApi.loading = "idle";
      }
    },
    [attendeeList.rejected]: (state, action) => {
      if (state.attendeeListApi.loading === "pending") {
        state.attendeeListApi.error = action.error;
        state.attendeeListApi.loading = "idle";
      }
    }
  }
});
