import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import constants from "../constants";
import { api } from "./api";

const FAQ_LIST = "FAQ_LIST";


export const faqList = createAsyncThunk(
  FAQ_LIST,
  async (param) => {
    const response = await api.faqList(param.baseUrl, param.page);
    return response.data;
  }
);

const initialState = { faq: {}, api: { loading: constants.LOADING_IDLE, error: null } };

export const slice = createSlice({
  name: "faq",
  initialState: initialState,
  reducers: {},
  extraReducers: {
    [faqList.pending]: (state) => {
      if (state.api.loading === constants.LOADING_IDLE) {
        state.api.loading = constants.LOADING_PENDING;
        state.api.error = null;
      }
    },
    [faqList.fulfilled]: (state, action) => {
      if (state.api.loading === constants.LOADING_PENDING) {
        // adding the previous FAQ list for pagination purpose
        if (action.payload?.previous) {
          action.payload.results = [...state.faq.results, ...action.payload.results];
        }
        state.faq = action.payload;
        state.api.loading = constants.LOADING_IDLE;
      }
    },
    [faqList.rejected]: (state, action) => {
      if (state.api.loading === constants.LOADING_PENDING) {
        state.api.error = action.error;
        state.api.loading = constants.LOADING_IDLE;
      }
    },
  }
});
