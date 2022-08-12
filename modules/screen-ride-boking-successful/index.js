import React, { useRef, useContext, useEffect, useState } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  FlatList,
  ImageBackground
} from "react-native";

const RideBokingSuccessful = () => {

  return (
    <View style={styles.heading}>
      <Text>Ride Boking Successful</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  heading: {
    margin: 20,
    flex: 1,
    justifyContent: "space-around"
  }
});

export default {
  title: "RideBokingSuccessful",
  navigator: RideBokingSuccessful
};
