import React, { useState, useEffect } from "react";
import {
  Text,
  StyleSheet,
  View,
  TextInput,
  Image,
  Pressable
} from "react-native";

const RecordMemoScreen = (params) => {
  const [recordingName, setRecordingName] = useState("");
  const [recordingTime, setRecordingTime] = useState("");
  useEffect(() => {
    setRecordingTime("00:00:00");
  }, []);
  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <Text style={styles.inputText}>Add name</Text>
        <TextInput
          style={styles.input}
          onChangeText={(text) => setRecordingName(text)}
          value={recordingName}
          placeholder="Enter"
          placeholderTextColor="#9B9B9B"
          autoCapitalize="none"
          autoCorrect={false}
        />
      </View>
      <Image
        source={require("./assets/recording.png")}
        style={styles.recordingImage}
      />
      <Text style={styles.recordingTimeText}>{recordingTime}</Text>
      <View style={styles.buttonsContainer}>
        <Pressable style={styles.smallBtn}>
          <Image source={require("./assets/crossIcon.png")} />
        </Pressable>
        <Pressable style={styles.largeBtn}>
          <Text style={styles.whiteText}>Start</Text>
        </Pressable>
        <Pressable style={styles.smallBtn}>
          <Image source={require("./assets/tickIcon.png")} />
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
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
    height: 50
  },
  recordingImage: {
    alignSelf: "center",
    width: "90%",
    marginTop: 20
  },
  recordingTimeText: {
    alignSelf: "center",
    fontSize: 36,
    marginVertical: 20
  },
  buttonsContainer: {
    flexDirection: "row",
    paddingHorizontal: 50,
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 20
  },
  smallBtn: {
    width: 50,
    height: 50,
    backgroundColor: "#EBEBEB",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50
  },
  largeBtn: {
    width: 90,
    height: 90,
    backgroundColor: "#F2605F",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50
  },
  whiteText: {
    color: "#fff"
  }
});
export default RecordMemoScreen;
