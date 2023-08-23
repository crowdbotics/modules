import { Alert } from "react-native";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "./api";
import { mapErrors } from "../utils";

export const createAppointment = createAsyncThunk(
  "Appointments/createAppointment",
  async ({ data, token }) => {
    try {
      const response = await api.createAppointment(data, token);
      return response.data;
    } catch (error) {
      Alert.alert("Error", mapErrors(error));
      throw new Error();
    }
  }
);

export const getAppointment = createAsyncThunk(
  "Appointments/getAppointment",
  async ({ token }) => {
    try {
      const response = await api.getAppointment(token);
      return response.data;
    } catch (error) {
      Alert.alert("Error", mapErrors(error));
      throw new Error();
    }
  }
);

export const deleteAppointment = createAsyncThunk(
  "Appointments/deleteAppointment",
  async ({ id, token }) => {
    try {
      const response = await api.deleteAppointment(id, token);
      return response.data;
    } catch (error) {
      Alert.alert("Error", mapErrors(error));
      throw new Error();
    }
  }
);

export const getAppointmentSessions = createAsyncThunk(
  "Appointments/getAppointmentSessions",
  async ({ token }) => {
    try {
      const response = await api.getAppointmentSessions(token);
      return response.data;
    } catch (error) {
      Alert.alert("Error", mapErrors(error));
      throw new Error();
    }
  }
);

export const getAppointmentTypes = createAsyncThunk(
  "Appointments/getAppointmentTypes",
  async ({ token }) => {
    try {
      const response = await api.getAppointmentTypes(token);
      return response.data;
    } catch (error) {
      Alert.alert("Error", mapErrors(error));
      throw new Error();
    }
  }
);

export const getServiceProviders = createAsyncThunk(
  "Appointments/getServiceProviders",
  async ({ token }) => {
    try {
      const response = await api.getServiceProviders(token);
      return response.data;
    } catch (error) {
      Alert.alert("Error", mapErrors(error));
      throw new Error();
    }
  }
);

const initialState = {
  createAppointment: {
    entities: [],
    api: {
      loading: "idle",
      error: null
    }
  },
  getAppointment: {
    entities: [],
    api: {
      loading: "idle",
      error: null
    }
  },
  deleteAppointment: {
    entities: [],
    api: {
      loading: "idle",
      error: null
    }
  },
  getAppointmentSessions: {
    entities: [],
    api: {
      loading: "idle",
      error: null
    }
  },
  getAppointmentTypes: {
    entities: [],
    api: {
      loading: "idle",
      error: null
    }
  },
  getServiceProviders: {
    entities: [],
    api: {
      loading: "idle",
      error: null
    }
  }
};
export const slice = createSlice({
  name: "appointments",
  initialState: initialState,
  reducers: {},
  extraReducers: {
    [createAppointment.pending]: (state) => {
      if (state.createAppointment.api.loading === "idle") {
        state.createAppointment.api.loading = "pending";
        state.createAppointment.api.error = null;
      }
    },
    [createAppointment.fulfilled]: (state, action) => {
      if (state.createAppointment.api.loading === "pending") {
        state.createAppointment.entities = action.payload.value;
        state.createAppointment.api.loading = "idle";
      }
    },
    [createAppointment.rejected]: (state, action) => {
      if (state.createAppointment.api.loading === "pending") {
        state.createAppointment.api.error = action.error;
        state.createAppointment.api.loading = "idle";
      }
    },
    [getAppointment.pending]: (state) => {
      if (state.getAppointment.api.loading === "idle") {
        state.getAppointment.api.loading = "pending";
        state.getAppointment.api.error = null;
      }
    },
    [getAppointment.fulfilled]: (state, action) => {
      if (state.getAppointment.api.loading === "pending") {
        state.getAppointment.entities = action.payload;
        state.getAppointment.api.loading = "idle";
      }
    },
    [getAppointment.rejected]: (state, action) => {
      if (state.getAppointment.api.loading === "pending") {
        state.getAppointment.api.error = action.error;
        state.getAppointment.api.loading = "idle";
      }
    },
    [deleteAppointment.pending]: (state) => {
      if (state.deleteAppointment.api.loading === "idle") {
        state.deleteAppointment.api.loading = "pending";
        state.deleteAppointment.api.error = null;
      }
    },
    [deleteAppointment.fulfilled]: (state, action) => {
      if (state.deleteAppointment.api.loading === "pending") {
        state.deleteAppointment.entities = action.payload;
        state.deleteAppointment.api.loading = "idle";
      }
    },
    [deleteAppointment.rejected]: (state, action) => {
      if (state.deleteAppointment.api.loading === "pending") {
        state.deleteAppointment.api.error = action.error;
        state.deleteAppointment.api.loading = "idle";
      }
    },
    [getAppointmentSessions.pending]: (state) => {
      if (state.getAppointmentSessions.api.loading === "idle") {
        state.getAppointmentSessions.api.loading = "pending";
        state.getAppointmentSessions.api.error = null;
      }
    },
    [getAppointmentSessions.fulfilled]: (state, action) => {
      if (state.getAppointmentSessions.api.loading === "pending") {
        state.getAppointmentSessions.entities = action.payload.map((item) => {
          return { label: item.type, value: item.id };
        });
        state.getAppointmentSessions.api.loading = "idle";
      }
    },
    [getAppointmentSessions.rejected]: (state, action) => {
      if (state.getAppointmentSessions.api.loading === "pending") {
        state.getAppointmentSessions.api.error = action.error;
        state.getAppointmentSessions.api.loading = "idle";
      }
    },
    [getAppointmentTypes.pending]: (state) => {
      if (state.getAppointmentTypes.api.loading === "idle") {
        state.getAppointmentTypes.api.loading = "pending";
        state.getAppointmentTypes.api.error = null;
      }
    },
    [getAppointmentTypes.fulfilled]: (state, action) => {
      if (state.getAppointmentTypes.api.loading === "pending") {
        state.getAppointmentTypes.entities = action.payload.map((item) => {
          return { label: item.meeting_type, value: item.id };
        });
        state.getAppointmentTypes.api.loading = "idle";
      }
    },
    [getAppointmentTypes.rejected]: (state, action) => {
      if (state.getAppointmentTypes.api.loading === "pending") {
        state.getAppointmentTypes.api.error = action.error;
        state.getAppointmentTypes.api.loading = "idle";
      }
    },
    [getServiceProviders.pending]: (state) => {
      if (state.getServiceProviders.api.loading === "idle") {
        state.getServiceProviders.api.loading = "pending";
        state.getServiceProviders.api.error = null;
      }
    },
    [getServiceProviders.fulfilled]: (state, action) => {
      if (state.getServiceProviders.api.loading === "pending") {
        state.getServiceProviders.entities = action.payload.map((item) => {
          return { label: item.name, value: item.id };
        });
        state.getServiceProviders.api.loading = "idle";
      }
    },
    [getServiceProviders.rejected]: (state, action) => {
      if (state.getServiceProviders.api.loading === "pending") {
        state.getServiceProviders.api.error = action.error;
        state.getServiceProviders.api.loading = "idle";
      }
    }
  }
});
