
import { configureStore } from "@reduxjs/toolkit";
import React from "react";
import { Provider } from "react-redux";
import App from "./App";
import rootReducer from "./Store";

const store = configureStore({
  reducer: rootReducer
});

const PhotoEditing = () => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};

export default {
  title: "Photo editing",
  navigator: PhotoEditing
};
