import React from "react";
import {
  View,
  StyleSheet,
  ScrollView
} from "react-native";

const FourColumns = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.sectionContainer}>
        <View style={styles.section}>
          {/* YOUR CODE HERE */}
        </View>
        <View style={styles.section}>
          {/* YOUR CODE HERE */}
        </View>
        <View style={styles.section}>
          {/* YOUR CODE HERE */}
        </View>
        <View style={styles.section}>
          {/* YOUR CODE HERE */}
        </View>
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: "#fff"
  },
  sectionContainer: {
    flex: 1,
    flexDirection: "row",
    margin: 10,
    padding: 5
  },
  section: {
    flex: 1,
    backgroundColor: "pink",
    marginHorizontal: 5,
    padding: 15,
    justifyContent: "center",
    alignItems: "center"

  },
  textHeading1: {
    fontSize: 20,
    fontWeight: "bold"
  }
});

export default FourColumns;
