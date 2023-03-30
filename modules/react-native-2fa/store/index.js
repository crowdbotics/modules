import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "./api";

export const getUser = createAsyncThunk(
  "login/getUser",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await api.getUser(payload);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getCode = createAsyncThunk(
  "login/getCode",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await api.getCode(payload);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const sendVerification = createAsyncThunk(
  "login/sendVerification",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await api.sendVerification(payload);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const verifyCode = createAsyncThunk(
  "login/verifyCode",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await api.verifyCode(payload);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const verify2FA = createAsyncThunk(
  "login/verify2FA",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await api.verify2FA(payload);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const set2faMethod = createAsyncThunk(
  "login/set2faMethod",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await api.set2faMethod(payload);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const initialState = {
  token: null,
  user: {},
  otpCode: {},
  api: { loading: "idle", error: null }
};
export const slice = createSlice({
  name: "login",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUser.pending, (state) => {
        if (state.api.loading === "idle") {
          state.api.loading = "pending";
          state.api.error = null;
        }
      })
      .addCase(getUser.fulfilled, (state, action) => {
        if (state.api.loading === "pending") {
          state.user = action.payload;
          state.api.loading = "idle";
        }
      })
      .addCase(getUser.rejected, (state, action) => {
        if (state.api.loading === "pending") {
          state.api.error = action.error;
          state.api.loading = "idle";
        }
      })
      .addCase(getCode.pending, (state) => {
        if (state.api.loading === "idle") {
          state.api.loading = "pending";
          state.api.error = null;
        }
      })
      .addCase(getCode.fulfilled, (state, action) => {
        if (state.api.loading === "pending") {
          state.otpCode = action.payload;
          state.api.loading = "idle";
        }
      })
      .addCase(getCode.rejected, (state, action) => {
        if (state.api.loading === "pending") {
          state.api.error = action.error;
          state.api.loading = "idle";
        }
      })
      .addCase(sendVerification.pending, (state) => {
        if (state.api.loading === "idle") {
          state.api.loading = "pending";
          state.api.error = null;
        }
      })
      .addCase(sendVerification.fulfilled, (state, action) => {
        if (state.api.loading === "pending") {
          state.api.loading = "idle";
        }
      })
      .addCase(sendVerification.rejected, (state, action) => {
        if (state.api.loading === "pending") {
          state.api.error = action.error;
          state.api.loading = "idle";
        }
      })
      .addCase(verifyCode.pending, (state) => {
        if (state.api.loading === "idle") {
          state.api.loading = "pending";
          state.api.error = null;
        }
      })
      .addCase(verifyCode.fulfilled, (state, action) => {
        if (state.api.loading === "pending") {
          state.api.loading = "idle";
        }
      })
      .addCase(verifyCode.rejected, (state, action) => {
        if (state.api.loading === "pending") {
          state.api.error = action.error;
          state.api.loading = "idle";
        }
      })
      .addCase(verify2FA.pending, (state) => {
        if (state.api.loading === "idle") {
          state.api.loading = "pending";
          state.api.error = null;
        }
      })
      .addCase(verify2FA.fulfilled, (state, action) => {
        if (state.api.loading === "pending") {
          state.api.loading = "idle";
        }
      })
      .addCase(verify2FA.rejected, (state, action) => {
        if (state.api.loading === "pending") {
          state.api.error = action.error;
          state.api.loading = "idle";
        }
      })
      .addCase(set2faMethod.pending, (state) => {
        if (state.api.loading === "idle") {
          state.api.loading = "pending";
          state.api.error = null;
        }
      })
      .addCase(set2faMethod.fulfilled, (state, action) => {
        if (state.api.loading === "pending") {
          state.api.loading = "idle";
        }
      })
      .addCase(set2faMethod.rejected, (state, action) => {
        if (state.api.loading === "pending") {
          state.api.error = action.error;
          state.api.loading = "idle";
        }
      });
  }
});
