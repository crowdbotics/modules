import React from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  ScrollView,
  TouchableHighlight
} from "react-native";

const TaskSummary = () => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.walletCard}>
        <View style={styles.walletInner}>
          <View style={styles.imgContainer}>
            <Image source={require("./assets/edit.png")} style={styles.image} />
          </View>
          <View style={styles.walletCarder}>
            <View style={styles.cardTop}>
              <Text style={styles.eventName}>Tasker name</Text>
              <Text style={styles.view}>$40/hr</Text>
            </View>
            <Text style={styles.eventType}>
              <Text style={styles.rating}>4.9</Text> (15 Review)
            </Text>
            <Text style={styles.date}>15 Cleaning Jobs</Text>
          </View>
        </View>
      </View>
      <View style={styles.info}>
        <Text style={styles.infoTitle}>How I can help</Text>
        <Text style={styles.infoText}>
          Fast and has great attention to details, that describes my work!{" "}
        </Text>
      </View>
      <View style={styles.reviewContainer}>
        <Text style={styles.review}>Review booking details</Text>
        <Text style={styles.edit}>Edit</Text>
      </View>

      <Text style={styles.text}>See details</Text>
      <View style={styles.taskDetails}>
        <View style={styles.firstContainer}>
          <Text style={styles.rate}>RATE</Text>
          <Text style={styles.dateTime}>DATE AND TIME</Text>
        </View>
        <View style={styles.secondContainer}>
          <Text style={styles.rate}>$40/hr</Text>
          <Text>Sat, April 18, 2020 8:00AM</Text>
        </View>
        <View style={styles.location}>
          <Text style={styles.dateTime}>LOCATION</Text>
          <Text style={styles.locText}>1077 Brown Bear Drive</Text>
        </View>
        <View style={styles.line} />
        <Text style={styles.service}>Service Details</Text>
        <View style={styles.firstContainer}>
          <Text style={styles.rate}>TASK SIZE</Text>
          <Text style={styles.dateTime}>HOW OFTEN</Text>
        </View>
        <View style={styles.secondContainer}>
          <Text style={styles.rate}>Medium</Text>
          <Text>Just Once</Text>
        </View>
        <View style={styles.location}>
          <Text style={styles.dateTime}>ADDITIONAL DETAILS</Text>
          <Text style={styles.locText}>Please ring the twice.</Text>
        </View>
      </View>
      <Button>Confirm</Button>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  walletCard: {
    padding: 10,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 20
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
    width: 200
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
  cardTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: 250
  },
  view: {
    fontSize: 30,
    color: "#000",
    fontWeight: "bold",
    marginBottom: -30,
    marginRight: -30
  },
  container: { backgroundColor: "#DADADA26", flex: 1 },
  info: { marginHorizontal: 15, marginVertical: 20 },
  infoTitle: { fontSize: 18 },
  infoText: { fontSize: 14, color: "#7E7D7D", marginVertical: 5 },
  reviewContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingVertical: 20
  },
  review: { fontSize: 18, color: "#000" },
  edit: { color: "#D70404", fontSize: 12 },
  text: { fontSize: 12, marginVertical: 15, marginHorizontal: 30 },
  firstContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center"
  },
  taskDetails: { backgroundColor: "#fff", padding: 20, marginHorizontal: 20 },
  rate: { fontSize: 10, width: 100 },
  dateTime: { fontSize: 10 },
  secondContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    paddingVertical: 5
  },
  location: { marginTop: 10 },
  locText: { marginVertical: 5 },
  service: { color: "#7E7D7D", fontSize: 12, marginBottom: 10 },
  line: {
    borderBottomColor: "#E2E8F2",
    borderBottomWidth: 1,
    marginVertical: 10
  }
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
    marginHorizontal: 50,
    marginVertical: 20
  },
  text: {
    fontWeight: "bold",
    fontSize: 15
  }
});

export default TaskSummary;
