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

const FeedbackList = () => {
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
      }
    ]);
  }, []);
  useEffect(() => {
    setExpanded(reviews[2]);
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
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.heading}>List of feedback</Text>
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
        <View style={styles.inputTitle}>
          <Image
            source={require("./assets/userImage.png")}
            style={styles.inputImage}
          />
          <Text style={styles.inputText}>Username</Text>
        </View>
        <Input
          placeholder="Write a reply"
          value={message}
          onChangeText={x => setMessage(x)}
          textArea={true}
        />
        <Pressable style={styles.btn}>
          <Text style={styles.btnText}>Send</Text>
        </Pressable>
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 20
  },
  heading: {
    fontSize: 16,
    marginLeft: 10
  },
  inputTitle: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20
  },
  inputImage: {
    width: 30,
    height: 30,
    marginRight: 10
  },
  btn: {
    backgroundColor: "#ffff",
    borderColor: "#EA4335",
    borderWidth: 1,
    width: 60,
    height: 30,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    marginVertical: 5,
    alignSelf: "flex-end"
  },
  btnText: {
    color: "#EA4335",
    fontSize: 12
  }
});

export default FeedbackList;

const Review = ({ item, expanded, onPress }) => {
  return (
    <Pressable style={reviewStyles.container} onPress={() => onPress(item)}>
      <View style={reviewStyles.header}>
        <Image source={item.image} style={reviewStyles.image} />
        <View style={reviewStyles.info}>
          <Text style={reviewStyles.username}>{item.username}</Text>
          <Text style={reviewStyles.subject}>Subject: {item.subject}</Text>
          {expanded
            ? (
            <Text style={reviewStyles.email}>Email: {item.email}</Text>
              )
            : null}
        </View>
        <Image
          source={
            expanded
              ? require("./assets/menuIconActive.png")
              : require("./assets/menuIcon.png")
          }
          style={reviewStyles.menuIcon}
        />
      </View>
      {expanded
        ? (
        <View style={reviewStyles.body}>
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
    paddingHorizontal: 10,
    paddingVertical: 15,
    borderBottomColor: "#e1e1e1",
    borderBottomWidth: 1
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
  subject: {
    fontSize: 14,
    marginTop: 5
  },
  email: {
    fontSize: 14,
    marginTop: 5
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
    paddingTop: 10
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
    backgroundColor: "#ffff",
    borderColor: "#EA4335",
    borderWidth: 1,
    width: 60,
    height: 30,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    marginVertical: 5,
    alignSelf: "flex-end"
  },
  btnText: {
    color: "#EA4335",
    fontSize: 12
  }
});

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
        onChangeText={text => props.onChange(text)}
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
