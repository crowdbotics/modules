import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  Pressable,
  ScrollView
} from "react-native";

const EarningsOverview = () => {
  const [user, setUser] = useState({});
  useEffect(() => {
    setUser({
      name: "User Name",
      image: require("./assets/userImage.png")
    });
  }, []);
  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <Text style={styles.heading}>Earnings</Text>
          <Text style={styles.subHeading}>Details</Text>
        </View>
        <View style={styles.cardContainer}>
          <Text style={styles.username}>{user.name}</Text>
          <Text style={styles.barText}>Earnings</Text>
          <View style={styles.bar}>
            <Text>Total</Text>
            <Text style={styles.boldText}>$1244.84</Text>
          </View>
          <Text style={styles.barText}>Disbursed</Text>
          <View style={styles.bar}>
            <Text>Total</Text>
            <Text style={styles.boldText}>$800.00</Text>
          </View>
          <Text style={styles.barText}>Tasks</Text>
          <View style={styles.bar}>
            <Text>Total</Text>
            <Text style={styles.boldText}>54</Text>
          </View>
          <Text style={styles.barText}>Payment Methods</Text>
          <View style={styles.bar}>
            <Text>Cash</Text>
            <Pressable>
              <Image
                source={require("./assets/rightArrowIcon.png")}
                style={styles.icon}
              />
            </Pressable>
          </View>
          <View style={styles.userImageContainer}>
            <Image source={user.image} style={styles.userImage} />
          </View>
        </View>
        <Button buttonText="Request withdrawl" />
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e6e6e6"
  },
  header: {
    padding: 20,
    marginBottom: 20,
    backgroundColor: "#fff"
  },
  heading: {
    fontSize: 24
  },
  subHeading: {
    fontSize: 12,
    color: "#999"
  },
  cardContainer: {
    marginHorizontal: 10,
    marginBottom: 20,
    marginTop: 30,
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingTop: 60,
    paddingHorizontal: 10,
    paddingBottom: 20,
    elevation: 5,
    shadowColor: "rgba(0,0,0,0.5)"
  },
  userImageContainer: {
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    padding: 20,
    backgroundColor: "#e6e6e6",
    borderRadius: 50,
    top: -50,
    left: 125
  },
  userImage: {
    height: 60,
    width: 60,
    borderRadius: 30
  },
  username: {
    fontSize: 18,
    textAlign: "center"
  },
  bar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: 50,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    paddingHorizontal: 10
  },
  barText: {
    marginLeft: 10,
    marginVertical: 10
  },
  boldText: {
    fontWeight: "bold",
    fontSize: 18
  },
  icon: {
    width: 20,
    height: 20,
    resizeMode: "contain"
  }
});

export default EarningsOverview;

const Button = params => {
  const backgroundColor = params.color ? params.color : "#000";
  const textColor = params.textColor ? params.textColor : "#fff";
  const btnStyle = {
    backgroundColor: params.outline ? "#fff" : backgroundColor,
    borderColor: params.outline ? backgroundColor : null,
    borderWidth: params.outline ? 1 : 0
  };
  const btnText = {
    color: params.outline ? "#000" : textColor
  };
  return (
    <View style={buttonStyles.btnContainer}>
      <View style={!params.hideShadow ? buttonStyles.shadowContainer : null}>
        <Pressable
          style={[buttonStyles.btn, btnStyle, params.style]}
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
    paddingHorizontal: 40,
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
    width: "100%",
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
