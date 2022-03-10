import React, { useState, useEffect } from 'react';
import { Button, FlatList, Text, TextInput, View } from 'react-native';
import { ChannelType, useStore } from '../Store/store';
import { StyleSheet } from 'react-native';
import Circle from '../Components/Circle';
// @ts-ignore
import CheckBox from '@react-native-community/checkbox';
import { cloneArray } from '../utils';
// @ts-ignore
import { usePubNub } from 'pubnub-react';
import Loader from '../Components/loader';

export default ({ navigation }) => {
  const pubnub = usePubNub();
  const [loading, setLoading] = useState(false);
  const { state, dispatch } = useStore();
  const [contacts, setContacts] = useState([])
  const [name, setName] = useState('');
  const [isNameError, setIsNameError] = useState(false);
  
  useEffect(() => {
    setContacts(state.contacts.map(obj => ({ ...obj, isSelected: false })))
  }, [state.contacts])

  const handleCheckBox = (newValue, item) => {
    const tmpContacts = cloneArray(contacts)
    let obj = tmpContacts.find(obj => obj._id == item._id)
    obj.isSelected = newValue
    setContacts(tmpContacts)
  }

  const ListItem = (item) => {
    return (
      <View key={item.id} style={styles.ListItem}>
        <View style={styles.ProfileContainer}>
          <View style={styles.CheckBoxContainer}>
            <CheckBox
              tintColors={{ true: '#4CAF50', false: 'lightgray' }}
              value={item.isSelected}
              onValueChange={(newValue) => handleCheckBox(newValue, item)}
            />
          </View>
          <View style={styles.ProfileBox}>
            <Circle letter={(item.name ? item.name[0] : '').toUpperCase()} source={""} />
          </View>
          <View style={styles.Profile} >
            <Text style={styles.ProfileText}>{item.name}</Text>
          </View>
        </View>
      </View>
    )
  }

  const createGroup = async () => {
    if (loading)
      return;
    if (!name.length) {
      setIsNameError(true)
      return
    }
    setLoading(true);
    const channel = contacts.filter(obj => { return obj.isSelected }).map(user => user._id).join("-")
    const res1 = await pubnub.objects.setChannelMetadata({ channel, data: { name, custom: { type: ChannelType.Group, owner: state.user._id } }});
    const res2 = await pubnub.objects.setChannelMembers({ channel, uuids: contacts.filter(obj => { return obj.isSelected }).map(user => user._id)});
    const res3 = await pubnub.channelGroups.addChannels({ channels: [channel], channelGroup: state.user._id});
    dispatch({
      channels: {
        ...state.channels,
        [channel]: { id: channel, name, custom: { type: ChannelType.Group, owner: state.user._id } }
      }
    });
    setLoading(false);
    navigation.reset({
      index: 0,
      routes: [{ name: 'Channels' }, {
        name: 'Channel',
        params: { item: { id: channel, name, custom: { type: ChannelType.Group, owner: state.user._id } } }
      }]
    });
  };

  return (
    <>
      {loading && <Loader />}
      <View style={styles.Container}>
        <View>
          <TextInput style={styles.TextInput} autoFocus={true} value={name} onChangeText={setName} placeholder="Group Name" />
          {isNameError && <Text style={styles.GroupName}>Please enter group name.</Text> }
        </View>
        <View>
          <Text style={styles.GroupHeading}>Select group members</Text>
        </View>
        <FlatList
          data={contacts}
          renderItem={({ item }) => ListItem(item)}
          keyExtractor={item => item._id}
        />
        <Button disabled={(contacts.filter(obj => { return obj.isSelected }).length == 0 || loading) ? true : false} onPress={createGroup} title="Create Group" />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  Container: {
    backgroundColor: 'white',
    height: '100%',
    padding: 10
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
    flexDirection: "column"
  },
  ProfileText: {
    color: '#292B2F',
    fontWeight: 'bold',
    fontSize: 16,
    marginTop: 8,
  },
  GroupHeading: {
    color: '#292B2F',
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 10
  },
  CheckBoxContainer: {
    marginBottom: 5,
    marginTop: 5,
    marginRight: 8
  },
  TextInput: {
    color: "#000" 
  }, 
  GroupName: {
    fontSize: 12,
    color: '#dc3545'
  }
})

