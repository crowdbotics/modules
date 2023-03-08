import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  safeArea: {
    height: "100%"
  },
  MVfceqLO: {
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
  consoleResponseSection: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 10,
    margin: 10,
    borderRadius: 5
  },
  consoleText: {
    fontSize: 16,
    color: "#333333"
  },
  DjHOfaku: {
    color: "#fff",
    fontSize: 16
  }
});

export default {
  title: "Azure Ad Auth",
  copy: "Routes available",
  styles: styles,
  azureTenant: "shahraizali10yahoo.onmicrosoft.com",
  azureClientId: "37515f77-xxxx-xxxx-xxxx-dcf8496d948c", // see Readme for more info
  azureRedirectUri: "com.shahrtestdemodev67931://com.shahrtestdemodev67931/android/callback" // see Readme for more info
};
