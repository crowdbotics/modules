import { Text, View, StyleSheet } from "react-native";
import React from "react";

const Filters = () => {
  return (
      <View><Text style={styles.filterTitle}>Filters</Text></View>
  );
};

const styles = StyleSheet.create({
  image: {
    width: 520,
    height: 520,
    marginVertical: 10,
    alignSelf: "center"
  },
  filterSelector: {
    width: 100,
    height: 100,
    margin: 5
  },
  filterTitle: {
    fontSize: 12,
    textAlign: "center"
  }
});

export default Filters;
