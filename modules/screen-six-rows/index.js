import React from "react";
import {
  Text,
  View,
  StyleSheet,
  ScrollView
} from "react-native";

const SixRows = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.sectionContainer}>
        <View style={styles.section}>
          <Text style={styles.textHeading1}>Section 1</Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.textHeading1}>Section 2</Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.textHeading1}>Section 3</Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.textHeading1}>Section 4</Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.textHeading1}>Section 5</Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.textHeading1}>Section 6</Text>
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
    backgroundColor: "pink",
    marginHorizontal: 10,
    marginVertical: 5,
    padding: 15
  },
  section: {
    flex: 1,
    backgroundColor: "white",
    marginVertical: 5,
    padding: 15,
    justifyContent: "center",
    alignItems: "center"
  },
  textHeading1: {
    fontSize: 20,
    fontWeight: "bold"
  }
});

export default SixRows;
