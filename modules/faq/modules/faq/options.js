import { StyleSheet } from "react-native";

// to configure this module, edit the base url in options/options.js
const path = "/modules/faq/";

const title = "Support & FAQ";

const recordsPerPage = 10; // by default per page return 10 FAQs, you can edit this as per your project requirement

export const colors = {
  gray: "#E5E5E5",
  white: "#FFFFFF",
  ivoryBlack: "#231F20",
  whiteSmoke: "#F6F6F6",
  darkCharcoal: "#333333",
  darkGray: "#808080",
  black: "#000000"
};

const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: 20 },
  heading: {
    flexDirection: "row",
    justifyContent: "center",
    paddingVertical: 10
  },
  backIcon: { width: 20, height: 20 },
  title: {
    fontSize: 16,
    flex: 1,
    alignSelf: "center",
    textAlign: "center",
    marginEnd: 25
  },
  searchSection: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F6F6F6",
    padding: 10,
    borderRadius: 10
  },
  searchIcon: { width: 25, height: 20, marginEnd: 5 },
  input: {
    color: "#000000",
    fontSize: 16
  },
  list: { marginTop: 10 }
});

export default {
  title: title,
  path: path,
  styles: styles,
  colors: colors,
  recordsPerPage
};
