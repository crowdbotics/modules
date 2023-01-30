import React from "react";
import {
  View,
  StyleSheet,
  ScrollView
} from "react-native";

const LargeGrid = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.gridContainer}>
        <View style={styles.row}>
          <View style={styles.col}>
            {/* YOUR CODE HERE */}
          </View>
          <View style={styles.col}>
            {/* YOUR CODE HERE */}
          </View>
        </View>
        <View style={styles.row}>
          <View style={styles.col}>
            {/* YOUR CODE HERE */}
          </View>
          <View style={styles.col}>
            {/* YOUR CODE HERE */}
          </View>
        </View>
        <View style={styles.row}>
          <View style={styles.col}>
            {/* YOUR CODE HERE */}
          </View>
          <View style={styles.col}>
            {/* YOUR CODE HERE */}
          </View>
        </View>
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  gridContainer: {
    flex: 1
  },
  row: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "white",
    marginHorizontal: 5,
    padding: 5,
    justifyContent: "center"
  },
  col: {
    flex: 1,
    backgroundColor: "pink",
    marginHorizontal: 5,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden"
  },
  textHeading1: {
    fontSize: 20,
    fontWeight: "bold"
  }

});

export default LargeGrid;
