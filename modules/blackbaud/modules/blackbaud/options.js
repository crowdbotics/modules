import { StyleSheet } from "react-native";
const styles = StyleSheet.create({});
export const config = {
  issuer: "https://oauth2.sky.blackbaud.com/",
  clientId: "Your blackbaud clientId",
  redirectUrl: "com.blackbaud.demo.app:/callback"
};
export default {
  styles: styles,
  config: config
};
