import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  Modal,
  Pressable,
  Image,
  ImageBackground
} from "react-native";

const NewRideBooking = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [ride, setRide] = useState({});
  useEffect(() => {
    setRide({
      pickUpLocation: "S Main St, Los Angeles",
      dropOffLocation: "Maple Ave , Los Angeles",
      orderPrice: "$18",
      distance: 2.0,
      time: "2 min"
    });
  }, []);
  return (
    <ImageBackground
      style={styles.container}
      source={require("./assets/mapBackground.png")}
    >
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={styles.roundIconContainer}>
              <Image
                style={styles.locationIcon}
                source={require("./assets/locationIcon.png")}
              />
            </View>
            <Text style={styles.heading}>New Booking</Text>
            <View style={styles.orderContainer}>
              <Text style={styles.bold}>Order details</Text>
              <View style={styles.detailPallet}>
                <View style={styles.orderDetails}>
                  <Text style={styles.mainText}>Price</Text>
                  <Text style={styles.subText}>Total</Text>
                </View>
                <Text style={styles.pricingText}>{ride.orderPrice}</Text>
              </View>
              <View>
                <View style={styles.detailsContainer}>
                  <View style={styles.flexRow}>
                    <Text style={styles.mainText}>Distance</Text>
                    <Text style={styles.mainText}>{ride.distance} km</Text>
                  </View>
                  <View style={styles.flexRow}>
                    <Text style={styles.subText}>Time</Text>
                    <Text style={styles.subText}>{ride.time}</Text>
                  </View>
                </View>
              </View>
              <View style={styles.locationContainer}>
                <Image
                  source={require("./assets/Progress.png")}
                  style={styles.progressImage}
                />
                <View style={styles.locationDetails}>
                  <View>
                    <Text style={[styles.black, styles.fnt16]}>
                      {ride.pickUpLocation}
                    </Text>
                    <Text style={styles.grey}>Pick Up Location</Text>
                  </View>
                  <View>
                    <Text style={[styles.black, styles.fnt16]}>
                      {ride.dropOffLocation}
                    </Text>
                    <Text style={styles.grey}>Drop off Location</Text>
                  </View>
                </View>
              </View>
            </View>
            <View style={styles.flexRow}>
              <Button
                buttonText={"Accept"}
                onPress={() => setModalVisible(!modalVisible)}
                style={styles.button}
              />
              <Button
                buttonText={"Decline"}
                onPress={() => setModalVisible(!modalVisible)}
                outlineColor="#000"
                color="#fff"
                textColor="#000"
                style={styles.button}
              />
            </View>
          </View>
        </View>
      </Modal>
      <Button
        buttonText={"Open Modal"}
        onPress={() => setModalVisible(true)}
        style={styles.modalButton}
      />
    </ImageBackground>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ccc"
  },
  centeredView: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    width: "100%",
    height: 550,
    backgroundColor: "white",
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    paddingVertical: 20,
    paddingHorizontal: 30,
    shadowColor: "#000",
    elevation: 5
  },
  roundIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    elevation: 10,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    alignSelf: "center",
    marginBottom: 10
  },
  locationIcon: {
    width: 30,
    height: 30
  },
  heading: {
    fontSize: 24,
    color: "#000",
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20
  },
  orderContainer: {
    backgroundColor: "#fff"
  },
  bold: {
    fontWeight: "bold"
  },
  grey: {
    color: "#8e8e8e"
  },
  black: {
    color: "#000"
  },
  fnt16: {
    fontSize: 16
  },
  detailPallet: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#e6e6e6",
    height: 80
  },
  detailsContainer: {
    borderBottomColor: "#e6e6e6",
    borderBottomWidth: 1,
    height: 80,
    justifyContent: "center"
  },
  orderDetails: {
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    paddingRight: 10
  },
  flexRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  pricingText: {
    flex: 1,
    fontSize: 28,
    color: "#000",
    textAlign: "right",
    fontWeight: "bold"
  },
  mainText: {
    fontSize: 20
  },
  subText: {
    fontSize: 14,
    color: "#8e8e8e",
    marginTop: 5
  },
  locationContainer: {
    flexDirection: "row",
    paddingTop: 20
  },
  locationDetails: {
    flex: 1,
    flexDirection: "column",
    marginLeft: 10,
    justifyContent: "space-between",
    alignItems: "flex-start"
  },
  button: {
    flex: 1,
    marginHorizontal: 10,
    marginTop: 30
  },
  modalButton: {
    flex: 1,
    marginHorizontal: 20,
    justifyContent: "flex-end",
    marginBottom: 20
  }
});

export default NewRideBooking;
const Button = (params) => {
  const backgroundColor = params.color || "#000";
  const textColor = params.textColor || "#fff";
  const btnStyle = {
    backgroundColor: backgroundColor,
    borderColor: params.outlineColor || backgroundColor,
    borderWidth: 1
  };
  const btnText = {
    color: textColor
  };
  return (
    <View style={[buttonStyles.btnContainer, params.style]}>
      <View style={!params.hideShadow ? buttonStyles.shadowContainer : null}>
        <Pressable
          style={[buttonStyles.btn, btnStyle]}
          onPress={params.onPress}
        >
          <Text style={[buttonStyles.btnText, btnText]}>
            {params.buttonText}
          </Text>
          <View style={styles.childrenContainer}>{params.children}</View>
        </Pressable>
      </View>
    </View>
  );
};

const buttonStyles = StyleSheet.create({
  btnContainer: {
    justifyContent: "center"
  },
  shadowContainer: {
    shadowColor: "rgba(0, 0, 0, 0.5)",
    elevation: 10,
    backgroundColor: "#fff",
    borderRadius: 10
  },
  btn: {
    height: 50,
    padding: 10,
    paddingHorizontal: 25,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",

    flexDirection: "row"
  },
  btnText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold"
  },
  childrenContainer: {
    justifyContent: "center",
    alignItems: "center"
  }
});
