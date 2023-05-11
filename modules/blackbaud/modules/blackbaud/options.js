import { StyleSheet } from "react-native";

const styles = StyleSheet.create({});

export const config = {
  issuer: "https://oauth2.sky.blackbaud.com/",
  clientId: "Add your client id.",
  redirectUrl: "com.demo:/callback"
};

export default {
  title: "App Menu",
  copy: "Routes available",
  styles: styles,
  config: config
};
