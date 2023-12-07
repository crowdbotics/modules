import { Alert } from "react-native"
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { api } from "./api"
import { mapErrors } from "../utils"

export const getOfferings = createAsyncThunk(
  "home/getOfferings",
  async () => {
    try {
      const response = await api.getOfferings()
      return response.data
    } catch (error) {
      Alert.alert("Error", mapErrors(error))
      throw new Error()
    }
  }
)

const initialState = {
  getOfferings: {
    entities: { data: [] },
    api: {
      loading: "idle",
      error: null
    }
  }
}
const offeringSlice = createSlice({
  name: "offering",
  initialState: initialState,
  reducers: {},
  extraReducers: {
    [getOfferings.pending]: state => {
      if (state.getOfferings.api.loading === "idle") {
        state.getOfferings.api.loading = "pending"
        state.getOfferings.api.error = null
      }
    },
    [getOfferings.fulfilled]: (state, action) => {
      if (state.getOfferings.api.loading === "pending") {
        state.getOfferings.entities.data = action.payload
        state.getOfferings.api.loading = "idle"
      }
    },
    [getOfferings.rejected]: (state, action) => {
      if (state.getOfferings.api.loading === "pending") {
        state.getOfferings.api.error = action.error
        state.getOfferings.api.loading = "idle"
      }
    }
  }
})

export default {
  slice: offeringSlice
}
