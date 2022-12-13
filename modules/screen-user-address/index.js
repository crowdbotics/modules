import React, { useState, useEffect } from "react";
import {
  Text,
  StyleSheet,
  View,
  Image,
  Pressable,
  TextInput,
  ScrollView
} from "react-native";

const UserAddressScreen = (params) => {
  const [order, setOrder] = useState({});
  useEffect(() => {
    setOrder({
      orderName: "Order Name",
      customerName: "Customer Name",
      shopLocation: "S Main St, Los Angeles",
      deliveryLocation: "Maple Ave , Los Angeles",
      orderPrice: "$18",
      shipping: "Free Shipping"
    });
  }, []);
  const [address, setAddress] = useState("");
  const [confirmAddress, setConfirmAddress] = useState("");
  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.inputs}>
          <Text style={styles.inputsHeading}>Delivery details</Text>
          <View style={styles.inputContainer}>
            <Text style={styles.inputText}>Address</Text>
            <TextInput
              style={styles.input}
              onChangeText={(text) => setAddress(text)}
              value={address}
              placeholder="Maple Ave , Los Angeles"
              placeholderTextColor="#9B9B9B"
              autoCapitalize="none"
              autoCorrect={false}
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.inputText}>Verify Address</Text>
            <TextInput
              style={styles.input}
              onChangeText={(text) => setConfirmAddress(text)}
              value={confirmAddress}
              placeholder="Enter"
              placeholderTextColor="#9B9B9B"
              autoCapitalize="none"
              autoCorrect={false}
            />
            <Image
              source={require("./assets/checkbox.png")}
              style={styles.checkboxIcon}
            />
          </View>
        </View>
        <View style={styles.orderContainer}>
          <Text style={styles.bold}>Order details</Text>
          <View style={styles.shippingDetails}>
            <Text style={styles.grey}>{order.shipping}</Text>
            <Image source={require("./assets/Score.png")} />
          </View>
          <View style={styles.detailPallet}>
            <View style={styles.orderDetails}>
              <Text style={styles.mainText}>{order.orderName}</Text>
              <Text style={styles.subText}>Additional info</Text>
            </View>
            <View style={styles.pricing}>
              <Text style={styles.mainText}>{order.orderPrice}</Text>
              <Text style={styles.subText}>/Kg</Text>
            </View>
          </View>
          <View style={styles.detailPallet}>
            <View style={styles.orderDetails}>
              <Text style={styles.mainText}>{order.customerName}</Text>
              <Text style={styles.subText}>Additional info</Text>
            </View>
          </View>
          <View style={styles.locationContainer}>
            <Image
              source={require("./assets/Progress.png")}
              style={styles.progressImage}
            />
            <View style={styles.locationDetails}>
              <View style={styles.shopLocation}>
                <Text style={[styles.black, styles.fnt16]}>
                  {order.shopLocation}
                </Text>
                <Text style={styles.grey}>Shop Location</Text>
              </View>
              <View style={styles.deliveryLocation}>
                <Text style={[styles.black, styles.fnt16]}>
                  {order.deliveryLocation}
                </Text>
                <Text style={styles.grey}>Delivery Location</Text>
              </View>
            </View>
          </View>
        </View>
        <Button buttonText={"Purchase"} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  orderContainer: {
    backgroundColor: "#fff",
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
    paddingHorizontal: 20
  },
  shippingDetails: {
    flexDirection: "row",
    paddingVertical: 10,
    alignItems: "center",
    justifyContent: "space-between"
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
    paddingVertical: 10,
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#e6e6e6"
  },
  orderDetails: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
    paddingRight: 10
  },
  pricing: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "flex-end"
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
  inputs: {
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#e6e6e6",
    paddingBottom: 20,
    marginBottom: 20,
    marginHorizontal: 5
  },
  inputsHeading: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#000",
    marginLeft: 10
  },
  inputContainer: {
    flexDirection: "column",
    justifyContent: "center",
    marginHorizontal: 5
  },
  inputText: {
    fontSize: 14,
    marginLeft: 20,
    color: "#111112"
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
  checkboxIcon: {
    position: "absolute",
    right: 30,
    top: 45
  }
});
export default UserAddressScreen;
const Button = (params) => {
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
    paddingVertical: 10,
    paddingHorizontal: 40,
    justifyContent: "center",
    marginTop: 20
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
