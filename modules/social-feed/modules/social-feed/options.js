import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  hr: {
    marginTop: 20,
    marginBottom: 20,
    borderBottomColor: "black",
    borderBottomWidth: 1
  },
  container: {
    flex: 1,
    height: 100,
    padding: 13
  }
});

export const localOptions = {

};

export default {
  title: "App Menu",
  copy: "Routes available",
  styles: styles,
  localOptions: localOptions
};
