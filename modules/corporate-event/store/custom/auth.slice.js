import { Alert } from "react-native"
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { api } from "./api"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { mapErrors } from "../utils"
import EncryptedStorage from 'react-native-encrypted-storage';

export const login = createAsyncThunk("auth/login", async payload => {
  try {
    const response = await api.login(payload)
    await AsyncStorage.setItem("accessToken", response?.data.token)
    return response.data
  } catch (error) {
    if (error.message === "Network Error") {
      Alert.alert("Failed", "Please check your internet connection")
    }
    Alert.alert("Error", mapErrors(error))
    throw new Error()
  }
})

export const logout = createAsyncThunk("auth/logout", async () => {
  try {
    await AsyncStorage.removeItem("accessToken")
    await EncryptedStorage.removeItem("authToken")
    return true
  } catch (error) {
    Alert.alert("Error", mapErrors(error))
    throw new Error()
  }
})

const initialState = {
  login: {
    entities: [],
    api: {
      loading: "idle",
      error: null
    }
  }
}
const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {},
  extraReducers: {
    [login.pending]: state => {
      if (state.login.api.loading === "idle") {
        state.login.api.loading = "pending"
        state.login.api.error = null
      }
    },
    [login.fulfilled]: (state, action) => {
      if (state.login.api.loading === "pending") {
        state.login.entities = action.payload
        state.login.api.loading = "idle"
      }
    },
    [login.rejected]: (state, action) => {
      if (state.login.api.loading === "pending") {
        state.login.api.error = action.error
        state.login.api.loading = "idle"
      }
    },
    [logout.pending]: state => {
      if (state.login.api.loading === "idle") {
        state.login.api.loading = "pending"
        state.login.api.error = null
      }
    },
    [logout.fulfilled]: (state, action) => {
      if (state.login.api.loading === "pending") {
        state.login.entities = []
        state.login.api.loading = "idle"
      }
    },
    [logout.rejected]: (state, action) => {
      if (state.login.api.loading === "pending") {
        state.login.api.error = action.error
        state.login.api.loading = "idle"
      }
    }
  }
})

export default {
  slice: authSlice
}
