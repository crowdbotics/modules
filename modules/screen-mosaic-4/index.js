import React from "react";
import {
  Text,
  View,
  StyleSheet,
  ScrollView
} from "react-native";

const Mosaic4 = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.sectionContainer}>
        <View style={[styles.section]}>
          <View style={styles.row}>
            <View style={styles.col}>
              <Text style={styles.textHeading1}>R1,C1</Text>
            </View>
            <View style={styles.col}>
              <Text style={styles.textHeading1}>R1,C2</Text>
            </View>
          </View>
        </View>
        <View style={[styles.section]}>
          <Text style={styles.textHeading1}>Section Center</Text>
        </View>
        <View style={[styles.section]}>
          <View style={styles.row}>
            <View style={styles.col}>
              <Text style={styles.textHeading1}>R3,C1</Text>
            </View>
            <View style={styles.col}>
              <Text style={styles.textHeading1}>R3,C2</Text>
            </View>
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
  sectionContainer : {
    flex: 1,
    backgroundColor: "white",
    marginHorizontal: 10,
    marginVertical: 5,
    padding: 15,
  },
  section: {
    flex: 1,
    backgroundColor: "pink",
    marginVertical: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  sectoinTop: {
    flex: 5,
  },
  sectionBottom: {
    flex: 1,
    margin: 0,
    padding: 0,
  },
  textHeading1: {
    fontSize: 20,
    fontWeight: "bold"
  },
  row: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "white",
    justifyContent: "space-between",
  },
  col: {
    flex: 1,
    backgroundColor: "pink",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "white",
  },
});



export default Mosaic4;
