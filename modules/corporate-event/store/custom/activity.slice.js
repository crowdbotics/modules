import { Alert } from "react-native"
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { api } from "./api"
import { mapErrors } from "../utils"

export const getActivities = createAsyncThunk(
  "home/getActivities",
  async () => {
    try {
      const response = await api.getActivities()
      return response.data
    } catch (error) {
      Alert.alert("Error", mapErrors(error))
      throw new Error()
    }
  }
)

const initialState = {
  getActivities: {
    entities: { data: [] },
    api: {
      loading: "idle",
      error: null
    }
  }
}
const activitySlice = createSlice({
  name: "activity",
  initialState: initialState,
  reducers: {},
  extraReducers: {
    [getActivities.pending]: state => {
      if (state.getActivities.api.loading === "idle") {
        state.getActivities.api.loading = "pending"
        state.getActivities.api.error = null
      }
    },
    [getActivities.fulfilled]: (state, action) => {
      if (state.getActivities.api.loading === "pending") {
        state.getActivities.entities.data = action.payload
        state.getActivities.api.loading = "idle"
      }
    },
    [getActivities.rejected]: (state, action) => {
      if (state.getActivities.api.loading === "pending") {
        state.getActivities.api.error = action.error
        state.getActivities.api.loading = "idle"
      }
    }
  }
})

export default {
  slice: activitySlice
}
