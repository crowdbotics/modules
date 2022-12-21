import React, { useState, Fragment } from "react";
import { Button, TextInput, View, Text, StyleSheet } from "react-native";
import ImagePicker from "react-native-image-crop-picker";
import CirclePrompt from "../Components/CirclePrompt";
import { useStore } from "../Store";
import { usePubNub } from "pubnub-react";
import options from "../options";
import Loader from "../Components/loader";
import { upload } from "../Api";
import { setChannelMetadata } from "../utils";

const EditChannelDetails = ({ navigation, route }) => {
  const { state, dispatch } = useStore();
  const pubnub = usePubNub();
  const [name, setName] = useState(route.params.item.name);
  const [image, setImage] = useState(null);
  const [localImage, setLocalImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    setLoading(true);
    await setChannelMetadata(pubnub, route.params.item.id, { name });
    const channel = state.channels[route.params.item.id];
    if (image) {
      try {
        const file = await upload(image);
        await setChannelMetadata(pubnub, route.params.item.id, { custom: { ...channel.custom, caption: file.url } });
        dispatch({
          channels: {
            ...state.channels,
            [route.params.item.id]: {
              ...channel,
              name,
              custom: { ...channel.custom, caption: file.url }
            }
          }
        });
        setLoading(false);
        navigation.goBack();
      } catch (e) {
        console.log("failed to upload a file", e);
        setLoading(false);
      }
    } else {
      dispatch({
        channels: {
          ...state.channels,
          [route.params.item.id]: {
            ...channel,
            name
          }
        }
      });
      setLoading(false);
    }
  };

  const pickImage = async () => {
    const result = await ImagePicker.openPicker({
      mediaType: "photo",
      includeBase64: true
    });
    if (!result) {
      return console.log("picking result cancelled");
    }
    setImage(result.data);
    setLocalImage(result.path);
  };

  return (
    <Fragment>
      {loading && <Loader />}
      <View style={styles.Container}>
        <CirclePrompt
          onPress={pickImage}
          source={localImage || route.params.item.custom.caption}
        />
        <View style={[options.section, styles.Mt20]}>
          <Text style={styles.ChannelName}>Channel name</Text>
          <TextInput
            placeholder="Name"
            value={name}
            onChangeText={setName}
            style={[options.ListViewStyle.subtitle, styles.TextInput]}
          />
        </View>
        <View style={styles.Mt20}>
          <Button title="Update" onPress={submit} />
        </View>
      </View>
    </Fragment>
  );
};

const styles = StyleSheet.create({
  Container: {
    backgroundColor: "white",
    height: "100%",
    padding: 10,
    paddingTop: 20
  },
  Mt20: {
    marginTop: 20
  },
  ChannelName: {
    fontWeight: "bold"
  },
  TextInput: {
    borderBottomWidth: 1
  }
});
export default EditChannelDetails;
