import React, { useState } from 'react';
import { View } from 'react-native';
import SearchBar from './SearchBar';
import { ChannelType, useStore } from './store';
import { usePubNub } from 'pubnub-react';
import { InlineButton } from './components/Button';
import ContactList from './ContactList';
export default ({ navigation }) => {
    const pubnub = usePubNub();
    const { state, dispatch } = useStore();
    const [search, setSearch] = useState('');
    const data = search ? state.contacts.filter(item => item.name.includes(search)) : state.contacts;
    const createChat = async (item) => {
        console.log('creating new chat with', item);
        const channel = `${state.user._id}-${item._id}`;
        const res1 = await pubnub.objects.setChannelMetadata({
            channel,
            data: { name: item.name, custom: { type: ChannelType.Direct } }
        });
        console.log('setting new channel metadata', res1);
        const res2 = await pubnub.objects.setChannelMembers({ channel, uuids: [{ id: state.user._id }, { id: `${item._id}` }] });
        console.log('setting channel members', res2);
        const res3 = await pubnub.channelGroups.addChannels({
            channels: [channel],
            channelGroup: state.user._id
        });
        console.log('adding channel to channel groups', res3);
        dispatch({
            channels: {
                ...state.channels,
                [channel]: {
                    id: channel,
                    name: item.name,
                    custom: { type: ChannelType.Direct }
                }
            }
        });
        navigation.replace('Channel', { item: { id: channel, name: item.name, custom: { type: ChannelType.Direct } } });
    };
    return <View>
        <SearchBar value={search} onChange={setSearch}/>
        <InlineButton title="New Group" onPress={() => navigation.navigate('CreateChannel')}/>
        <InlineButton title="New Contact" onPress={() => {
        console.log('attempt to create new contact');
    }}/>
        <ContactList data={data} onPress={(item) => createChat(item)}/>
    </View>;
};
