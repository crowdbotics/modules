import React from "react";
import { Image, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";

const DirectMessageForGroupChat = () => {
  return (

    <View style={styles.container}>
      <ScrollView>
      <View style={styles.chatHeader}>
          <View style={styles.groupName}>
            <Image source={require(

              "./assets/back.png")}/>
            <View style={styles.logoContainer}>
            <Image source={require(

              "./assets/logo.png")}/>
            </View>
            <Text style={styles.headerName}>Group name</Text>
          </View>
          <View style={styles.icons}>
            <Image source={require(

              "./assets/call.png")}/>
              <Image style={styles.cameraIcon} source={require(

                "./assets/camera.png")}/>
          </View>
      </View>
      <View style={styles.mt30}>
      <View style={styles.sendMessage}>
         <View style={styles.messageBox}>
            <View style={styles.sendMessageBox}>
                  <Text>Lorem ipsum dolor sit amet.</Text>
            </View>
            <Text style={styles.timeText}>01:15 PM</Text>
          </View>
          <View style={styles.userBox}>
            <Image style={styles.logoChatIcon} source={require(

              "./assets/logo.png")}/>
            <Image style={styles.onlineIcon} source={require(

              "./assets/Oval.png")}/>
          </View>
      </View>
      </View>
      <View style={styles.receiveMessage}>
          <View style={styles.userBoxGray}>
            <Image style={styles.logoChatIcon} source={require(

              "./assets/logo.png")}/>
            <Image style={styles.onlineIcon} source={require(

              "./assets/Oval.png")}/>
          </View>
        <View style={styles.messageBox}>
          <View style={styles.receiveMessageBox}>
                <Text>Lorem ipsum dolor sit amet.</Text>
          </View>
          <Text style={styles.timeText}>01:15 PM</Text>
        </View>
      </View>
      <View style={styles.sendMessage}>
         <View style={styles.messageBox}>
            <View style={styles.sendMessageBox}>
                  <Text>Lorem ipsum dolor sit amet.</Text>
            </View>
            <Text style={styles.timeText}>01:15 PM</Text>
          </View>
          <View style={styles.userBox}>
            <Image style={styles.logoChatIcon} source={require(

              "./assets/logo.png")}/>
            <Image style={styles.onlineIcon} source={require(

              "./assets/Oval.png")}/>
          </View>
      </View>
      <View style={styles.sendMessage}>
         <View style={styles.messageBox}>
            <View style={styles.sendMessageBox}>
                  <Text>Lorem ipsum dolor sit amet.</Text>
            </View>
            <Text style={styles.timeText}>01:15 PM</Text>
          </View>
          <View style={styles.userBox}>
            <Image style={styles.logoChatIcon} source={require(

              "./assets/logo.png")}/>
            <Image style={styles.onlineIcon} source={require(

              "./assets/Oval.png")}/>
          </View>
      </View>
      <View style={styles.receiveMessage}>
          <View style={styles.userBoxGray}>
            <Image style={styles.logoChatIcon} source={require(

              "./assets/logo.png")}/>
            <Image style={styles.onlineIcon} source={require(

              "./assets/Oval.png")}/>
          </View>
        <View style={styles.messageBox}>
          <View style={styles.receiveMessageBox}>
                <Text>Lorem ipsum dolor sit amet.</Text>
          </View>
          <Text style={styles.timeText}>01:15 PM</Text>
        </View>
      </View>

      <View style={styles.chatSection}>
          <View style={styles.center}>
            <Image source={require(

              "./assets/cam.png")}/>
            <View style={styles.circle}></View>
          </View>
          <View style={styles.inputIcons}>
            <Input placeholder="Enter"/>
            <Image style={styles.smileyIcon} source={require(

              "./assets/smiley.png")}/>
            <Image source={require(

              "./assets/mic.png")}/>
          </View>
          <Image style={styles.sendIcon} source={require(

            "./assets/send.png")}/>
      </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    display: "flex",
    paddingVertical: 20,
    height: "100%"
  },
  chatHeader: {
    height: 106,
    backgroundColor: "#F1F1F1",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 25
  },
  groupName: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center"
  },
  logoChatIcon: {
    height: 32,
    width: 32
  },
  cameraIcon: {
    marginLeft: 10
  },
  onlineIcon: {
    position: "absolute",
    right: -5,
    bottom: 10,
    borderWidth: 2,
    borderColor: "#FFFFFF",
    borderRadius: 100 / 2
  },
  logoContainer: {
    width: 35,
    height: 35,
    backgroundColor: "#F9D8D9",
    borderRadius: 100 / 2,
    marginLeft: 35,
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    flexDirection: "row"
  },
  headerName: {
    fontSize: 14,
    color: "#000000",
    marginLeft: 17
  },
  icons: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center"
  },
  smileyIcon: {
    marginRight: 6
  },
  sendIcon: {
    marginLeft: 25
  },
  mt30: {
    marginTop: 30
  },
  sendMessage: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 45,
    marginRight: 16
  },
  messageBox: {
    display: "flex",
    flexDirection: "column",
    marginTop: 20
  },
  sendMessageBox: {
    width: 254,
    height: 84,
    backgroundColor: "#FCF1D6",
    borderRadius: 10,
    padding: 20
  },
  userBox: {
    width: 61,
    height: 61,
    backgroundColor: "#FCF1D6",
    borderRadius: 100 / 2,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    marginLeft: 20
  },
  userBoxGray: {
    width: 61,
    height: 61,
    backgroundColor: "#DADADA",
    borderRadius: 100 / 2,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    marginLeft: 20
  },
  receiveMessage: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center"
  },
  receiveMessageBox: {
    width: 254,
    height: 46,
    backgroundColor: "#DADADA",
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginLeft: 13
  },
  timeText: {
    fontSize: 12,
    color: "#C6C6C6",
    fontWeight: "600",
    textAlign: "right",
    paddingTop: 2
  },
  chatSection: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 25,
    paddingTop: 30
  },
  circle: {
    height: 8,
    width: 8,
    borderWidth: 2,
    borderColor: "#AEB5C0",
    position: "absolute",
    right: 5,
    left: 6,
    top: 6,
    bottom: 5,
    borderRadius: 100 / 2
  },
  center: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  },
  inputIcons: {
    width: 255,
    backgroundColor: "#F1F1F1",
    borderRadius: 10,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginLeft: 10,
    paddingHorizontal: 6
  }
});

const Input = (props) => {
  return (
    <View>
      <TextInput
        style={textStyles.input}
        placeholder={props.placeholder}
        value={props.value}
        onChangeText={(num) => props.setValue(num)}
        placeholderTextColor='#000000'
        editable={props.editable !== false}
      />
      {props.errorText ? <Text style={textStyles.error}>{props.errorText}</Text> : null}
    </View>
  );
};

const textStyles = StyleSheet.create({
  input: {
    backgroundColor: "#F1F1F1",
    height: 40,
    color: "#000",
    fontSize: 14,
    paddingHorizontal: 10,
    width: 200,
    borderRadius: 10
  },
  error: {
    fontSize: 13,
    color: "#FA060D",
    paddingTop: 8
  }
});

export default DirectMessageForGroupChat;
