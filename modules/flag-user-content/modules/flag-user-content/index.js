import React from "react";

import Navigator from "./navigation";
import { slice } from "./store";

const App = () => {
  return <Navigator />;
};

export default {
  title: "Flag User content",
  navigator: App,
  slice
};
