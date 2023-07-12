import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  safeArea: {
    height: "100%"
  },
  container: {
    flex: 1,
    backgroundColor: "#333333",
    borderRadius: 0,
    color: "#777777"
  },
  header: {
    backgroundColor: "#fff",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderBottomWidth: 1
  },
  headerText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#0F5197"
  },
  button: {
    backgroundColor: "#0F5197",
    padding: 10,
    margin: 10,
    borderRadius: 5,
    alignItems: "center"
  },
  responseSection: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 10,
    margin: 10,
    borderRadius: 5
  },
  infoHeading: {
    fontSize: 16,
    color: "#333333",
    fontWeight: "bold",
    paddingRight: 5
  },
  infoText: {
    fontSize: 16,
    color: "#333333"
  },
  title: {
    color: "#fff",
    fontSize: 16
  },
  listItem: {
    padding: 5,
    marginVertical: 2,
    borderRadius: 5,
    backgroundColor: "lightgray"
  },
  sectionHeaderTitle: {
    color: "#000",
    fontSize: 22
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
