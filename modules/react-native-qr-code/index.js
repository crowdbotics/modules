import React from "react";
import Navigator from "./Navigator";
import { slice } from "./store";

const QRCode = (props) => {
  return (
    <Navigator/>
  );
};

export default {
  title: "QRCode",
  navigator: QRCode,
  slice
};
