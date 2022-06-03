// @ts-ignore
import React, { useState } from "react";
import { View, Image, StyleSheet, Text, Dimensions, ScrollView, Alert, PermissionsAndroid, Platform } from "react-native";
// @ts-ignore
import CameraRoll from "@react-native-community/cameraroll";
import { CropRatioIcon } from "./components/CropRatioIcon";
import options, { settings, blurShadows } from "./options";
// @ts-ignore
import ImageFilters from "react-native-gl-image-filters";
import { Surface } from "gl-react-native";
import Edits from "./components/Edits";
import Button from "./components/Button";
// @ts-ignore
import { launchImageLibrary } from "react-native-image-picker";
// @ts-ignore
import sample from "./assets/sample.jpg";
import Filter from "./components/Filters";
import ImagePicker from "./components/ImagePicker";
import { Colorify } from "./Utils/colorify";
import scaleColors from "./Utils/scaleColors";
import Shadows from "./components/Shadows";
import { BlurV } from "./Utils/blurv";
import ShadowBlurs from "./components/ShadowBlur";
import { reSizeImage } from "./Utils/commonUtitls";

const PhotoEditing = () => {
  const imgurify = (slugs) =>
    slugs.split(",").map((id) => "https://i.imgur.com/" + id + ".png");

  const [editsRef, setEditsRef] = useState(null);
  const images = imgurify("SzbbUvX,0PkQEk1,z2CQHpg,k9Eview,wh0On3P");
  const width = Dimensions.get("window").width - 40;
  const [uri, setUri] = useState(Image.resolveAssetSource(sample).uri);
  const [selectedCropRatioItem, setSelectedCropRatioItem] = useState(null);
  const [selectedTab, setSelectedTab] = useState("crop");
  const [imageSelected, setImageSelected] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState(null);
  const [selectedShadow, setSelectedShadow] = useState("");
  const [editSettings, setEditSettings] = useState({
    ...settings,
    contrast: 1,
    saturation: 1,
    brightness: 1,
    temperature: 6500
  });
  const [blurSettings, setBlurSettings] = useState({ Blur: 6, "Blur Passes": 3 });

  const handleCropRatioPress = (option) => {
    setSelectedCropRatioItem(option);
    // @ts-ignore
    Image.getSize(uri, (wImage, hImage) => {
      const w = Math.ceil((hImage * (option.horizontal_ratio / option.vertical_ratio)));
      const h = hImage;
      reSizeImage(uri, w, h).then(response => {
        setUri(response.uri);
      }).catch(error => {
        Alert.alert("error", error);
      });
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
      setUri(res.assets[0].uri);
      setImageSelected(true);
    }).catch((err) => {
      Alert.alert("There was an error while selecting image", err);
    });
  };

  const selectFilter = (filter) => {
    setSelectedFilter(filter);
  };

  const handleBlurImage = (shadow) => {
    setSelectedShadow(shadow);
  };

  const handleBlur = (name, value) => {
    setBlurSettings({ ...blurSettings, [name]: value });
  };

  const saveImage = async () => {
    Image.getSize(uri, async (wImage, hImage) => {
      const result = await editsRef.glView.capture();
      reSizeImage(result.uri, wImage, hImage).then(response => {
        setUri(response.uri);
      }).catch(error => {
        Alert.alert("error", error);
      });
    });
  };

  async function hasAndroidPermission() {
    const permission = PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE;

    const hasPermission = await PermissionsAndroid.check(permission);
    if (hasPermission) {
      return true;
    }

    const status = await PermissionsAndroid.request(permission);
    return status === "granted";
  }

  async function savePicture() {
    if (Platform.OS === "android" && !(await hasAndroidPermission())) {
      return;
    }

    CameraRoll.save(uri, { type: "photo" });
  };

  return (
    <ScrollView style={{ backgroundColor: "#fff" }}>
      <View style={styles.container}>
        <View style={styles.topSection}>
          <Text style={styles.headingText}>Image editing</Text>
          <Text style={styles.saveText} onPress={savePicture}>save</Text>
        </View>

        <View style={styles.imgContainer}>
          {!imageSelected && <ImagePicker handImagePicker={handImagePicker} />}
          {
            imageSelected && selectedTab === "crop" &&
            <Image resizeMode="contain" style={{ width: "100%", height: "100%" }} source={{ uri: uri }} />
          }

          {
            imageSelected && selectedTab === "edit" &&
            <Surface style={{ width: "100%", height: "100%", borderRadius: 10 }} ref={setEditsRef}>
              <ImageFilters {...editSettings} width={width} height={width}>
                {{ uri: uri }}
              </ImageFilters>
            </Surface>
          }

          {
            imageSelected && selectedTab === "filter" &&
            <Surface style={{ width: 400, height: 300 }} ref={setEditsRef}>
              <Colorify colorScale={selectedFilter ? scaleColors[selectedFilter] : null} interpolation={"linear"}>
                {{ uri: uri }}
              </Colorify>
            </Surface>
          }
          {imageSelected && selectedTab === "shadow" &&
            <Surface style={{ width: 370, height: 280 }} ref={setEditsRef}>
              <BlurV map={{ uri: selectedShadow ? images[selectedShadow] : null }} passes={blurSettings["Blur Passes"]} factor={blurSettings.Blur}>
                {{ uri: uri }}
              </BlurV>
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
            selectedTab === "filter" && <View style={styles.filterContainer}><Filter selectFilter={selectFilter} /></View>
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

          {selectedTab === "shadow" && <View style={styles.filterContainer}>
            {blurShadows.map((shadow) =>
              <ShadowBlurs key={shadow.name}
                name={shadow.name}
                minimum={shadow.minValue}
                maximum={shadow.maxValue}
                value={shadow.value}
                onChange={handleBlur} />)

            }
            <Shadows handleBlurImage={handleBlurImage} />
          </View>}

        </View>

        <Button saveImage={saveImage} />
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
  topSection: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  editImage: { height: "100%", width: "100%", borderRadius: 10 },
  saveText: { fontSize: 18, paddingHorizontal: 10, paddingVertical: 5, marginRight: 28 },
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
