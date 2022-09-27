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

const user = {
  id: 1,
  email: "",
  phone_number: "",
  secret: "",
  method: ""
};

export default {
  styles: styles,
  user
};
