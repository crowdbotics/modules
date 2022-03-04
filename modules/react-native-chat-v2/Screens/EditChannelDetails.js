import React, { useLayoutEffect, useState } from 'react';
import { ActivityIndicator, Button, TextInput, View } from 'react-native';
import ImagePicker from 'react-native-image-crop-picker'
import CirclePrompt from '../Components/CirclePrompt';
import { upload } from '../Store/storage';
import { useStore } from '../Store/store';
// @ts-ignore
import { usePubNub } from 'pubnub-react';
import options from '../options';

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
    console.log('updating channel name', name, res);
    const channel = state.channels[route.params.item.id];
    if (image) {
      try {
        const file = await upload(Buffer.from(image, 'base64'));
        console.log('uploaded file', file.size);
        const res2 = await pubnub.objects.setChannelMetadata({
          channel: route.params.item.id,
          data: { custom: { ...channel.custom, caption: file.url } }
        });
        console.log('setting caption to channel data', res2);
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

    console.log('picking result', result);
    setImage(result.base64);
    setLocalImage(result.uri);
  };
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => <View style={options.NavigationStyle.headerRight}>
        {loading ? <ActivityIndicator /> : <Button title="Done" onPress={submit} />}
      </View>
    });
  }, [navigation, name, image, loading]);
  return <View>
    <CirclePrompt onPress={pickImage} source={localImage || route.params.item.custom.caption} />
    <View style={options.section}>
      <TextInput placeholder="Name" value={name} onChangeText={setName} style={options.ListViewStyle.subtitle} />
    </View>
  </View>;
};
