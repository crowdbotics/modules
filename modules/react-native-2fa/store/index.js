import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "./api";
import { Alert } from "react-native";
import { mapErrors } from "../utils";

export const sendVerification = createAsyncThunk(
  "authentication/sendverification",
  async (data) => {
    try {
      const response = await api.sendVerification(data);
      return response.data;
    } catch (error) {
      Alert.alert("Error", mapErrors(error));
      throw new Error();
    }
  }
);

export const getGoogleAuthenticatorQR = createAsyncThunk(
  "authentication/getGoogleAuthenticatorQR",
  async () => {
    try {
      const response = await api.getGoogleAuthenticatorQR();
      return response.data;
    } catch (error) {
      Alert.alert("Error", mapErrors(error));
      throw new Error();
    }
  }
);

export const verifyCode = createAsyncThunk(
  "authentication/verifyCode",
  async (data) => {
    try {
      const response = await api.verifyCode(data);
      return response.data;
    } catch (error) {
      Alert.alert("Error", mapErrors(error));
      throw new Error();
    }
  }
);

export const enableAuthentication = createAsyncThunk(
  "authentication/enableAuthentication",
  async (data) => {
    try {
      const response = await api.enableAuthentication(data);
      return response.data;
    } catch (error) {
      Alert.alert("Error", mapErrors(error));
      throw new Error();
    }
  }
);

export const verifyEnableAuthenticationCode = createAsyncThunk(
  "authentication/verifyEnableAuthenticationCode",
  async (data) => {
    try {
      const response = await api.verifyEnableAuthenticationCode(data);
      return response.data;
    } catch (error) {
      Alert.alert("Error", mapErrors(error));
      throw new Error();
    }
  }
);

export const checkAuthenticationStatus = createAsyncThunk(
  "authentication/checkAuthenticationStatus",
  async () => {
    try {
      const response = await api.checkAuthenticationStatus();
      return response.data;
    } catch (error) {
      throw new Error();
    }
  }
);

export const disableAuthenticationStatus = createAsyncThunk(
  "authentication/disableAuthenticationStatus",
  async () => {
    try {
      const response = await api.disableAuthenticationStatus();
      return response.data;
    } catch (error) {
      Alert.alert("Error", mapErrors(error));
      throw new Error();
    }
  }
);

const initialState = {
  sendVerification: { api: { loading: "idle", error: null }, entities: {} },
  getGoogleAuthenticatorQR: {
    api: { loading: "idle", error: null },
    entities: {}
  },
  verifyCode: {
    api: { loading: "idle", error: null },
    entities: {}
  },
  enableAuthentication: {
    api: { loading: "idle", error: null },
    entities: {}
  },
  verifyEnableAuthenticationCode: {
    api: { loading: "idle", error: null },
    entities: {}
  },
  checkAuthenticationStatus: {
    api: { loading: "idle", error: null },
    entities: {}
  },
  disableAuthenticationStatus: {
    api: { loading: "idle", error: null },
    entities: {}
  }
};

