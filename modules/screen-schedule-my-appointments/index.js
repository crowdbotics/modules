import React from "react";
import {
  Text,
  StyleSheet,
  View,
  ScrollView,
  Image,
  Pressable,
  ImageBackground
} from "react-native";

const ScheduleMyAppointments = ({ navigation }) => {
  return (
        <View style={styles.container}>
            <ScrollView>
                <View style={styles.topHeader}>
                    <ImageBackground source={require("./assets/background.png")} resizeMode="cover" style={styles.backgroundImage}>
                        <View style={styles.innerWrapper}>
                            <Image
                                source={require("./assets/back.png")}
                                style={styles.back}
                            />
                            <Text style={styles.heading}>
                                My appointments
                            </Text>
                            <TabView tabTitles={["New", "Old"]} selected={0} />

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
                                    <View style={[styles.dateContainer, { borderWidth: 1, borderColor: "#FFFFFF", backgroundColor: "transparent" }]}>
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
                        </View>
                    </ImageBackground>

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
                    </View>
                    <Image source={require("./assets/progress.png")} style={styles.progress} />
                    <View style={[styles.leftSection, { height: 240 }]}>
                        <View style={styles.docContainer}>
                            <Text style={styles.titleText}>Cardiology appointment</Text>
                            <Text style={styles.descr}>Tara Tomphson</Text>
                        </View>
                        <View style={[styles.docContainer, { backgroundColor: "#E8F7FA" }]}>
                            <Text style={styles.titleText}>Pulmonology appointment</Text>
                            <Text style={styles.descr}>Dr. Court Roberts</Text>
                        </View>
                        <View style={[styles.docContainer, { backgroundColor: "#EFF3FC" }]}>
                            <Text style={styles.titleText}>Orthopedic</Text>
                            <Text style={styles.descr}>Dr. PhD Tod Smith</Text>
                        </View>

                    </View>
                </View>

                {/* <Button buttonText={"Withdraw money"} /> */}
            </ScrollView>
            <View style={styles.footer}>
                <Footer
                    images={[
                      // @ts-ignore
                      require("./assets/home.png"),
                      // @ts-ignore
                      require("./assets/calender.png"),
                      // @ts-ignore
                      require("./assets/search.png"),
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },

  footer: {
    position: "absolute",
    flex: 0.1,
    left: 0,
    right: 0,
    bottom: 0
  },
  topHeader: {
    backgroundColor: "#23AAFA",
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    flexDirection: "column",
    height: 300
  },
  subheadingContainer: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingHorizontal: 20 },
  subheading: { fontSize: 16, color: "#FFFFFF", paddingVertical: 20 },
  heading: { fontSize: 16, color: "#FFFFFF", paddingLeft: 25, marginTop: 10 },
  backgroundImage: {
    width: 370,
    height: 350,
    left: "15%",
    bottom: "15%",
    resizeMode: "contain"
  },
  innerWrapper: {
    left: "-15%",
    bottom: "-15%"
  },
  back: { height: 18, width: 18, resizeMode: "contain", marginTop: 15, marginBottom: 10, marginLeft: 20 },
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
  topWrapper: { paddingHorizontal: 10 },
  color: { color: "#fff" },
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
    color: "#FFF",
    fontWeight: "bold",
    marginHorizontal: 20
  },
  inner: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  headingContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 5
  },
  title: { fontSize: 16, fontWeight: "bold", color: "#1E2022" },
  subTitle: {},
  topsec: { marginHorizontal: 10, marginTop: 25, marginBottom: 10 },
  progress: { height: 192, width: 20, resizeMode: "contain", marginLeft: 20, marginRight: 10 },
  leftSection: {
    justifyContent: "space-between",
    alignItems: "center",
    height: 192
  },
  docContainer: { backgroundColor: "#FCF0EF", padding: 10, borderRadius: 10, width: 220 },
  titleText: {
    fontWeight: "bold",
    color: "#2D2D2D",
    marginBottom: 5
  },
  descr: {
    fontSize: 12,
    color: "#828586"
  },
  mainContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 10,
    backgroundColor: "#fff",
    paddingVertical: 10
  }
});
export default ScheduleMyAppointments;

const TabView = ({ tabTitles, selected }) => {
  return (
        <View style={tabViewStyles.paletteContainer}>
            {tabTitles.map((title, index) => (
                <View
                    style={
                        index === selected
                          ? tabViewStyles.selected
                          : tabViewStyles.unSelected
                    }
                    key={index}
                >
                    <Text style={{ color: index === selected ? "#fff" : "#000" }}>{title}</Text>
                </View>
            ))}
        </View>
  );
};

const tabViewStyles = StyleSheet.create({
  paletteContainer: {
    width: "60%",
    height: 48,
    backgroundColor: "#FFF",
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 10,
    padding: 6,
    marginVertical: 10,
    marginHorizontal: 25
  },
  selected: {
    borderRadius: 10,
    flex: 1,
    backgroundColor: "#23AAFA",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "gray",
    elevation: 10
  },
  unSelected: {
    flex: 1,
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 10
  }
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
    paddingHorizontal: 40,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 12
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.00,

    elevation: 24
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
