import React from "react";
import { Provider } from "react-redux";
import store from "./store";
import Navigation from "./navigation";
import { hooks } from "@modules";

const App = () => {
  let effects = {};
  hooks.map(([_, hook]) => {
    effects[hook.name] = hook();
  });

  return (
    <Provider store={store}>
      <Navigation />
    </Provider>
  );
};

export default App;
