import React from "react";
import {
  Text,
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
            <Text style={styles.textHeading1}>(R1,C1)</Text>
          </View>
          <View style={styles.col}>
            <Text style={styles.textHeading1}>R1,C2</Text>
          </View>
        </View>
        <View style={styles.row}>
          <View style={styles.col}>
            <Text style={styles.textHeading1}>R2,C1</Text>
          </View>
          <View style={styles.col}>
            <Text style={styles.textHeading1}>R2,C2</Text>
          </View>
        </View>
        <View style={styles.row}>
          <View style={styles.col}>
            <Text style={styles.textHeading1}>R3,C1</Text>
          </View>
          <View style={styles.col}>
            <Text style={styles.textHeading1}>R3,C3</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gridContainer: {
    flex: 1,
  },
  row: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "white",
    marginHorizontal: 5,
    padding: 5,
    justifyContent: "center",
  },
  col: {
    flex: 1,
    backgroundColor: "pink",
    marginHorizontal: 5,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  textHeading1: {
    fontSize: 20,
    fontWeight: "bold"
  },

});

export default LargeGrid;
