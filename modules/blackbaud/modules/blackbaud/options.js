import { StyleSheet } from "react-native";
const styles = StyleSheet.create({});

export const mapErrors = (error) => {
  let errorMessage = null;
  const errorsList = error.response.data;
  if (error.message === "Network Error") {
    errorMessage = "Network Error";
  } else if (errorsList) {
    const message = Object.keys(errorsList).map(element => {
      if (typeof errorsList[element] === "object") {
        return Object.keys(errorsList[element]).map(el => `${element}: ${errorsList[element][el]}`);
      } else {
        return `${element}: ${errorsList[element]}`;
      }
    });

    errorMessage = message.join("\n");
  } else {
    errorMessage = error.message;
  }
  return errorMessage;
};

export default {
  styles: styles,
  issuer: "https://oauth2.sky.blackbaud.com/",
  clientId: "Your blackbaud clientId",
  redirectUrl: "com.demo:/callback",
  successNavScreen: "blackbaudEventListing"
};
