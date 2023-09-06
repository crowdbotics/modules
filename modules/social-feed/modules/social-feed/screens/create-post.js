import * as React from "react";
import { useState, useContext, useRef } from "react";
import {
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  Alert,
  Platform
} from "react-native";
import { unwrapResult } from "@reduxjs/toolkit";
import { OptionsContext } from "@options";
import ActionSheet from "react-native-actionsheet";
import ImagePicker from "react-native-image-crop-picker";
import { useDispatch, useSelector } from "react-redux";
import { createPost } from "../store";

const CreatePostScreen = (props) => {
  const { navigation } = props;
  const dispatch = useDispatch();

  // Fetch API status from store.
  const { api } = useSelector((state) => state.Social.createPost);

  // Reference for bottomSheet.
  const actionSheet = useRef(null);
  const { styles } = useContext(OptionsContext);

  const [imageObject, setImageObject] = useState(false);
  const [caption, setCaption] = useState("");
  const ImagePickerOptions = ["Take Photo", "Choose from Gallery", "Cancel"];

  /**
   * Handles the creation of a new post through API
   */
  const onCreatePost = () => {
    if (imageObject && caption.trim().length !== 0) {
      const data = new FormData();
      data.append("caption", caption);
      data.append("media", {
        name: `rnd-${imageObject?.path}`,
        type: imageObject.mime,
        uri: imageObject.path
      });
      dispatch(createPost(data))
        .then(unwrapResult)
        .then(() => {
          Alert.alert("Success", "Post successfully created!");
          navigation.navigate("Home");
        })
        .catch((error) => __DEV__ && console.log(error));
    } else {
      Alert.alert("Error", "Please provide all details.");
    }
  };

  /**
   * Handles image selection from camera or gallery.
   *
   * @param {number} index - Index of the selected option.
   */
  const onImageSelect = (index) => {
    const imageOptions = {
      width: Platform.OS === "ios" ? 450 : 400,
      height: 250,
      cropping: true
    };
    switch (index) {
      case 0:
        ImagePicker.openCamera(imageOptions).then((image) => {
          setImageObject(image);
        });
        break;
      case 1:
        ImagePicker.openPicker(imageOptions).then((image) => {
          setImageObject(image);
        });
        break;
    }
  };

  return (
    <ScrollView>
      <ActionSheet
        ref={actionSheet}
        title={"Select Image"}
        options={ImagePickerOptions}
        cancelButtonIndex={2}
        onPress={onImageSelect}
      />
      <View style={styles.createPostContainer}>
        <Text style={styles.headerText}>Image</Text>
        <TouchableOpacity
          style={styles.imageLarge}
          onPress={() => actionSheet.current.show()}
        >
          <Image
            source={
              imageObject
                ? { uri: imageObject?.path }
                : require("../assets/add-photo.png")
            }
            style={imageObject ? styles.selectedSheet : styles.placeholderImage}
            resizeMode="cover"
          />
        </TouchableOpacity>

        <View>
          <Text style={styles.headerText}>Caption</Text>
          <TextInput
            style={styles.captionInput}
            placeholder="What's on your mind?"
            onChangeText={(text) => setCaption(text)}
            value={caption}
          />
        </View>
        <TouchableOpacity
          style={styles.SubmitPostButton}
          onPress={onCreatePost}
        >
          {api?.loading !== "idle"
            ? (
            <ActivityIndicator color={"#fff"} size={"small"} />
              )
            : (
            <Text style={styles.SubmitPostButtonText}>Create Post</Text>
              )}
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default CreatePostScreen;
