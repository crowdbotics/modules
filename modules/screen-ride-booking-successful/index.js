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

const RideBookingSuccessful = () => {
  const [modalVisible, setModalVisible] = useState(false);
  useEffect(() => {}, []);
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
            <Text style={styles.heading}>Booking successful</Text>
            <Text style={styles.text}>Your Booking was successful</Text>
            <Text style={styles.text}>Your driver will pick you up in</Text>
            <Text style={styles.boldText}>5 min.</Text>
            <Image
              style={styles.successIcon}
              source={require("./assets/successIcon.png")}
            />
            <View style={styles.btnContainer}>
              <Button
                buttonText={"Done"}
                onPress={() => setModalVisible(!modalVisible)}
                style={styles.button}
              />
              <Button
                buttonText={"Cancel"}
                onPress={() => setModalVisible(!modalVisible)}
                style={styles.button}
                color="#fff"
                textColor="#000"
                outlineColor="#000"
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
  successIcon: {
    width: 50,
    height: 50,
    alignSelf: "center",
    marginVertical: 20
  },
  btnContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 30
  },
  button: {
    marginHorizontal: 10,
    flex: 1
  },
  modalButton: {
    flex: 1,
    marginHorizontal: 20,
    justifyContent: "flex-end",
    marginBottom: 20
  }
});

export default RideBookingSuccessful;
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
