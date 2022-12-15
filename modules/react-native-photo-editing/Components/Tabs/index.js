import React from "react";
import { StyleSheet, Text, View } from "react-native";

const Tabs = ({ selectedTab, handleState }) => {
  return (
    <View style={styles.tabView}>
      <View style={[styles.tabItem, selectedTab === "crop" && styles.selectedTab]} >
        <Text onPress={() => handleState("crop")}>Crop</Text>
      </View>
      <View style={[styles.tabItem, selectedTab === "filter" && styles.selectedTab]} >
        <Text onPress={() => handleState("filter")}>Filters</Text>
      </View>
      <View style={[styles.tabItem, selectedTab === "edit" && styles.selectedTab]}>
        <Text onPress={() => handleState("edit")}>Edits</Text>
      </View>
      <View style={[styles.tabItem, selectedTab === "shadow" && styles.selectedTab]}>
        <Text onPress={() => handleState("shadow")}>Shadows</Text>
      </View>
    </View>
  );
};

export default Tabs;

const styles = StyleSheet.create({
  tabView: {
    width: "100%",
    height: 48,
    backgroundColor: "#F1F1F1",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    borderRadius: 10,
    paddingVertical: 6,
    paddingHorizontal: 6,
    marginTop: 20
  },
  tabItem: {
    height: "100%",
    paddingHorizontal: 8,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F1F1F1",
    borderRadius: 10,
    fontWeight: "bold",
    flex: 1
  },
  selectedTab: {
    backgroundColor: "#FFF",
    shadowColor: "gray",
    elevation: 10
  }
});
