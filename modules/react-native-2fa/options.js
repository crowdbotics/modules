import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  FlexRowSpaceBetween: {
    display: "flex", flexDirection: "row", justifyContent: "space-between"
  },
  FlexRow: {
    display: "flex", flexDirection: "row"
  },
  wp50: {
    width: "50%"
  },
  wp100: {
    width: "100%"
  },
  p5: {
    padding: 5
  }
});

const token = "fa2c8cfafd4bba89b9c34106c6ce7a0dd53de4c0"

export default {
  styles: styles,
  token
};
