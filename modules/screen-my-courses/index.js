import React from "react";
import {
  Text,
  View,
  StyleSheet, ScrollView, Image
} from "react-native";

const MyCourses = () => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Image source={require("./assets/back.png")} style={styles.back} />
        <Text style={styles.heading}>Lesson overview</Text>
        <Image
          source={require("./assets/file.png")}
          style={styles.message}
        />
      </View>
      <Text style={styles.title}>My courses</Text>
      <View style={styles.headerBottom}>
        <Text style={styles.starText}>25 Courses</Text>
        <View style={styles.clockContainer}>
          <Image source={require("./assets/clock.png")} style={styles.clock} />
          <Text style={styles.clockText}>4 h 30 min</Text>
        </View>
      </View>
      <View style={styles.mainContainer}>
        <View style={styles.walletCard}>
          <View style={styles.imgContainer}>
            <Image source={require("./assets/play.png")} style={styles.image} />
          </View>
          <View style={styles.walletCarder}>
            <Text style={styles.eventName}>Illustration Design</Text>
            <Text style={styles.eventType}> <Text style={styles.typeColor}>Instructor:</Text> Lance Bogrol</Text>
            <Image source={require("./assets/slide.png")} style={styles.slide} />
            <View style={styles.slideText}>
              <Text style={styles.count}>14 Video</Text>
              <Text style={styles.attending}>25 Video</Text>
            </View>
          </View>
        </View>
        <View style={[styles.walletCard]}>
          <View style={[styles.imgContainer, styles.color]}>
            <Image source={require("./assets/play.png")} style={styles.image} />
          </View>
          <View style={styles.walletCarder}>
            <Text style={styles.eventName}>Illustration Design</Text>
            <Text style={styles.eventType}> <Text style={styles.typeColor}>Instructor:</Text> Lance Bogrol</Text>
            <Image source={require("./assets/slide1.png")} style={styles.slide} />
            <View style={styles.slideText}>
              <Text style={styles.count}>4 Video</Text>
              <Text style={styles.attending}>10 Video</Text>
            </View>
          </View>
        </View>
        <View style={styles.walletCard}>
          <View style={styles.imgContainer}>
            <Image source={require("./assets/play.png")} style={styles.image} />
          </View>
          <View style={styles.walletCarder}>
            <Text style={styles.eventName}>Illustration Design</Text>
            <Text style={styles.eventType}> <Text style={styles.typeColor}>Instructor:</Text> Lance Bogrol</Text>
            <Image source={require("./assets/slide2.png")} style={styles.slide} />
            <View style={styles.slideText}>
              <Text style={styles.count}>8 Video</Text>
              <Text style={styles.attending}>10 Video</Text>
            </View>
          </View>
        </View>
        <View style={[styles.walletCard]}>
          <View style={[styles.imgContainer, styles.color]}>
            <Image source={require("./assets/play.png")} style={styles.image} />
          </View>
          <View style={styles.walletCarder}>
            <Text style={styles.eventName}>Illustration Design</Text>
            <Text style={styles.eventType}> <Text style={styles.typeColor}>Instructor:</Text> Lance Bogrol</Text>
            <Image source={require("./assets/slide1.png")} style={styles.slide} />
            <View style={styles.slideText}>
              <Text style={styles.count}>5 Video</Text>
              <Text style={styles.attending}>15 Video</Text>
            </View>
          </View>
        </View>
      </View>
      <View style={styles.bottom}>
        <Image source={require("./assets/home.png")} style={styles.home} />
        <Image source={require("./assets/black-star.png")} style={styles.home} />
        <Image source={require("./assets/search.png")} style={styles.home} />
        <Image source={require("./assets/settings.png")} style={styles.home} />
        <Image source={require("./assets/bell.png")} style={styles.home} />
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  message: { width: 18, height: 12, resizeMode: "contain", marginRight: -10 },
  title: { fontSize: 20, fontWeight: "bold", color: "#000", marginLeft: 20, marginVertical: 10 },
  headerBottom: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    marginHorizontal: 20
  },
  clockContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    marginLeft: 20
  },
  starText: { color: "#616161" },
  clock: { resizeMode: "contain", height: 16, width: 15, marginRight: 5 },
  clockText: { color: "#616161" },
  mainContainer: { width: "100%", marginBottom: 20 },
  subHeading: { fontSize: 16, fontWeight: "bold", marginLeft: 22 },
  walletCard: {
    backgroundColor: "#fff",
    marginHorizontal: 10,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    marginTop: 10,
    marginBottom: 10,
    borderRadius: 8,
    elevation: 10,
    shadowColor: "#ccc9c9"
  },
  walletCarder: {
    alignSelf: "center",
    display: "flex",
    flexDirection: "column"
  },
  eventName: {
    color: "#2A2C2E",
    fontSize: 14,
    marginLeft: 10,
    width: 115
  },
  eventType: {
    color: "#000",
    fontSize: 12,
    marginLeft: 10,
    width: 150,
    marginVertical: 5
  },
  typeColor: { color: "#868B8E" },
  imgContainer: {
    height: 122,
    width: 138,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#dadada",
    borderBottomLeftRadius: 8,
    borderTopLeftRadius: 8
  },
  image: { resizeMode: "contain", height: 32, width: 32 },
  slideText: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginLeft: 10 },
  count: { color: "#12D790", fontSize: 12 },
  attending: { color: "#868B8E", fontSize: 12 },
  slide: { height: 10, width: 219, resizeMode: "contain", marginLeft: 10, marginVertical: 5 },
  color: { backgroundColor: "#FCF1D6" },
  home: { height: 22, width: 24, resizeMode: "contain" },
  bottom: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingVertical: 20, paddingHorizontal: 30, backgroundColor: "#C4C4C4", height: 74 }
});

export default MyCourses;
