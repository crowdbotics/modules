import { slices } from "@modules";
import { configureStore, createReducer, combineReducers } from "@reduxjs/toolkit";

export const APP_URL = "https://{{cookiecutter.project_slug}}Identifier.botics.co";

const reducers = Object.fromEntries(slices.map(([name, slice]) => [name, slice.reducer]));

const appState = {
  name: "{{cookiecutter.project_slug}}",
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
