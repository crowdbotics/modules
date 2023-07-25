import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  backgroundColor: {
    backgroundColor: "#0d7fd8"
  },
  logo: {
    width: 40,
    height: 40
  },
  titleContainer: {
    paddingLeft: 10,
    marginVertical: 10
  },
  fontSize20: {
    fontSize: 20
  },
  azureTitle: {
    color: "#0d7fd8"
  },
  azureDescription: {
    color: "#000",
    fontWeight: "500"
  },
  bannerImage: {
    width: "100%",
    height: 280
  },
  indicationText: {
    width: 270,
    marginTop: "10%"
  },
  textCenter: {
    textAlign: "center"
  },
  lineHeight22: {
    lineHeight: 22
  },
  lineHeight18: {
    lineHeight: 18
  },
  safeArea: {
    height: "100%"
  },
  container: {
    flex: 1
  },
  header: {
    height: 50,
    paddingLeft: 5,
    flexDirection: "row",
    justifyContent: "flex-start"
  },
  alignCenter: {
    alignItems: "center"
  },
  button: {
    backgroundColor: "#0d7fd8"
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
    borderRadius: 3
  }
});

export default {
  styles: styles,
  AZURE_AUTH_TENANT_OPTIONS: "",
  AZURE_AUTH_CLIENT_ID_OPTIONS: "",
  AZURE_AUTH_REDIRECT_URI_OPTIONS: "",
  AUTHORIZE_PROMPT_OPTIONS: "login",
  AUTHORIZE_SCOPE_OPTIONS: "openid profile User.Read"
};
