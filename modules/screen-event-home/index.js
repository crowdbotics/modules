import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  FlatList,
  Pressable,
  TextInput
} from "react-native";

const EventHome = () => {
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [events, setEvents] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedTab, setSelectedTab] = useState(0);
  const [user, setUser] = useState({});
  useEffect(() => {
    setUpcomingEvents([
      {
        id: 1,
        title: "Event Name 2022",
        location: "New York, USA",
        joined: 48,
        image: require("./assets/eventImage-lg.png")
      },
      {
        id: 2,
        title: "Event Name 2022",
        location: "New York, USA",
        joined: 48,
        image: require("./assets/eventImage-lg.png")
      },
      {
        id: 3,
        title: "Event Name 2022",
        location: "New York, USA",
        joined: 48,
        image: require("./assets/eventImage-lg.png")
      }
    ]);
    setEvents([
      {
        id: 1,
        title: "Inster Representative Name",
        location: "New York, USA",
        time: "11:00 AM",
        date: "28 Sept 2022",
        image: require("./assets/eventImage-sm.png")
      },
      {
        id: 2,
        title: "Inster Representative Name",
        location: "New York, USA",
        time: "11:00 AM",
        date: "28 Sept 2022",
        image: require("./assets/eventImage-sm.png")
      },
      {
        id: 3,
        title: "Inster Representative Name",
        location: "New York, USA",
        time: "11:00 AM",
        date: "28 Sept 2022",
        image: require("./assets/eventImage-sm.png")
      },
      {
        id: 4,
        title: "Inster Representative Name",
        location: "New York, USA",
        time: "11:00 AM",
        date: "28 Sept 2022",
        image: require("./assets/eventImage-sm.png")
      }
    ]);
    setUser({
      name: "User Name"
    });
  }, []);
  return (
    <View style={styles.container}>
      <FlatList
        style={styles.list}
        ListHeaderComponent={() => (
          <View>
            <Text style={styles.greetingText}>Good Morning,</Text>
            <Text style={styles.username}>{user.name}</Text>
            <Input
              text="Search"
              value={search}
              onChange={(text) => setSearch(text)}
              containerStyle={styles.inputContainer}
            />
            <View style={styles.listHeader}>
              <Text style={styles.headerHeading}>Upcoming Event</Text>
              <Text style={styles.headerSubText}>View All</Text>
            </View>
            <FlatList
              data={upcomingEvents}
              renderItem={({ item }) => <UpcomingEvent event={item} />}
              keyExtractor={(item) => item.id.toString()}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
            />
            <TabView
              tabTitles={["Event", "Event", "Event", "Event"]}
              selected={selectedTab}
              onPress={(index) => setSelectedTab(index)}
              style={styles.tabView}
            />
          </View>
        )}
        data={events}
        renderItem={({ item }) => <Event event={item} />}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
      />
      <Footer
        images={[
          require("./assets/homeIconActive.png"),
          require("./assets/starIcon.png"),
          require("./assets/taskIcon.png"),
          require("./assets/mapIcon.png")
        ]}
        titles={["Home", "Sponsors", "Tasks", "Map"]}
        active={0}
        activeColor="#7C7C7C"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  greetingText: {
    fontSize: 12,
    marginLeft: 20
  },
  username: {
    fontSize: 22,
    fontWeight: "bold",
    marginLeft: 20,
    marginBottom: 10
  },
  inputContainer: {
    paddingHorizontal: 10,
    marginTop: 10
  },
  list: {
    flex: 1,
    marginBottom: 60
  },
  listHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10
  },
  headerHeading: {
    fontSize: 14,
    fontWeight: "bold"
  },
  headerSubText: {
    fontSize: 12,
    color: "#7C7C7C"
  },
  tabView: {
    alignSelf: "center",
    marginVertical: 10
  }
});

export default EventHome;

const Footer = (props) => {
  const generator = props.hideTitle ? props.images : props.titles;
  const bgColor = {
    backgroundColor: props.backgroundColor ? props.backgroundColor : "#C4C4C4"
  };
  const titleColor = {
    color: props.titleColor ? props.titleColor : "#fff"
  };
  const activeColor = {
    color: props.activeColor ? props.activeColor : "#000"
  };
  return (
    <View style={[footerStyles.footer, bgColor]}>
      {generator.map((title, index) => (
        <View style={footerStyles.footerItem} key={index}>
          <Image
            style={footerStyles.footerImage}
            source={props.images[index]}
          />
          {props.hideTitle
            ? null
            : (
            <Text
              style={[
                titleColor,
                footerStyles.footerItemText,
                index === props.active ? activeColor : null
              ]}
            >
              {title}
            </Text>
              )}
        </View>
      ))}
    </View>
  );
};

const footerStyles = StyleSheet.create({
  footer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 60,
    backgroundColor: "#C4C4C4",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20
  },
  footerItem: {
    alignItems: "center",
    justifyContent: "center",
    height: "100%"
  },
  footerItemText: {
    fontSize: 13,
    color: "#fff",
    marginTop: 5
  },
  footerImage: {
    width: 20,
    height: 20,
    resizeMode: "contain"
  }
});

const Input = (props) => {
  return (
    <View style={[inputStyles.inputContainer, props.containerStyle]}>
      {props.text
        ? (
        <Text style={inputStyles.inputText}>{props.text}</Text>
          )
        : null}

      <TextInput
        style={[
          inputStyles.input,
          props.style,
          props.textArea ? inputStyles.textArea : null
        ]}
        placeholder={props.placeholder ? props.placeholder : "Enter"}
        value={props.value}
        onChangeText={(text) => props.onChange(text)}
        placeholderTextColor={
          props.placeholderTextColor ? props.placeholderTextColor : "#9B9B9B"
        }
        editable={props.editable !== false}
        autoCapitalize="none"
        autoCorrect={false}
        multiline={!!props.textArea}
      />
      {props.errorText
        ? (
        <Text style={inputStyles.error}>{props.errorText}</Text>
          )
        : null}
      {props.icon
        ? (
        <Image
          source={props.icon}
          style={
            props.text ? inputStyles.iconWithText : inputStyles.iconWithoutText
          }
        />
          )
        : null}
      <View style={styles.children}>{props.children}</View>
    </View>
  );
};

