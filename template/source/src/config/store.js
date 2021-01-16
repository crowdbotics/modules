import { configureStore, createReducer, combineReducers } from "@reduxjs/toolkit";

const appState = {
  name: "ProjectName",
  version: "1.0.0"
}

const appReducer = createReducer(appState, _ => {
  return appState;
})

const reducer = combineReducers({
  app: appReducer
});

const store = configureStore({
  reducer: reducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware()
})

export default store;
