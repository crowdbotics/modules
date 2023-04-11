import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "./api";

export const createAppointment = createAsyncThunk(
  "appointment/createAppointment",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await api.createAppointment(payload);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteAppointment = createAsyncThunk(
  "appointment/deleteAppointment",
  async (accessToken, id, { rejectWithValue }) => {
    try {
      const response = await api.deleteAppointment(accessToken, id);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getAppointmentByDate = createAsyncThunk(
  "appointment/getAppointmentByDate",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await api.getAppointmentByDate(payload);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getAllAppointments = createAsyncThunk(
  "appointment/getAllAppointments",
  async (accessToken, { rejectWithValue }) => {
    try {
      const response = await api.getAllAppointments(accessToken);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const createSlackChannel = createAsyncThunk(
  "appointment/createSlackChannel",
  async (accessToken, payload, { rejectWithValue }) => {
    try {
      const response = await api.createSlackChannel(accessToken, payload);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const createGoogleFolder = createAsyncThunk(
  "appointment/createGoogleFolder",
  async (accessToken, payload, { rejectWithValue }) => {
    try {
      const response = await api.createGoogleFolder(accessToken, payload);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const createHubSpotContact = createAsyncThunk(
  "appointment/createHubSpotContact",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await api.createHubSpotContact(payload);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const createHubSpotDeal = createAsyncThunk(
  "appointment/createHubSpotDeal",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await api.createHubSpotDeal(payload);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const initialState = {
  appointmentList: [],
  appointmentByDate: {},
  token: null,
  api: { loading: "idle", error: null }
};
export const slice = createSlice({
  name: "appointment",
  initialState: initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(createAppointment.pending, state => {
        if (state.api.loading === "idle") {
          state.api.loading = "pending";
          state.api.error = null;
        }
      })
      .addCase(createAppointment.fulfilled, (state, action) => {
        if (state.api.loading === "pending") {
          state.api.loading = "idle";
        }
      })
      .addCase(createAppointment.rejected, (state, action) => {
        if (state.api.loading === "pending") {
          state.api.error = action.error;
          state.api.loading = "idle";
        }
      })
      .addCase(deleteAppointment.pending, state => {
        if (state.api.loading === "idle") {
          state.api.loading = "pending";
          state.api.error = null;
        }
      })
      .addCase(deleteAppointment.fulfilled, (state, action) => {
        if (state.api.loading === "pending") {
          state.api.loading = "idle";
        }
      })
      .addCase(deleteAppointment.rejected, (state, action) => {
        if (state.api.loading === "pending") {
          state.api.error = action.error;
          state.api.loading = "idle";
        }
      })
      .addCase(getAppointmentByDate.pending, state => {
        if (state.api.loading === "idle") {
          state.api.loading = "pending";
          state.api.error = null;
        }
      })
      .addCase(getAppointmentByDate.fulfilled, (state, action) => {
        if (state.api.loading === "pending") {
          state.appointmentByDate = action.payload;
          state.api.loading = "idle";
        }
      })
      .addCase(getAppointmentByDate.rejected, (state, action) => {
        if (state.api.loading === "pending") {
          state.api.error = action.error;
          state.api.loading = "idle";
        }
      })
      .addCase(getAllAppointments.pending, state => {
        if (state.api.loading === "idle") {
          state.api.loading = "pending";
          state.api.error = null;
        }
      })
      .addCase(getAllAppointments.fulfilled, (state, action) => {
        if (state.api.loading === "pending") {
          state.appointmentList = action.payload;
          state.api.loading = "idle";
        }
      })
      .addCase(getAllAppointments.rejected, (state, action) => {
        if (state.api.loading === "pending") {
          state.api.error = action.error;
          state.api.loading = "idle";
        }
      })
      .addCase(createSlackChannel.pending, state => {
        if (state.api.loading === "idle") {
          state.api.loading = "pending";
          state.api.error = null;
        }
      })
      .addCase(createSlackChannel.fulfilled, (state, action) => {
        if (state.api.loading === "pending") {
          state.api.loading = "idle";
        }
      })
      .addCase(createSlackChannel.rejected, (state, action) => {
        if (state.api.loading === "pending") {
          state.api.error = action.error;
          state.api.loading = "idle";
        }
      })
      .addCase(createGoogleFolder.pending, state => {
        if (state.api.loading === "idle") {
          state.api.loading = "pending";
          state.api.error = null;
        }
      })
      .addCase(createGoogleFolder.fulfilled, (state, action) => {
        if (state.api.loading === "pending") {
          state.api.loading = "idle";
        }
      })
      .addCase(createGoogleFolder.rejected, (state, action) => {
        if (state.api.loading === "pending") {
          state.api.error = action.error;
          state.api.loading = "idle";
        }
      })
      .addCase(createHubSpotContact.pending, state => {
        if (state.api.loading === "idle") {
          state.api.loading = "pending";
          state.api.error = null;
        }
      })
      .addCase(createHubSpotContact.fulfilled, (state, action) => {
        if (state.api.loading === "pending") {
          state.api.loading = "idle";
        }
      })
      .addCase(createHubSpotContact.rejected, (state, action) => {
        if (state.api.loading === "pending") {
          state.api.error = action.error;
          state.api.loading = "idle";
        }
      })
      .addCase(createHubSpotDeal.pending, state => {
        if (state.api.loading === "idle") {
          state.api.loading = "pending";
          state.api.error = null;
        }
      })
      .addCase(createHubSpotDeal.fulfilled, (state, action) => {
        if (state.api.loading === "pending") {
          state.api.loading = "idle";
        }
      })
      .addCase(createHubSpotDeal.rejected, (state, action) => {
        if (state.api.loading === "pending") {
          state.api.error = action.error;
          state.api.loading = "idle";
        }
      });
  }
});
