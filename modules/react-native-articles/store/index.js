import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "./api";

export const articleRead = createAsyncThunk(
  "articles/articleRead",
  async ({ id }) => {
    const response = await api.articleRead(id);
    return response.data;
  }
);

export const articleList = createAsyncThunk(
  "articles/articleList",
  async () => {
    const response = await api.articleList();
    return response.data;
  }
);

const initialState = { articles: {}, api: { loading: "idle", error: null } };

export const slice = createSlice({
  name: "articles",
  initialState: initialState,
  reducers: {},
  extraReducers: {
    [articleList.pending]: (state) => {
      if (state.api.loading === "idle") {
        state.api.loading = "pending";
        state.api.error = null;
      }
    },
    [articleList.fulfilled]: (state, action) => {
      if (state.api.loading === "pending") {
        action.payload.map((article) => {
          state.articles[article.id] = article;
          return article;
        });
        state.api.loading = "idle";
      }
    },
    [articleList.rejected]: (state, action) => {
      if (state.api.loading === "pending") {
        state.api.error = action.error;
        state.api.loading = "idle";
      }
    },
    [articleRead.pending]: (state) => {
      if (state.api.loading === "idle") {
        state.api.loading = "pending";
      }
    },
    [articleRead.fulfilled]: (state, action) => {
      if (state.api.loading === "pending") {
        state.articles[action.payload.id] = action.payload;
        state.api.loading = "idle";
      }
    },
    [articleRead.rejected]: (state, action) => {
      if (state.api.loading === "pending") {
        state.api.error = action.error;
        state.api.loading = "idle";
      }
    }
  }
});
