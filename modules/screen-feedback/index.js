import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  Pressable,
  TextInput,
  Image,
  ScrollView
} from "react-native";

const Feedback = () => {
  const [message, setMessage] = useState("");
  const [reviews, setReviews] = useState([]);
  const [expanded, setExpanded] = useState(null);
  useEffect(() => {
    setReviews([
      {
        id: 1,
        username: "Username",
        email: "username@email.com",
        image: require("./assets/userImage.png"),
        subject: "Molestie vestibulum nulla.",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pretium, commodo lacus, amet nulla faucibus vulputate erat vestibulum. Aliquet consequat nunc sit ullamcorper vel egestas nunc sagittis lectus. Sed ipsum vel in morbi non semper adipiscing nibh nam. Integer sem."
      },
      {
        id: 2,
        username: "Username",
        email: "username@email.com",
        image: require("./assets/userImage.png"),
        subject: "Molestie vestibulum nulla.",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pretium, commodo lacus, amet nulla faucibus vulputate erat vestibulum. Aliquet consequat nunc sit ullamcorper vel egestas nunc sagittis lectus. Sed ipsum vel in morbi non semper adipiscing nibh nam. Integer sem."
      },
      {
        id: 3,
        username: "Username",
        email: "username@email.com",
        image: require("./assets/userImage.png"),
        subject: "Molestie vestibulum nulla.",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pretium, commodo lacus, amet nulla faucibus vulputate erat vestibulum. Aliquet consequat nunc sit ullamcorper vel egestas nunc sagittis lectus. Sed ipsum vel in morbi non semper adipiscing nibh nam. Integer sem."
      },
      {
        id: 4,
        username: "Username",
        email: "username@email.com",
        image: require("./assets/userImage.png"),
        subject: "Molestie vestibulum nulla.",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pretium, commodo lacus, amet nulla faucibus vulputate erat vestibulum. Aliquet consequat nunc sit ullamcorper vel egestas nunc sagittis lectus. Sed ipsum vel in morbi non semper adipiscing nibh nam. Integer sem."
      }
    ]);
  }, []);
  useEffect(() => {
    setExpanded(reviews[3]);
  }, [reviews]);
  const handleExpand = item => {
    if (expanded === item) {
      setExpanded(null);
    } else {
      setExpanded(item);
    }
  };
  return (
    <View style={styles.container}>
      <ScrollView>
        <TabView
          tabTitles={["All Users"]}
          selected={0}
          style={styles.tabView}
        />
        <Text style={styles.title}>Feedback</Text>
        <View style={styles.feedbackContainer}>
          {reviews.map((review, index) => (
            <Review
              key={index}
              item={review}
              expanded={review === expanded}
              onPress={x => {
                handleExpand(x);
              }}
            />
          ))}
        </View>
      </ScrollView>
      <View style={styles.footer}>
        <View style={styles.camera}>
          <Image
            source={require("./assets/cameraIcon.png")}
            style={styles.cameraIcon}
          />
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Type a message"
            onChangeText={text => setMessage(text)}
            value={message}
            autoCorrect={false}
            autoCapitalize="none"
            autoFocus={false}
          />
          <Image
            source={require("./assets/emojiIcon.png")}
            style={styles.smileyIcon}
          />
          <Image
            source={require("./assets/voiceIcon.png")}
            style={styles.voiceIcon}
          />
        </View>
        <View style={styles.send}>
          <Image
            source={require("./assets/sendIcon.png")}
            style={styles.sendIcon}
          />
        </View>
      </View>
    </View>
  );
};

const Review = ({ item, expanded, onPress }) => {
  return (
    <Pressable style={reviewStyles.container} onPress={() => onPress(item)}>
      <View style={reviewStyles.header}>
        <Image source={item.image} style={reviewStyles.image} />
        <View style={reviewStyles.info}>
          <Text style={reviewStyles.username}>{item.username}</Text>
          <Text style={reviewStyles.email}>{item.email}</Text>
        </View>
        <Image
          source={require("./assets/menuIcon.png")}
          style={reviewStyles.menuIcon}
        />
      </View>
      {expanded
        ? (
        <View style={reviewStyles.body}>
          <Text style={reviewStyles.detailsText}>
            <Text style={reviewStyles.green}>Email: {"\t"}</Text>
            {"\t"}
            {item.email}
          </Text>
          <Text style={reviewStyles.detailsText}>
            <Text style={reviewStyles.green}>Subject: </Text>
            {"\t"}
            {item.subject}
          </Text>
          <Text style={reviewStyles.description}>{item.description}</Text>
          <Pressable style={reviewStyles.btn}>
            <Text style={reviewStyles.btnText}>Reply</Text>
          </Pressable>
        </View>
          )
        : null}
    </Pressable>
  );
};

const reviewStyles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: "#f1f1f1",
    borderRadius: 10,
    marginHorizontal: 20,
    marginBottom: 10
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25
  },
  menuIcon: {
    width: 20,
    height: 20
  },
  username: {
    fontSize: 14
  },
  email: {
    fontSize: 12
  },
  info: {
    flexDirection: "column",
    flex: 1,
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginHorizontal: 10,
    height: 40
  },
  body: {
    marginTop: 10,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: "#ccc"
  },
  detailsText: {
    marginBottom: 5
  },
  green: {
    color: "#12D790"
  },
  description: {
    fontSize: 12,
    marginTop: 5,
    textAlign: "justify"
  },
  btn: {
    backgroundColor: "#000",
    width: 60,
    height: 30,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    marginVertical: 5,
    alignSelf: "flex-end"
  },
  btnText: {
    color: "#fff",
    fontSize: 12
  }
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  tabView: {
    width: 150,
    marginLeft: 20,
    marginVertical: 10
  },
  title: {
    marginLeft: 20,
    marginBottom: 10,
    marginTop: 20
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    margin: 10
  },
  inputContainer: {
    width: "80%"
  },
  input: {
    paddingLeft: 15,
    borderRadius: 10,
    backgroundColor: "#F1F1F1",
    height: 45
  },
  smileyIcon: {
    position: "absolute",
    right: 40,
    top: 10,
    opacity: 0.5
  },
  voiceIcon: {
    top: 12,
    right: 15,
    position: "absolute",
    opacity: 0.5
  }
});

export default Feedback;

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
      style={[tabViewStyles.paletteContainer, backgroundColorStyle, propStyle]}>
      {tabTitles.map((title, index) => (
        <Pressable
          onPress={() => (onPress ? onPress(index) : null)}
          style={
            index === selected
              ? [tabViewStyles.selected, tabColorStyle]
              : [tabViewStyles.unSelected, backgroundColorStyle]
          }
          key={index}>
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
