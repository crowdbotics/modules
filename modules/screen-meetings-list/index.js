import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  TextInput,
  Pressable,
  FlatList
} from "react-native";

const MeetingsList = () => {
  const [searchText, setSearchText] = useState("");
  const [meetings, setMeetings] = useState([]);
  useEffect(() => {
    setMeetings([
      {
        id: 1,
        title: "Annual Budget Review",
        date: "07 Jun 2022",
        startTime: "10:30 AM",
        endTime: "11:30 AM",
        location: "Team Meeting Room",
        usersJoined: [
          {
            // image:  // user image here
          },
          {
            // image:  // user image here
          },
          {
            // image:  // user image here
          },
          {
            // image:  // user image here
          },
          {
            // image:  // user image here
          },
          {
            // image:  // user image here
          },
          {
            // image:  // user image here
          },
          {
            // image:  // user image here
          },
          {
            // image:  // user image here
          }
        ]
      },
      {
        id: 2,
        title: "All Day Q3 Planning",
        date: "08 Jun 2022",
        startTime: "10:30 AM",
        endTime: "11:30 AM",
        location: "West Meeting Room",
        usersJoined: [
          {
            // image:  // user image here
          },
          {
            // image:  // user image here
          },
          {
            // image:  // user image here
          },
          {
            // image:  // user image here
          },
          {
            // image:  // user image here
          },
          {
            // image:  // user image here
          },
          {
            // image:  // user image here
          },
          {
            // image:  // user image here
          },
          {
            // image:  // user image here
          }
        ]
      },
      {
        id: 3,
        title: "Budget 2023 Planning",
        date: "09 Jun 2022",
        startTime: "10:30 AM",
        endTime: "11:30 AM",
        location: "West Meeting Room",
        usersJoined: [
          {
            // image:  // user image here
          },
          {
            // image:  // user image here
          },
          {
            // image:  // user image here
          },
          {
            // image:  // user image here
          },
          {
            // image:  // user image here
          },
          {
            // image:  // user image here
          },
          {
            // image:  // user image here
          },
          {
            // image:  // user image here
          },
          {
            // image:  // user image here
          }
        ]
      },
      {
        id: 4,
        title: "1-1 Meeting",
        date: "10 Jun 2022",
        startTime: "10:30 AM",
        endTime: "11:30 AM",
        location: "West Meeting Room",
        usersJoined: [
          {
            // image:  // user image here
          },
          {
            // image:  // user image here
          },
          {
            // image:  // user image here
          },
          {
            // image:  // user image here
          },
          {
            // image:  // user image here
          },
          {
            // image:  // user image here
          },
          {
            // image:  // user image here
          },
          {
            // image:  // user image here
          },
          {
            // image:  // user image here
          }
        ]
      }
    ]);
  }, []);
  const giveMargin = index => {
    return {
      right: index * 10
    };
  };
  const giveRandomColor = () => {
    // reutrn random grayscale color
    const random = Math.floor(Math.random() * 255);

    return {
      // backgroundColor: "#" + Math.floor(Math.random() * 16777215).toString(16)
      backgroundColor: `rgb(${random}, ${random}, ${random})`
    };
  };
  let userStyles = {};

  const giveColor = () => {
    const backgroundColor = giveRandomColor().backgroundColor;
    // return white or black color based on background color
    const color = (backgroundColor.match(/\d+/g) || []).map(Number);
    const brightness = Math.round(
      (parseInt(color[0], 10) * 299 +
        parseInt(color[1], 10) * 587 +
        parseInt(color[2], 10) * 114) /
        1000
    );
    userStyles = {
      color: brightness > 125 ? "black" : "white",
      backgroundColor: backgroundColor
    };
    return userStyles;
  };
  return (
    <View style={styles.container}>
      <Input
        text="Search"
        placeholder="Search"
        value={searchText}
        onChange={setSearchText}
        icon={require("./assets/searchIcon.png")}
        containerStyle={styles.input}
      />
      <FlatList
        data={meetings}
        renderItem={({ item }) => (
          <View style={styles.meetingContainer}>
            <Text style={styles.meetingTitle}>{item.title}</Text>
            <View style={styles.meetingBody}>
              <View style={styles.meetingBodyLeft}>
                <Text style={styles.meetingBodyText}>
                  {item.date}, {item.startTime}-{item.endTime}
                </Text>
                <Text style={styles.meetingBodyText}>{item.location}</Text>
              </View>
              <Pressable style={styles.meetingBtn}>
                <Text style={styles.meetingBtnText}>Join</Text>
              </Pressable>
            </View>
            <View style={styles.meetingFooter}>
              {item.usersJoined &&
                item.usersJoined.map(
                  (item_, index) =>
                    index < 4 && (
                      <View style={styles.userContainer} key={index}>
                        <View
                          style={[
                            styles.userImage,
                            giveColor(),
                            giveMargin(index)
                          ]}>
                          {index === 3 && (
                            <Text style={[styles.usersJoinedText, userStyles]}>
                              10+
                            </Text>
                          )}
                        </View>
                      </View>
                    )
                )}
              <Text style={styles.footerText}>Collegues</Text>
            </View>
          </View>
        )}
        keyExtractor={item => item.id}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  heading: {
    fontSize: 20
  },
  input: {
    marginHorizontal: 20,
    marginVertical: 20
  },
  meetingContainer: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: "#F0F2F7",
    marginBottom: 10
  },
  meetingBody: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  meetingBodyLeft: {
    flex: 1,
    marginVertical: 10
  },
  meetingBodyText: {
    fontSize: 14,
    color: "#000"
  },
  meetingBtn: {
    backgroundColor: "#12D790",
    width: 80,
    height: 45,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center"
  },
  meetingBtnText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold"
  },
  meetingTitle: {
    fontSize: 20,
    color: "#000"
  },
  meetingFooter: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center"
  },
  userContainer: {
    width: 22,
    height: 22,
    justifyContent: "center",
    alignItems: "center"
  },
  userImage: {
    width: 22,
    height: 22,
    borderRadius: 10,
    position: "absolute",
    top: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center"
  },
  usersJoinedText: {
    color: "#fff",
    fontSize: 8,
    fontWeight: "bold"
  },
  footerText: {
    fontSize: 12,
    color: "#9B9B9B"
  }
});

export default MeetingsList;

const Input = props => {
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
        onChangeText={() => props.onChange()}
        placeholderTextColor={
          props.placeholderTextColor ? props.placeholderTextColor : "#9B9B9B"
        }
        editable={props.editable !== false}
        autoCapitalize="none"
        autoCorrect={false}
        multiline={!!props.textArea}
        backgroundColor={props.backgroundColor}
        secureTextEntry={props.secureTextEntry}
      />
      {props.errorText
        ? (
        <Text style={inputStyles.error}>{props.errorText}</Text>
          )
        : null}
      {props.icon
        ? (
        <Image source={props.icon} style={inputStyles.iconWithText} />
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
    height: 50,
    color: "#000"
  },
  iconWithText: {
    position: "absolute",
    right: 30,
    bottom: 25,
    width: 15,
    height: 15,
    resizeMode: "contain"
  },
  textArea: {
    height: 150
  },
  children: {}
});
