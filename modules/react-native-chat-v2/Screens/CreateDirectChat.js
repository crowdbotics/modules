import React, { useState } from 'react';
import { SectionList, TouchableOpacity, View } from 'react-native';
import SearchBar from '../Components/SearchBar';
import { ChannelType, useStore } from '../Store/store';
// @ts-ignore
import { usePubNub } from 'pubnub-react';
import { StyleSheet, Text } from 'react-native';
import Circle from '../Components/Circle';

const CreateDirectChat = ({ navigation }) => {
  const pubnub = usePubNub();
  const { state, dispatch } = useStore();
  const [search, setSearch] = useState('');
  const data = search ? state.contacts.filter(item => item.name.includes(search)) : state.contacts;
  
  const createChat = async (item) => {
    const channel = `${state.user._id}-${item._id}`;
    const res1 = await pubnub.objects.setChannelMetadata({ channel, data: { name: state.user.name +" - "+ item.name, custom: { type: ChannelType.Direct, owner: state.user._id } }});
    const res2 = await pubnub.objects.setChannelMembers({ channel, uuids: [{ id: state.user._id }, { id: `${item._id}` }] });
    const res3 = await pubnub.channelGroups.addChannels({ channels: [channel], channelGroup: state.user._id });
    dispatch({
      channels: {
        ...state.channels,
        [channel]: {
          id: channel,
          name: state.user.name +" - "+ item.name,
          custom: { type: ChannelType.Direct, owner: state.user._id }
        }
      }
    });
    navigation.replace('Channel', { item: { id: channel, name: state.user.name +" - "+ item.name, custom: { type: ChannelType.Direct, owner: state.user._id } } });
  };

  const ListItem = (item) => {
    return (
      <TouchableOpacity onPress={() => createChat(item)}>
        <View key={item.id} style={styles.ListItem}>
          <View style={styles.ProfileContainer}>
            <View style={styles.ProfileBox}>
              <Circle letter={(item.name ? item.name[0] : '').toUpperCase()} source={""} />
            </View>
            <View style={styles.Profile} >
              <Text style={{ ...styles.ProfileText, marginTop: 8 }}>{item.name}</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    )
  }

  return (
    <View style={styles.Container}>
      <SearchBar value={search} onChange={setSearch} />
      <SectionList
        sections={[{ title: "Contacts", data: data }]}
        keyExtractor={(item, index) => item + index}
        renderItem={({ item }) => ListItem(item)}
        renderSectionHeader={({ section: { title } }) => (
          <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
            <Text style={styles.GroupHeading}>{title}</Text>
          </View>
        )}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  Container: {
    backgroundColor: 'white',
    height: '100%',
    padding: 10,
    paddingTop: 20
  },
  ProfileBox: {
    height: 42,
    width: 42,
    borderRadius: 50,
    backgroundColor: '#292B2F'
  },
  ProfileContainer: {
    display: 'flex',
    flexDirection: 'row'
  },
  ListItem: {
    backgroundColor: "#f0f3f7",
    padding: 8,
    marginBottom: 5
  },
  Profile: {
    marginLeft: 15,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "82%"
  },
  ProfileText: {
    color: '#292B2F',
    fontWeight: 'bold',
    fontSize: 16
  },
  GroupHeading: {
    color: '#292B2F',
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 10
  }
});

export default CreateDirectChat

function useEffect(arg0, arg1) {
  throw new Error('Function not implemented.');
}
