import React, { useRef, useContext, useEffect, useState } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  FlatList,
  ImageBackground,
  LogBox
} from "react-native";
import ActionSheet from "react-native-actionsheet";
import { pickFromCamera, pickFromGallery } from "./utils";
import { fetchUserImages, uploadImage, slice } from "./store";
import { OptionsContext, GlobalOptionsContext } from "@options";
import { unwrapResult } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";

const Camera = () => {
  const dispatch = useDispatch();
  const actionSheet = useRef(null);
  const options = useContext(OptionsContext);
  const gOptions = useContext(GlobalOptionsContext);
  const ImagePickerOptions = ["Take Photo", "Choose from Gallery", "Cancel"];
  const [data, setData] = useState([]);

  const { styles, buttonText } = options;

  const fetchImages = async () => {
    try {
      await dispatch(fetchUserImages())
        .then(unwrapResult)
        .then(res => {
          console.log("images: ", res);
          setData(res?.data || res);
        })
        .catch(e => {
          console.log(e);
        });
    } catch (error) {
      console.log(error);
    }
  };

  const uploadUserImage = async (res) => {
    const data = new FormData();
    data.append("image", {
      name: `rnd-${res.path}`,
      type: "image/jpg",
      uri: res.path,
      data: res.data
    });
    await dispatch(uploadImage(data))
      .then(unwrapResult)
      .then(res => {
        console.log("upload images: ", res);
        fetchImages();
      })
      .catch(e => {
        console.log(e);
      });
  };

  useEffect(() => {
    fetchImages();
    LogBox.ignoreLogs(["Animated: `useNativeDriver`", "componentWillReceiveProps"]);
  }, []);

  const renderItem = ({ item }) => (
    <TouchableOpacity>
      <ImageBackground
        source={{ uri: `${gOptions.url}/${item.image}` }}
        style={styles.image}
      ></ImageBackground>
    </TouchableOpacity>
  );

  return (
    <View
      style={{
        flex: 1
      }}
    >
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
      />
      <ActionSheet
        ref={actionSheet}
        title={"Select Image"}
        options={ImagePickerOptions}
        cancelButtonIndex={2}
        onPress={async (index) => {
          let res;
          switch (index) {
            case 0:
              res = await pickFromCamera();
              break;
            case 1:
              res = await pickFromGallery();
              break;
          }
          if (res) {
            uploadUserImage();
          }
        }}
      />
      <TouchableOpacity
        onPress={() => actionSheet.current.show()}
        style={styles.photoBtn}
      >
        <Text style={styles.photoBtnTxt}>{buttonText}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default {
  title: "Camera",
  navigator: Camera,
  slice
};
