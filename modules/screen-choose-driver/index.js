import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  ImageBackground,
  Pressable
} from "react-native";

const ChooseDriver = () => {
  const [driver, setDriver] = useState({});
  const [rideDetails, setRideDetails] = useState({});
  useEffect(() => {
    setDriver({
      name: "Username",
      image: require("./assets/driverImage.png")
    });
    setRideDetails({
      rideType: "car",
      distance: "2.0",
      time: "2 min",
      bill: "$18"
    });
  }, []);
  let rideImage = null;
  if (rideDetails.rideType === "car") {
    rideImage = require("./assets/carIcon.png");
  } else if (rideDetails.rideType === "bike") {
    rideImage = require("./assets/bikeIcon.png");
  }
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
      <View style={styles.body}>
        <View style={styles.cardContainer}>
          <View style={styles.cardHeader}>
            <Image source={driver.image} />
            <Text style={styles.headerText}>{driver.name}</Text>
            <Image
              source={require("./assets/chatIcon.png")}
              style={styles.icon}
            />
            <Image
              source={require("./assets/callIcon.png")}
              style={styles.icon}
            />
          </View>
          <View style={styles.recommendationTab}>
            <Image
              source={require("./assets/userImages.png")}
              style={styles.userImages}
            />
            <Text>+30 recommendations</Text>
          </View>
          <View style={styles.detailsContainer}>
            <Image source={rideImage} style={styles.rideTypeIcon} />
            <View style={styles.detailTab}>
              <Text style={styles.grey}>Distance</Text>
              <Text style={styles.grey}>{rideDetails.distance} Km</Text>
            </View>
            <View style={styles.detailTab}>
              <Text style={styles.grey}>Time</Text>
              <Text style={styles.grey}>{rideDetails.time}</Text>
            </View>
            <View style={styles.detailTab}>
              <Text style={styles.grey}>Bill</Text>
              <Text style={styles.grey}>{rideDetails.bill}</Text>
            </View>
          </View>
          <View style={styles.button}>
            <Button buttonText={"Confirm"} />
          </View>
          <Image
            source={require("./assets/tabsIcon.png")}
            style={styles.tabsIcon}
          />
        </View>
      </View>
    </ImageBackground>
  );
};
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
  body: {
    flex: 1,
    justifyContent: "flex-end"
  },
  cardContainer: {
    backgroundColor: "#fff",
    borderRadius: 10,
    height: 350,
    marginHorizontal: 15,
    marginBottom: 20,
    padding: 20,
    shadowColor: "rgba(0,0,0,0.5)",
    elevation: 10
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: 15,
    borderBottomColor: "#eee",
    borderBottomWidth: 1
  },
  headerText: {
    fontSize: 15,
    flex: 1,
    marginLeft: 20
  },
  icon: {
    marginRight: 10
  },
  recommendationTab: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 20,
    borderBottomColor: "#eee",
    borderBottomWidth: 1
  },
  userImages: {
    marginRight: 10
  },
  detailsContainer: {
    flexDirection: "row",
    // justifyContent: "space-between",
    alignItems: "center",
    height: 100
  },
  detailTab: {
    justifyContent: "space-around",
    height: 50,
    alignItems: "center",
    flex: 1,
    marginLeft: 30
  },
  grey: {
    color: "#313633"
  },
  button: {
    marginTop: 10
  },
  tabsIcon: {
    position: "absolute",
    bottom: -7,
    right: "50%"
  }
});

export default ChooseDriver;

const Button = params => {
  const btnStyle = {
    backgroundColor: params.outline ? "#fff" : "#000",
    borderColor: params.outline ? "#000" : "#fff",
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
    paddingHorizontal: 20,
    justifyContent: "center"
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
