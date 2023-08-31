import React from "react";
import Navigator from "./Navigator";
import { slice } from "./store";

const TypeformWebhooks = () => {
  return (
    <Navigator/>
  );
};

export default {
  title: "TypeForm Webhook",
  navigator: TypeformWebhooks,
  slice
};
