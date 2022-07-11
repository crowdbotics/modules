import React from "react";
import { Text, StyleSheet, View, Image, ScrollView } from "react-native";

const MyJobsCandidateViewScreen = () => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Image source={require("./assets/back.png")} style={styles.back} />
        <Text style={styles.heading}>My Jobs</Text>
        <Text />
      </View>
      <View style={styles.tabView}>
        <View style={[styles.tabItem, styles.selectedTab]}>
          <Text style={styles.tabText}>Applied Jobs</Text>
        </View>
        <View style={styles.tabItem}>
          <Text style={styles.tabText}>Active Jobs</Text>
        </View>
        <View style={styles.tabItem}>
          <Text style={styles.tabText}>My earnings</Text>
        </View>
      </View>
      <Text style={styles.mr10}>Job title</Text>
      <View style={styles.chooseContainer}>
        <Text>Job title</Text>
      </View>

      <Text style={styles.mr10}>Status</Text>
      <View style={styles.chooseContainer}>
        <View style={styles.sectionContainer}>
          <View style={styles.checkboxContainer}>
            <Image
              source={require("./assets/box.png")}
              style={styles.checkbox}
            />
            <Text style={styles.label}>Available </Text>
          </View>
          <View style={[styles.checkboxContainer, { marginLeft: 100 }]}>
            <Image
              source={require("./assets/checkbox.png")}
              style={styles.checkbox}
            />
            <Text style={styles.label}>Hired </Text>
          </View>
        </View>
      </View>

      <Text style={styles.mr10}>Department</Text>
      <View style={styles.chooseContainer}>
        <Text>Department</Text>
      </View>

      <View style={styles.dateTimeContainer}>
        <Text style={styles.mr10}>Starting date</Text>
        <Text style={[styles.mr10, { marginRight: 25 }]}>Starting time</Text>
      </View>
      <View style={[styles.chooseContainer, { paddingRight: 30 }]}>
        <Text></Text>
        <Text>09:00 AM</Text>
      </View>

      <Text style={styles.mr10}>See details</Text>
      <View style={styles.chooseContainer}>
        <Text>Link</Text>
        <Image source={require("./assets/link.png")} style={styles.linkImg} />
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
    marginTop: 30,
    marginBottom: 20,
    marginHorizontal: 10
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
  tabText: { fontSize: 12 },
  selectedTab: {
    backgroundColor: "#FFF",
    shadowColor: "gray",
    elevation: 10
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
  linkImg: { width: 20, height: 12, resizeMode: "contain" },
  dateTimeContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  checkbox: {
    height: 24,
    width: 24,
    resizeMode: "contain",
    alignSelf: "center"
  },
  sectionContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center"
  },
  checkboxContainer: {
    flexDirection: "row"
  },
  label: {
    marginLeft: 15
  }
});

export default MyJobsCandidateViewScreen;
