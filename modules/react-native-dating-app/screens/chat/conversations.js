import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, Image, TextInput, Dimensions, useWindowDimensions } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { SceneMap, TabView, TabBar } from "react-native-tab-view";
import { chatListRequest, getMatchesRequest } from "../../api/redux";
import { useDispatch } from "react-redux";
import ProfileIcon from "../../components/ProfileIcon";

const deviceWidth = Dimensions.get("window").width;

const renderTabBar = props => (
  <TabBar
    {...props}
    indicatorStyle={styles.indicator}
    indicatorContainerStyle={styles.indicatorContainer}
    labelStyle={styles.label}
    style={styles.tab}
  />
);

const FirstRoute = ({ matches, navigation, query, setQuery }) => (
  <View style={styles.container}>
    <HeaderSectionComponent query={query} setQuery={setQuery}></HeaderSectionComponent>
      <View style={{
        width: 30,
        height: 30,
        borderRadius: 180 / 2,
        backgroundColor: "black",
        position: "absolute",
        bottom: 25,
        alignSelf: "flex-end",
        left: 350
      }} />
      <View style={styles.anything}>
        <KeyboardAwareScrollView>
        <View style={styles.EveronesConversation}>
          {matches.length > 0 && matches.map((message, index) => {
            return (
              <TouchableOpacity style={styles.messageContainer} onPress={() => { navigation.navigate("ChatDetails", { user_id: message?.id }); }}>
                <ProfileIcon image_src={message?.profile_info?.profile_image} />
                <View style={styles.messageTextContainer}>
                  <Text style={styles.messageSenderName}>{message?.name}</Text>
                </View>
              </TouchableOpacity>
            );
          })}

        </View>
        </KeyboardAwareScrollView>
      </View>
  </View>
);

const SecondRoute = ({ messages, navigation, query, setQuery }) => (
  <View style={styles.container}>
    <HeaderSectionComponent message={"Enter"} setQuery={setQuery} query={query}></HeaderSectionComponent>
    <View style={styles.anything}>
      <KeyboardAwareScrollView>
        <NameConversations messages={messages} navigation={navigation}></NameConversations>
      </KeyboardAwareScrollView>
    </View>
  </View>
);

