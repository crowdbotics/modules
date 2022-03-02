import React, { useLayoutEffect, useRef, useState } from 'react';
import { Button, TextInput, View } from 'react-native';
// @ts-ignore
import { usePubNub } from 'pubnub-react';
import { ChannelType, useStore } from '../Store/store';
import styles, { ListViewStyle, NavigationStyle } from '../Navigator/styles';
import Circle from '../Components/Circle';
import { ChatMember } from '../Components/ListViewItem';

export default ({ navigation, route }) => {
    const pubnub = usePubNub();
    const { state, dispatch } = useStore();
    const [name, setName] = useState('');
    const [loading, setLoading] = useState(false);
    const nameInput = useRef(null);
    const createGroup = async () => {
        if (loading)
            return;
        if (!name.length)
            return nameInput.current.focus();
        const channel = `${state.user._id}-${name}`;
        const res1 = await pubnub.objects.setChannelMetadata({
            channel,
            data: { name, custom: { type: ChannelType.Group } }
        });
        console.log('setting new channel metadata', res1);
        const res2 = await pubnub.objects.setChannelMembers({
            channel,
            uuids: route.params.members.map(user => user._id)
        });
        console.log('setting channel members', res2);
        const res3 = await pubnub.channelGroups.addChannels({
            channels: [channel],
            channelGroup: state.user._id
        });
        console.log('adding channel to channel groups', res3);
        dispatch({ channels: {
                ...state.channels,
                [channel]: { id: channel, name, custom: { type: ChannelType.Group } }
            }
        });
        setLoading(false);
        navigation.reset({ index: 0,
            routes: [{ name: 'Channels' }, {
                    name: 'Channel',
                    params: { item: { id: channel, name, custom: { type: ChannelType.Group } } }
                }]
        });
    };
    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => <View style={NavigationStyle.headerRight}>
        <Button onPress={createGroup} title="Create"/>
      </View>
        });
    }, [navigation, name]);
    return <View>
    <View style={[{ flexDirection: 'row' }, styles.section]}>
      <Circle letter="" source=""/>
      <TextInput style={{
        paddingLeft: 16
    }} value={name} onChangeText={setName} placeholder="Group Name" ref={nameInput}/>
    </View>
    <View style={styles.section}>
      {route.params.members.map((member, i, all) => <View key={member._id}>
        <ChatMember member={member}/>
        {i !== all.length - 1 && <View style={ListViewStyle.separator}/>}
      </View>)}
    </View>
  </View>;
};
