import React from "react";
import {
  Text,
  View,
  StyleSheet
} from "react-native";

const FingerprintLoginPopUp = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Fingerprint Login Pop-up</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  heading: {
    fontSize: 20
  }
});

export default FingerprintLoginPopUp;
