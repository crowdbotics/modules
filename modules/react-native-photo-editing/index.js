// @ts-ignore
import React, { useState, Fragment } from "react";
import { View, Image, StyleSheet, Text, Dimensions, ScrollView, PermissionsAndroid, Platform, Alert } from "react-native";
// @ts-ignore
import CameraRoll from "@react-native-community/cameraroll";
import { CropRatioIcon } from "./components/CropRatioIcon";
import options from "./options";
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
import Shadows from "./components/Shadows";
import { BlurV } from "./Utils/blurv";
import ShadowBlurs from "./components/ShadowBlur";
import { reSizeImage } from "./Utils/common";
import Loader from "./components/Loader";

const PhotoEditing = () => {
  const [editsRef, setEditsRef] = useState(null);
  const width = Dimensions.get("window").width;
  const [imageContainerHW, setImageContainerHW] = useState({ w: 0, h: 0 });
  const [uri, setUri] = useState(Image.resolveAssetSource(sample).uri);
  const [selectedCropRatioItem, setSelectedCropRatioItem] = useState(null);
  const [selectedTab, setSelectedTab] = useState("crop");
  const [imageSelected, setImageSelected] = useState(false);
  const [selectedShadow, setSelectedShadow] = useState(options.SHADOWS[0].url);
  const [isLoading, setIsLoading] = useState(false);
  const [filterSettings, setFilterSettings] = useState({
    ...options.settings,
    hue: 0,
    blur: 0,
    sepia: 0,
    sharpen: 0,
    negative: 0,
    contrast: 1,
    saturation: 1,
    brightness: 1,
    temperature: 6500
  });
  const [editSettings, setEditSettings] = useState({
    ...options.settings,
    contrast: 1,
    saturation: 1,
    brightness: 1,
    temperature: 6500
  });
  const [blurSettings, setBlurSettings] = useState({ Blur: 6, "Blur Passes": 3 });

  const handleCropRatioPress = (option) => {
    setSelectedCropRatioItem(option);
    Image.getSize(uri, (wImage, hImage) => {
      const w = Math.ceil((hImage * (option.horizontal_ratio / option.vertical_ratio)));
      const h = hImage;
      reSizeImage(uri, w, h).then(response => {
        setImageContainerHW({
          w: response.width,
          h: response.height
        });
        setUri(response.uri);
      }).catch(error => {
        console.log("error", error);
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
    setIsLoading(true);
    launchImageLibrary({ mediaType: "photo" }).then((res) => {
      if (res?.didCancel) {
        setIsLoading(false);
        return;
      }
      reSizeImage(res.assets[0].uri, res.assets[0].width, res.assets[0].height).then(response => {
        setImageContainerHW({
          w: response.width,
          h: response.height
        });
        setImageSelected(true);
        setUri(response.uri);
        setIsLoading(false);
      }).catch(error => {
        console.log("error", error);
      });
    }).catch((error) => {
      console.log("error", error);
    });
  };

  const selectFilter = (filter, settings) => {
    setFilterSettings({ ...filterSettings, ...settings });
  };

  const handleBlurImage = (shadow) => {
    setSelectedShadow(shadow);
  };

  const handleBlur = (name, value) => {
    setBlurSettings({ ...blurSettings, [name]: value });
  };

  const saveImage = async () => {
    Image.getSize(uri, async (wImage, hImage) => {
      let result = {
        uri: null
      };
      if (selectedTab === "crop") {
        result.uri = uri;
      } else {
        result = await editsRef.glView.capture();
      }
      reSizeImage(result.uri, wImage, hImage).then(response => {
        setImageContainerHW({
          w: response.width,
          h: response.height
        });
        setUri(response.uri);
      }).catch(error => {
        console.log("error", error);
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
    setIsLoading(true);
    if (Platform.OS === "android" && !(await hasAndroidPermission())) {
      return;
    }

    await CameraRoll.save(uri, { type: "photo" });
    setIsLoading(false);
    Alert.alert("Info", "Photo saved in Gallery.");
  };

  return (
    <Fragment>
      {isLoading && <Loader />}
      {!imageSelected
        ? <ImagePicker handImagePicker={handImagePicker} />
        : <ScrollView style={{ backgroundColor: "#fff" }}>
            <View style={styles.container}>
              <View style={styles.topSection}>
                <Text style={styles.headingText}>Image editing</Text>
                <Text style={styles.headingText} onPress={savePicture}>Save</Text>
              </View>

              <View style={[styles.imgContainer, { width: imageContainerHW.w, maxWidth: width, maxHeight: 400 }]}>

                { selectedTab === "crop" &&
                  <Image resizeMode="contain" style={styles.imgContent} source={{ uri: uri }} />
                }

                { selectedTab === "filter" &&
                  <Surface style={styles.imgContent} ref={setEditsRef}>
                    <ImageFilters {...filterSettings} width={width} height={width}>
                      {{ uri: uri }}
                    </ImageFilters>
                  </Surface>
                }

                { selectedTab === "edit" &&
                  <Surface style={styles.imgContent} ref={setEditsRef}>
                    <ImageFilters {...editSettings} width={width} height={width}>
                      {{ uri: uri }}
                    </ImageFilters>
                  </Surface>
                }

                { selectedTab === "shadow" &&
                  <Surface style={styles.imgContent} ref={setEditsRef}>
                    <BlurV map={{ uri: selectedShadow }} passes={blurSettings["Blur Passes"]} factor={blurSettings.Blur}>
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
                {selectedTab === "edit" && options.settings.map((filter) => (
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
                  {options.blurShadows.map((shadow) =>
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

              <Button onPress={saveImage}>Apply</Button>
            </View>

        </ScrollView>
      }
    </Fragment>

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
    padding: 10
  },
  headingText: { fontSize: 14, fontWeight: "bold", lineHeight: 16.41, color: "#1E2022" },
  imgContainer: { display: "flex", alignSelf: "center" },
  imgContent: { width: "100%", height: "100%", borderRadius: 10 },
  topSection: { marginVertical: 20, marginHorizontal: 28, flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
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
