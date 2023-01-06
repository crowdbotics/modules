import React from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  ScrollView,
  TouchableHighlight
} from "react-native";

const TasksListing = () => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.tabSection}>
        <Text style={styles.subHeading}>My Tasker</Text>
        <Image source={require("./assets/file.png")} style={styles.addImg} />
      </View>

      <View style={styles.tabView}>
        <View style={[styles.tabItem, styles.selectedTab]}>
          <Text>Favorite</Text>
        </View>
        <View style={styles.tabItem}>
          <Text>Past</Text>
        </View>
      </View>
      <View style={styles.mainCard}>
        <View style={styles.walletCard}>
          <View style={styles.walletInner}>
            <View style={styles.imgContainer}>
              <Image
                source={require("./assets/edit.png")}
                style={styles.image}
              />
            </View>
            <View style={styles.walletCarder}>
              <Text style={styles.eventName}>Tasker name</Text>
              <Text style={styles.eventType}>
                <Text style={styles.rating}>4.9</Text> (15 Review)
              </Text>
              <Text style={styles.date}>15 Cleaning Jobs</Text>
            </View>
          </View>
        </View>
        <View style={styles.info}>
          <Text style={styles.infoTitle}>Info</Text>
          <Text style={styles.infoText}>
            Fast and has great attention to details, that describes my work!{" "}
          </Text>
        </View>
        <View style={styles.buttonBottom}>
          <Button>View Profile</Button>
          <Text style={styles.view}>$40/hr</Text>
        </View>
      </View>
      <View style={styles.mainCard}>
        <View style={styles.walletCard}>
          <View style={styles.walletInner}>
            <View style={styles.imgContainer}>
              <Image
                source={require("./assets/edit.png")}
                style={styles.image}
              />
            </View>
            <View style={styles.walletCarder}>
              <Text style={styles.eventName}>Tasker name</Text>
              <Text style={styles.eventType}>
                <Text style={styles.rating}>4.9</Text> (15 Review)
              </Text>
              <Text style={styles.date}>15 Cleaning Jobs</Text>
            </View>
          </View>
        </View>
        <View style={styles.info}>
          <Text style={styles.infoTitle}>Info</Text>
          <Text style={styles.infoText}>
            Fast and has great attention to details, that describes my work!{" "}
          </Text>
        </View>
        <View style={styles.buttonBottom}>
          <Button>View Profile</Button>
          <Text style={styles.view}>$40/hr</Text>
        </View>
      </View>
      <View style={styles.bottom}>
        <Image source={require("./assets/home.png")} style={styles.star} />
        <Image source={require("./assets/task.png")} style={styles.task} />
        <Image source={require("./assets/tasker.png")} style={styles.tasker} />
        <Image source={require("./assets/chat.png")} style={styles.chat} />
        <Image
          source={require("./assets/profile.png")}
          style={styles.profile}
        />
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  subHeading: {
    fontSize: 20,
    fontWeight: "400",
    marginLeft: 20,
    color: "#4A4A4A",
    marginTop: 20
  },
  tabView: {
    width: "65%",
    height: 48,
    backgroundColor: "#F1F1F1",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    borderRadius: 10,
    paddingVertical: 6,
    paddingHorizontal: 6,
    marginTop: 10,
    marginHorizontal: 15,
    marginBottom: 30
  },
  tabItem: {
    height: "100%",
    paddingHorizontal: 8,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F1F1F1",
    borderRadius: 10,
    fontWeight: "bold",
    flex: 1
  },
  selectedTab: {
    backgroundColor: "#FFF",
    shadowColor: "gray",
    elevation: 10
  },
  tabSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  addImg: {
    width: 16,
    height: 16,
    marginRight: 40,
    marginTop: 17,
    resizeMode: "contain"
  },
  walletCard: {
    padding: 10,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
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
    fontSize: 14,
    marginLeft: 10,
    width: 115
  },
  eventType: {
    fontSize: 12,
    marginLeft: 10,
    width: 200,
    marginVertical: 5,
    color: "#7E7D7D"
  },
  date: {
    fontSize: 14,
    marginLeft: 10,
    width: 200,
    color: "#7E7D7D"
  },
  imgContainer: {
    height: 80,
    width: 80,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#dadada",
    borderRadius: 10
  },
  image: { height: 32, width: 32, resizeMode: "contain" },
  buttonBottom: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 20,
    marginHorizontal: 30
  },
  mainCard: {
    elevation: 15,
    shadowColor: "#ccc9c9",
    backgroundColor: "#fff",
    marginHorizontal: 10,
    marginTop: 15,
    borderRadius: 8,
    marginBottom: 10
  },
  view: { fontSize: 30, color: "#000", fontWeight: "bold" },
  info: { marginHorizontal: 15, marginVertical: 5 },
  infoTitle: {},
  infoText: { fontSize: 12, color: "#7E7D7D" },
  bottom: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 20,
    paddingHorizontal: 20,
    backgroundColor: "#C4C4C4",
    height: 74
  },
  star: { width: 35, height: 40, resizeMode: "contain" },
  task: { width: 28, height: 34, resizeMode: "contain" },
  chat: { width: 28, height: 38, resizeMode: "contain" },
  profile: { width: 38, height: 38, resizeMode: "contain" },
  tasker: { width: 68, height: 40, resizeMode: "contain" },
  rating: { color: "#000" }
});

const Button = (props) => {
  return (
    <TouchableHighlight onPress={props.onPress} underlayColor="#DDDDDD">
      <View
        style={[
          btnStyles.button,
          {
            backgroundColor: props.backgroundColor
              ? props.backgroundColor
              : "#000000",
            height: props.height ? props.height : 49,
            borderWidth: props.borderWidth ? props.borderWidth : 0,
            borderColor: props.borderColor ? props.borderColor : "#000000"
          }
        ]}
      >
        <Text
          style={[
            btnStyles.text,
            { color: props.color ? props.color : "#ffffff" }
          ]}
        >
          {props.children}
        </Text>
      </View>
    </TouchableHighlight>
  );
};

const btnStyles = StyleSheet.create({
  button: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    width: 150
  },
  text: {
    fontWeight: "bold",
    fontSize: 15
  }
});
export default TasksListing;
