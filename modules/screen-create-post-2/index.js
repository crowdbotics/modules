import React, { useState, useEffect } from "react";
import {
  Text,
  StyleSheet,
  View,
  TextInput,
  Pressable,
  Image
} from "react-native";

const CreatePostScreen2 = (params) => {
  const [caption, setCaption] = useState("");
  const [tags, setTags] = useState("");
  const [username, setUsername] = useState("");
  const [date, setDate] = useState("18 June 2022");
  const [time, setTime] = useState("13:00 PM");
  const [images, setImages] = useState([]);
  useEffect(() => {
    setUsername("Username");
    setDate("18 June 2022");
    setTime("13:00 PM");
    setImages([
      require("./assets/crowdboticsImage.png"),
      require("./assets/crowdboticsImage.png"),
      require("./assets/crowdboticsImage.png"),
      require("./assets/crowdboticsImage.png")
    ]);
  }, []);
  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <Text style={styles.inputText}>Caption</Text>
        <TextInput
          style={styles.input}
          onChangeText={(text) => setCaption(text)}
          value={caption}
          placeholder="Enter your caption"
          placeholderTextColor="#9B9B9B"
          autoCapitalize="none"
          autoCorrect={false}
        />
      </View>
      <Text style={styles.inputText}>Add Image</Text>
      <View style={styles.addImages}>
        {images.map((image, index) => (
          <Image source={image} style={styles.image} key={index} />
        ))}
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.inputText}>Add Tags</Text>
        <TextInput
          style={styles.input}
          onChangeText={(text) => setTags(text)}
          value={tags}
          placeholder="Enter your caption"
          placeholderTextColor="#9B9B9B"
          autoCapitalize="none"
          autoCorrect={false}
        />
      </View>
      <View style={styles.userInfo}>
        <Text>{username}</Text>
        <View style={styles.dateTime}>
          <Text>{date}</Text>
          <Text>, </Text>
          <Text>{time}</Text>
        </View>
      </View>
      <View style={styles.btnContainer}>
        <Pressable style={styles.btn}>
          <Text style={styles.btnText}>Submit</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 20
  },
  inputContainer: {
    flexDirection: "column",
    justifyContent: "center" // marginHorizontal: 5,
  },
  inputText: {
    fontSize: 16,
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
    height: 150
  },
  addImages: {
    paddingVertical: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  },
  image: {
    height: 80,
    width: 80,
    marginHorizontal: 5,
    borderRadius: 10,
    alignSelf: "center"
  },
  list: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "flex-end"
  },
  userInfo: {
    marginTop: 20,
    paddingHorizontal: 10
  },
  dateTime: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center"
  },
  btnContainer: {
    padding: 30,
    paddingTop: 10,
    paddingHorizontal: 40,
    justifyContent: "center",
    marginTop: 20
  },
  btn: {
    backgroundColor: "black",
    height: 50,
    width: "100%",
    padding: 10,
    paddingHorizontal: 25,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center"
  },
  btnText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold"
  }
});
export default CreatePostScreen2;
