import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { mapErrorMessage } from "./utils";
import { api } from "./api";

export const loginRequest = createAsyncThunk(
  "login/loginRequest",
  async (payload) => {
    const response = await api.apiLoginRequest(payload);
    return response.data;
  }
);

export const signupRequest = createAsyncThunk(
  "login/signupRequest",
  async (payload) => {
    const response = await api.apiSignupRequest(payload);
    return response.data;
  }
);

export const logoutRequest = createAsyncThunk(
  "login/logoutRequest",
  async (payload) => {
    const response = await api.apiLogoutRequest(payload);
    return response.data;
  }
);

export const getAuthUser = createAsyncThunk(
  "login/getAuthUser",
  async (payload) => {
    const response = await api.apiAuthUserRequest(payload);
    return response.data;
  }
);
export const resetPassword = createAsyncThunk(
  "login/resetPassword",
  async (payload) => {
    const response = await api.apiResetPasswordRequest(payload);
    return response.data;
  }
);

export const facebookLogin = createAsyncThunk(
  "login/facebookLogin",
  async (payload) => {
    const response = await api.apiFacebookLogin(payload);
    return response.data;
  }
);

export const googleLogin = createAsyncThunk(
  "login/googleLogin",
  async (payload) => {
    const response = await api.apiGoogleLogin(payload);
    return response.data;
  }
);
export const appleLogin = createAsyncThunk(
  "login/appleLogin",
  async (payload) => {
    const response = await api.apiAppleLogin(payload);
    return response.data;
  }
);

const initialState = {
  token: null,
  user: {},
  api: { loading: "idle", error: null }
};
export const slice = createSlice({
  name: "login",
  initialState: initialState,
  reducers: {},
  extraReducers: {
    [loginRequest.pending]: (state) => {
      if (state.api.loading === "idle") {
        state.api.loading = "pending";
        state.api.error = null;
      }
    },
    [loginRequest.fulfilled]: (state, action) => {
      if (state.api.loading === "pending") {
        state.token = action.payload.token;
        state.user = action.payload.user;
        state.api.loading = "idle";
      }
    },
    [loginRequest.rejected]: (state, action) => {
      if (state.api.loading === "pending") {
        state.api.error = mapErrorMessage(action.error);
        state.api.loading = "idle";
      }
    },

    [signupRequest.pending]: (state) => {
      if (state.api.loading === "idle") {
        state.api.loading = "pending";
        state.api.error = null;
        state.token = null;
      }
    },
    [signupRequest.fulfilled]: (state, action) => {
      if (state.api.loading === "pending") {
        state.user = action.payload;
        state.api.loading = "idle";
      }
    },
    [signupRequest.rejected]: (state, action) => {
      if (state.api.loading === "pending") {
        state.api.error = mapErrorMessage(action.error);
        state.api.loading = "idle";
      }
    },

    [logoutRequest.pending]: (state) => {
      if (state.api.loading === "idle") {
        state.api.loading = "pending";
        state.api.error = null;
      }
    },
    [logoutRequest.fulfilled]: (state) => {
      if (state.api.loading === "pending") {
        return initialState;
      }
    },
    [logoutRequest.rejected]: (state, action) => {
      if (state.api.loading === "pending") {
        state.api.error = mapErrorMessage(action.error);
        state.api.loading = "idle";
      }
    },
    [getAuthUser.pending]: (state) => {
      if (state.api.loading === "idle") {
        state.api.loading = "pending";
        state.api.error = null;
      }
    },
    [getAuthUser.fulfilled]: (state, action) => {
      if (state.api.loading === "pending") {
        state.user = action.payload;
        state.api.loading = "idle";
        state.api.error = null;
      }
    },
    [getAuthUser.rejected]: (state, action) => {
      if (state.api.loading === "pending") {
        state.api.error = mapErrorMessage(action.error);
        state.api.loading = "idle";
      }
    },

    [resetPassword.pending]: (state) => {
      if (state.api.loading === "idle") {
        state.api.loading = "pending";
        state.api.error = null;
      }
    },
    [resetPassword.fulfilled]: (state, action) => {
      if (state.api.loading === "pending") {
        state.user = action.payload;
        state.api.loading = "idle";
        state.api.error = null;
      }
    },
    [resetPassword.rejected]: (state, action) => {
      if (state.api.loading === "pending") {
        state.api.error = mapErrorMessage(action.error);
        state.api.loading = "idle";
      }
    },
    [facebookLogin.pending]: (state) => {
      if (state.api.loading === "idle") {
        state.api.loading = "pending";
        state.api.error = null;
      }
    },
    [facebookLogin.fulfilled]: (state, action) => {
      if (state.api.loading === "pending") {
        state.user = action.payload.user;
        state.token = action.payload.key;
        state.api.error = null;
      }
    },
    [facebookLogin.rejected]: (state, action) => {
      if (state.api.loading === "pending") {
        state.api.error = mapErrorMessage(action.error);
        state.api.loading = "idle";
      }
    },
    [googleLogin.pending]: (state) => {
      if (state.api.loading === "idle") {
        state.api.loading = "pending";
        state.api.error = null;
      }
    },
    [googleLogin.fulfilled]: (state, action) => {
      if (state.api.loading === "pending") {
        state.user = action.payload.user;
        state.token = action.payload.key;
        state.api.error = null;
      }
    },
    [googleLogin.rejected]: (state, action) => {
      if (state.api.loading === "pending") {
        state.api.error = mapErrorMessage(action.error);
        state.api.loading = "idle";
      }
    },
    [appleLogin.pending]: (state) => {
      if (state.api.loading === "idle") {
        state.api.loading = "pending";
        state.api.error = null;
      }
    },
    [appleLogin.fulfilled]: (state, action) => {
      if (state.api.loading === "pending") {
        state.user = action.payload.user;
        state.token = action.payload.key;
        state.api.error = null;
      }
    },
    [appleLogin.rejected]: (state, action) => {
      if (state.api.loading === "pending") {
        state.api.error = mapErrorMessage(action.error);
        state.api.loading = "idle";
      }
    }
  }
});
