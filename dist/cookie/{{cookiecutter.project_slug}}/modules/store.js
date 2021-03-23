import { configureStore, createReducer, combineReducers } from "@reduxjs/toolkit";

export const getStore = slices => {
  const reducers = Object.fromEntries(slices.map(([name, slice]) => [name, slice.reducer]));

  const appState = {
    name: "{{cookiecutter.project_slug}}Identifier",
    url: "https://{{cookiecutter.project_slug}}Identifier.botics.co",
    version: "1.0.0"
  }

  const appReducer = createReducer(appState, _ => {
    return appState;
  })

  const reducer = combineReducers({
    app: appReducer,
    ...reducers
  });

  return configureStore({
    reducer: reducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware()
  });
}
