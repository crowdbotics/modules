import { StyleSheet } from "react-native";

export const resources = {
  url: "http://samples.leanpub.com/thereactnativebook-sample.pdf",
  base64: "JVBERi0xLjMKJcfs..."
};
export const resourceType = "url";
export const fadeInDuration = 250.0;

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  pdf: {
    flex: 1
  }
});

export default {
  styles: styles,
  resources: resources,
  resourceType: resourceType,
  fadeInDuration: fadeInDuration
};
