import { Alert } from "react-native"
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { api } from "./api"
import { mapErrors } from "../utils"

export const getHomeDetails = createAsyncThunk(
  "home/getHomeDetails",
  async () => {
    try {
      const response = await api.getHomeDetails()
      return response.data
    } catch (error) {
      Alert.alert("Error", mapErrors(error))
      throw new Error()
    }
  }
)

const initialState = {
  getHomeDetails: {
    entities: [],
    api: {
      loading: "idle",
      error: null
    }
  }
}
const homeSlice = createSlice({
  name: "home",
  initialState: initialState,
  reducers: {},
  extraReducers: {
    [getHomeDetails.pending]: state => {
      if (state.getHomeDetails.api.loading === "idle") {
        state.getHomeDetails.api.loading = "pending"
        state.getHomeDetails.api.error = null
      }
    },
    [getHomeDetails.fulfilled]: (state, action) => {
      if (state.getHomeDetails.api.loading === "pending") {
        state.getHomeDetails.entities = action.payload
        state.getHomeDetails.api.loading = "idle"
      }
    },
    [getHomeDetails.rejected]: (state, action) => {
      if (state.getHomeDetails.api.loading === "pending") {
        state.getHomeDetails.api.error = action.error
        state.getHomeDetails.api.loading = "idle"
      }
    }
  }
})

export default {
  slice: homeSlice
}