export default function Conversations(props) {
  const { navigation } = props;

  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: "first", title: "New Matches" },
    { key: "second", title: "Conversations" }

  ]);

  console.log("navigation", navigation);
  const [matches, setMatches] = useState([]);
  const [messages, setMessages] = useState([]);
  const [allMessages, setAllMessages] = useState([]);
  const dispatch = useDispatch();
  const [query, setQuery] = useState("");
  const [query2, setQuery2] = useState("");

  useEffect(() => {
    if (query.length > 0) {
      setMessages(allMessages.filter((message) => message.name.toLowerCase().includes(query.toLowerCase())));
    } else {
      setMessages(allMessages);
    }
  }, [query]);

  useEffect(() => {
    dispatch(chatListRequest()).then(
      (res) => {
        setMessages(res.payload);
        setAllMessages(res.payload);
      }
    );

    dispatch(getMatchesRequest()).then(
      (res) => {
        setMatches(res.payload);
      }
    );
  }, []);

  const renderScene = SceneMap({
    first: () => <FirstRoute navigation={navigation} matches={matches} query={query2} setQuery={setQuery2} />,
    second: () => <SecondRoute navigation={navigation} messages={messages} query={query} setQuery={setQuery} />
  });

  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{ width: layout.width }}
      renderTabBar={renderTabBar}
      style={{ backgroundColor: "white" }}
      />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    fontSize: 20,
    padding: 5,
    backgroundColor: "#fff"
  },
  anything: {
    padding: 15,
    flex: 1
  },
  topheader: {
    flexDirection: "row",
    margin: 8,
    padding: 5,
    borderRadius: 10,
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "lightgrey",
    backgroundColor: "white"
  },
  headerRightIcon: {
    margin: 10
  },
  tinyLogoHeader: {
    marginLeft: 15,
    width: 31,
    height: 28
  },
  usernameheader: {
    backgroundColor: "white",
    flex: 1,
    padding: 5
  },
  headerleftSection: {
    flexDirection: "row",
    flex: 0.9,
    alignItems: "center"
  },
  SearchImage: {
    marginHorizontal: 7,
    height: 12,
    width: 12,
    marginTop: 3
  },
  CameraImage: {
    marginTop: 3,
    marginLeft: 3
  },
  // ---------------------------------------------------
  // sendermessagecomponent stylesheet
  firstmessagecontainerr: {
    flex: 0.4,
    marginVertical: 5,
    backgroundColor: "rgba(218, 218, 218, 1)",
    padding: 15
  },
  item: {
    width: "25%"
  },
  tinyLogo: {
    marginLeft: 30,
    width: 55,
    height: 50,
    alignItems: "center",
    marginTop: 10
  },
  firstMessage: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: "rgba(252, 241, 214, 1)",
    borderRadius: 10,
    width: "70%",
    marginRight: 10

  },
  firsttext: {
    fontWeight: "bold",
    padding: 10
  },
  newMatches: {
    marginLeft: 15,
    color: "grey"
  },
  // -------------------------------------
  // reciver component
  containerr2: {
    flex: 15,
    alignContent: "center"
  },
  item2: {
    width: "100%",
    flexDirection: "row",
    marginTop: 2
  },
  message2: {
    paddingHorizontal: 5,
    paddingVertical: 20,
    borderRadius: 10,
    marginLeft: 5,
    fontSize: 15
  },
  redlogo2: {
    width: 60,
    height: 62,
    marginLeft: 10
  },
  messageContainer: {
    width: "100%",
    flexDirection: "row",
    marginTop: 10,
    borderBottomColor: "lightgrey",
    borderBottomWidth: 1,
    paddingBottom: 10
  },
  // ---------------------------------------

  // lastsectioncomponent

  Rowsection: {
    flexDirection: "row"
  },
  InputSection: {
    backgroundColor: "rgba(241, 241, 241, 1)",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: 10,
    width: "60%"
  },
  smileImage: {
    marginHorizontal: 7
  },
  MicImage: {
    marginTop: 3,
    marginLeft: 3
  },
  LowerRightSection: {
    flexDirection: "row",
    margin: 10
  },
  cameraIcon: {
    marginTop: 15,
    marginRight: 25,
    marginLeft: 45
  },
  ArrowImage: {
    marginLeft: 15,
    marginTop: 17
  },
  messageTextContainer: {
    marginLeft: 20,
    fontSize: 10,
    justifyContent: "center",
    width: deviceWidth / 1.6
  },
  messageSenderName: {
    fontWeight: "400",
    fontSize: 18,
    color: "grey"
  },
  messageText: {
    fontSize: 16
  },
  messageDate: {
    fontSize: 14,
    color: "grey",
    alignSelf: "flex-start"
  },
  tab: {
    backgroundColor: "#F1F1F1",
    marginHorizontal: 20,
    borderRadius: 10,
    marginTop: 10,
    borderWidth: 0,
    shadowOffset: { width: 0, height: 0 }
  },
  indicator: {
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    height: 38,
    width: deviceWidth / 2.5,
    marginLeft: 10,
    shadowColor: "#000",
    elevation: 5,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2
  },
  indicatorContainer: {
    height: 37,
    marginTop: 6
  },
  label: {
    color: "#000",
    fontSize: 14,
    textTransform: "capitalize"

  }
});

const HeaderSectionComponent = ({ message, query, setQuery }) => {
  return (
    <View style={styles.topheader}>
      <View style={styles.headerleftSection}>
          <TextInput
            value={query}
            onChangeText={text => setQuery(text)}
            placeholder={"enter"} style={styles.usernameheader}></TextInput>
      </View>
      <View style={styles.headerRightIcon}>
        <Image style={styles.SearchImage} source={require("./assets/search.png")}></Image>
      </View>
    </View>
  );
};

const MatchesComponent = () => {
  return (
    <View style={styles.firstmessagecontainerr}>
        <Text style={styles.newMatches}>New matches</Text>
    </View>
  );
};

const MatchesNameComponent = () => {
  return (
    <TouchableOpacity style={styles.messageContainer} onPress={() => { navigation.navigate("ChatDetails", { user_id: 1 }); }}>
      <ProfileIcon onPress={() => {}}/>
      <Text style={styles.message2}>Cody Fisher</Text>
    </TouchableOpacity>
  );
};
const ConversationsComponent = () => {
  return (
    <View style={styles.firstmessagecontainerr}>
        <Text style={styles.newMatches}>Conversations</Text>
    </View>
  );
};

const NameConversations = ({ messages, navigation }) => {
  return (
    <View style={styles.EveronesConversation}>
      {messages.length > 0 && messages.map((message, index) => {
        return (
          <TouchableOpacity style={styles.messageContainer} onPress={() => { navigation.navigate("ChatDetails", { user_id: message?.id }); }}>
            <ProfileIcon />
            <View style={styles.messageTextContainer}>
              <Text style={styles.messageSenderName}>{message?.name}</Text>
              <Text style={styles.messageText} numberOfLines={1}>{message?.last_message?.text}</Text>
              <Text style={styles.messageDate}>{message?.last_message?.created_at}</Text>
            </View>
          </TouchableOpacity>
        );
      })}

    </View>
  );
};
