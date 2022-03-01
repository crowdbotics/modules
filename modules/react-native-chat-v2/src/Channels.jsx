import React, { useCallback, useLayoutEffect, useState } from 'react';
import { useStore } from './store';
import { ActivityIndicator, FlatList, Text, TouchableOpacity, View, Image, Pressable, SectionList } from 'react-native';
// @ts-ignore
import { usePubNub } from 'pubnub-react';
// @ts-ignore
import { useFocusEffect } from '@react-navigation/native';
import { NavigationStyle } from './styles';
import { fetchChannels } from "./model";
import { StyleSheet } from 'react-native';
import Circle from './components/Circle';

const Channels = ({ navigation }) => {
  const pubnub = usePubNub();
  const { state, dispatch } = useStore();
  const [loading, setLoading] = useState(true);

  const bootstrap = async () => {
    setLoading(true);
    const channels = await fetchChannels(pubnub, state.user._id);
    dispatch({ channels });
    setLoading(false);
  };

  useFocusEffect(useCallback(() => {
    if (!dispatch)
      return;
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
  const DATA = [
    {
      title: "Channels",
      data: channels.filter((item) => { return item.custom.type == "1" }).map((obj) => ({...obj}))
    },
    {
      title: "Direct Chats",
      data: channels.filter((item) => { return item.custom.type == "0" }).map((obj) => ({...obj}))
    }
  ];

  return (
    <View style={styles.Container}>
      <View style={styles.TopProfileContainer}>
        <View style={styles.ProfileContainer}>
          <View style={styles.ProfileBox}>
            <Image style={styles.ProfileBox} source={{ uri: state.user.avatar }}></Image>
          </View>
          <View style={styles.Profile} >
            <Text style={styles.ProfileText}>{state.user.name}</Text>
          </View>
        </View>
      </View>
      <SectionList
        refreshing={loading}
        onRefresh={async () => {
          await bootstrap()
        }}
        sections={DATA}
        keyExtractor={(item, index) => item + index}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => navigation.navigate('Channel', { item: item })}>
            <View key={item.id} style={styles.ListItem}>
              <View style={styles.ProfileContainer}>
                <View style={styles.ProfileBox}>
                  <Circle letter={(item.name ? item.name[0] : '').toUpperCase()} source={item.custom.caption}/>
                </View>
                <View style={styles.Profile} >
                  <Text style={styles.ProfileText}>{item.name}</Text>
                  <Text style={{fontSize: 12, color: "gray"}}>{(new Date(item.updated)).toLocaleString("en")}</Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        )}
        renderSectionHeader={({ section: { title } }) => (
          <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
            <Text style={styles.GroupHeading}>{title}</Text>
            {title == "Channels" && 
              <Pressable>
                <Text style={styles.GroupHeading}>Create</Text>
              </Pressable>
            }
          </View>
        )}
      />
    </View>
    
  )
  // return <FlatList refreshing={loading} onRefresh={async () => {
  //   setLoading(true);
  //   const channels = await fetchChannels(pubnub, state.user._id);
  //   dispatch({ channels });
  //   setLoading(false);
  //   }}
  //  data={channels} contentContainerStyle={ChatStyle.container}
  // renderItem={({ item, index }) => <ChannelListItem key={item.id} index={index} length={channels.length} item={item} onPress={() => navigation.navigate('Channel', { item })} />} keyExtractor={(item) => item.id} />;
};
const styles = StyleSheet.create({
  Container: {
    backgroundColor: 'white',
    height: '100%',
    padding: 10
  },
  TopProfileContainer: {
    height: 80,
    // backgroundColor: "#f0f3f7",
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
    flexDirection: "column"
  },
  ProfileText: {
    color: '#292B2F',
    fontWeight: 'bold',
    fontSize: 16,
    marginTop: 2,
  },
  GroupHeading: {
    color: '#292B2F',
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 10
  },
});
export default Channels