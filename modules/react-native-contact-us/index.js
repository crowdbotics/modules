import React from "react";
import Navigator from "./Navigator";
import { slice } from "./store";

const Home = () => {
  return (
    <Navigator/>
  );
};

export default {
  title: "Contact-Us",
  navigator: Home,
  slice
};
