import React, { useCallback, useLayoutEffect, useState } from 'react';
import { useStore } from './store';
import { ActivityIndicator, FlatList, Text } from 'react-native';
import { usePubNub } from 'pubnub-react';
import { ChannelListItem } from './ChannelListItem';
import { useFocusEffect } from '@react-navigation/native';
import { ChatStyle, NavigationStyle } from './styles';
import { fetchChannels } from "./model";
export default ({ navigation }) => {
    const pubnub = usePubNub();
    const { state, dispatch } = useStore();
    const [loading, setLoading] = useState(true);
    useFocusEffect(useCallback(() => {
        if (!dispatch)
            return;
        const bootstrap = async () => {
            setLoading(true);
            const channels = await fetchChannels(pubnub, state.user._id);
            dispatch({ channels });
            setLoading(false);
        };
        bootstrap();
    }, []));
    useLayoutEffect(() => {
        if (loading) {
            navigation.setOptions({ headerTitle: () => <ActivityIndicator /> });
        }
        else {
            navigation.setOptions({ headerTitle: () => <Text style={NavigationStyle.title}>Chats</Text> });
        }
    }, [loading]);
    const channels = Object.entries(state.channels).map(([id, rest]) => ({ id, ...rest }));
    return <FlatList refreshing={loading} onRefresh={async () => {
        setLoading(true);
        const channels = await fetchChannels(pubnub, state.user._id);
        dispatch({ channels });
        setLoading(false);
    }} data={channels} contentContainerStyle={ChatStyle.container} renderItem={({ item, index }) => <ChannelListItem key={item.id} index={index} length={channels.length} item={item} onPress={() => navigation.navigate('Channel', { item })}/>} keyExtractor={(item) => item.id}/>;
};
