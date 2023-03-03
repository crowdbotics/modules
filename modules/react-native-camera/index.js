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
import { pickFromCamera, pickFromGallery, uploadImage } from "./utils";
import { OptionsContext, GlobalOptionsContext } from "@options";

const Camera = () => {
  const actionSheet = useRef(null);
  const options = useContext(OptionsContext);
  const gOptions = useContext(GlobalOptionsContext);
  const ImagePickerOptions = ["Take Photo", "Choose from Gallery", "Cancel"];
  const [data, setData] = useState([]);

  const { styles, buttonText } = options;

  const fetchImages = async () => {
    try {
      const res = await fetch(`${gOptions.url}/modules/camera/photos/user/`);
      const results = await res.json();
      setData(results?.data || results);
    } catch (error) {
      console.log(error);
    }
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
            uploadImage(res, gOptions).then(() => {
              fetchImages();
            });
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
  navigator: Camera
};
