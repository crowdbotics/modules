import { configureStore, createReducer, combineReducers } from "@reduxjs/toolkit";
import { reducers } from "@modules";

export const APP_URL = "https://ProjectNameIdentifier.botics.co";

const appState = {
  name: "ProjectName",
  url: APP_URL,
  version: "1.0.0"
}

const appReducer = createReducer(appState, _ => {
  return appState;
})

const reducer = combineReducers({
  app: appReducer,
  ...reducers
});

const store = configureStore({
  reducer: reducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware()
})

export default store;
