import React, { useState } from "react";
import { View, Image, StyleSheet, Text, Dimensions, ScrollView } from "react-native";
import { CropRatioIcon } from "./components/CropRatioIcon";
import options, { settings } from "./options";
// @ts-ignore
import ImageFilters from "react-native-gl-image-filters";
import { Surface } from "gl-react-native";
import Edits from "./components/Edits";
import Button from "./components/Button";
import ImageResizer from "react-native-image-resizer";
// @ts-ignore
import { launchImageLibrary } from "react-native-image-picker";
// @ts-ignore
import sample from "./assets/sample.jpg";
import Filter from "./components/Filters";
import ImagePicker from "./components/ImagePicker";
import { Colorify } from "./components/Utils/colorify";
import scaleColors from "./components/Utils/scaleColors";

const PhotoEditing = () => {
  const width = Dimensions.get("window").width - 40;
  const [uri, setUri] = useState(Image.resolveAssetSource(sample).uri);
  const [selectedCropRatioItem, setSelectedCropRatioItem] = useState(null);
  const [selectedTab, setSelectedTab] = useState("crop");
  const [imageSelected, setImageSelected] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState("");
  const [editSettings, setEditSettings] = useState({
    ...settings,
    contrast: 1,
    saturation: 1,
    brightness: 1,
    temperature: 6500
  });

  const handleCropRatioPress = (option) => {
    setSelectedCropRatioItem(option);
    const { height } = Image.resolveAssetSource(sample);
    const w = Math.ceil((height * (option.horizontal_ratio / option.vertical_ratio)));
    const h = height;
    ImageResizer.createResizedImage(
      uri,
      w,
      h,
      "JPEG",
      100,
      0,
      undefined,
      false,
      { mode: "stretch", onlyScaleDown: false }
    ).then(response => {
      setUri(response.uri);
    }).catch(error => {
      console.log("error", error);
    });
  };

  const handleState = (tab) => {
    setSelectedTab(tab);
  };

  const handleFilter = (name, value) => {
    setEditSettings({ ...editSettings, [name]: value });
  };

  const handImagePicker = () => {
    launchImageLibrary({ mediaType: "photo" }).then((res) => {
      console.log("image picker response", res.assets[0].uri);
      setUri(res.assets[0].uri);
      setImageSelected(true);
    }).catch((err) => {
      console.log("There was an error while selecting image", err);
    });
  };

  const selectFilter = (filter) => {
    console.log("selected filter", filter);
    setSelectedFilter(filter);
  };

  return (
    <ScrollView style={{ backgroundColor: "#fff" }}>
      <View style={styles.container}>
        <Text style={styles.headingText}>Image editing</Text>
        <View style={styles.imgContainer}>
          {!imageSelected && <ImagePicker handImagePicker={handImagePicker} />}
          {
            imageSelected && selectedTab === "crop" &&
            <Image resizeMode="contain" style={{ width: "100%", height: "100%" }} source={{ uri: uri }} />
          }

          {
            imageSelected && selectedTab === "edit" &&
            <Surface style={{ width: "100%", height: "100%", borderRadius: 10 }}>
              <ImageFilters {...editSettings} width={width} height={width}>
                {{ uri: uri }}
              </ImageFilters>
            </Surface>
          }

          {
            imageSelected && selectedTab === "filter" &&
            <Surface style={{ width: 400, height: 300 }}>
              <Colorify colorScale={scaleColors[selectedFilter]} interpolation={"linear"}>
                {{ uri }}
              </Colorify>
            </Surface>
          }

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
                <CropRatioIcon option={option} key={index} selectionColor={selectedCropRatioItem?.label} handlePress={handleCropRatioPress} />
              )
            }
          </View>}
          {
            selectedTab === "filter" && <View style={styles.filterContainer}><Filter selectFilter={selectFilter}/></View>
          }
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
  imgContainer: { flexDirection: "row", height: 280, width: 370, borderRadius: 10, backgroundColor: "#FCF1D6", justifyContent: "center", alignItems: "center" },
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
  filterContainer: {
    width: "120%",
    left: -30
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
