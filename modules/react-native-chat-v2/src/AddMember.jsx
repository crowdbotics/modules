import React, { useState } from 'react';
import ContactList from './ContactList';
import { useStore } from './store';
import { usePubNub } from 'pubnub-react';
export default ({ navigation, route }) => {
    const { state, dispatch } = useStore();
    const [loading, setLoading] = useState(false);
    const pubnub = usePubNub();
    const data = state.contacts;
    const addUser = async (user) => {
        if (loading)
            return;
        setLoading(true);
        const res = await pubnub.objects.setChannelMembers({
            channel: route.params.item.id,
            uuids: [user._id]
        });
        console.log('adding user', user, res);
        const channel = route.params.item.id;
        const _members = [...state.members[channel], user];
        dispatch({ members: { ...state.members, [channel]: _members } });
        setLoading(false);
        return navigation.goBack();
    };
    return <ContactList data={data} onPress={addUser}/>;
};
