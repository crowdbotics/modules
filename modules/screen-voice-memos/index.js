import React from "react";
import { StyleSheet, View, Image } from "react-native";

const VoiceMemos = (params) => {
  return (
    <View style={styles.container}>
      <Image resizeMode="contain" source={require("./preview.png")} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff"
  }

});

export default VoiceMemos;
