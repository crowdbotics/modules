import React, { useRef, useContext, useEffect, useState } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  FlatList,
  ImageBackground
} from "react-native";

const RideSharingHistory = () => {

  return (
    <View style={styles.heading}>
      <Text>Ride Sharing History</Text>
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
  title: "RideSharingHistory",
  navigator: RideSharingHistory
};
