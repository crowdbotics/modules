import React, { useState } from "react";
import { View, StyleSheet, Text, TouchableHighlight } from "react-native";
import { CropRatioIcon } from "./components/CropRatioIcon";
import options, { settings } from "./options";
import Edits from "./components/Edits";
const PhotoEditing = () => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [cropState, setCropState] = useState(false);
  const [editState, setEditState] = useState(false);
  const [filterState, setFilterState] = useState(false);
  const [shadowState, setShadowState] = useState(false);
  const [state, setState] = useState({
    ...settings,
    contrast: 1,
    saturation: 1,
    brightness: 1,
    temperature: 6500
  });

  const handlePress = (option) => {
    setSelectedItem(option);
  };

  const handleState = (state) => {
    switch (state) {
      case "crop":
        setCropState(true);
        setEditState(false);
        setFilterState(false);
        setShadowState(false);
        break;
      case "filter":
        setCropState(false);
        setEditState(false);
        setFilterState(true);
        setShadowState(false);
        break;
      case "edit":
        setCropState(false);
        setEditState(true);
        setFilterState(false);
        setShadowState(false);
        break;
      case "shadow":
        setCropState(false);
        setEditState(false);
        setFilterState(false);
        setShadowState(true);
        break;
      default:
        break;
    }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.headingText}>Image editing</Text>
      <View style={styles.imgContainer}>
      </View>
      <View style={styles.tabView}>
        <View style={[styles.tabItem, cropState && styles.selectedTab]} >
          <Text onPress={() => handleState("crop")}>Crop</Text>
        </View>
        <View style={[styles.tabItem, filterState && styles.selectedTab]} >
          <Text onPress={() => handleState("filter")}>Filters</Text>
        </View>
        <View style={[styles.tabItem, editState && styles.selectedTab]}>
          <Text onPress={() => handleState("edit")}>Edits</Text>
        </View>
        <View style={[styles.tabItem, shadowState && styles.selectedTab]}>
          <Text onPress={() => handleState("shadow")}>Shadows</Text>
        </View>
      </View>
      {editState && settings.map((filter) => (
        <Edits
          key={filter.name}
          name={filter.name}
          minimum={filter.minValue}
          maximum={filter.maxValue}
          onChange={(value) => {
            setState((prevState) => ({
              ...prevState,
              name: value
            }));
          }}
        />
      ))}

      {cropState && <View style={styles.cropContainer}>
        {
          options.ratio.map((option, index) =>
            <CropRatioIcon dimensions={option.dimensions} label={option.text} key={index} selectionColor={selectedItem?.label} handlePress={handlePress} />
          )
        }
      </View>}
      <TouchableHighlight
        underlayColor="#DDDDDD"
      >
        <View
          style={[
            styles.button,
            {
              backgroundColor: "#000000",
              height: 49
            }
          ]}
        >
          <Text style={[styles.text, { color: "#ffffff" }]}>Apply</Text>
        </View>
      </TouchableHighlight>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
    paddingHorizontal: 20
  },
  headingText: { fontSize: 14, marginVertical: 20, fontWeight: "bold" },
  imgContainer: { flexDirection: "row", height: 280, borderRadius: 10, backgroundColor: "#FFDAAF" },
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
  cropContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    height: 70,
    marginVertical: 18
  },

  cropScreen: { height: "100%", flexDirection: "column", justifyContent: "flex-end", alignItems: "center" },
  button: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    marginHorizontal: 20,
    marginTop: 50
  },
  text: {
    fontWeight: "bold",
    fontSize: 15
  },
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
