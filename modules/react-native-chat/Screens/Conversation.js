import React, { useEffect, useState, useCallback } from "react";
import { useStore } from "../Store";
import {
  Text,
  TouchableOpacity,
  View,
  Image,
  Pressable,
  SectionList,
  StyleSheet
} from "react-native";

import { usePubNub } from "pubnub-react";
import { fetchChannels, getByValue, makeChannelsList, timeSince } from "../utils";
import Circle from "../Components/Circle";
import SearchBar from "../Components/SearchBar";

import { useFocusEffect } from "@react-navigation/native";

const Conversations = ({ navigation }) => {
  const pubnub = usePubNub();
  const { state, dispatch } = useStore();
  const [loading, setLoading] = useState(true);
  const [conversationList, setConversationList] = useState([]);
  const [search, setSearch] = useState("");

  const bootstrap = () => {
    setLoading(true);
    fetchChannels(pubnub, state.user._id).then((channels) => {
      dispatch({ channels });
      setLoading(false);
    });
  };

  useEffect(() => {
    if (!dispatch) {
      return;
    }
    bootstrap();
  }, []);

  useEffect(() => {
    const DATA = makeChannelsList(state.channels);
    setConversationList(DATA);
  }, [state.channels]);

  useEffect(() => {
    if (search !== "") {
      const channels = Object.entries(state.channels).map(([id, rest]) => ({
        id,
        ...rest
      }));
      const filterChannels = channels.filter((channel) =>
        channel.name.toLowerCase().includes(search.toLowerCase())
      );
      const DATA = makeChannelsList(filterChannels);
      setConversationList(DATA);
    } else {
      const DATA = makeChannelsList(state.channels);
      setConversationList(DATA);
    }
  }, [search]);

  useFocusEffect(
    useCallback(() => {
      getLastSeen();
    }, [state.channels])
  );

  const getLastSeen = () => {
    if (Object.keys(state.channels).length > 0) {
      const channels = Object.entries(state.channels).map(([id, rest]) => ({
        id,
        ...rest
      }));
      Object.keys(state.channels).forEach((channel) => {
        pubnub.hereNow(
          {
            channels: [channel],
            includeUUIDs: true,
            includeState: true
          },
          (status, response) => {
            const tmp = getByValue(channels, channel);
            if (tmp) {
              tmp.last_seen =
                response.channels[channel]?.occupants[0]?.state?.last_seen;
              const DATA = [
                {
                  title: "Channels",
                  data: channels
                    .filter((item) => {
                      return item.custom.type === 1;
                    })
                    .map((obj) => ({ ...obj }))
                },
                {
                  title: "Direct Chats",
                  data: channels
                    .filter((item) => {
                      return item.custom.type === 0;
                    })
                    .map((obj) => ({ ...obj }))
                }
              ];
              setConversationList(DATA);
            }
          }
        );
      });
    }
  };

  const ListItem = (item) => {
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate("Channel", { item: item })}
      >
        <View key={item.id} style={styles.ListItem}>
          <View style={styles.ProfileContainer}>
            <View style={styles.ProfileBox}>
              <Circle
                letter={(item.name ? item.name[0] : "").toUpperCase()}
                source={item.custom.caption}
              />
            </View>
            <View style={styles.Profile}>
              <Text
                style={{
                  ...styles.ProfileText,
                  marginTop: "last_seen" in item && item.last_seen ? 1 : 8
                }}
              >
                {item.name}
              </Text>
              {"last_seen" in item && item.last_seen && (
                <Text style={styles.LastSeenText}>
                  Last seen: {timeSince(new Date(item?.last_seen).getTime())}
                </Text>
              )}
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.Container}>
      <View style={styles.TopProfileContainer}>
        <View style={styles.ProfileContainer}>
          <View style={styles.ProfileBox}>
            <Image
              style={styles.ProfileBox}
              source={{ uri: state.user.avatar }}
            ></Image>
          </View>
          <View style={styles.Profile}>
            <Text style={[styles.ProfileText, styles.MT8]}>
              {state.user.name}
            </Text>
          </View>
        </View>
      </View>
      <SearchBar value={search} onChange={setSearch} />
      <SectionList
        refreshing={loading}
        onRefresh={async () => {
          await bootstrap();
        }}
        sections={conversationList}
        keyExtractor={(item, index) => item + index}
        renderItem={({ item }) => ListItem(item)}
        renderSectionHeader={({ section: { title } }) => (
          <View style={styles.ListContainer}>
            <Text style={styles.GroupHeading}>{title}</Text>
            {title === "Channels"
              ? (
              <Pressable onPress={() => navigation.navigate("CreateChannel")}>
                <Text style={styles.GroupHeading}>Create group</Text>
              </Pressable>
                )
              : (
              <Pressable
                onPress={() => navigation.navigate("CreateDirectChannel")}
              >
                <Text style={styles.GroupHeading}>New chat</Text>
              </Pressable>
                )}
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  Container: {
    backgroundColor: "white",
    height: "100%",
    padding: 10
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
    backgroundColor: "#292B2F"
  },
  ProfileContainer: {
    display: "flex",
    flexDirection: "row"
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
    color: "#292B2F",
    fontWeight: "bold",
    fontSize: 16
  },
  GroupHeading: {
    color: "#292B2F",
    fontWeight: "bold",
    fontSize: 18,
    marginBottom: 10
  },
  LastSeenText: {
    fontSize: 12,
    color: "gray"
  },
  MT8: {
    marginTop: 8
  },
  ListContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between"
  }
});
export default Conversations;
