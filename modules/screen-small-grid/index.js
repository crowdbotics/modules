import React from "react";
import {
  Text,
  View,
  StyleSheet,
  ScrollView
} from "react-native";

const SmallGrid = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.gridContainer}>
        <View style={styles.row}>
          <View style={styles.col}>
            <Text style={styles.textHeading1}>1</Text>
          </View>
          <View style={styles.col}>
            <Text style={styles.textHeading1}>2</Text>
          </View>
          <View style={styles.col}>
            <Text style={styles.textHeading1}>3</Text>
          </View>
          <View style={styles.col}>
            <Text style={styles.textHeading1}>4</Text>
          </View>
        </View>
        <View style={styles.row}>
          <View style={styles.col}>
            <Text style={styles.textHeading1}>2</Text>
          </View>
          <View style={styles.col}>
            <Text style={styles.textHeading1}>3</Text>
          </View>
          <View style={styles.col}>
            <Text style={styles.textHeading1}>4</Text>
          </View>
          <View style={styles.col}>
            <Text style={styles.textHeading1}>5</Text>
          </View>
        </View>
        <View style={styles.row}>
          <View style={styles.col}>
            <Text style={styles.textHeading1}>3</Text>
          </View>
          <View style={styles.col}>
            <Text style={styles.textHeading1}>4</Text>
          </View>
          <View style={styles.col}>
            <Text style={styles.textHeading1}>5</Text>
          </View>
          <View style={styles.col}>
            <Text style={styles.textHeading1}>6</Text>
          </View>
        </View>
        <View style={styles.row}>
          <View style={styles.col}>
            <Text style={styles.textHeading1}>4</Text>
          </View>
          <View style={styles.col}>
            <Text style={styles.textHeading1}>5</Text>
          </View>
          <View style={styles.col}>
            <Text style={styles.textHeading1}>6</Text>
          </View>
          <View style={styles.col}>
            <Text style={styles.textHeading1}>7</Text>
          </View>
        </View>
        <View style={styles.row}>
          <View style={styles.col}>
            <Text style={styles.textHeading1}>5</Text>
          </View>
          <View style={styles.col}>
            <Text style={styles.textHeading1}>6</Text>
          </View>
          <View style={styles.col}>
            <Text style={styles.textHeading1}>7</Text>
          </View>
          <View style={styles.col}>
            <Text style={styles.textHeading1}>8</Text>
          </View>
        </View>
        <View style={styles.row}>
          <View style={styles.col}>
            <Text style={styles.textHeading1}>6</Text>
          </View>
          <View style={styles.col}>
            <Text style={styles.textHeading1}>7</Text>
          </View>
          <View style={styles.col}>
            <Text style={styles.textHeading1}>8</Text>
          </View>
          <View style={styles.col}>
            <Text style={styles.textHeading1}>9</Text>
          </View>
        </View>
        <View style={styles.row}>
          <View style={styles.col}>
            <Text style={styles.textHeading1}>7</Text>
          </View>
          <View style={styles.col}>
            <Text style={styles.textHeading1}>8</Text>
          </View>
          <View style={styles.col}>
            <Text style={styles.textHeading1}>9</Text>
          </View>
          <View style={styles.col}>
            <Text style={styles.textHeading1}>10</Text>
          </View>
        </View>
        <View style={styles.row}>
          <View style={styles.col}>
            <Text style={styles.textHeading1}>8</Text>
          </View>
          <View style={styles.col}>
            <Text style={styles.textHeading1}>9</Text>
          </View>
          <View style={styles.col}>
            <Text style={styles.textHeading1}>10</Text>
          </View>
          <View style={styles.col}>
            <Text style={styles.textHeading1}>11</Text>
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

export default SmallGrid;
