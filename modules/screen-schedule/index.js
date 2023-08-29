import { View, StyleSheet, Image, Text, Pressable } from "react-native";
import React from "react";

const Schedule = ({ navigation }) => {
  return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Pressable>
                    <Image
                        // @ts-ignore
                        source={require("./assets/back.png")}
                        style={styles.message}
                    />
                </Pressable>

                <Text style={[styles.headingText]}>Schedule</Text>
                <Text />
            </View>
            <View style={styles.topWrapper}>
                <View style={styles.topContainer}>
                    <Image source={require("./assets/prev.png")} style={styles.prev} />
                    <Text style={styles.dateText}>June 2022</Text>
                    <Image source={require("./assets/next.png")} style={styles.prev} />
                </View>
                <View style={[styles.inner, { marginVertical: 20, paddingHorizontal: 10 }]}>
                    <View style={styles.dateContainer}>
                        <Text style={styles.month}>Mon</Text>
                        <Text>20</Text>
                    </View>
                    <View style={styles.dateContainer}>
                        <Text style={styles.month}>Mon</Text>
                        <Text>20</Text>
                    </View>
                    <View style={styles.dateContainer}>
                        <Text style={styles.month}>Mon</Text>
                        <Text>20</Text>
                    </View>
                    <View style={[styles.dateContainer, { backgroundColor: "#12D790" }]}>
                        <Text style={[styles.month, styles.color]}>Mon</Text>
                        <Text style={styles.color}>20</Text>
                    </View>
                    <View style={styles.dateContainer}>
                        <Text style={styles.month}>Mon</Text>
                        <Text>20</Text>
                    </View>
                    <View style={styles.dateContainer}>
                        <Text style={styles.month}>Mon</Text>
                        <Text>20</Text>
                    </View>
                    <View style={styles.dateContainer}>
                        <Text style={styles.month}>Mon</Text>
                        <Text>20</Text>
                    </View>
                </View>
            </View>

            <View style={[styles.headingContainer, styles.topsec]}>
                <Text style={styles.title}>Schedule</Text>
                <Text style={styles.subTitle}></Text>
            </View>

            <View style={styles.mainContainer}>
                <View style={styles.leftSection}>
                    <Text>09:00 am</Text>
                    <Text>10:00 am</Text>
                    <Text>11:00 am</Text>
                    <Text>12:00 pm</Text>
                    <Text>01:00 pm</Text>
                    <Text>02:00 pm</Text>
                </View>
                <Image source={require("./assets/progress.png")} style={styles.progress} />
                <View style={[styles.leftSection, { height: 540 }]}>
                    <View style={styles.docContainer}>
                        <Text style={styles.titleText}>Tara Tomphson</Text>
                        <View style={styles.inner}>
                            <Text style={styles.descr}>Nuclear cardiac stress test</Text>
                            <Image source={require("./assets/check.png")} style={styles.check} />
                        </View>

                    </View>
                    <View style={styles.docContainer}>
                        <Text style={styles.titleText}>Tara Tomphson</Text>
                        <View style={styles.inner}>
                            <Text style={styles.descr}>Nuclear cardiac stress test</Text>
                            <Image source={require("./assets/check.png")} style={styles.check} />
                        </View>
                    </View>
                    <View style={styles.docContainer}>
                        <Text style={styles.titleText}>Tara Tomphson</Text>
                        <View style={styles.inner}>
                            <Text style={styles.descr}>Nuclear cardiac stress test</Text>
                            <Image source={require("./assets/check.png")} style={styles.check} />
                        </View>
                    </View>
                    <View style={[styles.docContainer, { backgroundColor: "#12D790" }]}>
                        <Text style={[styles.titleText, { color: "#fff" }]}>Tara Tomphson</Text>
                        <Text style={[styles.descr, { color: "#fff" }]}>Nuclear cardiac stress test</Text>
                    </View>
                    <View style={[styles.docContainer, { backgroundColor: "#12D790" }]}>
                        <Text style={[styles.titleText, { color: "#fff" }]}>Tara Tomphson</Text>
                        <Text style={[styles.descr, { color: "#fff" }]}>Nuclear cardiac stress test</Text>
                    </View>
                    <View style={[styles.docContainer, { backgroundColor: "#12D790" }]}>
                        <Text style={[styles.titleText, { color: "#fff" }]}>Tara Tomphson</Text>
                        <Text style={[styles.descr, { color: "#fff" }]}>Nuclear cardiac stress test</Text>
                    </View>
                </View>
            </View>
            <View style={styles.footer}>
                <Footer
                    images={[
                      // @ts-ignore
                      require("./assets/home.png"),
                      // @ts-ignore
                      require("./assets/calender.png"),
                      // @ts-ignore
                      require("./assets/fsearch.png"),
                      // @ts-ignore
                      require("./assets/user.png")
                    ]}
                    routes={["homeScreen", "orderStatusScreen", "searchScreen", "accountScreen"]}
                    navigation={navigation}
                />
            </View>
        </View>
  );
};

