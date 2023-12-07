import { Alert } from "react-native"
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { api } from "./api"
import { mapErrors } from "../utils"

export const getConnects = createAsyncThunk("home/getConnects", async () => {
  try {
    const response = await api.getConnects()
    return response.data
  } catch (error) {
    Alert.alert("Error", mapErrors(error))
    throw new Error()
  }
})

export const connectionRequest = createAsyncThunk(
  "home/connectionRequest",
  async payload => {
    try {
      const response = await api.connectionRequest(payload)
      console.log("response, Success", response)
      Alert.alert("Success", response?.data?.message)
      return response.data
    } catch (error) {
      if (error.message === "Network Error") {
        Alert.alert("Failed", "Please check your internet connection")
      }
      Alert.alert("Error", mapErrors(error))
      throw new Error()
    }
  }
)

const initialState = {
  getConnects: {
    entities: {
      data: []
    },
    api: {
      loading: "idle",
      error: null
    }
  },
  connectionRequest: {
    entities: [],
    api: {
      loading: "idle",
      error: null
    }
  }
}
const connectSlice = createSlice({
  name: "connect",
  initialState: initialState,
  reducers: {},
  extraReducers: {
    [getConnects.pending]: state => {
      if (state.getConnects.api.loading === "idle") {
        state.getConnects.api.loading = "pending"
        state.getConnects.api.error = null
      }
    },
    [getConnects.fulfilled]: (state, action) => {
      if (state.getConnects.api.loading === "pending") {
        state.getConnects.entities.data = action.payload
        state.getConnects.api.loading = "idle"
      }
    },
    [getConnects.rejected]: (state, action) => {
      if (state.getConnects.api.loading === "pending") {
        state.getConnects.api.error = action.error
        state.getConnects.api.loading = "idle"
      }
    },

    [connectionRequest.pending]: state => {
      if (state.connectionRequest.api.loading === "idle") {
        state.connectionRequest.api.loading = "pending"
        state.connectionRequest.api.error = null
      }
    },
    [connectionRequest.fulfilled]: (state, action) => {
      if (state.connectionRequest.api.loading === "pending") {
        state.connectionRequest.entities = action.payload.value
        state.connectionRequest.api.loading = "idle"
      }
    },
    [connectionRequest.rejected]: (state, action) => {
      if (state.connectionRequest.api.loading === "pending") {
        state.connectionRequest.api.error = action.error
        state.connectionRequest.api.loading = "idle"
      }
    }
  }
})

export default {
  slice: connectSlice
}
