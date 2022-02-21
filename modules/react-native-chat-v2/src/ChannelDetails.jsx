import React, { useEffect, useLayoutEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { InlineButton } from './components/Button';
import { usePubNub } from "pubnub-react";
import { ChannelType, useStore } from "./store";
import { ChatMember, ManagedChatMember } from "./components/ListViewItem";
import styles, { ListViewStyle } from "./styles";
import { fetchChannels } from "./model";
export default ({ route, navigation }) => {
    const item = route.params.item;
    if (item.custom.type === ChannelType.Group)
        return <GroupChatDetails route={route} navigation={navigation}/>;
    if (item.custom.type === ChannelType.Direct)
        return <DirectChatDetails route={route} navigation={navigation}/>;
};
const DirectChatDetails = ({ route, navigation }) => {
    const pubnub = usePubNub();
    const { state, dispatch } = useStore();
    const [loading, setLoading] = useState(false);
    const deleteChannel = async () => {
        setLoading(true);
        const [metadataRes, channelGroupRes] = await Promise.all([
            pubnub.objects.removeChannelMetadata({ channel: route.params.item.id }),
            pubnub.channelGroups.removeChannels({
                channelGroup: state.user._id,
                channels: [route.params.item.id]
            })
        ]);
        console.log('removing channel metadata', metadataRes);
        console.log('removing channel from channel group', channelGroupRes);
        const channels = await fetchChannels(pubnub, state.user._id);
        dispatch({ channels });
        setLoading(false);
        navigation.pop(2);
    };
    if (loading)
        return <View><ActivityIndicator /></View>;
    return <View>
    <View style={styles.section}>
      <InlineButton title="Block User" onPress={deleteChannel}/>
    </View>
  </View>;
};
const MembersViewList = ({ channel }) => {
    const { state, dispatch } = useStore();
    const members = state.members[channel.id] ?? [];
    const [loading, setLoading] = useState(true);
    const pubnub = usePubNub();
    useEffect(() => {
        const bootstrap = async () => {
            const res = await pubnub.objects.getChannelMembers({ channel: channel.id });
            const _members = res.data.map(member => state.contacts.find(contact => contact._id === member.uuid.id));
            dispatch({ members: { ...state.members, [channel.id]: _members } });
            setLoading(false);
        };
        bootstrap();
    }, []);
    const removeMember = async (member) => {
        setLoading(true);
        const res = await pubnub.objects.removeChannelMembers({ channel: channel.id, uuids: [member._id] });
        console.log('removing channel member', member, res);
        const _members = state.members[channel.id].filter(m => m._id !== member._id);
        dispatch({ members: { ...state.members, [channel.id]: _members } });
        setLoading(false);
    };
    if (loading)
        return <ActivityIndicator />;
    if (`${state.user._id}-${channel.name}` === channel.id)
        return <>{members.map((member, i, all) => <View key={member._id}>
    <ManagedChatMember member={member} buttonText="Remove" onPress={() => removeMember(member)}/>
    {i !== all.length - 1 && <View style={ListViewStyle.separator}/>}
  </View>)}</>;
    return <>{members.map((member, i, all) => <View key={member._id}>
    <ChatMember member={member}/>
    {i !== all.length - 1 && <View style={ListViewStyle.separator}/>}
  </View>)}</>;
};
const GroupChatDetails = ({ route, navigation }) => {
    const pubnub = usePubNub();
    const { state, dispatch } = useStore();
    const channel = state.channels[route.params.item.id];
    const item = route.params.item;
    useLayoutEffect(() => {
        navigation.setOptions({
            title: channel.name
        });
    }, [navigation, channel]);
    const leaveChannel = async () => {
        console.log('leaving channel');
        const [membersRes, unsubscribeRes, removeMetadataRes] = await Promise.all([
            pubnub.objects.removeChannelMembers({
                channel: item.id,
                uuids: [state.user._id]
            }),
            pubnub.channelGroups.removeChannels({
                channelGroup: state.user._id,
                channels: [item.id]
            }),
            pubnub.objects.removeChannelMetadata({
                channel: item.id
            })
        ]);
        console.log('remove channel members res', membersRes);
        console.log('remove from group channel res', unsubscribeRes);
        console.log('remove channel metadata res', removeMetadataRes);
        const channels = await fetchChannels(pubnub, state.user._id);
        dispatch({ channels });
        navigation.pop(2);
    };
    const deleteChannel = async () => {
        if (item.id === state.user._id) {
            return console.log('cannot delete notes channel');
        }
        const channel = item.id;
        const members = await pubnub.objects.getChannelMembers({ channel });
        console.log('getting members from channel', members.data);
        const removeChannelMembersRes = await pubnub.objects.removeChannelMembers({ channel, uuids: members.data.map(member => member.uuid.id) });
        console.log('removing members from channel', removeChannelMembersRes);
        const removeChannelMetadataRes = await pubnub.objects.removeChannelMetadata({ channel });
        console.log('removing channel metadata', removeChannelMetadataRes);
        const deleteMessagesRes = await pubnub.deleteMessages({ channel });
        console.log('removing channel messages', deleteMessagesRes);
        const removeChannelRes = await pubnub.channelGroups.removeChannels({ channels: [channel], channelGroup: state.user._id });
        console.log('remove channel from channel group', removeChannelRes);
        const channels = { ...state.channels };
        delete channels[channel];
        dispatch({ channels });
        navigation.replace('Channels');
    };
    const addMembers = () => {
        navigation.navigate('AddMember', { item });
    };
    return <View>
    <View style={styles.section}>
      <InlineButton title="Add members" onPress={addMembers}/>
      <InlineButton title="Leave group" onPress={leaveChannel}/>
    </View>
    <View style={styles.section}>
      <MembersViewList channel={item}/>
    </View>
  </View>;
};
