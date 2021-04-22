import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { api } from "./api"

export const article_read = createAsyncThunk(
  "articles/article_read",
  async ({ id }) => {
    const response = await api.article_read(id)
    return response.data
  }
)

export const article_list = createAsyncThunk(
  "articles/article_list",
  async () => {
    const response = await api.article_list()
    return response.data
  }
)

const initialState = { articles: {}, api: { loading: "idle", error: null } }

export const slice = createSlice({
  name: "articles",
  initialState: initialState,
  reducers: {},
  extraReducers: {
    [article_list.pending]: state => {
      if (state.api.loading === "idle") {
        state.api.loading = "pending"
        state.api.error = null
      }
    },
    [article_list.fulfilled]: (state, action) => {
      if (state.api.loading === "pending") {
        action.payload.map(article => {
          state.articles[article.id] = article
        })
        state.api.loading = "idle"
      }
    },
    [article_list.rejected]: (state, action) => {
      if (state.api.loading === "pending") {
        state.api.error = action.error
        state.api.loading = "idle"
      }
    },
    [article_read.pending]: state => {
      if (state.api.loading === "idle") {
        state.api.loading = "pending"
      }
    },
    [article_read.fulfilled]: (state, action) => {
      if (state.api.loading === "pending") {
        state.articles[action.payload.id] = action.payload
        state.api.loading = "idle"
      }
    },
    [article_read.rejected]: (state, action) => {
      if (state.api.loading === "pending") {
        state.api.error = action.error
        state.api.loading = "idle"
      }
    }
  }
})
