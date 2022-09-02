import React from "react";
import {
  Text, StyleSheet, View, Image, ScrollView, TouchableHighlight
} from "react-native";

const TaskersListing = () => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.subHeading}>My Task</Text>
      <View style={styles.tabView}>
        <View style={[styles.tabItem, styles.selectedTab]}>
          <Text>Schedule</Text>
        </View>
        <View style={styles.tabItem}>
          <Text>Completed</Text>
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
              <View style={styles.cardTop}>
                <Text style={styles.eventName}>Tasker name</Text>
                <Text style={styles.view}>$40/hr</Text>
              </View>
              <View style={styles.cardMid}>
                <Image
                  source={require("./assets/location.png")}
                  style={styles.location}
                />
                <Text style={styles.eventType}>1077 Brown Bear Drive</Text>
              </View>
              <View style={styles.cardMid}>
                <Image
                  source={require("./assets/calender.png")}
                  style={styles.calender}
                />
                <Text style={styles.eventType}>Sat, April 03, 2022, 8:00AM</Text>
              </View>
            </View>
          </View>
        </View>
        <View style={styles.buttonBottom}>
          <Button>Create</Button>
          <Button backgroundColor="#fff" color="#000" borderWidth={1} >
            Cancel
          </Button>
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
              <View style={styles.cardTop}>
                <Text style={styles.eventName}>Tasker name</Text>
                <Text style={styles.view}>$40/hr</Text>
              </View>
              <View style={styles.cardMid}>
                <Image
                  source={require("./assets/location.png")}
                  style={styles.location}
                />
                <Text style={styles.eventType}>1077 Brown Bear Drive</Text>
              </View>
              <View style={styles.cardMid}>
                <Image
                  source={require("./assets/calender.png")}
                  style={styles.calender}
                />
                <Text style={styles.eventType}>Sat, April 03, 2022, 8:00AM</Text>
              </View>
            </View>
          </View>
        </View>
        <View style={styles.buttonBottom}>
          <Button>View Details</Button>
          <Button backgroundColor="#fff" color="#000" borderWidth={1} >
            Message
          </Button>
        </View>
      </View>
      <View style={styles.bottom}>
        <Image source={require("./assets/home.png")} style={styles.star} />
        <Image source={require("./assets/task.png")} style={styles.task} />
        <Image source={require("./assets/tasker.png")} style={styles.tasker} />
        <Image source={require("./assets/chat.png")} style={styles.chat} />
        <Image source={require("./assets/profile.png")} style={styles.profile} />
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF"
  },

  subHeading: { fontSize: 16, fontWeight: "400", marginLeft: 20, color: "#4A4A4A", marginTop: 20 },
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
    marginBottom: 10,
    width: 115
  },
  eventType: {
    fontSize: 14,
    marginLeft: 10,
    width: 200,
    marginVertical: 5
  },
  imgContainer: {
    height: 97,
    width: 80,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#dadada",
    borderRadius: 10
  },
  image: { height: 32, width: 32, resizeMode: "contain" },
  location: { height: 18, width: 14, resizeMode: "contain" },
  calender: { height: 15, width: 13, resizeMode: "contain" },
  cardTop: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", width: 250 },
  view: { fontSize: 20, color: "#000", marginBottom: 7, fontWeight: "bold" },
  cardMid: { flexDirection: "row", justifyContent: "flex-start", alignItems: "center", marginLeft: 10 },
  buttonBottom: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    marginVertical: 30
  },
  mainCard: {
    elevation: 15,
    shadowColor: "#ccc9c9",
    backgroundColor: "#fff",
    marginHorizontal: 10,
    marginTop: 15,
    borderRadius: 8
  },
  bottom: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingVertical: 20, paddingHorizontal: 20, backgroundColor: "#C4C4C4" },
  star: { width: 35, height: 40, resizeMode: "contain" },
  task: { width: 28, height: 34, resizeMode: "contain" },
  chat: { width: 28, height: 38, resizeMode: "contain" },
  profile: { width: 38, height: 38, resizeMode: "contain" },
  tasker: { width: 68, height: 40, resizeMode: "contain" }
});

const Button = (props) => {
  return (
    <TouchableHighlight onPress={props.onPress} underlayColor="#DDDDDD">
      <View
        style={[
          btnStyles.button,
          {
            backgroundColor: props.backgroundColor ? props.backgroundColor : "#000000",
            height: props.height ? props.height : 49,
            borderWidth: props.borderWidth ? props.borderWidth : 0,
            borderColor: props.borderColor ? props.borderColor : "#000000"
          }
        ]}
      >
        <Text style={[btnStyles.text, { color: props.color ? props.color : "#ffffff" }]}>
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
export default TaskersListing;
