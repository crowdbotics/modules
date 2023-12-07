import { Alert } from "react-native"
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { api } from "./api"
import { mapErrors } from "../utils"

export const getSessions = createAsyncThunk("home/getSessions", async () => {
  try {
    const response = await api.getSessions()
    return response.data
  } catch (error) {
    Alert.alert("Error", mapErrors(error))
    throw new Error()
  }
})

const initialState = {
  getSessions: {
    entities: {data: []},
    api: {
      loading: "idle",
      error: null
    }
  }
}
const sessionSlice = createSlice({
  name: "session",
  initialState: initialState,
  reducers: {},
  extraReducers: {
    [getSessions.pending]: state => {
      if (state.getSessions.api.loading === "idle") {
        state.getSessions.api.loading = "pending"
        state.getSessions.api.error = null
      }
    },
    [getSessions.fulfilled]: (state, action) => {
      if (state.getSessions.api.loading === "pending") {
        state.getSessions.entities.data = action.payload
        state.getSessions.api.loading = "idle"
      }
    },
    [getSessions.rejected]: (state, action) => {
      if (state.getSessions.api.loading === "pending") {
        state.getSessions.api.error = action.error
        state.getSessions.api.loading = "idle"
      }
    }
  }
})

export default {
  slice: sessionSlice
}
