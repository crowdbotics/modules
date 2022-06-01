import React, { useState } from "react";
import { View, StyleSheet, Text, Dimensions, ScrollView } from "react-native";
import { CropRatioIcon } from "./components/CropRatioIcon";
import options, { settings } from "./options";
// @ts-ignore
import ImageFilters from "react-native-gl-image-filters";
import { Surface } from "gl-react-native";
import Edits from "./components/Edits";
import Button from "./components/Button";
const PhotoEditing = () => {
  const width = Dimensions.get("window").width - 40;
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedTab, setSelectedTab] = useState("crop");
  const [editSettings, setEditSettings] = useState({
    ...settings,
    contrast: 1,
    saturation: 1,
    brightness: 1,
    temperature: 6500
  });

  const handlePress = (option) => {
    setSelectedItem(option);
  };

  const handleState = (tab) => {
    setSelectedTab(tab);
  };

  const handleFilter = (name, value) => {
    setEditSettings({ ...editSettings, [name]: value });
  };

  return (
    <ScrollView style={{ backgroundColor: "#fff" }}>
      <View style={styles.container}>
        <Text style={styles.headingText}>Image editing</Text>
        <View style={styles.imgContainer}>
          <Surface style={{ width: "100%", height: "100%", borderRadius: 10 }}>
            <ImageFilters {...editSettings} width={width} height={width}>
              {{ uri: "https://i.imgur.com/5EOyTDQ.jpg" }}
            </ImageFilters>
          </Surface>
        </View>
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
        <View style={styles.tabContent}>
          {selectedTab === "crop" && <View style={styles.cropContainer}>
            {
              options.ratio.map((option, index) =>
                <CropRatioIcon dimensions={option.dimensions} label={option.text} key={index} selectionColor={selectedItem?.label} handlePress={handlePress} />
              )
            }
          </View>}
          {selectedTab === "edit" && settings.map((filter) => (
            <Edits
              key={filter.name}
              name={filter.name}
              minimum={filter.minValue}
              maximum={filter.maxValue}
              value={filter.value}
              onChange={handleFilter}
            />
          ))}

        </View>

        <Button />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
    padding: 10,
    height: "100%"
  },
  headingText: { fontSize: 14, marginVertical: 20, fontWeight: "bold", marginLeft: 28, lineHeight: 16.41, color: "#1E2022" },
  imgContainer: { flexDirection: "row", height: 280, width: 370, borderRadius: 10, backgroundColor: "#FFDAAF" },
  editImage: { height: "100%", width: "100%", borderRadius: 10 },
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
  },
  tabContent: {
    padding: 20
  },
  cropContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "flex-end",
    height: 70,
    width: "100%",
    marginBottom: 20
  },

  cropScreen: { height: "100%", flexDirection: "column", justifyContent: "flex-end", alignItems: "center" },
  item: {
    backgroundColor: "#f9c2ff",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 12,
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center"
  },
  title: {
    fontSize: 18
  },
  cropView: {}
});

export default {
  title: "Photo editing",
  navigator: PhotoEditing
};
