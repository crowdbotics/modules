import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  safeArea: {
    height: "100%"
  },
  container: {
    flex: 1,
    backgroundColor: "#333333"
  },
  header: {
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderBottomWidth: 1
  },
  headerText: {
    fontSize: 20,
    color: "#0F5197"
  },
  button: {
    backgroundColor: "#0F5197",
    alignItems: "center"
  },
  commonPadding: {
    padding: 10,
    margin: 10
  },
  backgroundWhite: {
    backgroundColor: "#fff"
  },
  responseSection: {
    flex: 1
  },
  infoHeading: {
    paddingRight: 5
  },
  fontBold: {
    fontWeight: "bold"
  },
  fontSixteen: {
    fontSize: 16
  },
  infoColor: {
    color: "#333333"
  },
  title: {
    color: "#fff"
  },
  listItem: {
    padding: 5,
    marginVertical: 2,
    backgroundColor: "lightgray"
  },
  sectionHeaderTitle: {
    color: "#000",
    fontSize: 22
  },
  commonRadius: {
    borderRadius: 5
  }
});

export default {
  styles: styles,
  AZURE_AUTH_OPTIONS: {
    tenant: "",
    clientId: "",
    redirectUri: ""
  },
  AUTHORIZE_OPTIONS: {
    prompt: "login",
    scope: "openid profile User.Read"
  }
};
