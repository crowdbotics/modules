import React from "react";
import { Text, StyleSheet, View, Image, ScrollView, TextInput } from "react-native";

const GroupChatScreen = (params) => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Image source={require(

          "./assets/back.png")} style={styles.back} />
        <Text style={styles.heading}>Group chat</Text>
        <Text style={styles.saveText}>Save</Text>
      </View>
      <View style={styles.centerSection}>
        <View style={styles.imgContainer2}>
          <Image source={require(

            "./assets/edit.png")} style={styles.editImg} />
        </View>
        <Image source={require(

          "./assets/plus.png")} style={styles.heartImg} />
      </View>
      <View style={styles.tabView}>
        <View style={styles.tabItem}>
          <Text style={[styles.tabText, styles.selectedTab]}>Create Group</Text>
        </View>
        <View style={[styles.tabItem]}>
          <Text style={styles.tabText}>Leave Group</Text>
        </View>
        <View style={styles.tabItem}>
          <Text style={styles.tabText}>Conversation</Text>
        </View>
      </View>

      <Text style={styles.mr10}>Name of the group</Text>
      <View style={styles.InputBox}>
        <TextInput placeholder="Enter" placeholderTextColor={"#000"} />
      </View>
      <Text style={styles.mr10}>Group Description</Text>
      <View style={styles.textInput}>
        <Input placeholder="Enter" multiline={true} />
      </View>
      <Text style={styles.mr10}>Add / Remove</Text>
      <View style={styles.chooseContainer}>
        <TextInput placeholder="Enter" placeholderTextColor={"#000"}></TextInput>
        <Image source={require(

          "./assets/search.png")} style={styles.filterImg} />
      </View>
      <View style={styles.walletCard}>
        <View style={styles.walletInner}>
          <View style={styles.imgContainer}>
            <Image source={require("./assets/edit.png")} style={styles.editImage} />
          </View>

          <View style={styles.walletCarder}>
            <Text style={styles.eventName}>Cody Fisher</Text>
          </View>
        </View>
        <View style={styles.leftSection}>
        <Image source={require(

          "./assets/box.png")} style={styles.dotsImg} />
        </View>
      </View>
      <View style={styles.walletCard}>
        <View style={styles.walletInner}>
          <View style={[styles.imgContainer, styles.backColor]}>
            <Image source={require("./assets/edit.png")} style={styles.editImage} />
          </View>

          <View style={styles.walletCarder}>
            <Text style={styles.eventName}>Cody Fisher</Text>
          </View>
        </View>
        <View style={styles.leftSection}>
        <Image source={require(

          "./assets/checkbox.png")} style={styles.dotsImg} />
        </View>
      </View>
      <View style={styles.walletCard}>
        <View style={styles.walletInner}>
          <View style={styles.imgContainer}>
            <Image source={require("./assets/edit.png")} style={styles.editImage} />
          </View>

          <View style={styles.walletCarder}>
            <Text style={styles.eventName}>Cody Fisher</Text>
          </View>
        </View>
        <View style={styles.leftSection}>
        <Image source={require(

          "./assets/box.png")} style={styles.dotsImg} />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    backgroundColor: "#FFF",
    paddingBottom: 20
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 30,
    marginTop: 15,
    marginBottom: 30
  },
  back: { width: 11.25, height: 20, resizeMode: "contain", marginLeft: -15 },
  heading: { fontSize: 16, color: "#000", marginLeft: 15 },
  mr10: {
    marginLeft: 25,
    marginBottom: 10
  },
  saveText: { textDecorationLine: "underline", fontSize: 16, marginRight: -10 },
  centerSection: { justifyContent: "center", alignItems: "center" },
  imgContainer2: {
    height: 98,
    width: 97,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#DADADA",
    borderRadius: 60
  },
  editImg: { resizeMode: "contain", height: 32, width: 32 },
  heartImg: { resizeMode: "contain", height: 17, width: 17, marginTop: -10, marginLeft: 70 },
  tabView: {
    height: 48,
    backgroundColor: "#F1F1F1",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    borderRadius: 10,
    paddingVertical: 6,
    marginVertical: 20,
    marginHorizontal: 5
  },
  tabItem: {
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F1F1F1",
    borderRadius: 10,
    flex: 1
  },
  selectedTab: {
    backgroundColor: "#FFF",
    shadowColor: "gray",
    elevation: 10,
    paddingVertical: 10,
    borderRadius: 10,
    color: "#000",
    paddingHorizontal: 15
  },
  tabText: { fontSize: 12, color: "#7C7C7C" },
  InputBox: { paddingHorizontal: 10, borderColor: "#C4C4C4", borderWidth: 1, marginHorizontal: 5, borderRadius: 10, marginBottom: 10 },
  textInput: { borderWidth: 1, borderRadius: 10, borderColor: "#C4C4C4", paddingHorizontal: 5, height: 140, marginHorizontal: 5, marginBottom: 10 },
  chooseContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: 55,
    borderColor: "#C4C4C4",
    borderWidth: 1,
    borderRadius: 10,
    paddingLeft: 10,
    paddingRight: 20,
    marginHorizontal: 5,
    marginBottom: 20
  },
  filterImg: {
    height: 14,
    width: 14,
    resizeMode: "contain"
  },
  walletCard: {
    backgroundColor: "#fff",
    padding: 10,
    paddingBottom: 5,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderRadius: 8,
    borderBottomColor: "#DADADA",
    borderBottomWidth: 1,
    marginTop: 5
  },
  walletInner: {
    display: "flex",
    flexDirection: "row"
  },
  walletCarder: {
    alignSelf: "center",
    display: "flex",
    flexDirection: "column"
  },
  eventName: {
    color: "#1E2022",
    fontSize: 15,
    marginLeft: 10,
    width: 115
  },

  leftSection: { justifyContent: "center", alignItems: "center", paddingRight: 10 },
  imgContainer: {
    height: 61,
    width: 61,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#DADADA",
    borderRadius: 30
  },
  editImage: { resizeMode: "contain", height: 32, width: 32 },
  dotsImg: { resizeMode: "contain", height: 18, width: 18 },
  backColor: { backgroundColor: "#FCF1D6" }
});

const Input = (props) => {
  return (
    <View style={styles.container}>
      <TextInput
        style={inputStyles.input}
        placeholder={props.placeholder}
        value={props.value}
        onChangeText={(num) => props.setValue(num)}
        placeholderTextColor='#000'
        multiline={props.multiline}
        numberOfLines={props.multiline ? 10 : null}
        editable={props.editable !== false}
        borderWidth={props.borderWidth}
      />
    </View>
  );
};

const inputStyles = StyleSheet.create({
  container: {
    width: "100%",
    borderRadius: 10,
    paddingRight: 10
  },
  input: {
    backgroundColor: "#fff",
    height: 53,
    borderColor: "#C4C4C4",
    color: "#000",
    borderRadius: 10,
    fontSize: 14
  }

});

export default GroupChatScreen;
