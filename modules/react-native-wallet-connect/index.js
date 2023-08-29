import React from "react";

import WalletConnectProvider from "@walletconnect/react-native-dapp";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { LogBox, Platform } from "react-native";
import App from "./app";

LogBox.ignoreLogs(["react-native-gesture"]);

const WalletConnect = () => {
  return (
    <WalletConnectProvider
      bridge="https://bridge.walletconnect.org"
      clientMeta={{
        description: "Connect with WalletConnect",
        url: "https://walletconnect.org",
        icons: ["https://walletconnect.org/walletconnect-logo.png"],
        name: "WalletConnect"
      }}

      redirectUrl={Platform.OS === "web" ? window.location.origin : "yourappscheme://"}
      storageOptions= {{
        asyncStorage: AsyncStorage
      }}>
      <><App/></>
    </WalletConnectProvider>
  );
};

export default {
  title: "WalletConnect",
  navigator: WalletConnect
};
