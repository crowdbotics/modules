import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "./api";
import { Alert } from "react-native";
import { mapErrors } from "../utils";

export const createReport = createAsyncThunk(
  "FlagUserContent/createReport",
  async (payload) => {
    try {
      const response = await api.createReport(payload);
      if (payload.reason === 10) {
        Alert.alert("Success", "User successfully blocked!");
      } else {
        Alert.alert("Successfully reported!");
      }
      return response.data;
    } catch (error) {
      Alert.alert("Error", mapErrors(error));
      throw new Error();
    }
  }
);

export const getChoices = createAsyncThunk(
  "FlagUserContent/getChoices",
  async () => {
    try {
      const response = await api.getChoices();
      return response.data;
    } catch (error) {
      Alert.alert("Error", mapErrors(error));
      throw new Error();
    }
  }
);

export const getReportedList = createAsyncThunk(
  "FlagUserContent/getReportedList",
  async () => {
    try {
      const response = await api.getReportedList();
      return response.data;
    } catch (error) {
      Alert.alert("Error", mapErrors(error));
      throw new Error();
    }
  }
);

const initialState = {
  createReport: {
    entities: [],
    api: {
      loading: "idle",
      error: null
    }
  },
  getChoices: {
    entities: [],
    api: {
      loading: "idle",
      error: null
    }
  },
  getReportedList: {
    entities: [],
    api: {
      loading: "idle",
      error: null
    }
  }
};

export const slice = createSlice({
  name: "FlagUserContent",
  initialState: initialState,
  reducers: {},
  extraReducers: {
    [createReport.pending]: (state) => {
      if (state.createReport.api.loading === "idle") {
        state.createReport.api.loading = "pending";
        state.createReport.api.error = null;
      }
    },
    [createReport.fulfilled]: (state, action) => {
      if (state.createReport.api.loading === "pending") {
        state.createReport.entities = action.payload.value;
        state.createReport.api.loading = "idle";
      }
    },
    [createReport.rejected]: (state, action) => {
      if (state.createReport.api.loading === "pending") {
        state.createReport.api.error = action.error;
        state.createReport.api.loading = "idle";
      }
    },

    [getChoices.pending]: (state) => {
      if (state.getChoices.api.loading === "idle") {
        state.getChoices.api.loading = "pending";
        state.getChoices.api.error = null;
      }
    },
    [getChoices.fulfilled]: (state, action) => {
      if (state.getChoices.api.loading === "pending") {
        state.getChoices.entities = action.payload;
        state.getChoices.api.loading = "idle";
      }
    },
    [getChoices.rejected]: (state, action) => {
      if (state.getChoices.api.loading === "pending") {
        state.getChoices.api.error = action.error;
        state.getChoices.api.loading = "idle";
      }
    },

    [getReportedList.pending]: (state) => {
      if (state.getReportedList.api.loading === "idle") {
        state.getReportedList.api.loading = "pending";
        state.getReportedList.api.error = null;
      }
    },
    [getReportedList.fulfilled]: (state, action) => {
      if (state.getReportedList.api.loading === "pending") {
        state.getReportedList.entities = action.payload;
        state.getReportedList.api.loading = "idle";
      }
    },
    [getReportedList.rejected]: (state, action) => {
      if (state.getReportedList.api.loading === "pending") {
        state.getReportedList.api.error = action.error;
        state.getReportedList.api.loading = "idle";
      }
    }
  }
});
