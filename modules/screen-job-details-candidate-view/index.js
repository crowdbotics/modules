import React from "react";
import {
  Text,
  StyleSheet,
  View,
  Image,
  ScrollView,
  TouchableHighlight
} from "react-native";

const JobDetailsCandidateViewScreen = () => {
  return (
    <ScrollView>
      <View style={styles.headerContainer}>
        <View style={styles.header}>
          <Image source={require("./assets/back.png")} style={styles.back} />
          <Text style={styles.heading}>Job details</Text>
          <Image
            source={require("./assets/message.png")}
            style={styles.message}
          />
        </View>
        <View style={styles.cardWrapper}>
          <View style={styles.walletCard}>
            <View style={styles.walletInner}>
              <Image
                source={require("./assets/profile.png")}
                style={styles.image}
              />
              <View style={styles.walletCarder}>
                <Text style={styles.orgName}>
                  {" "}
                  Facility / Organization name
                </Text>
                <Text style={styles.eventName}>Link:</Text>
                <Text style={styles.eventName}>Location</Text>
                <Text style={styles.eventName}>Phone</Text>
              </View>
            </View>
          </View>
        </View>
      </View>
      <View style={styles.container}>
        <Text style={styles.mr10}>Job title</Text>
        <View style={styles.chooseContainer}>
          <Text>Job title</Text>
        </View>
        <Text style={styles.mr10}>Department</Text>
        <View style={styles.chooseContainer}>
          <Text>Department</Text>
        </View>
        <Text style={styles.mr10}>Job requirements</Text>
        <View style={styles.tags}>
          <Text style={styles.tagText}>Tag</Text>
          <Text style={styles.tagText}>Tag</Text>
          <Text style={styles.tagText}>Tag</Text>
          <Text style={styles.tagText}>Tag</Text>
          <Text style={styles.tagText}>Tag</Text>
        </View>
        <View style={styles.descriptionContainer}>
          <Text style={styles.descriptionText}>Job description</Text>
          <Text style={styles.description}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Massa
            faucibus nisi egestas quis etiam nec feugiat. Scelerisque
            pellentesque at in accumsan cras tristique at id. At nullam lectus
            sapien nulla. At egestas cursus elit, tortor mattis gravida ornare
            proin ipsum. Duis purus turpis libero tristique dignissim.
          </Text>
        </View>
        <Text style={styles.mr10}>Number of Hours</Text>
        <View
          style={[
            styles.chooseContainer,
            { justifyContent: "center", marginBottom: 0 }
          ]}
        >
          <Text>8</Text>
        </View>
        <View style={styles.bidContainer}>
          <Text style={styles.bidText}>Mon-Fri</Text>
        </View>
        <Text style={styles.mr10}>Starting date</Text>
        <View style={styles.chooseContainer}>
          <Text>01/06/2022</Text>
        </View>
        <Text style={styles.mr10}>Salary</Text>
        <View style={styles.sliderContainer}>
          <Image
            source={require("./assets/slider.png")}
            style={styles.sliderImg}
          />
        </View>
        <View style={styles.sliderTextContainer}>
          <Text style={styles.sliderText}>$40k</Text>
          <Text style={[styles.sliderText, { marginLeft: 170 }]}>$80k</Text>
        </View>
        <Text style={styles.mr10}>Bonus, Incentives</Text>
        <View style={styles.chooseContainer}>
          <Text>10k</Text>
        </View>
        <View style={styles.buttonBottom}>
          <Button>Apply for a job</Button>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    paddingTop: 20,
    backgroundColor: "#FFF"
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
  message: { width: 20, height: 20, resizeMode: "contain", marginRight: -10 },
  headerContainer: { backgroundColor: "#F0F2F7", paddingHorizontal: 10 },
  walletCard: {
    padding: 10,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  cardWrapper: {
    marginBottom: 20,
    paddingHorizontal: 5,
    borderRadius: 8
  },
  walletInner: {
    display: "flex",
    flexDirection: "row"
  },
  walletCarder: {
    alignSelf: "center",
    display: "flex",
    marginLeft: 5,
    flexDirection: "column"
  },
  eventName: {
    color: "#7C7C7C",
    fontSize: 14,
    marginLeft: 10,
    width: 115
  },
  orgName: {
    color: "#000",
    fontSize: 16,
    marginLeft: 5
  },
  image: { resizeMode: "contain", height: 89, width: 90 },
  mr10: {
    marginLeft: 25,
    marginBottom: 10
  },
  tags: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 10,
    marginTop: 10,
    marginBottom: 15
  },
  tagText: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: "#F1F1F1",
    borderRadius: 10
  },
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
  descriptionContainer: {
    paddingHorizontal: 15,
    marginTop: 10,
    marginBottom: 15
  },
  descriptionText: { fontSize: 16, fontWeight: "400", marginLeft: 10 },
  description: { fontSize: 12, marginVertical: 10, fontWeight: "500" },
  sliderContainer: {
    marginHorizontal: 7,
    paddingHorizontal: 10
  },
  sliderImg: {
    width: 340,
    height: 15,
    resizeMode: "contain"
  },
  sliderTextContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    marginBottom: 10
  },
  sliderText: { color: "#77838F", marginLeft: 33, marginTop: 3 },
  buttonBottom: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center"
  },
  bidContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 3
  },
  bidText: { fontSize: 12, color: "#939396" }
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
    marginVertical: 10,
    width: 307
  },
  text: {
    fontWeight: "bold",
    fontSize: 15
  }
});

export default JobDetailsCandidateViewScreen;
