import { StyleSheet } from "react-native";

const styles = StyleSheet.create({});

export const localOptions = {
  config: {
    issuer: "https://oauth2.sky.blackbaud.com/",
    clientId: "36c16294-6000-410f-8425-c45ca53b2eb8",
    redirectUrl: "com.demo:/callback"
  },
  url: "https://cbmodules-39279.botics.co"
};

export default {
  title: "App Menu",
  copy: "Routes available",
  styles: styles,
  localOptions: localOptions
};
