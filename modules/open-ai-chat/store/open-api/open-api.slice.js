import { Alert } from "react-native";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "./api";

export const getMessages = createAsyncThunk("home/getMessages", async () => {
  try {
    const response = await api.getMessages();
    return response.data;
  } catch (error) {
    throw new Error();
  }
});

export const sendMessage = createAsyncThunk(
  "home/sendMessage",
  async payload => {
    try {
      const response = await api.sendMessage(payload);
      console.log("response, Success", response);
      Alert.alert("Success", response?.data?.message);
      return response.data;
    } catch (error) {
      if (error.message === "Network Error") {
        Alert.alert("Failed", "Please check your internet connection");
      }
      throw new Error();
    }
  }
);

const initialState = {
  getMessages: {
    entities: {
      data: []
    },
    api: {
      loading: "idle",
      error: null
    }
  },
  sendMessage: {
    entities: [],
    api: {
      loading: "idle",
      error: null
    }
  }
};
const openAPIChatSlice = createSlice({
  name: "openAPIchat",
  initialState: initialState,
  reducers: {},
  extraReducers: {
    [getMessages.pending]: state => {
      if (state.getMessages.api.loading === "idle") {
        state.getMessages.api.loading = "pending";
        state.getMessages.api.error = null;
      }
    },
    [getMessages.fulfilled]: (state, action) => {
      if (state.getMessages.api.loading === "pending") {
        state.getMessages.entities.data = action.payload;
        state.getMessages.api.loading = "idle";
      }
    },
    [getMessages.rejected]: (state, action) => {
      if (state.getMessages.api.loading === "pending") {
        state.getMessages.api.error = action.error;
        state.getMessages.api.loading = "idle";
      }
    },

    [sendMessage.pending]: state => {
      if (state.sendMessage.api.loading === "idle") {
        state.sendMessage.api.loading = "pending";
        state.sendMessage.api.error = null;
      }
    },
    [sendMessage.fulfilled]: (state, action) => {
      if (state.sendMessage.api.loading === "pending") {
        state.sendMessage.entities = action.payload.value;
        state.sendMessage.api.loading = "idle";
      }
    },
    [sendMessage.rejected]: (state, action) => {
      if (state.sendMessage.api.loading === "pending") {
        state.sendMessage.api.error = action.error;
        state.sendMessage.api.loading = "idle";
      }
    }
  }
});

export default {
  slice: openAPIChatSlice
};
