import { configureStore, createReducer } from "@reduxjs/toolkit";

const appState = {
  name: "ProjectName"
}

const appReducer = createReducer(appState, _ => {
  return appState;
})

const reducer = {
  app: appReducer
}

const store = configureStore({
  reducer: reducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
  devTools: process.env.NODE_ENV !== 'production',
})

export default store;
