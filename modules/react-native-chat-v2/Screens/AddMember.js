import React, { useState } from 'react';
import { useStore } from '../Store/store';
// @ts-ignore
import { usePubNub } from 'pubnub-react';
import { Pressable, View, Text, SectionList, TouchableOpacity } from 'react-native';
import Circle from '../Components/Circle';
import { StyleSheet } from 'react-native';

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
    const channel = route.params.item.id;
    const _members = [...state.members[channel], user];
    dispatch({ members: { ...state.members, [channel]: _members } });
    setLoading(false);
    navigation.goBack();
  };

  const ListItem = (item) => {
    return (
      <TouchableOpacity onPress={() => addUser(item)}>
        <View key={item.id} style={styles.ListItem}>
          <View style={styles.ProfileContainer}>
            <View style={styles.ProfileBox}>
              <Circle letter={(item.name ? item.name[0] : '').toUpperCase()} source={""} />
            </View>
            <View style={styles.Profile} >
              <Text style={{...styles.ProfileText, marginTop: 8}}>{item.name}</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    )
  }
  
  return (
    <View style={styles.Container}>
      <SectionList
        refreshing={loading}
        sections={[{ title: "Contacts", data: data}]}
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
};

const styles = StyleSheet.create({
  Container: {
    backgroundColor: 'white',
    height: '100%',
    padding: 10,
    paddingTop: 20
  },
  TopProfileContainer: {
    height: 80,
    display: "flex",
    flexDirection: "row",
    alignContent: "center",
    alignItems: "center",
    padding: 8
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