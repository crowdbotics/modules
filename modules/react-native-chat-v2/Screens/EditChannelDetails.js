import React, { useLayoutEffect, useState } from 'react';
import { ActivityIndicator, Button, TextInput, View, Text } from 'react-native';
import ImagePicker from 'react-native-image-crop-picker'
import CirclePrompt from '../Components/CirclePrompt';
import { upload } from '../Store/storage';
import { useStore } from '../Store/store';
// @ts-ignore
import { usePubNub } from 'pubnub-react';
import options from '../options';
import { StyleSheet } from 'react-native';

export default ({ navigation, route }) => {
  const { state, dispatch } = useStore();
  const pubnub = usePubNub();
  const [name, setName] = useState(route.params.item.name);
  const [image, setImage] = useState(null);
  const [localImage, setLocalImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    setLoading(true);
    const res = await pubnub.objects.setChannelMetadata({
      channel: route.params.item.id,
      data: { name }
    });
    const channel = state.channels[route.params.item.id];
    if (image) {
      try {
        const file = await upload(Buffer.from(image, 'base64'));
        const res2 = await pubnub.objects.setChannelMetadata({
          channel: route.params.item.id,
          data: { custom: { ...channel.custom, caption: file.url } }
        });
        dispatch({
          channels: {
            ...state.channels,
            [route.params.item.id]: { ...channel, name, custom: { ...channel.custom, caption: file.url } }
          }
        });
      }
      catch (e) {
        console.log('failed to upload a file', e);
      }
    }
    dispatch({ channels: { ...state.channels, [route.params.item.id]: { ...channel, name } } });
    setLoading(false);
    navigation.goBack();
  };

  const pickImage = async () => {
    const result = await ImagePicker.openPicker({
      mediaType: 'photo'
    });
    if (!result) {
      return console.log('picking result cancelled')
    }
    setImage(result.path);
    setLocalImage(result.path);
  };

  return (
    <View style={styles.Container}>
      <CirclePrompt onPress={pickImage} source={localImage || route.params.item.custom.caption} />
      <View style={{...options.section, marginTop: 20}}>
        <Text style={{fontWeight: "bold"}}>Channel name</Text>
        <TextInput placeholder="Name" value={name} onChangeText={setName} style={{...options.ListViewStyle.subtitle, borderBottomWidth: 1}} />
      </View>
      <View style={{marginTop: 20}}>
        <Button title="Update" onPress={submit} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  Container: {
    backgroundColor: 'white',
    height: '100%',
    padding: 10,
    paddingTop: 20
  },
})