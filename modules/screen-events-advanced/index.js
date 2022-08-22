import React from "react";
import { Text, StyleSheet, View, ScrollView, Image } from "react-native";

const EventsAdvancedScreen = () => {
  return (
    <ScrollView >
      <View style={styles.container}>
        <View style={styles.header}>
          <Image source={require("./assets/back.png")} style={styles.back} />
          <Text style={styles.heading}>Events</Text>
          <View style={styles.IconContainer}>
            <Image source={require("./assets/star.png")} style={styles.star} />
            <Image source={require("./assets/settings.png")} style={styles.settings} />
          </View>
        </View>
        <Text style={styles.headingTxt}>Event type</Text>
        <View style={styles.tabView}>
          <View style={styles.tabItem}>
            <Text>Party</Text>
          </View>
          <View style={styles.tabItem}>
            <Text>Sports</Text>
          </View>
          <View style={[styles.tabItem, styles.selectedTab]}>
            <Text>Cultural</Text>
          </View>
          <View style={styles.tabItem}>
            <Text>Running</Text>
          </View>
        </View>

        <View style={styles.mainContainer}>
          <Text style={styles.subHeading}>Sponsored Events</Text>
          <View style={styles.walletCard}>
            <View style={styles.walletInner}>
              <View style={styles.imgContainer}>
                <Image source={require("./assets/edit.png")} style={styles.image} />
              </View>

              <View style={styles.walletCarder}>
                <Text style={styles.eventName}>Event name</Text>
                <Text style={styles.eventType}>Event type</Text>
                <Text style={styles.attending}>Attending</Text>
              </View>
            </View>
            <View style={styles.leftSection}>
              <Text style={styles.date}>06.12.2022</Text>
              <Text style={styles.time}>12:45 PM</Text>
              <View style={styles.attendingContainer}>
                <Text style={styles.people}>2723</Text>
                <Image source={require("./assets/user.png")} style={styles.userImg} />
              </View>
            </View>
          </View>
        </View>
        <View style={styles.myEvents}>
          <View style={styles.myEventsHeading}>
            <Text style={styles.myEventsText}>My event</Text>
          </View>

          <View style={styles.boxContainer}>
            <View style={styles.checkboxContainer}>
              <Text style={styles.label}>Yes</Text>
              <Image source={require("./assets/checkbox.png")} style={styles.checkBox} />
            </View>
            <View style={styles.checkboxContainer}>
              <Text style={styles.label}>No</Text>
              <Image source={require("./assets/box.png")} style={styles.checkBox} />
            </View>
            <View style={styles.checkboxContainer}>
              <Text style={styles.label}>Maybe</Text>
              <Image source={require("./assets/box.png")} style={styles.checkBox} />
            </View>
          </View>
        </View>
        <View style={styles.centerBox}>
          <View style={styles.box}>
            <Image source={require("./assets/Vector.png")} style={styles.vector} />
            <View style={styles.imageBox}>
              <Image source={require("./assets/edit.png")} style={styles.editImg} />
            </View>
          </View>
        </View>
        <View style={styles.location}>
          <Text>12:45 PM</Text>
          <Text>Location</Text>
        </View>
        <View style={styles.tags}>
          <Text style={styles.tagText}>Additional info</Text>
          <Text style={[styles.tagText, styles.m15]}>Invites</Text>
          <Text style={styles.tagText}>RSVP</Text>
        </View>
      </View>
      <View style={styles.bottom}>
        <Image source={require("./assets/download.png")} style={styles.star} />
        <Image source={require("./assets/mos.png")} style={styles.star} />
        <Image source={require("./assets/copy.png")} style={styles.star} />
        <Image source={require("./assets/star.png")} style={styles.star} />
        <Image source={require("./assets/contact.png")} style={styles.star} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 10
  },
  headingTxt: {
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 22
  },
  mainContainer: { width: "100%", marginVertical: 30 },
  subHeading: { fontSize: 16, fontWeight: "bold", marginLeft: 22 },
  tabView: {
    width: "100%",
    height: 48,
    backgroundColor: "#F1F1F1",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    borderRadius: 10,
    paddingVertical: 6,
    paddingHorizontal: 6,
    marginTop: 10
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
    backgroundColor: "#fff",
    padding: 10,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 10,
    borderRadius: 8,
    elevation: 15,
    shadowColor: "#ccc9c9"
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
    color: "#000",
    fontSize: 14,
    marginLeft: 10,
    width: 115
  },
  eventType: {
    color: "#000",
    fontSize: 12,
    marginLeft: 10,
    width: 115,
    marginVertical: 5
  },
  attendingContainer: { flexDirection: "row", justifyContent: "center", alignItems: "center" },
  userImg: { height: 15, width: 15, resizeMode: "contain" },
  date: { fontSize: 14, color: "#000" },
  time: { fontSize: 14, color: "#dadada", marginVertical: 5 },
  people: { fontSize: 12, color: "#000" },
  attending: { color: "#000", fontSize: 12, marginLeft: 10, width: 115 },
  imgContainer: {
    height: 80,
    width: 80,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#dadada",
    borderRadius: 10
  },
  image: { resizeMode: "contain" },
  leftSection: { justifyContent: "flex-end", alignItems: "flex-end" },
  checkboxContainer: {
    flexDirection: "row",
    marginBottom: 20
  },
  checkbox: {
    alignSelf: "center"
  },
  myEvents: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  boxContainer: { flexDirection: "row", justifyContent: "space-evenly", alignItems: "center", width: 250 },
  checkBox: { height: 18, width: 18 },
  myEventsHeading: { justifyContent: "center", alignItems: "center" },
  myEventsText: { fontSize: 16, fontWeight: "bold", marginLeft: 30, marginBottom: 20 },
  label: { marginRight: 5, fontSize: 14 },
  box: { height: 170, width: 347, backgroundColor: "#fdf1d6", borderRadius: 10, alignItems: "center", justifyContent: "center" },
  imageBox: { height: 150, alignItems: "center", justifyContent: "center" },
  vector: { height: 14, width: 14, alignSelf: "flex-end", marginRight: 10, marginTop: 10, resizeMode: "contain" },
  editImg: { marginBottom: 15 },
  centerBox: { justifyContent: "center", alignItems: "center" },
  location: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginHorizontal: 45, marginVertical: 10 },
  tags: { flexDirection: "row", justifyContent: "flex-start", alignItems: "center", marginHorizontal: 30, marginTop: 20, marginBottom: 50 },
  tagText: { paddingVertical: 6, paddingHorizontal: 10, backgroundColor: "#F1F1F1", borderRadius: 12 },
  m15: { marginHorizontal: 15 },
  header: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginHorizontal: 30, marginTop: 10, marginBottom: 40 },
  back: { width: 11.25, height: 20, resizeMode: "contain", marginLeft: -20 },
  heading: { fontSize: 16, color: "#000", marginLeft: 20 },
  star: { width: 20, height: 20, resizeMode: "contain" },
  settings: { width: 20, height: 19.4, resizeMode: "contain" },
  IconContainer: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", width: 55, marginRight: -20 },
  bottom: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingVertical: 20, paddingHorizontal: 20, borderTopWidth: 1, borderTopColor: "#000", backgroundColor: "#fff" }
});

export default EventsAdvancedScreen;
