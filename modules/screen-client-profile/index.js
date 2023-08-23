import { View, Text, StyleSheet, Image, ScrollView, TextInput, Pressable, Switch, ImageBackground } from "react-native";
import React, { useState } from "react";

const ClientProfile = ({ navigation }) => {
  const [isEnabled, setIsEnabled] = useState(true);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);
  const [isEnabled1, setIsEnabled1] = useState(true);
  const toggleSwitch1 = () => setIsEnabled1(previousState => !previousState);
  const data = [
    {
      id: 1,
      title: "Dr. Sara Thomson",
      rating: 4.7,
      specialty: "Cardiology",
      designation: "Doctor",
      experience: "5+ Year Experience",
      image:
                "https://raw.githubusercontent.com/crowdbotics/modules/master/modules/screen-explore-list/assets/eventImage-lg.png"
    }
  ];

  return (
        <View style={styles.container}>
            <ScrollView>
                <View style={styles.headerContainer}>
                    <View style={styles.walletCard}>
                        <View style={styles.walletInner}>
                            <View style={styles.imgContainer}>
                                <ImageBackground source={require("./assets/profile.png")} resizeMode="cover" style={styles.backImage}>
                                    <Image source={require("./assets/online.png")} style={styles.image} />
                                </ImageBackground>
                            </View>
                            <View style={styles.walletCarder}>
                                <Text style={styles.eventName}>{data[0].title}</Text>
                                <View style={styles.leftSection}>
                                    <Image source={require("./assets/phone.png")} style={styles.phone} />
                                    <Image source={require("./assets/message.png")} style={styles.phone} />
                                    <Image source={require("./assets/bell.png")} style={styles.phone} />
                                    <Image source={require("./assets/sound.png")} style={styles.phone} />
                                </View>
                            </View>
                        </View>

                    </View>
                    <View style={styles.scheduledContainer}>
                        <Text style={styles.dateTitle}>Next appointment</Text>
                        <View style={styles.alignContent}>
                            <Text style={styles.time}>Date:  Thu, 23</Text>
                            <Text style={styles.time}>Time: 12:00 AM</Text>
                        </View>
                    </View>
                </View>

                <View style={styles.cardInfo}>
                    <View style={[styles.headingContainer, { paddingHorizontal: 5 }]}>
                        <Text style={styles.title}>My appointments</Text>
                        <Text style={styles.subTitle}>View now</Text>
                    </View>

                    <Text style={styles.subHeading}>Profile details</Text>
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
                    <Text style={[styles.subHeading, { marginBottom: 5, marginTop: 25 }]}>System request access</Text>
                    <View style={styles.sectionContainer}>
                        <View style={styles.switchContainer}>
                            <Text style={styles.label}>Notifications</Text>
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

export default ClientProfile;

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  headerContainer: { backgroundColor: "#fff" },
  headingContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 15,
    paddingVertical: 15,
    borderBottomColor: "#F2F2F2",
    borderBottomWidth: 1,
    borderTopColor: "#F2F2F2",
    borderTopWidth: 1
  },
  title: { fontSize: 20, fontWeight: "bold", color: "#1E2022" },

  walletCard: {
    backgroundColor: "#fff",
    padding: 15,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 10,
    borderRadius: 8
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
    color: "#1E2022",
    fontSize: 14,
    marginLeft: 10,
    fontWeight: "bold",
    marginTop: -5
  },

  imgContainer: {
    height: 80,
    width: 95,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#dadada",
    borderRadius: 10
  },
  backImage: {
    height: 80,
    width: 95,
    resizeMode: "cover",
    alignItems: "flex-end",
    justifyContent: "flex-end"
  },
  image: { resizeMode: "contain", height: 12, width: 12, marginLeft: 10, marginRight: -5, marginBottom: -3 },
  leftSection: {
    alignSelf: "flex-start",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "55%",
    marginTop: 15,
    marginLeft: 10
  },

  subTitle: {
    fontSize: 14,
    color: "#fff",
    backgroundColor: "#23AAFA",
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 14
  },
  phone: { height: 20, width: 20, resizeMode: "contain" },
  scheduledContainer: { paddingLeft: 15, marginBottom: 25 },
  dateTitle: {
    fontSize: 15,
    color: "#000",
    fontWeight: "bold"
  },
  time: {
    fontSize: 14,
    color: "#7C7C7C",
    fontWeight: "bold",
    marginRight: 5
  },
  buttonBottom: {
    marginTop: 30,
    marginBottom: 20,
    justifyContent: "center",
    alignItems: "center"
  },
  alignContent: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingRight: 10 },
  cardInfo: {
    paddingHorizontal: 10,
    backgroundColor: "#fff",
    marginBottom: 60
  },
  subHeading: { fontSize: 16, fontWeight: "bold", marginLeft: 5, marginTop: 10, marginBottom: 20, color: "#2D2D2D" },
  mr10: {
    marginLeft: 15,
    marginBottom: 10
  },
  InputBox: { paddingHorizontal: 10, borderColor: "#C4C4C4", marginHorizontal: 5, borderWidth: 1, borderRadius: 10, marginBottom: 10, backgroundColor: "#f7f7f7" },
  textInput: { borderWidth: 1, borderRadius: 10, borderColor: "#C4C4C4", paddingHorizontal: 5, height: 140, marginHorizontal: 5, backgroundColor: "#f7f7f7" },
  feeContainer: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingHorizontal: 5, marginBottom: 10 },
  feeSection: {
    justifyContent: "center",
    alignItems: "flex-start",
    height: 55,
    borderColor: "#C4C4C4",
    borderWidth: 1,
    borderRadius: 10,
    paddingLeft: 10,
    paddingRight: 20,
    width: 155,
    backgroundColor: "#f7f7f7"
  },
  sectionContainer: { backgroundColor: "#fff", marginBottom: 35 },
  switchContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 20,
    paddingVertical: 5
  },
  switchContainer1: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 20,
    paddingVertical: 5
  },
  label: { fontSize: 16, fontWeight: "400" },
  footer: {
    position: "absolute",
    flex: 0.1,
    left: 0,
    right: 0,
    bottom: 0
  }
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
