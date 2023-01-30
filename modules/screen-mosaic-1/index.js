import React from "react";
import {
  View,
  StyleSheet,
  ScrollView
} from "react-native";

const Mosaic1 = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.sectionContainer}>
        <View style={[styles.section, styles.sectoinTop]}>
          {/* YOUR CODE HERE */}
        </View>
        <View style={[styles.section, styles.sectionBottom]}>
          {/* YOUR CODE HERE */}
        </View>
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  sectionContainer: {
    flex: 1,
    backgroundColor: "white",
    marginHorizontal: 10,
    marginVertical: 5,
    padding: 15
  },
  section: {
    flex: 1,
    backgroundColor: "pink",
    marginVertical: 5,
    padding: 15,
    justifyContent: "center",
    alignItems: "center"
  },
  sectoinTop: {
    flex: 5
  },
  sectionBottom: {
    flex: 1
  },
  textHeading1: {
    fontSize: 20,
    fontWeight: "bold"
  }
});

export default Mosaic1;
