import React from "react";
import Navigator from "./navigator";
import { slice } from "./store";

const TwoFactorAuthentication = () => {
  return (
    <Navigator />
  );
};

export default {
  title: "2FA",
  navigator: TwoFactorAuthentication,
  slice
};
