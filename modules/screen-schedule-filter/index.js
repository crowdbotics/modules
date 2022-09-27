import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  FlatList,
  Modal,
  Pressable
} from "react-native";

const ScheduleFilter = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [timeSlots, setTimeSlots] = useState([]);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
  useEffect(() => {
    setTimeSlots([
      "10:00",
      "11:00",
      "12:00",
      "13:00",
      "14:00",
      "15:00",
      "16:00",
      "17:00",
      "18:00",
      "19:00",
      "20:00",
      "21:00"
    ]);
  }, []);
  return (
    <View style={styles.container}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modal}>
            <Text style={styles.heading}>Elmer Jame&apos;s Schedule</Text>
            <Text style={styles.title}>Time slot</Text>
            <FlatList
              data={timeSlots}
              renderItem={({ item }) => (
                <Pressable
                  style={[
                    styles.slot,
                    item === selectedTimeSlot && styles.selected
                  ]}
                  onPress={() => setSelectedTimeSlot(item)}
                >
                  <Text style={styles.slotText}>{item}</Text>
                  <Image
                    style={styles.arrowIcon}
                    source={require("./assets/arrowIcon.png")}
                  />
                </Pressable>
              )}
              keyExtractor={(item) => item}
              numColumns={4}
              columnWrapperStyle={styles.columnWrapper}
            />
            <View style={styles.buttonnsContainer}>
              <Button
                buttonText="Confirm"
                onPress={() => setModalVisible(false)}
                style={styles.button}
              />
              <Button
                buttonText="Cancel"
                onPress={() => setModalVisible(false)}
                outlineColor="#000"
                textColor="#000"
                color="#fff"
                style={styles.button}
              />
            </View>
          </View>
        </View>
      </Modal>
      <Button
        buttonText="Open Modal"
        onPress={() => setModalVisible(true)}
        style={styles.modalBtn}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e6e6e6",
    paddingHorizontal: 20
  },
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    marginTop: 22
  },
  modal: {
    width: "100%",
    backgroundColor: "white",
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    paddingVertical: 20,
    paddingHorizontal: 30,
    shadowColor: "#000",
    elevation: 5
  },
  modalBtn: {
    flex: 1,
    justifyContent: "flex-end",
    marginBottom: 20
  },
  heading: {
    fontSize: 20,
    color: "#000",
    marginBottom: 20,
    textAlign: "center"
  },
  title: {
    fontSize: 16,
    color: "#000",
    marginBottom: 10
  },
  slot: {
    borderColor: "#ccc",
    borderWidth: 2,
    width: 70,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    marginBottom: 10,
    flexDirection: "row"
  },
  columnWrapper: {
    justifyContent: "space-between"
  },
  arrowIcon: {
    width: 10,
    height: 10,
    resizeMode: "contain",
    marginLeft: 5
  },
  slotText: {
    fontSize: 12,
    color: "#000"
  },
  selected: {
    borderColor: "#12D790"
  },
  buttonnsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 30
  },
  button: {
    flex: 1,
    marginHorizontal: 10
  }
});

export default ScheduleFilter;

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
