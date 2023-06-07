import React, { useState } from "react";
import {
  Text,
  StyleSheet,
  View,
  Image,
  TextInput,
  Pressable
} from "react-native";

const RateTheAppScreen = (params) => {
  const [review, setReview] = useState("");
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.heading}>How was your experience?</Text>
        <Text style={styles.subhHeading}>
          Use 5 star rating to rate an app or leave a text review.
        </Text>
      </View>
      <Image
        source={require("./assets/5starsImage.png")}
        style={styles.image}
      />
      <Image
        source={require("./assets/separator.png")}
        style={styles.separator}
      />
      <View style={styles.inputContainer}>
        <Text style={styles.inputText}>Text review</Text>
        <TextInput
          style={styles.input}
          onChangeText={(text) => setReview(text)}
          value={review}
          placeholder="Enter"
          placeholderTextColor="#9B9B9B"
          autoCapitalize="none"
          autoCorrect={false}
        />
      </View>
      <Button buttonText={"Submit"} />
      <Button buttonText={"Cancel"} outline={true} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center"
  },
  header: {
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 50
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold"
  },
  subhHeading: {
    fontSize: 15,
    lineHeight: 20,
    marginTop: 10,
    fontWeight: "bold",
    textAlign: "center"
  },
  image: {
    alignSelf: "center"
  },
  separator: {
    alignSelf: "center",
    marginVertical: 30
  },
  inputContainer: {
    flexDirection: "column",
    justifyContent: "center",
    marginHorizontal: 20
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
  }
});
export default RateTheAppScreen;

const Button = ({ onPress, buttonText, outline }) => {
  const btnStyle = {
    backgroundColor: outline ? "#fff" : "#000",
    borderColor: outline ? "#000" : "#fff",
    borderWidth: 1
  };
  const btnText = {
    color: outline ? "#000" : "#fff"
  };
  return (
    <View style={buttonStyles.btnContainer}>
      <Pressable style={[buttonStyles.btn, btnStyle]} onPress={onPress}>
        <Text style={[buttonStyles.btnText, btnText]}>{buttonText}</Text>
      </Pressable>
    </View>
  );
};

const buttonStyles = StyleSheet.create({
  btnContainer: {
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
    alignItems: "center",
    shadowColor: "rgba(0, 0, 0, 0.2)",
    elevation: 10
  },
  btnText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold"
  }
});
