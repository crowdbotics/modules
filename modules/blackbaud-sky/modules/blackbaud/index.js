import React from "react";
import { slice } from "./store";
import Navigator from "./navigator";

const BlackbaudSky = () => {
  return <Navigator />;
};

export default {
  title: "BlackbaudSky",
  navigator: BlackbaudSky,
  slice
};
