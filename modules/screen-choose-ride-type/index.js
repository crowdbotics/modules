import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  ImageBackground,
  Image,
  Pressable,
  Modal,
  FlatList
} from "react-native";

const ChooseRideType = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [rideTypes, setRideTypes] = useState([]);
  useEffect(() => {
    setRideTypes([
      {
        id: 1,
        name: "Car",
        image: require("./assets/carIcon.png"),
        time: "2 min",
        cost: "$18"
      },
      {
        id: 2,
        name: "Bike",
        image: require("./assets/bikeIcon.png"),
        time: "2 min",
        cost: "$18"
      },
      {
        id: 3,
        name: "Sports",
        image: require("./assets/sportsCarIcon.png"),
        time: "2 min",
        cost: "$18"
      },
      {
        id: 4,
        name: "Car",
        image: require("./assets/carIcon.png"),
        time: "2 min",
        cost: "$18"
      },
      {
        id: 5,
        name: "Bike",
        image: require("./assets/bikeIcon.png"),
        time: "2 min",
        cost: "$18"
      },
      {
        id: 6,
        name: "Sports",
        image: require("./assets/sportsCarIcon.png"),
        time: "2 min",
        cost: "$18"
      }
    ]);
  }, []);
  return (
    <ImageBackground
      style={styles.container}
      source={require("./assets/mapBackground.png")}
      resizeMode="cover">
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
            <Pressable
              onPress={() => {
                setModalVisible(!modalVisible);
              }}>
              <Image
                source={require("./assets/closeIcon.png")}
                style={styles.closeIcon}
              />
            </Pressable>
            <FlatList
              data={rideTypes}
              renderItem={({ item }) => <Ride ride={item} />}
              keyExtractor={item => item.id.toString()}
              showsVerticalScrollIndicator={false}
            />
            <Button
              buttonText={"Confirm"}
              onPress={() => setModalVisible(!modalVisible)}
            />
          </View>
        </View>
      </Modal>
      <View style={styles.button}>
        <Button
          buttonText={"Open Modal"}
          onPress={() => setModalVisible(true)}
        />
      </View>
    </ImageBackground>
  );
};

const Ride = ({ ride }) => {
  return (
    <View style={rideStyles.container}>
      <View style={rideStyles.imageContainer}>
        <Image source={ride.image} style={rideStyles.image} />
        <Text>{ride.name}</Text>
      </View>
      <View style={rideStyles.detailsTab}>
        <Text style={rideStyles.mainText}>{ride.time}</Text>
        <Text style={rideStyles.subText}>Time</Text>
      </View>
      <View style={rideStyles.detailsTab}>
        <Text style={rideStyles.mainText}>{ride.cost}</Text>
        <Text style={rideStyles.subText}>Cost</Text>
      </View>
    </View>
  );
};

const rideStyles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    height: 100,
    borderBottomColor: "#eee",
    borderBottomWidth: 1,
    paddingVertical: 10
  },
  imageContainer: {
    flexDirection: "column",
    justifyContent: "space-around",
    alignItems: "center",
    height: "100%",
    flex: 1
  },
  detailsTab: {
    flexDirection: "column",
    justifyContent: "space-around",
    alignItems: "center",
    height: "100%",
    flex: 1
  },
  mainText: {
    fontSize: 15,
    color: "#000"
  },
  subText: {
    fontSize: 14,
    color: "#979797"
  }
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
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
    height: 550,
    backgroundColor: "white",
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    paddingVertical: 20,
    paddingHorizontal: 30,
    shadowColor: "#000",
    elevation: 5
  },
  closeIcon: {
    alignSelf: "center",
    marginBottom: 20
  },
  button: {
    position: "absolute",
    bottom: 20,
    right: 0,
    left: 0,
    marginHorizontal: 40
  }
});

export default ChooseRideType;

const Button = params => {
  const btnStyle = {
    backgroundColor: params.outline ? "fff" : "#000",
    borderColor: params.outline ? "#000" : null,
    borderWidth: 1
  };
  const btnText = {
    color: params.outline ? "#000" : "#fff"
  };
  return (
    <View style={buttonStyles.btnContainer}>
      <Pressable style={[buttonStyles.btn, btnStyle]} onPress={params.onPress}>
        <Text style={[buttonStyles.btnText, btnText]}>{params.buttonText}</Text>
        <View style={styles.childrenContainer}>{params.children}</View>
      </Pressable>
    </View>
  );
};

const buttonStyles = StyleSheet.create({
  btnContainer: {
    justifyContent: "center",
    marginVertical: 20
  },
  btn: {
    backgroundColor: "black",
    height: 50,
    width: "100%",
    padding: 10,
    paddingHorizontal: 25,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "rgba(0, 0, 0, 0.2)",
    elevation: 10,
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
