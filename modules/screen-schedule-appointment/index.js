import { View, Text, StyleSheet, Image, ScrollView, TextInput, Pressable, Switch } from "react-native";
import React, { useState } from "react";

const ScheduleAppointment = ({ navigation }) => {
  const [isEnabled, setIsEnabled] = useState(true);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);
  const [isEnabled1, setIsEnabled1] = useState(false);
  const toggleSwitch1 = () => setIsEnabled1(previousState => !previousState);
  const [isEnabled2, setIsEnabled2] = useState(false);
  const toggleSwitch2 = () => setIsEnabled2(previousState => !previousState);
  // @ts-ignore
  const fees = [
    {
      id: 1,
      title: "Voice Call",
      description: "Can Make a Voice Call with Doctor",
      charge: 10,
      image: require("./assets/phone.png")
    },
    {
      id: 2,
      title: "Messaging",
      description: "Can Messaging with Doctor",
      charge: 6,
      image: require("./assets/message.png")
    },
    {
      id: 3,
      title: "Video Call",
      description: "Can Make a Video Call with Doctor",
      charge: 16,
      image: require("./assets/video.png")
    }
  ];

  return (
        <View style={styles.container}>
            <ScrollView>
                <View style={styles.header}>
                    <Pressable>
                        <Image
                            // @ts-ignore
                            source={require("./assets/back.png")}
                            style={styles.message}
                        />
                    </Pressable>

                    <Text style={[styles.headingText]}>Appointment</Text>
                    <Text />
                </View>
                <View style={styles.topWrapper}>
                    <View style={styles.topContainer}>
                        <Image source={require(
                          // @ts-ignore
                          "./assets/prev.png")} style={styles.prev} />
                        <Text style={styles.dateText}>June 2022</Text>
                        <Image source={require(
                          // @ts-ignore
                          "./assets/next.png")} style={styles.prev} />
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

                <View style={styles.tabContainer}>
                    <Text style={styles.heading}>
                        Available slots
                    </Text>

                    <View style={styles.tabView}>
                        <TabView tabTitles={["Morning", "Afternoon"]} selected={0} />
                        <View style={{ marginLeft: 10 }}>
                            <View style={[styles.tabView, { marginBottom: 2 }]}>
                                <Image source={require(
                                  // @ts-ignore
                                  "./assets/uncheck.png")} style={styles.prev1} />
                                <Text style={styles.text}>Not available</Text>
                            </View>
                            <View style={styles.tabView}>
                                <Image source={require(
                                  // @ts-ignore
                                  "./assets/check.png")} style={styles.prev1} />
                                <Text style={styles.text}>Available</Text>
                            </View>
                        </View>
                    </View>
                </View>
                <View style={[styles.midSection]}>
                    <View style={[styles.inner, { marginVertical: 10 }]}>
                        <View style={[styles.dateContainer, styles.border]}>
                            <Text style={styles.textColor}>12:00</Text>
                        </View>
                        <View style={[styles.dateContainer, styles.border]}>
                            <Text style={styles.textColor}>11:00</Text>
                        </View>
                        <View style={[styles.dateContainer, styles.border]}>
                            <Text style={styles.textColor}>10:00</Text>
                        </View>
                        <View style={[styles.dateContainer, styles.selected]}>
                            <Text style={styles.textColor}>09:00</Text>
                        </View>
                    </View>

                    <Text style={[styles.subHeading, styles.subheading2]}>
                        Fees Information:
                    </Text>
                    {
                        fees.map((fee, index) =>
                            <View style={styles.walletCard} key={index}>
                                <View style={styles.walletInner}>
                                    <View style={styles.imgContainer}>
                                        <Image source={fee.image} style={styles.image} />
                                    </View>
                                    <View style={styles.walletCarder}>
                                        <Text style={styles.eventName}>{fee.title}</Text>
                                        <Text style={styles.experience}>{fee.description}</Text>
                                    </View>
                                </View>
                                <View style={styles.leftSection}>
                                    <Text style={styles.price}>${fee.charge}</Text>
                                </View>
                            </View>
                        )
                    }

                </View>

                <View style={styles.cardInfo}>
                    <Text style={styles.subHeading}>Profile Details</Text>
                    <Text style={styles.mr10}>Full Name</Text>
                    <View style={styles.InputBox}>
                        <TextInput placeholder="Enter" placeholderTextColor={"#000"} />
                    </View>
                    <Text style={styles.mr10}>Email address</Text>
                    <View style={styles.InputBox}>
                        <TextInput placeholder="Enter" placeholderTextColor={"#000"} />
                    </View>
                    <View style={styles.feeContainer}>
                        <View>
                            <Text style={[styles.mr10, { marginLeft: 15 }]}>Age</Text>
                            <View style={styles.feeSection}>
                                <TextInput placeholder="Enter" placeholderTextColor={"#000"} />
                            </View>
                        </View>
                        <View>
                            <Text style={[styles.mr10, { marginLeft: 15 }]}>Gender</Text>
                            <View style={styles.feeSection}>
                                <TextInput placeholder="Enter" placeholderTextColor={"#000"} />
                            </View>
                        </View>
                    </View>
                    <Text style={styles.mr10}>Add notes</Text>
                    <View style={styles.textInput}>
                        <Input placeholder="Enter" multiline={true} />
                    </View>
                    <Text style={[styles.subHeading, { marginBottom: 5, marginTop: 25 }]}>Request access</Text>
                    <View style={styles.sectionContainer}>
                        <View style={styles.switchContainer}>
                            <Text style={styles.label}>Voice call</Text>
                            <Switch
                                trackColor={{ false: "#E5E5E5", true: "#12D790" }}
                                thumbColor={isEnabled ? "#000" : "#000"}
                                ios_backgroundColor="#3e3e3e"
                                onValueChange={toggleSwitch}
                                value={isEnabled}
                            />
                        </View>
                        <View style={styles.switchContainer1}>
                            <Text style={styles.label}>Messaging</Text>
                            <Switch
                                trackColor={{ false: "#E5E5E5", true: "#12D790" }}
                                thumbColor={isEnabled1 ? "#000" : "#000"}
                                ios_backgroundColor="#3e3e3e"
                                onValueChange={toggleSwitch1}
                                value={isEnabled1}
                            />
                        </View>
                        <View style={styles.switchContainer1}>
                            <Text style={styles.label}>Video call</Text>
                            <Switch
                                trackColor={{ false: "#E5E5E5", true: "#12D790" }}
                                thumbColor={isEnabled2 ? "#000" : "#000"}
                                ios_backgroundColor="#3e3e3e"
                                onValueChange={toggleSwitch2}
                                value={isEnabled2}
                            />
                        </View>
                    </View>
                </View>

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

export default ScheduleAppointment;

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  cardInfo: {
    paddingHorizontal: 10,
    backgroundColor: "#fff",
    marginBottom: 60
  },
  subHeading: { fontSize: 16, fontWeight: "bold", marginLeft: 10, marginTop: 10, marginBottom: 20, color: "#2D2D2D" },
  mr10: {
    marginLeft: 25,
    marginBottom: 10
  },
  InputBox: { paddingHorizontal: 10, borderColor: "#C4C4C4", borderWidth: 1, marginHorizontal: 10, borderRadius: 10, marginBottom: 10, backgroundColor: "#f7f7f7" },
  textInput: { borderWidth: 1, borderRadius: 10, borderColor: "#C4C4C4", paddingHorizontal: 5, height: 140, marginHorizontal: 10, backgroundColor: "#f7f7f7" },
  feeContainer: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingHorizontal: 10, marginBottom: 10 },
  feeSection: {
    justifyContent: "center",
    alignItems: "flex-start",
    height: 53,
    borderColor: "#C4C4C4",
    borderWidth: 1,
    borderRadius: 10,
    paddingLeft: 10,
    paddingRight: 20,
    width: 150,
    backgroundColor: "#f7f7f7"
  },
  sectionContainer: { backgroundColor: "#fff", marginBottom: 35 },
  switchContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 30,
    paddingVertical: 5
  },
  switchContainer1: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 30,
    paddingVertical: 5
  },
  label: { fontSize: 16, fontWeight: "400" },
  footer: {
    position: "absolute",
    flex: 0.1,
    left: 0,
    right: 0,
    bottom: 0

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
  color: { color: "#fff" },
  prev1: {
    height: 12, width: 12, resizeMode: "contain"
  },
  prev: {
    height: 16, width: 16, resizeMode: "contain"
  },
  message: { width: 18, height: 18, resizeMode: "contain" },
  headingText: { color: "#1E2022", fontWeight: "bold", fontSize: 18 },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingHorizontal: 10,
    paddingVertical: 15
  },
  inner: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  heading: { fontSize: 16, color: "#2D2D2D", paddingLeft: 20, fontWeight: "bold", marginTop: 10, marginBottom: 5 },
  tabContainer: { marginVertical: 10 },
  tabView: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center"
  },
  text: { fontSize: 12, color: "#7C7C7C", marginLeft: 10 },
  midSection: { backgroundColor: "#FFF", paddingHorizontal: 20, paddingVertical: 10, marginBottom: 15 },
  textColor: { color: "#000", fontSize: 16, paddingHorizontal: 7 },
  border: { borderColor: "#12D790", borderWidth: 1 },
  selected: { borderColor: "#12D790", borderWidth: 1, backgroundColor: "#12D790" },
  image: { height: 48, width: 59, resizeMode: "contain" },
  walletCard: {
    backgroundColor: "#fff",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 10,
    borderRadius: 8,
    marginBottom: 15
  },
  walletInner: {
    display: "flex",
    flexDirection: "row"
  },
  walletCarder: {
    alignSelf: "center",
    flexDirection: "column"
  },
  eventName: {
    color: "#354259",
    fontSize: 15,
    marginLeft: 10
  },
  eventType: {
    color: "#23AAFA",
    fontSize: 12,
    marginLeft: 10,
    fontWeight: "bold"
  },
  experience: {
    color: "#687DA2",
    fontSize: 13,
    marginLeft: 10
  },
  attending: { color: "#ACAEAF", fontSize: 14, marginLeft: 10, fontWeight: "bold" },
  imgContainer: {
    height: 48,
    width: 59,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#dadada",
    borderRadius: 10
  },
  leftSection: {
    alignSelf: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingRight: 2,
    marginBottom: 8
  },
  price: { color: "#FC4B6F", fontSize: 18, fontWeight: "bold" },
  subheading2: { color: "#354259", fontSize: 15, marginBottom: 0, fontWeight: "400", marginLeft: 0 }
});

const Input = (props) => {
  return (
        <View style={styles.container}>
            <TextInput
                style={inputStyles.input}
                placeholder={props.placeholder}
                value={props.value}
                onChangeText={(num) => props.setValue(num)}
                placeholderTextColor='#000'
                multiline={props.multiline}
                numberOfLines={props.multiline ? 10 : null}
                editable={props.editable !== false}
                // @ts-ignore
                borderWidth={props.borderWidth}
            />
        </View>
  );
};

const inputStyles = StyleSheet.create({
  container: {
    width: "100%",
    borderRadius: 10,
    paddingRight: 10
  },
  input: {
    height: 53,
    borderColor: "#C4C4C4",
    color: "#000",
    borderRadius: 10,
    fontSize: 14
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
                    <Text style={{ color: index === selected ? "#000" : "#7C7C7C" }}>{title}</Text>
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
    marginHorizontal: 10
  },
  selected: {
    borderRadius: 10,
    flex: 1,
    backgroundColor: "#12D790",
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
