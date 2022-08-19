import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "./api";
import { mapErrorMessage, parseDjangoError } from "./errorMessage";


export const loginRequest = createAsyncThunk(
  "user/login",
  async (payload, ) => {
      const response = await api.apiLoginRequest(payload).catch((err) => {
          throw parseDjangoError(err)
      });
      return response.data;
  }
)

export const signupRequest = createAsyncThunk(
  "user/signup",
  async (payload, ) => {
      const response = await api.apiSignupRequest(payload).catch((err) => {
        throw parseDjangoError(err)
    });;
      console.log("signupRequest response", response);
      return response.data;
  }
)


export const profileRequest = createAsyncThunk(
    "user/profileRequest",
    async (payload, ) => {
        const response = await api.apiProfileRequest(payload);
        return response.data;
    }
)

export const setupProfile = createAsyncThunk(
  "user/setupProfile",
  async (payload, ) => {
      const response = await api.apiProfileSetup(payload);
      return response.data;
  }
)

export const userProfileDetails = createAsyncThunk(
    "user/profileDetails",
    async (payload) => {
        const response = await api.apiProfileDetails(payload);
        return response.data;
    }
)

export const allProfilesRequest = createAsyncThunk(
  "user/allProfilesRequest",
  async (payload) => {
      const response = await api.apiAllProfilesRequest(payload);
      return response.data;
  }
)

export const requestMatch = createAsyncThunk(
  "user/requestMatch",
  async (payload) => {
      const response = await api.apiRequestMatch(payload);
      return response.data;
  }
)

export const deniedMatch = createAsyncThunk(
  "user/deniedMatch",
  async (payload) => {
      const response = await api.apiMatchDenied(payload);
      return response.data;
  }
)

export const chatListRequest = createAsyncThunk(
  "chat/chatListRequest",
  async (payload) => {
      const response = await api.apiChatListRequest(payload);
      return response.data;
  }
)

export const getMatchesRequest = createAsyncThunk(
  "user/getMatchesRequest",
  async (payload) => {
      const response = await api.apiGetMatchesRequest(payload);
      return response.data;
  }
)


export const chatDetailsRequest = createAsyncThunk(
  "chat/chatDetailsRequest",
  async (payload) => {
      const response = await api.apiChatDetailsRequest(payload);
      return response.data;
  }
)

export const sendMessageRequest = createAsyncThunk(
  "chat/sendMessageRequest",
  async (payload) => {
      const response = await api.apiSendMessageRequest(payload);
      return response.data;
  }
)

const initialState = {
  token: null,
  user: {},
  myProfile: {},
  userDetails: {},
  allProfiles: {},
  api: { loading: "idle", error: null },
  login: {},
  suggestions: [],
  chatList: [],
  chatDetails: {},
};

