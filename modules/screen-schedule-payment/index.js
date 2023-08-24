// @ts-ignore
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, TextInput } from "react-native";
import React, { useState } from "react";

const SchedulePayment = ({ navigation }) => {
  const [cardNumber, setCardNumber] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [name, setName] = useState("");
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
                                <Image source={{ uri: "etrwet" }} style={styles.image} />
                            </View>
                            <View style={styles.walletCarder}>
                                <Text style={styles.eventName}>{data[0].title}</Text>
                                <Text style={styles.eventType}>{data[0].specialty} </Text>
                                <Text style={styles.experience}>{data[0].experience} </Text>
                                <View style={styles.ratingContainer}>
                                    <Image source={require(
                                      // @ts-ignore
                                      "./assets/rating.png")} style={styles.image} />
                                    <Text style={styles.attending}>(16 reviews)</Text>
                                </View>
                            </View>
                        </View>
                        <View style={styles.leftSection}>
                            <Image source={require(
                              // @ts-ignore
                              "./assets/phone.png")} style={styles.phone} />
                            <Image source={require(
                              // @ts-ignore
                              "./assets/message.png")} style={styles.phone} />
                        </View>
                    </View>
                    <View style={styles.scheduledContainer}>
                        <Text style={styles.dateTitle}>Appointment time</Text>
                        <View style={styles.alignContent}>
                            <Text style={styles.time}>Date:  Thu, 23</Text>
                            <Text style={styles.time}>Time: 12:00 AM</Text>
                        </View>
                    </View>
                </View>

                <View style={styles.amountContainer}>
                    <View style={[styles.scheduledContainer, { marginBottom: 15 }]}>
                        <Text style={[styles.dateTitle, styles.appTime]}>Appointment cost</Text>
                        <View style={[styles.alignContent]}>
                            <Text style={[styles.time, styles.appcategory]}>Cardiology appointment </Text>
                            <Text style={[styles.amount]}>$50</Text>
                        </View>
                    </View>
                    <View style={[styles.scheduledContainer, styles.border]}>
                        <Text style={[styles.dateTitle, styles.appTime]}>Voice Call</Text>
                        <View style={[styles.alignContent]}>
                            <Text style={[styles.time, styles.appcategory]}>Additional fees</Text>
                            <Text style={[styles.amount, { fontSize: 18 }]}>$10</Text>
                        </View>
                    </View>
                    <View style={styles.chooseContainer}>
                        <View style={styles.promoContainer}>
                            <Image source={require(
                              // @ts-ignore
                              "./assets/promo.png")} style={styles.promo} />
                            <Text>Use Promo Code</Text>
                        </View>

                        <Image source={require(
                          // @ts-ignore
                          "./assets/next.png")} style={styles.nextImg} />
                    </View>
                </View>

                <View style={[styles.headingContainer, { marginVertical: 7 }]}>
                    <Text style={styles.total}>Total</Text>
                    <Text style={styles.totalAmount}>$60</Text>
                </View>

                <View style={styles.cardInfo}>
                    <View style={[styles.headingContainer, { paddingHorizontal: 15 }]}>
                        <Text style={styles.title}>Payment option</Text>
                        <Text style={styles.subTitle}>Add new</Text>
                    </View>
                    <Image
                        // @ts-ignore
                        source={require("./assets/Card-large.png")}
                        style={styles.card}
                    />
                    <Image
                        // @ts-ignore
                        source={require("./assets/3Dots.png")}
                        style={styles.threeDots}
                    />
                    <View style={styles.inputs}>
                        <View style={styles.inputContainer}>
                            <View style={styles.deleteCardContainer}>
                                <Text style={styles.inputText}>Card Number</Text>
                                <Image
                                    // @ts-ignore
                                    source={require("./assets/deleteIcon.png")}
                                    style={styles.deleteIcon}
                                />
                            </View>
                            <TextInput
                                style={styles.input}
                                onChangeText={(text) => setCardNumber(text)}
                                value={cardNumber}
                                placeholder="1234 5678 9012 3456"
                                placeholderTextColor="#9B9B9B"
                                autoCapitalize="none"
                                autoCorrect={false}
                            />
                        </View>
                        <View style={styles.halfInputs}>
                            <View style={styles.inputContainer}>
                                <Text style={styles.inputText}>Expiration Date</Text>
                                <TextInput
                                    style={[styles.input, styles.input1]}
                                    onChangeText={(text) => setCardExpiry(text)}
                                    value={cardExpiry}
                                    placeholder="10/24"
                                    placeholderTextColor="#9B9B9B"
                                    autoCapitalize="none"
                                    autoCorrect={false}
                                />
                            </View>
                            <View style={styles.inputContainer}>
                                <Text style={styles.inputText}>CVV</Text>
                                <TextInput
                                    style={[styles.input, styles.input2]}
                                    onChangeText={(text) => setCvv(text)}
                                    value={cvv}
                                    placeholder="374"
                                    placeholderTextColor="#9B9B9B"
                                    autoCapitalize="none"
                                    autoCorrect={false}
                                />
                            </View>
                        </View>
                        <View style={styles.inputContainer}>
                            <Text style={styles.inputText}>Card Holder Name</Text>
                            <TextInput
                                style={styles.input}
                                onChangeText={(text) => setName(text)}
                                value={name}
                                placeholder="Username"
                                placeholderTextColor="#9B9B9B"
                                autoCapitalize="none"
                                autoCorrect={false}
                            />
                        </View>
                    </View>
                    <View style={styles.buttonBottom}>
                        <Button
                            onPress={() => navigation.navigate("login", { route: "SignUpScreen" })}
                            buttonText="Pay now"
                        />
                    </View>
                </View>
            </ScrollView>
        </View>
  );
};

