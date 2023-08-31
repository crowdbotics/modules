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

const RideBookingDetails = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [rideDetails, setRideDetails] = useState({});
  useEffect(() => {
    setRideDetails({
      time: "10 min",
      cost: 15,
      type: "Classic"
    });
  }, []);
  return (
    <ImageBackground
      style={styles.container}
      source={require("./assets/mapBackground.png")}>
      <View style={styles.header}>
        <Pressable>
          <Image source={require("./assets/backIcon.png")} />
        </Pressable>
        <Pressable style={styles.menuIcon}>
          <Image source={require("./assets/menuIcon.png")} />
        </Pressable>
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={styles.flexRow}>
              <View style={styles.item}>
                <Image
                  source={require("./assets/carIcon.png")}
                  style={styles.icon}
                />
                <Text>{rideDetails.type}</Text>
              </View>
              <View style={styles.item}>
                <Text>{rideDetails.time}</Text>
                <Text style={styles.grey}>Time</Text>
              </View>
              <View style={styles.item}>
                <Text>${rideDetails.cost}</Text>
                <Text style={styles.grey}>Cost</Text>
              </View>
            </View>
            <View style={styles.flexRow}>
              <View style={styles.item}>
                <Image
                  source={require("./assets/walletIcon.png")}
                  style={styles.icon}
                />
                <Text style={styles.grey}>Payment</Text>
              </View>
              <View style={styles.item}>
                <Image
                  source={require("./assets/promoIcon.png")}
                  style={styles.icon}
                />
                <Text style={styles.grey}>Promo</Text>
              </View>
              <View style={styles.item}>
                <Image
                  source={require("./assets/optionsIcon.png")}
                  style={styles.icon}
                />
                <Text style={styles.grey}>Options</Text>
              </View>
            </View>
            <Button
              buttonText={"Cancel booking"}
              onPress={() => setModalVisible(!modalVisible)}
              style={styles.button}
              color="#EA4335"
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
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 10
  },
  menuIcon: {
    elevation: 5,
    backgroundColor: "rgba(255,255,255,0.5)",
    borderRadius: 50
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
  heading: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#2F2F2F",
    textAlign: "center",
    marginBottom: 20
  },
  text: {
    fontSize: 20,
    color: "#505050",
    textAlign: "center"
  },
  boldText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#505050",
    textAlign: "center"
  },
  button: {
    marginHorizontal: 10,
    marginTop: 40
  },
  modalButton: {
    flex: 1,
    marginHorizontal: 20,
    justifyContent: "flex-end",
    marginBottom: 20
  },
  flexRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomColor: "#e6e6e6",
    borderBottomWidth: 1,
    paddingVertical: 10
  },
  item: {
    justifyContent: "space-around",
    alignItems: "center",
    height: 60,
    flex: 1,
    marginHorizontal: 10
  },
  icon: {
    width: 30,
    height: 30,
    resizeMode: "contain"
  },
  grey: {
    color: "#505050",
    marginTop: 5
  }
});

export default RideBookingDetails;
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