export const slice = createSlice({
  name: "App",
  initialState: initialState,
  reducers: {
    setToken: (state, action) => {
        state.token = action.payload;
    },
    getToken: (state) => {
        return state.token;
    }

  },
  extraReducers: {
    [profileRequest.pending]: (state) => {
        if (state.api.loading === "idle") {
          console.log("profileRequest.pending")
          state.api.loading = "pending";
          state.api.error = null;
        }
      },
      [profileRequest.fulfilled]: (state, action) => {
        console.log("profileRequest.fulfilled")
        console.log('fulfilled action', action, 'state', state)
        if (state.api.loading === "pending") {
          state.myProfile = action.payload;
          state.api.loading = "idle";
        }
      },
      [profileRequest.rejected]: (state, action) => {
        console.log("profileRequest.rejected")
        if (state.api.loading === "pending") {
            console.log(action.error)
          state.api.error = mapErrorMessage(action.error);
          state.api.loading = "idle";
        }
      },
      [userProfileDetails.pending]: (state) => {
        if (state.api.loading === "idle") {
          console.log("userProfileDetails.pending")
          state.api.loading = "pending";
          state.api.error = null;
        }
      },
      [userProfileDetails.fulfilled]: (state, action) => {
        console.log('fulfilled action', action, 'state', state)
        if (state.api.loading === "pending") {
          console.log("userProfileDetails.fulfilled")
          state.userDetails = action.payload;
          state.api.loading = "idle";
        }
      },
      [userProfileDetails.rejected]: (state, action) => {
        console.log("userProfileDetails.rejected")
        if (state.api.loading === "pending") {
            console.log(action.error)
          state.api.error = action.error;
          state.api.loading = "idle";
        }
      },
      [allProfilesRequest.pending]: (state) => {
        if (state.api.loading === "idle") {
          console.log("allProfilesRequest.pending")
          state.api.loading = "pending";
          state.api.error = null;
        }
      },
      [allProfilesRequest.fulfilled]: (state, action) => {
        console.log('fulfilled action', action, 'state', state)
        if (state.api.loading === "pending") {
          console.log("allProfilesRequest.fulfilled")
          state.allProfiles = action.payload;
          state.api.loading = "idle";
        }
      },
      [allProfilesRequest.rejected]: (state, action) => {
        console.log("allProfilesRequest.rejected")
        if (state.api.loading === "pending") {
            console.log(action.error)
          state.api.error = action.error;
          state.api.loading = "idle";
        }
      },
      [loginRequest.pending]: (state) => {
        if (state.api.loading === "idle") {
          console.log("loginRequest.pending")
          state.api.loading = "pending";
          state.api.error = null;
        }
      },
      [loginRequest.fulfilled]: (state, action) => {
        console.log('fulfilled action', action, 'state', state)
        if (state.api.loading === "pending") {
          console.log("loginRequest.fulfilled")
          state.user = action.payload.user;
          state.token = action.payload.token;
          state.api.loading = "idle";
        }
      },
      [loginRequest.rejected]: (state, action) => {
        console.log("loginRequest.rejected", mapErrorMessage(action.error))
        if (state.api.loading === "pending") {
            console.log(action.error)
          state.api.error = mapErrorMessage(action.error);
          state.api.loading = "idle";
        }
      },
      [requestMatch.pending]: (state) => {
        if (state.api.loading === "idle") {
          console.log("requestMatch.pending")
          state.api.loading = "pending";
          state.api.error = null;
        }
      },
      [requestMatch.fulfilled]: (state, action) => {
        console.log('fulfilled action', action, 'state', state)
        if (state.api.loading === "pending") {
          console.log("requestMatch.fulfilled")
          state.api.loading = "idle";
        }
      },
      [requestMatch.rejected]: (state, action) => {
        console.log("requestMatch.rejected")
        if (state.api.loading === "pending") {
            console.log(action.error)
          state.api.error = action.error;
          state.api.loading = "idle";
        }
      },
      [deniedMatch.pending]: (state) => {
        if (state.api.loading === "idle") {
          console.log("deniedMatch.pending")
          state.api.loading = "pending";
          state.api.error = null;
        }
      },
      [deniedMatch.fulfilled]: (state, action) => {
        console.log('fulfilled action', action, 'state', state)
        if (state.api.loading === "pending") {
          console.log("deniedMatch.fulfilled")
          state.api.loading = "idle";
        }
      },
      [deniedMatch.rejected]: (state, action) => {
        console.log("deniedMatch.rejected")
        if (state.api.loading === "pending") {
            console.log(action.error)
          state.api.error = action.error;
          state.api.loading = "idle";
        }
      },
      [signupRequest.pending]: (state) => {
        if (state.api.loading === "idle") {
          console.log("signupRequest.pending")
          state.api.loading = "pending";
          state.api.error = null;
        }
      },
      [signupRequest.fulfilled]: (state, action) => {
        console.log('fulfilled action', action, 'state', state)
        if (state.api.loading === "pending") {
          console.log("signupRequest.fulfilled")
          state.user = action.payload.user;
          state.token = action.payload.token;
          state.api.loading = "idle";
        }
      },
      [signupRequest.rejected]: (state, action) => {
        console.log("signupRequest.rejected", state, action)
        if (state.api.loading === "pending") {
            console.log(action.error)
          state.api.error = mapErrorMessage(action.error);
          state.api.loading = "idle";
        }
      },
      [chatListRequest.pending]: (state) => {
        if (state.api.loading === "idle") {
          console.log("chatListRequest.pending")
          state.api.loading = "pending";
          state.api.error = null;
        }
      },
      [chatListRequest.fulfilled]: (state, action) => {
        console.log('fulfilled action', action, 'state', state)
        if (state.api.loading === "pending") {
          console.log("chatListRequest.fulfilled")
          state.chatList = action.payload;
          state.api.loading = "idle";
        }
      },
      [chatListRequest.rejected]: (state, action) => {
        console.log("chatListRequest.rejected")
        if (state.api.loading === "pending") {
            console.log(action.error)
          state.api.error = action.error;
          state.api.loading = "idle";
        }
      },
      [chatDetailsRequest.pending]: (state) => {
        if (state.api.loading === "idle") {
          console.log("chatDetailsRequest.pending")
          state.api.loading = "pending";
          state.api.error = null;
        }
      },
      [chatDetailsRequest.fulfilled]: (state, action) => {
        console.log('fulfilled action', action, 'state', state)
        if (state.api.loading === "pending") {
          console.log("chatDetailsRequest.fulfilled")
          state.chatDetails = action.payload;
          state.api.loading = "idle";
        }
      },
      [chatDetailsRequest.rejected]: (state, action) => {
        console.log("chatDetailsRequest.rejected")
        if (state.api.loading === "pending") {
            console.log(action.error)
          state.api.error = action.error;
          state.api.loading = "idle";
        }
      },
      [sendMessageRequest.pending]: (state) => {
        if (state.api.loading === "idle") {
          console.log("sendMessageRequest.pending")
          state.api.loading = "pending";
          state.api.error = null;
        }
      },
      [sendMessageRequest.fulfilled]: (state, action) => {
        console.log('fulfilled action', action, 'state', state)
        if (state.api.loading === "pending") {
          console.log("sendMessageRequest.fulfilled")
          state.api.loading = "idle";
        }
      },
      [sendMessageRequest.rejected]: (state, action) => {
        console.log("sendMessageRequest.rejected")
        if (state.api.loading === "pending") {
            console.log(action.error)
          state.api.error = action.error;
          state.api.loading = "idle";
        }
      },
  }
});


export const { setToken } = slice.actions;
