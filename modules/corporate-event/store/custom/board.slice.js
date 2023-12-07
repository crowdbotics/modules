import { Alert } from "react-native"
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { api } from "./api"
import { mapErrors } from "../utils"

export const getBoardMembers = createAsyncThunk(
  "home/getBoardMembers",
  async () => {
    try {
      const response = await api.getBoardMembers()
      return response.data
    } catch (error) {
      Alert.alert("Error", mapErrors(error))
      throw new Error()
    }
  }
)

const initialState = {
  getBoardMembers: {
    entities: { data: [] },
    api: {
      loading: "idle",
      error: null
    }
  }
}
const boardSlice = createSlice({
  name: "board",
  initialState: initialState,
  reducers: {},
  extraReducers: {
    [getBoardMembers.pending]: state => {
      if (state.getBoardMembers.api.loading === "idle") {
        state.getBoardMembers.api.loading = "pending"
        state.getBoardMembers.api.error = null
      }
    },
    [getBoardMembers.fulfilled]: (state, action) => {
      if (state.getBoardMembers.api.loading === "pending") {
        state.getBoardMembers.entities.data = action.payload
        state.getBoardMembers.api.loading = "idle"
      }
    },
    [getBoardMembers.rejected]: (state, action) => {
      if (state.getBoardMembers.api.loading === "pending") {
        state.getBoardMembers.api.error = action.error
        state.getBoardMembers.api.loading = "idle"
      }
    }
  }
})

export default {
  slice: boardSlice
}
