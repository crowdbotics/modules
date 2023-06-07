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

const PassengerProfile = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [ride, setRide] = useState({});
  useEffect(() => {
    setRide({
      name: "Username",
      image: require("./assets/userImage.png"),
      rating: 100,
      pickUpLocation: "S Main St, Los Angeles",
      dropOffLocation: "Maple Ave , Los Angeles",
      totalPrice: "$18",
      distance: 2.0,
      time: "2 min"
    });
  }, []);
  return (
    <ImageBackground
      style={styles.container}
      source={require("./assets/mapBackground.png")}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={styles.orderContainer}>
              <View style={styles.rideHeader}>
                <View style={styles.flexRow}>
                  <Image style={styles.userImage} source={ride.image} />
                  <Text style={styles.name}>{ride.name}</Text>
                  <View style={styles.flexRow}>
                    <Image
                      style={styles.headerIcon}
                      source={require("./assets/chatIcon.png")}
                    />
                    <Image
                      style={styles.headerIcon}
                      source={require("./assets/callIcon.png")}
                    />
                  </View>
                </View>
                <Text style={styles.headerText}>
                  {ride.rating}% Drop off Rating
                </Text>
              </View>
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
              <View style={styles.locationContainer}>
                <Image
                  source={require("./assets/dropOffIcon.png")}
                  style={styles.dropOffIcon}
                />
                <View style={styles.locationDetails}>
                  <View>
                    <Text style={[styles.black, styles.fnt16]}>
                      {ride.dropOffLocation}
                    </Text>
                    <Text style={styles.grey}>Drop off Location</Text>
                  </View>
                </View>
                <View style={styles.priceContainer}>
                  <Text style={styles.pricingText}>{ride.totalPrice}</Text>
                  <Text style={styles.subText}>Total</Text>
                </View>
              </View>
            </View>
            <Button
              buttonText={"Done"}
              onPress={() => setModalVisible(!modalVisible)}
              outlineColor="#000"
              color="#fff"
              textColor="#000"
              style={styles.button}
            />
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
    backgroundColor: "white",
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    paddingVertical: 20,
    paddingHorizontal: 30,
    shadowColor: "#000",
    elevation: 5
  },
  rideHeader: {
    borderBottomColor: "#e6e6e6",
    borderBottomWidth: 1,
    paddingBottom: 10
  },
  headerText: {
    fontSize: 14,
    color: "#12D790",
    marginTop: 10
  },
  userImage: {
    width: 50,
    height: 50,
    borderRadius: 25
  },
  headerIcon: {
    width: 20,
    height: 20,
    marginRight: 10
  },
  name: {
    fontSize: 18,
    flex: 1,
    marginLeft: 20
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
  detailsContainer: {
    borderBottomColor: "#e6e6e6",
    borderBottomWidth: 1,
    height: 80,
    justifyContent: "center"
  },
  dropOffIcon: {
    width: 30,
    height: 30,
    alignSelf: "center"
  },
  flexRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  priceContainer: {
    alignItems: "flex-end",
    justifyContent: "center"
  },
  pricingText: {
    fontSize: 28,
    color: "#000",
    textAlign: "right",
    fontWeight: "bold"
  },
  mainText: {
    fontSize: 20,
    marginBottom: 5
  },
  subText: {
    fontSize: 14,
    color: "#8e8e8e"
  },
  locationContainer: {
    flexDirection: "row",
    paddingTop: 20,
    alignItems: "center"
  },
  locationDetails: {
    flex: 1,
    flexDirection: "column",
    marginLeft: 10,
    justifyContent: "space-between",
    alignItems: "flex-start"
  },
  button: {
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

export default PassengerProfile;

const Button = params => {
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
          onPress={params.onPress}>
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