export default SchedulePayment;

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  headerContainer: { backgroundColor: "#fff" },
  headingContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 15,
    marginVertical: 15
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
  eventType: {
    color: "#23AAFA",
    fontSize: 12,
    marginLeft: 10,
    fontWeight: "bold"
  },
  experience: {
    color: "#354259",
    fontSize: 12,
    marginLeft: 10,
    fontWeight: "bold",
    marginBottom: 10
  },
  attending: { color: "#ACAEAF", fontSize: 14, marginLeft: 10, fontWeight: "bold" },
  imgContainer: {
    height: 80,
    width: 95,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#dadada",
    borderRadius: 10
  },
  image: { resizeMode: "stretch", height: 10, width: 60, marginLeft: 10, marginRight: -5 },
  ratingContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center"
  },
  leftSection: {
    alignSelf: "flex-start",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "20%"
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
  amountContainer: { backgroundColor: "#fff", paddingTop: 15, paddingBottom: 20, marginTop: 15 },
  appTime: { fontSize: 14, fontWeight: "400", color: "#000" },
  appcategory: { fontSize: 12, fontWeight: "400" },
  amount: { fontSize: 30, fontWeight: "bold", color: "#000", marginTop: -20 },
  border: { borderBottomColor: "#F2F2F2", borderBottomWidth: 1, borderTopColor: "#F2F2F2", borderTopWidth: 1, paddingTop: 10, paddingBottom: 2 },
  chooseContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: 49,
    borderColor: "#C4C4C4",
    borderWidth: 1,
    borderRadius: 10,
    paddingLeft: 10,
    paddingRight: 20,
    marginHorizontal: 10,
    backgroundColor: "#FAFAFB"
  },
  nextImg: { width: 11, height: 20, resizeMode: "contain" },
  promo: { width: 19, height: 19, resizeMode: "contain", marginRight: 10 },
  promoContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center"
  },
  total: { fontSize: 34, color: "#000", fontWeight: "bold" },
  totalAmount: { fontSize: 44, color: "#000", fontWeight: "bold" },
  cardInfo: {
    paddingVertical: 20,
    paddingHorizontal: 10,
    paddingTop: 5,
    backgroundColor: "#fff"
  },
  card: {
    marginTop: 10,
    alignSelf: "center",
    height: 164,
    width: 354,
    resizeMode: "contain"
  },
  threeDots: {
    alignSelf: "center",
    marginVertical: 10,
    height: 8,
    width: 19,
    resizeMode: "contain"

  },
  deleteCardContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  deleteIcon: {
    marginRight: 10,
    height: 20,
    width: 20,
    resizeMode: "contain"
  },
  inputs: {
    justifyContent: "center"
  },
  inputContainer: {
    flexDirection: "column",
    flex: 1,
    justifyContent: "center"
  },
  inputText: {
    fontSize: 14,
    marginLeft: 20
  },
  input: {
    borderWidth: 1,
    borderColor: "#e6e6e6",
    borderRadius: 10,
    padding: 10,
    paddingLeft: 20,
    marginVertical: 10,
    width: "100%",
    height: 50
  },
  halfInputs: {
    justifyContent: "space-between",
    flexDirection: "row"
  },
  input1: {
    height: 50,
    borderRightWidth: 0,
    borderRightColor: "#fff",
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0
  },
  input2: {
    height: 50,
    borderLeftWidth: 0,
    borderLeftColor: "#fff",
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0
  }
});

const Button = (props) => {
  return (
        <TouchableOpacity onPress={props.onPress}
            // @ts-ignore
            underlayColor="#DDDDDD">
            <View
                style={[
                  btnStyles.button,
                  {
                    backgroundColor: props.backgroundColor ? props.backgroundColor : "#000000",
                    height: props.height ? props.height : 49,
                    borderWidth: props.borderWidth ? props.borderWidth : 0,
                    borderColor: props.borderColor ? props.borderColor : "#000000"
                  }
                ]}
            >
                <Text style={[btnStyles.text, { color: props.color ? props.color : "#ffffff" }]}>
                    {props.buttonText}
                </Text>
            </View>
        </TouchableOpacity>
  );
};

const btnStyles = StyleSheet.create({
  button: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    width: 307
  },
  text: {
    fontWeight: "bold",
    fontSize: 15
  }
});
