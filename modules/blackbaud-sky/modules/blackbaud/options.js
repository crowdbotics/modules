import { StyleSheet } from "react-native";

const styles = StyleSheet.create({});

export const config = {
  issuer: "https://oauth2.sky.blackbaud.com/",
  clientId: "36c16294-6000-410f-8425-c45ca53b2eb8",
  redirectUrl: "com.demo:/callback"
};

export default {
  title: "App Menu",
  copy: "Routes available",
  styles: styles,
  config: config
};
