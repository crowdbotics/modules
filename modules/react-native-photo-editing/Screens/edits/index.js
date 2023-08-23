
import React, { Fragment, useState, useContext } from "react";
import { Dimensions, Image, ScrollView, StyleSheet, View } from "react-native";

import { Surface } from "gl-react-native";

import ImageFilters from "react-native-gl-image-filters";
import Tabs from "../../Components/Tabs";
import { OptionsContext } from "@options";
import { reSizeImage } from "../../Utils/common";
import Button from "../../Components/Button";
import EditSliders from "../../Components/EditSliders";
import { useDispatch, useSelector } from "react-redux";
import { setImageUri } from "../../Store";
import Header from "../../Components/Header";
import { useNavigation } from "@react-navigation/native";

const Edits = () => {
  const navigation = useNavigation();
  const options = useContext(OptionsContext);
  const dispatch = useDispatch();
  const state = useSelector(state => state.uri);
  const [imageContainerHW, setImageContainerHW] = useState({ w: state.width, h: state.height });
  const [editsRef, setEditsRef] = useState(null);
  const width = Dimensions.get("window").width;

  const [editSettings, setEditSettings] = useState({
    ...options.settings,
    contrast: 1,
    saturation: 1,
    brightness: 1,
    temperature: 6500
  });

  const handleState = (tab) => {
    navigation.replace(tab);
  };

  const handleFilter = (name, value) => {
    setEditSettings({ ...editSettings, [name]: value });
  };

  const saveImage = async () => {
    Image.getSize(state.uri, async (wImage, hImage) => {
      let result = {
        uri: null
      };
      result = await editsRef.glView.capture();
      reSizeImage(result.uri, wImage, hImage).then(response => {
        setImageContainerHW({
          w: response.width,
          h: response.height
        });
        dispatch(setImageUri(response));
        setEditSettings({
          ...options.settings,
          contrast: 1,
          saturation: 1,
          brightness: 1,
          temperature: 6500
        });
      }).catch(error => {
        console.log("error", error);
      });
    });
  };

  return (
    <Fragment>
      <Header></Header>
      <ScrollView style={{ backgroundColor: "#fff" }}>
        <View style={styles.container}>
          <View style={[styles.imgContainer, { width: imageContainerHW.w, maxWidth: width }]}>
            <Surface style={styles.imgContent} ref={setEditsRef}>
              <ImageFilters {...editSettings} width={width} height={width}>
                {{ uri: state.uri }}
              </ImageFilters>
            </Surface>
          </View>
          <Tabs selectedTab="edit" handleState={handleState} />
          <View style={styles.tabContent}>
            {options.settings.map((filter) => (
              <EditSliders
                key={filter.name}
                name={filter.name}
                minimum={filter.minValue}
                maximum={filter.maxValue}
                value={filter.value}
                onChange={handleFilter}
              />
            ))
            }
          </View>

          <Button onPress={saveImage}>Apply</Button>
        </View>

      </ScrollView>
    </Fragment>
  );
};
export default Edits;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
    padding: 10
  },
  headingText: { fontSize: 14, fontWeight: "bold", lineHeight: 16.41, color: "#1E2022" },
  imgContainer: { display: "flex", alignSelf: "center", maxHeight: 400 },
  imgContent: { width: "100%", height: "100%", borderRadius: 10 },
  topSection: { marginVertical: 20, marginHorizontal: 28, flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  editImage: { height: "100%", width: "100%", borderRadius: 10 },
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
  cancelBtn: { fontSize: 14, fontWeight: "bold", marginLeft: 20, backgroundColor: "#000", color: "#fff", paddingHorizontal: 8, paddingVertical: 3, borderRadius: 15 },
  saveContainer: { flexDirection: "row", justifyContent: "center", alignItems: "center" }
});
