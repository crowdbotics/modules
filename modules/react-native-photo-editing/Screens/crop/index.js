
import React, { Fragment, useState, useContext } from "react";
import { Dimensions, Image, ScrollView, StyleSheet, View } from "react-native";

import Button from "../../Components/Button";
import { CropRatioIcon } from "../../Components/CropRatioIcon";
import Tabs from "../../Components/Tabs";
import { OptionsContext } from "@options";
import { reSizeImage } from "../../Utils/common";
import { useDispatch, useSelector } from "react-redux";
import { setImageUri } from "../../Store";
import Header from "../../Components/Header";
import { useNavigation } from "@react-navigation/native";

const Crop = () => {
  const navigation = useNavigation();
  const options = useContext(OptionsContext);
  const dispatch = useDispatch();
  const state = useSelector(state => state.uri);
  const [imageContainerHW, setImageContainerHW] = useState({ w: state.width, h: state.height });
  const width = Dimensions.get("window").width;
  const [selectedCropRatioItem, setSelectedCropRatioItem] = useState(null);

  const handleCropRatioPress = (option) => {
    setSelectedCropRatioItem(option);
    Image.getSize(state.uri, (wImage, hImage) => {
      const w = Math.ceil((hImage * (option.horizontal_ratio / option.vertical_ratio)));
      const h = hImage;
      reSizeImage(state.uri, w, h).then(response => {
        setImageContainerHW({
          w: response.width,
          h: response.height
        });
        dispatch(setImageUri(response));
      }).catch(error => {
        console.log("error", error);
      });
    });
  };

  const handleState = (tab) => {
    navigation.replace(tab);
  };

  const saveImage = async () => {
    Image.getSize(state.uri, async (wImage, hImage) => {
      const result = {
        uri: null
      };
      result.uri = state.uri;
      reSizeImage(result.uri, wImage, hImage).then(response => {
        setImageContainerHW({
          w: response.width,
          h: response.height
        });
        dispatch(setImageUri(response));
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
            <Image resizeMode="contain" style={styles.imgContent} source={{ uri: state.uri }} />
          </View>
          <Tabs selectedTab="crop" handleState={handleState} />
          <View style={styles.tabContent}>
            <View style={styles.cropContainer}>
              {
                options.ratio.map((option, index) =>
                  <CropRatioIcon option={option} key={index} selectionColor={selectedCropRatioItem?.label} handlePress={handleCropRatioPress} />
                )
              }
            </View>

          </View>

          <Button onPress={saveImage}>Apply</Button>
        </View>

      </ScrollView>
    </Fragment>
  );
};
export default Crop;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
    padding: 10
  },
  imgContainer: { display: "flex", alignSelf: "center", maxHeight: 400 },
  imgContent: { width: "100%", height: "100%", borderRadius: 10 },
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
  }
});
