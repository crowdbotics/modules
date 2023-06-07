import React from "react";
import { Text, StyleSheet, View, Image, ScrollView } from "react-native";

const InstructorCourses = () => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.headerContainer}>
        <View style={styles.header}>
          <Image source={require("./assets/back.png")} style={styles.back} />
          <Text style={styles.heading}>Instructor courses</Text>
          <Image source={require("./assets/file.png")} style={styles.message} />
        </View>
        <View style={styles.cardWrapper}>
          <View style={styles.walletCard}>
            <View style={styles.walletInner}>
              <Image
                source={require("./assets/profile.png")}
                style={styles.image}
              />
              <View style={styles.walletCarder}>
                <Text style={styles.orgName}> Mentor name</Text>
                <Text style={styles.eventName}>Mentor UIUX Course:</Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.headerBottom}>
          <View style={styles.starContainer}>
            <Image source={require("./assets/star.png")} style={styles.star} />
            <Text style={styles.starText}>
              <Text style={styles.ratingText}>4.9 </Text>(100 reviews)
            </Text>
          </View>
          <Text style={styles.midText}>10 Courses</Text>
          <View style={styles.clockContainer}>
            <Image
              source={require("./assets/clock.png")}
              style={styles.clock}
            />
            <Text style={styles.clockText}>100 h 30 min</Text>
          </View>
        </View>
      </View>
      <Text style={styles.title}>Instructor courses</Text>

      <View style={styles.centerBox}>
        <View>
          <View style={styles.box}>
            <View style={styles.courseTop}>
              <Text />
              <Text style={styles.rateLabel}>4.7</Text>
            </View>
            <View style={styles.imageBox}>
              <Image
                source={require("./assets/edit.png")}
                style={styles.editImg}
              />
            </View>
          </View>
          <View style={styles.boxBottom}>
            <Text style={styles.courseName}>Course name</Text>
            <Text style={styles.courseDesc}>Web Design for beginners</Text>
            <View style={styles.cardsContainer}>
              <Image
                source={require("./assets/cards.png")}
                style={styles.cards}
              />
              <Text style={styles.count}>48 Enrolled</Text>
            </View>
          </View>
        </View>
        <View>
          <View style={[styles.box, styles.color]}>
            <View style={styles.courseTop}>
              <Image
                source={require("./assets/circle-star.png")}
                style={styles.circle}
              />
              <Text style={styles.rateLabel}>4.7</Text>
            </View>
            <View style={styles.imageBox}>
              <Image
                source={require("./assets/edit.png")}
                style={styles.editImg}
              />
            </View>
          </View>
          <View style={[styles.boxBottom, styles.mr10]}>
            <Text style={styles.courseName}>Course name</Text>
            <Text style={styles.courseDesc}>Web Design for beginners</Text>
            <View style={styles.cardsContainer}>
              <Image
                source={require("./assets/cards.png")}
                style={styles.cards}
              />
              <Text style={styles.count}>48 Enrolled</Text>
            </View>
          </View>
        </View>
      </View>
      <View style={styles.centerBox}>
        <View>
          <View style={styles.box}>
            <View style={styles.courseTop}>
              <Text />
              <Text style={styles.rateLabel}>4.7</Text>
            </View>
            <View style={styles.imageBox}>
              <Image
                source={require("./assets/edit.png")}
                style={styles.editImg}
              />
            </View>
          </View>
          <View style={styles.boxBottom}>
            <Text style={styles.courseName}>Course name</Text>
            <Text style={styles.courseDesc}>Web Design for beginners</Text>
            <View style={styles.cardsContainer}>
              <Image
                source={require("./assets/cards.png")}
                style={styles.cards}
              />
              <Text style={styles.count}>48 Enrolled</Text>
            </View>
          </View>
        </View>
        <View>
          <View style={[styles.box, styles.color]}>
            <View style={styles.courseTop}>
              <Image
                source={require("./assets/circle-star.png")}
                style={styles.circle}
              />
              <Text style={styles.rateLabel}>4.7</Text>
            </View>
            <View style={styles.imageBox}>
              <Image
                source={require("./assets/edit.png")}
                style={styles.editImg}
              />
            </View>
          </View>
          <View style={[styles.boxBottom, styles.mr10]}>
            <Text style={styles.courseName}>Course name</Text>
            <Text style={styles.courseDesc}>Web Design for beginners</Text>
            <View style={styles.cardsContainer}>
              <Image
                source={require("./assets/cards.png")}
                style={styles.cards}
              />
              <Text style={styles.count}>48 Enrolled</Text>
            </View>
          </View>
        </View>
      </View>
      <View style={styles.bottom}>
        <Image source={require("./assets/home.png")} style={styles.home} />
        <Image
          source={require("./assets/black-star.png")}
          style={styles.home}
        />
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
    marginHorizontal: 20,
    marginTop: 15,
    marginBottom: 20
  },
  back: { width: 11.25, height: 20, resizeMode: "contain", marginLeft: -15 },
  heading: { fontSize: 16, color: "#000" },
  message: { width: 18, height: 12, resizeMode: "contain", marginRight: -10 },
  headerContainer: { backgroundColor: "#FCF1D6", paddingHorizontal: 10 },
  walletCard: {
    padding: 10,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 15,
    marginBottom: 25
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
    fontSize: 12,
    marginLeft: 10,
    width: 115
  },
  orgName: {
    fontSize: 16,
    marginLeft: 5
  },
  image: { resizeMode: "contain", height: 40, width: 40 },
  headerBottom: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20
  },
  starContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  clockContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  star: { resizeMode: "contain", height: 16, width: 15, marginRight: 5 },
  starText: { color: "#616161" },
  ratingText: { color: "#000" },
  clock: { resizeMode: "contain", height: 16, width: 15, marginRight: 5 },
  clockText: { color: "#616161" },
  midText: { marginLeft: 20, color: "#616161" },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginLeft: 20,
    marginBottom: 20,
    marginTop: 10
  },
  box: {
    height: 167,
    width: 145,
    backgroundColor: "#fdf1d6",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center"
  },
  imageBox: { height: 140, alignItems: "center", justifyContent: "center" },
  editImg: { marginBottom: 15, height: 32, width: 32, resizeMode: "contain" },
  centerBox: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingHorizontal: 10
  },
  courseTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    paddingHorizontal: 15,
    marginTop: 10
  },
  rateLabel: {
    fontSize: 7,
    paddingHorizontal: 5,
    backgroundColor: "#FFD500",
    borderRadius: 5
  },
  circle: { resizeMode: "contain", height: 24, width: 24, marginTop: 5 },
  boxBottom: { marginTop: 5 },
  mr10: { marginLeft: 10 },
  courseName: { fontSize: 12, fontWeight: "bold" },
  courseDesc: { fontSize: 8, color: "#B6B6B6" },
  cards: { height: 40, width: 40, resizeMode: "contain", marginTop: -3 },
  cardsContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center"
  },
  count: { fontSize: 8, color: "#27AE60", fontWeight: "bold", marginLeft: 5 },
  color: { backgroundColor: "#D9DADD" },
  home: { height: 22, width: 24, resizeMode: "contain" },
  bottom: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 20,
    paddingHorizontal: 30,
    backgroundColor: "#C4C4C4",
    height: 74
  }
});

export default InstructorCourses;
