import React from "react";
import { Text, StyleSheet, View, Image, TouchableHighlight, ScrollView } from "react-native";

const MyJobsCandidateViewActiveJobsScreen = (params) => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Image source={require(

          "./assets/back.png")} style={styles.back} />
        <Text style={styles.heading}>My Jobs</Text>
        <Text />
      </View>
      <View style={styles.tabView}>
        <View style={styles.tabItem}>
          <Text style={[styles.tabText, styles.selectedTab]}>Job Posts</Text>
        </View>
        <View style={styles.tabItem}>
          <Text style={styles.tabText}>Active Jobs</Text>
        </View>
        <View style={styles.tabItem}>
          <Text style={styles.tabText}>Past Jobs</Text>
        </View>
      </View>
      <Text style={styles.subHeading}>List of requested jobs</Text>
      <View style={styles.cardWrapper}>
        <View style={styles.walletCard}>
        <View style={[styles.leftSection, styles.flexItem]}>
            <Text style={styles.eventName}>Job title:</Text>
            <Text style={styles.text}>Department:</Text>
            <Text style={styles.text}>Starting date:</Text>
            <Text style={styles.text}>Starting time:</Text>
            <Text style={styles.text}>Number of candidates:</Text>
          </View>
          <View style={styles.leftSection}>
            <Text style={styles.eventName}>Graphic Designer</Text>
            <Text style={styles.text}>UX/UI department</Text>
            <Text style={styles.text}>01/06/2022</Text>
            <Text style={styles.text}>09:00 AM</Text>
            <Text style={styles.text}>+20</Text>
          </View>
        </View>

        <View style={styles.buttonBottom}>
          <Button backgroundColor={"#fff"} borderWidth={1} borderColor={"#000"} color={"#000"}>Mark as completed</Button>
        </View>
      </View>
      <View style={styles.cardWrapper}>
        <View style={styles.walletCard}>
        <View style={[styles.leftSection, styles.flexItem]}>
            <Text style={styles.eventName}>Job title:</Text>
            <Text style={styles.text}>Department:</Text>
            <Text style={styles.text}>Starting date:</Text>
            <Text style={styles.text}>Starting time:</Text>
            <Text style={styles.text}>Number of candidates:</Text>
          </View>
          <View style={styles.leftSection}>
            <Text style={styles.eventName}>Graphic Designer</Text>
            <Text style={styles.text}>UX/UI department</Text>
            <Text style={styles.text}>01/06/2022</Text>
            <Text style={styles.text}>09:00 AM</Text>
            <Text style={styles.text}>+20</Text>
          </View>
        </View>
        <View style={styles.buttonBottom}>
          <Button backgroundColor={"#fff"} borderWidth={1} borderColor={"#000"} color={"#000"}>Mark as completed</Button>
        </View>
      </View>
      <View style={styles.cardWrapper}>
        <View style={styles.walletCard}>
          <View style={[styles.leftSection, styles.flexItem]}>
            <Text style={[styles.eventName]}>Job title:</Text>
            <Text style={styles.text}>Department:</Text>
            <Text style={styles.text}>Starting date:</Text>
            <Text style={styles.text}>Starting time:</Text>
            <Text style={styles.text}>Number of candidates:</Text>
          </View>
          <View style={styles.leftSection}>
            <Text style={styles.eventName}>Graphic Designer</Text>
            <Text style={styles.text}>UX/UI department</Text>
            <Text style={styles.text}>01/06/2022</Text>
            <Text style={styles.text}>09:00 AM</Text>
            <Text style={styles.text}>+20</Text>
          </View>
        </View>
        <View style={styles.buttonBottom}>
          <Button backgroundColor={"#fff"} borderWidth={1} borderColor={"#000"} color={"#000"}>Mark as completed</Button>
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
    marginBottom: 20
  },
  back: { width: 11.25, height: 20, resizeMode: "contain", marginLeft: -15 },
  heading: { fontSize: 16, color: "#000" },
  mr10: {
    marginLeft: 25,
    marginBottom: 10
  },
  tabView: {
    height: 48,
    backgroundColor: "#F1F1F1",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    borderRadius: 10,
    paddingVertical: 6,
    paddingHorizontal: 6,
    marginVertical: 20
  },
  tabItem: {
    height: "100%",
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
    elevation: 10,
    paddingHorizontal: 25,
    paddingVertical: 10,
    borderRadius: 10
  },
  tabText: { fontSize: 12 },
  subHeading: { fontSize: 16, marginLeft: 25, marginTop: 10, marginBottom: 20 },
  walletCard: {
    backgroundColor: "#fff",
    padding: 10,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: 5
  },
  cardWrapper: {
    backgroundColor: "#fff",
    elevation: 15,
    shadowColor: "#ccc9c9",
    marginBottom: 20,
    borderRadius: 8
  },
  eventName: {
    color: "#000",
    fontSize: 18
  },
  text: { fontSize: 14, color: "#000", paddingTop: 8 },
  leftSection: { justifyContent: "space-evenly", alignItems: "flex-end" },

  buttonBottom: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    marginBottom: 10
  },
  flexItem: { alignItems: "flex-start" }
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
    marginVertical: 10,
    width: 307
  },
  text: {
    fontWeight: "bold",
    fontSize: 15
  }
});

export default MyJobsCandidateViewActiveJobsScreen;
