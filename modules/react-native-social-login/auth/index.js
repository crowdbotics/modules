import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { mapErrorMessage } from "../utils";
import { api } from "./api";

export const loginRequest = createAsyncThunk(
  "login/loginRequest",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await api.apiLoginRequest(payload);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const signupRequest = createAsyncThunk(
  "login/signupRequest",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await api.apiSignupRequest(payload);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const logoutRequest = createAsyncThunk(
  "login/logoutRequest",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await api.apiLogoutRequest(payload);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getAuthUser = createAsyncThunk(
  "login/getAuthUser",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await api.apiAuthUserRequest(payload);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const resetPassword = createAsyncThunk(
  "login/resetPassword",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await api.apiResetPasswordRequest(payload);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const facebookLogin = createAsyncThunk(
  "login/facebookLogin",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await api.apiFacebookLogin(payload);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const googleLogin = createAsyncThunk(
  "login/googleLogin",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await api.apiGoogleLogin(payload);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const appleLogin = createAsyncThunk(
  "login/appleLogin",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await api.apiAppleLogin(payload);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
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
  extraReducers: (builder) => {
    builder
      .addCase(loginRequest.pending, (state) => {
        if (state.api.loading === "idle") {
          state.api.loading = "pending";
          state.api.error = null;
        }
      })
      .addCase(loginRequest.fulfilled, (state, action) => {
        if (state.api.loading === "pending") {
          state.token = action.payload.token;
          state.user = action.payload.user;
          state.api.loading = "idle";
        }
      })
      .addCase(loginRequest.rejected, (state, action) => {
        if (state.api.loading === "pending") {
          state.api.error = mapErrorMessage(action.error);
          state.api.loading = "idle";
        }
      })
      .addCase(signupRequest.pending, (state) => {
        if (state.api.loading === "idle") {
          state.api.loading = "pending";
          state.api.error = null;
          state.token = null;
        }
      })
      .addCase(signupRequest.fulfilled, (state, action) => {
        if (state.api.loading === "pending") {
          state.user = action.payload;
          state.api.loading = "idle";
        }
      })
      .addCase(signupRequest.rejected, (state, action) => {
        if (state.api.loading === "pending") {
          state.api.error = mapErrorMessage(action.error);
          state.api.loading = "idle";
        }
      })
      .addCase(logoutRequest.pending, (state) => {
        if (state.api.loading === "idle") {
          state.api.loading = "pending";
          state.api.error = null;
        }
      })
      .addCase(logoutRequest.fulfilled, (state) => {
        if (state.api.loading === "pending") {
          state.api.loading = "idle";
          return initialState;
        }
      })
      .addCase(logoutRequest.rejected, (state, action) => {
        if (state.api.loading === "pending") {
          state.api.error = mapErrorMessage(action.error);
          state.api.loading = "idle";
        }
      })
      .addCase(getAuthUser.pending, (state) => {
        if (state.api.loading === "idle") {
          state.api.loading = "pending";
          state.api.error = null;
        }
      })
      .addCase(getAuthUser.fulfilled, (state, action) => {
        if (state.api.loading === "pending") {
          state.user = action.payload;
          state.api.loading = "idle";
          state.api.error = null;
        }
      })
      .addCase(getAuthUser.rejected, (state, action) => {
        if (state.api.loading === "pending") {
          state.api.error = mapErrorMessage(action.error);
          state.api.loading = "idle";
        }
      })
      .addCase(resetPassword.pending, (state) => {
        if (state.api.loading === "idle") {
          state.api.loading = "pending";
          state.api.error = null;
        }
      })
      .addCase(resetPassword.fulfilled, (state, action) => {
        if (state.api.loading === "pending") {
          state.user = action.payload;
          state.api.loading = "idle";
          state.api.error = null;
        }
      })
      .addCase(resetPassword.rejected, (state, action) => {
        if (state.api.loading === "pending") {
          state.api.error = mapErrorMessage(action.error);
          state.api.loading = "idle";
        }
      })
      .addCase(facebookLogin.pending, (state) => {
        if (state.api.loading === "idle") {
          state.api.loading = "pending";
          state.api.error = null;
        }
      })
      .addCase(facebookLogin.fulfilled, (state, action) => {
        if (state.api.loading === "pending") {
          state.user = action.payload.user;
          state.token = action.payload.key;
          state.api.loading = "idle";
          state.api.error = null;
        }
      })
      .addCase(facebookLogin.rejected, (state, action) => {
        if (state.api.loading === "pending") {
          state.api.error = mapErrorMessage(action.error);
          state.api.loading = "idle";
        }
      })
      .addCase(googleLogin.pending, (state) => {
        if (state.api.loading === "idle") {
          state.api.loading = "pending";
          state.api.error = null;
        }
      })
      .addCase(googleLogin.fulfilled, (state, action) => {
        if (state.api.loading === "pending") {
          state.user = action.payload.user;
          state.token = action.payload.key;
          state.api.loading = "idle";
          state.api.error = null;
        }
      })
      .addCase(googleLogin.rejected, (state, action) => {
        if (state.api.loading === "pending") {
          state.api.error = mapErrorMessage(action.error);
          state.api.loading = "idle";
        }
      })
      .addCase(appleLogin.pending, (state) => {
        if (state.api.loading === "idle") {
          state.api.loading = "pending";
          state.api.error = null;
        }
      })
      .addCase(appleLogin.fulfilled, (state, action) => {
        if (state.api.loading === "pending") {
          state.user = action.payload.user;
          state.token = action.payload.key;
          state.api.loading = "idle";
          state.api.error = null;
        }
      })
      .addCase(appleLogin.rejected, (state, action) => {
        if (state.api.loading === "pending") {
          state.api.error = mapErrorMessage(action.error);
          state.api.loading = "idle";
        }
      });
  }
});