export default Schedule;

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingHorizontal: 10,
    paddingVertical: 15
  },
  back: { width: 11.25, height: 20, marginLeft: -15 },
  message: { width: 18, height: 18, resizeMode: "contain" },
  search: { width: 20, height: 15, resizeMode: "contain" },
  heading: { color: "#fff", fontWeight: "bold", fontSize: 18, paddingLeft: 10, paddingBottom: 15, lineHeight: 23 },
  headingText: { color: "#1E2022", fontWeight: "bold", fontSize: 18 },
  orderStatusContainer: {
    justifyContent: "space-between",
    flexDirection: "row",
    paddingLeft: 10,
    paddingRight: 8,
    marginTop: -2,
    marginBottom: 4

  },
  mainContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 10,
    marginTop: 10,
    marginBottom: 5,
    backgroundColor: "#fff",
    paddingVertical: 10
  },
  headingContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 10,
    marginVertical: 10
  },
  title: { fontSize: 16, fontWeight: "bold", color: "#1E2022" },
  subTitle: {},
  topsec: { marginHorizontal: 10, marginTop: 15, marginBottom: 10 },
  progress: { height: 500, width: 20, resizeMode: "contain", marginLeft: 20, marginRight: 10 },
  leftSection: {
    justifyContent: "space-between",
    alignItems: "center",
    height: 500
  },
  docContainer: { backgroundColor: "#FCF0EF", padding: 10, borderRadius: 10, width: 250 },
  check: {
    height: 19, width: 19, resizeMode: "contain"
  },
  inner: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  titleText: {
    fontWeight: "bold",
    color: "#2D2D2D",
    marginBottom: 5
  },
  descr: {
    fontSize: 12,
    color: "#828586"
  },
  footer: {
    position: "absolute",
    flex: 0.1,
    left: 0,
    right: 0,
    bottom: 0
  },
  prev: {
    height: 16, width: 16, resizeMode: "contain"
  },
  topContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20
  },
  dateText: {
    fontSize: 14,
    color: "#2D2D2D",
    fontWeight: "bold",
    marginHorizontal: 20
  },
  dateContainer: {
    backgroundColor: "#F4F8FA",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 7,
    paddingVertical: 10,
    borderRadius: 10
  },
  month: {
    marginBottom: 5,
    fontSize: 12,
    color: "#828586"
  },
  topWrapper: { backgroundColor: "#fff", paddingHorizontal: 10 },
  color: { color: "#fff" }
});

const Footer = props => {
  return (
        <View style={[footerStyles.footer]}>
            {props.images.map((image, index) => (
                <Pressable style={footerStyles.footerItem} key={index} onPress={() => props.navigation.navigate(props.routes[index])}>
                    <Image
                        style={footerStyles.footerImage}
                        source={image}
                    />
                </Pressable>
            ))}
        </View>
  );
};

const footerStyles = StyleSheet.create({
  footer: {
    height: 60,
    backgroundColor: "#FFF",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 40
  },
  footerItem: {
    alignItems: "center",
    justifyContent: "center",
    height: "100%"
  },
  footerItemText: {
    fontSize: 13,
    color: "#fff",
    marginTop: 5
  },
  footerImage: {
    width: 20,
    height: 20,
    resizeMode: "contain"
  }
});