export const slice = createSlice({
  name: "authentication",
  initialState: initialState,
  reducers: {},
  extraReducers: {
    [sendVerification.pending]: (state) => {
      if (state.sendVerification.api.loading === "idle") {
        state.sendVerification.api.loading = "pending";
      }
    },
    [sendVerification.fulfilled]: (state, action) => {
      if (state.sendVerification.api.loading === "pending") {
        state.sendVerification.entities = action.payload;
        state.sendVerification.api.loading = "idle";
      }
    },
    [sendVerification.rejected]: (state, action) => {
      if (state.sendVerification.api.loading === "pending") {
        state.sendVerification.api.error = action.error;
        state.sendVerification.api.loading = "idle";
      }
    },
    [getGoogleAuthenticatorQR.pending]: (state) => {
      if (state.getGoogleAuthenticatorQR.api.loading === "idle") {
        state.getGoogleAuthenticatorQR.api.loading = "pending";
      }
    },
    [getGoogleAuthenticatorQR.fulfilled]: (state, action) => {
      if (state.getGoogleAuthenticatorQR.api.loading === "pending") {
        state.getGoogleAuthenticatorQR.entities = action.payload;
        state.getGoogleAuthenticatorQR.api.loading = "idle";
      }
    },
    [getGoogleAuthenticatorQR.rejected]: (state, action) => {
      if (state.getGoogleAuthenticatorQR.api.loading === "pending") {
        state.getGoogleAuthenticatorQR.api.error = action.error;
        state.getGoogleAuthenticatorQR.api.loading = "idle";
      }
    },
    [verifyCode.pending]: (state) => {
      if (state.verifyCode.api.loading === "idle") {
        state.verifyCode.api.loading = "pending";
      }
    },
    [verifyCode.fulfilled]: (state, action) => {
      if (state.verifyCode.api.loading === "pending") {
        state.verifyCode.entities = action.payload;
        state.verifyCode.api.loading = "idle";
      }
    },
    [verifyCode.rejected]: (state, action) => {
      if (state.verifyCode.api.loading === "pending") {
        state.verifyCode.api.error = action.error;
        state.verifyCode.api.loading = "idle";
      }
    },
    [enableAuthentication.pending]: (state) => {
      if (state.enableAuthentication.api.loading === "idle") {
        state.enableAuthentication.api.loading = "pending";
      }
    },
    [enableAuthentication.fulfilled]: (state, action) => {
      if (state.enableAuthentication.api.loading === "pending") {
        state.enableAuthentication.entities = action.payload;
        state.enableAuthentication.api.loading = "idle";
      }
    },
    [enableAuthentication.rejected]: (state, action) => {
      if (state.enableAuthentication.api.loading === "pending") {
        state.enableAuthentication.api.error = action.error;
        state.enableAuthentication.api.loading = "idle";
      }
    },
    [verifyEnableAuthenticationCode.pending]: (state) => {
      if (state.verifyEnableAuthenticationCode.api.loading === "idle") {
        state.verifyEnableAuthenticationCode.api.loading = "pending";
      }
    },
    [verifyEnableAuthenticationCode.fulfilled]: (state, action) => {
      if (state.verifyEnableAuthenticationCode.api.loading === "pending") {
        state.verifyEnableAuthenticationCode.entities = action.payload;
        state.verifyEnableAuthenticationCode.api.loading = "idle";
      }
    },
    [verifyEnableAuthenticationCode.rejected]: (state, action) => {
      if (state.verifyEnableAuthenticationCode.api.loading === "pending") {
        state.verifyEnableAuthenticationCode.api.error = action.error;
        state.verifyEnableAuthenticationCode.api.loading = "idle";
      }
    },
    [checkAuthenticationStatus.pending]: (state) => {
      if (state.checkAuthenticationStatus.api.loading === "idle") {
        state.checkAuthenticationStatus.api.loading = "pending";
      }
    },
    [checkAuthenticationStatus.fulfilled]: (state, action) => {
      if (state.checkAuthenticationStatus.api.loading === "pending") {
        state.checkAuthenticationStatus.entities = action.payload;
        state.checkAuthenticationStatus.api.loading = "idle";
      }
    },
    [checkAuthenticationStatus.rejected]: (state, action) => {
      if (state.checkAuthenticationStatus.api.loading === "pending") {
        state.checkAuthenticationStatus.api.error = action.error;
        state.checkAuthenticationStatus.api.loading = "idle";
      }
    },
    [disableAuthenticationStatus.pending]: (state) => {
      if (state.disableAuthenticationStatus.api.loading === "idle") {
        state.disableAuthenticationStatus.api.loading = "pending";
      }
    },
    [disableAuthenticationStatus.fulfilled]: (state, action) => {
      if (state.disableAuthenticationStatus.api.loading === "pending") {
        state.disableAuthenticationStatus.entities = action.payload;
        state.disableAuthenticationStatus.api.loading = "idle";
      }
    },
    [disableAuthenticationStatus.rejected]: (state, action) => {
      if (state.disableAuthenticationStatus.api.loading === "pending") {
        state.disableAuthenticationStatus.api.error = action.error;
        state.disableAuthenticationStatus.api.loading = "idle";
      }
    }
  }
});