const inputStyles = StyleSheet.create({
  inputContainer: {
    flexDirection: "column",
    justifyContent: "center"
    // flex: 1
  },
  inputText: {
    fontSize: 14,
    marginLeft: 20,
    color: "#111112"
  },
  input: {
    borderWidth: 1,
    borderColor: "#e6e6e6",
    borderRadius: 10,
    padding: 10,
    paddingLeft: 20,
    marginVertical: 10,
    width: "100%",
    height: 50
  },
  iconWithText: {
    position: "absolute",
    right: 30,
    top: 48,
    width: 15,
    height: 15,
    resizeMode: "contain"
  },
  iconWithoutText: {
    position: "absolute",
    right: 30,
    top: 28,
    width: 15,
    height: 15,
    resizeMode: "contain"
  },
  textArea: {
    height: 150
  },
  children: {}
});

const TabView = ({
  tabTitles,
  selected,
  onPress,
  tabColor,
  backgroundColor,
  style
}) => {
  const tabColorStyle = {
    backgroundColor: tabColor || "#fff"
  };
  const backgroundColorStyle = {
    backgroundColor: backgroundColor || "#F1F1F1"
  };
  const propStyle = style || {};
  return (
    <View
      style={[tabViewStyles.paletteContainer, backgroundColorStyle, propStyle]}
    >
      {tabTitles.map((title, index) => (
        <Pressable
          onPress={() => onPress(index)}
          style={
            index === selected
              ? [tabViewStyles.selected, tabColorStyle]
              : [tabViewStyles.unSelected, backgroundColorStyle]
          }
          key={index}
        >
          <Text>{title}</Text>
        </Pressable>
      ))}
    </View>
  );
};

const tabViewStyles = StyleSheet.create({
  paletteContainer: {
    width: "80%",
    height: 48,
    backgroundColor: "#E4E4E4",
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 10,
    padding: 6,
    marginVertical: 10
  },
  selected: {
    borderRadius: 10,
    flex: 1,
    backgroundColor: "#fff",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "gray",
    elevation: 10
  },
  unSelected: {
    flex: 1,
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#E4E4E4",
    borderRadius: 10
  }
});

const Event = ({ event }) => {
  return (
    <View style={eventStyles.container}>
      <Image source={event.image} style={eventStyles.image} />
      <View style={eventStyles.content}>
        <Text style={eventStyles.title}>{event.title}</Text>
        <Text style={eventStyles.dateTime}>
          {event.date}, {event.time}
        </Text>
        <Text style={eventStyles.location}>{event.location}</Text>
      </View>
      <Pressable style={eventStyles.btn}>
        <Text style={eventStyles.btnText}>Join</Text>
      </Pressable>
    </View>
  );
};

const eventStyles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    height: 90,
    marginHorizontal: 20,
    marginVertical: 10,
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingHorizontal: 10,
    elevation: 5,
    shadowColor: "rgba(0,0,0,0.5)"
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 10,
    marginRight: 10
  },
  content: {
    flex: 1
  },
  title: {
    fontSize: 14,
    color: "#000"
  },
  dateTime: {
    fontSize: 12,
    color: "#0091BE",
    marginTop: 5
  },
  location: {
    fontSize: 12,
    color: "#B6B6B6",
    marginTop: 5
  },
  btn: {
    width: 60,
    height: 30,
    borderRadius: 10,
    backgroundColor: "rgba(0,145,190,0.3)",
    justifyContent: "center",
    alignItems: "center"
  },
  btnText: {
    fontSize: 12,
    color: "#0091BE",
    fontWeight: "bold"
  }
});

const UpcomingEvent = ({ event }) => {
  return (
    <View style={upcomingEventStyles.container}>
      <Image source={event.image} style={upcomingEventStyles.image} />
      <View style={upcomingEventStyles.content}>
        <Text style={upcomingEventStyles.title}>{event.title}</Text>
        <Text style={upcomingEventStyles.location}>{event.location}</Text>
        <View style={upcomingEventStyles.details}>
          <Image
            source={require("./assets/usersJoined.png")}
            style={upcomingEventStyles.icon}
          />
          <Text style={upcomingEventStyles.detailsText}>
            {event.joined} Joined
          </Text>
        </View>
      </View>
    </View>
  );
};

const upcomingEventStyles = StyleSheet.create({
  container: {
    width: 220,
    height: 230,
    margin: 10,
    elevation: 5,
    shadowColor: "rgba(0,0,0,0.5)",
    backgroundColor: "#fff",
    overflow: "hidden",
    borderRadius: 10
  },
  image: {
    width: "100%",
    height: 150,
    resizeMode: "contain",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10
  },
  content: {
    paddingLeft: 10
  },
  title: {
    fontSize: 14,
    color: "#000",
    fontWeight: "bold",
    marginBottom: 5
  },
  location: {
    fontSize: 12,
    color: "#B6B6B6",
    marginBottom: 10
  },
  details: {
    flexDirection: "row",
    alignItems: "center"
  },
  icon: {
    height: 20,
    width: 50,
    resizeMode: "contain",
    marginRight: 10
  },
  detailsText: {
    fontSize: 12,
    color: "#27AE60"
  }
});
