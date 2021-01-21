import { StyleSheet } from "react-native";
import { scaleVertical, scale } from "../../../utils/scale";

export const styles = StyleSheet.create({
  heading: {
    color: "#EC5E53",
    fontSize: 42,
    marginTop: scaleVertical(15),
    width: '100%',
    textAlign: 'center'
  },
  text: {
    color: "#000000",
    fontSize: 16,
    padding: scale(20),
    width: '100%'
  },
});
