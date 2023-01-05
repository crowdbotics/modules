import React from "react";
import { Text, View, StyleSheet, Image, ScrollView } from "react-native";

const LessonOverview = () => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Image source={require("./assets/back.png")} style={styles.back} />
        <Text style={styles.heading}>Lesson overview</Text>
        <Image source={require("./assets/file.png")} style={styles.message} />
      </View>
      <Text style={styles.title}>Part 1</Text>
      <View style={styles.centerBox}>
        <View style={styles.box}>
          <Image source={require("./assets/info.png")} style={styles.vector} />
          <View style={styles.imageBox}>
            <View style={styles.innerBox}>
              <Image
                source={require("./assets/play.png")}
                style={styles.editImg}
              />
              <Text style={styles.playText}>Start learning</Text>
            </View>
          </View>
        </View>
      </View>

      <View style={styles.headerBottom}>
        <Text style={styles.starText}>Lesson overview</Text>
        <View style={styles.clockContainer}>
          <Image source={require("./assets/clock.png")} style={styles.clock} />
          <Text style={styles.clockText}>4 h 30 min</Text>
        </View>
      </View>
      <View style={styles.descContainer}>
        <Text style={styles.desc}>
          Lorem ipsum dolor sit UX/UI, consectetur adipiscing elit. Convallis
          odio habitasse nisl, odio senectus purus. Lorem risus aenean lectus
          vestibulum eleifend elit vel aliquam egestas. Morbi blandit id enim
          in.
        </Text>
        <Text style={styles.desc}>
          Lorem ipsum dolor sit UX/UI, consectetur adipiscing elit. Convallis
          odio habitasse nisl, odio senectus purus. Lorem risus aenean lectus
          vestibulum eleifend elit vel aliquam egestas. Morbi blandit id enim
          in.
        </Text>
        <Text style={styles.desc}>
          Lorem ipsum dolor sit UX/UI, consectetur adipiscing elit. Convallis
          odio habitasse nisl, odio senectus purus. Lorem risus aenean lectus
          vestibulum eleifend elit vel aliquam egestas. Morbi blandit id enim
          in.
        </Text>
      </View>

      <View style={styles.walletCard}>
        <View style={styles.walletInner}>
          <Image
            source={require("./assets/profile.png")}
            style={styles.image}
          />
          <View style={styles.walletCarder}>
            <Text style={styles.orgName}> Mentor name</Text>
            <Text style={styles.eventName}>Mentor UI/UX Course:</Text>
          </View>
        </View>
      </View>
      <View style={styles.bottom}>
        <Image source={require("./assets/home.png")} style={styles.home} />
        <Image source={require("./assets/star.png")} style={styles.home} />
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
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#000",
    marginLeft: 20,
    marginVertical: 10
  },

  box: {
    height: 190,
    width: "100%",
    backgroundColor: "#fdf1d6",
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 10
  },
  imageBox: {
    flexDirection: "row",
    height: 150,
    alignItems: "center",
    justifyContent: "center"
  },
  vector: {
    height: 20,
    width: 20,
    alignSelf: "flex-end",
    marginRight: 20,
    marginTop: 15,
    resizeMode: "contain"
  },
  editImg: { width: 32, height: 32, resizeMode: "contain" },
  centerBox: { justifyContent: "center", alignItems: "center" },
  innerBox: {
    backgroundColor: "#fef8eb",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 30,
    marginBottom: 20
  },
  home: { height: 22, width: 24, resizeMode: "contain" },
  bottom: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 20,
    paddingHorizontal: 30,
    backgroundColor: "#C4C4C4",
    height: 74
  },
  playText: { color: "#0D1B26", marginLeft: 10 },
  headerBottom: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginRight: 20,
    marginLeft: 30,
    marginVertical: 15
  },
  clockContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  starText: { fontSize: 24 },
  clock: { resizeMode: "contain", height: 16, width: 15, marginRight: 5 },
  clockText: { color: "#616161" },
  descContainer: { paddingLeft: 30, paddingRight: 10 },
  desc: { color: "#757575", marginBottom: 10 },
  walletCard: {
    padding: 10,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    marginTop: 25,
    marginHorizontal: 20,
    marginBottom: 10
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
  image: { resizeMode: "contain", height: 40, width: 40 }
});

export default LessonOverview;
