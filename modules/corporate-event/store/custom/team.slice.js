import { Alert } from "react-native"
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { api } from "./api"
import { mapErrors } from "../utils"

export const getTeamMembers = createAsyncThunk(
  "home/getTeamMembers",
  async () => {
    try {
      const response = await api.getTeamMembers()
      return response.data
    } catch (error) {
      Alert.alert("Error", mapErrors(error))
      throw new Error()
    }
  }
)

const initialState = {
  getTeamMembers: {
    entities: { data: [] },
    api: {
      loading: "idle",
      error: null
    }
  }
}
const teamSlice = createSlice({
  name: "team",
  initialState: initialState,
  reducers: {},
  extraReducers: {
    [getTeamMembers.pending]: state => {
      if (state.getTeamMembers.api.loading === "idle") {
        state.getTeamMembers.api.loading = "pending"
        state.getTeamMembers.api.error = null
      }
    },
    [getTeamMembers.fulfilled]: (state, action) => {
      if (state.getTeamMembers.api.loading === "pending") {
        state.getTeamMembers.entities.data = action.payload
        state.getTeamMembers.api.loading = "idle"
      }
    },
    [getTeamMembers.rejected]: (state, action) => {
      if (state.getTeamMembers.api.loading === "pending") {
        state.getTeamMembers.api.error = action.error
        state.getTeamMembers.api.loading = "idle"
      }
    }
  }
})

export default {
  slice: teamSlice
}
