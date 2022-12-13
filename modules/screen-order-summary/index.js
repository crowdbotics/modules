import React, { useState } from "react";
import {
  Text,
  StyleSheet,
  View,
  Image,
  TextInput,
  Pressable,
  ScrollView
} from "react-native";

const OrderSummaryScreen = (params) => {
  const [shippingAddress, setShippingAddress] = useState("");
  const [deliveryOptions, setDeliveryOptions] = useState("");
  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <View style={styles.paletteContainer}>
            <View style={styles.unSelected}></View>
            <View style={styles.unSelected}></View>
            <View style={styles.unSelected}></View>
          </View>
          <Image
            source={require("./assets/3Dots.png")}
            style={styles.threeDots}
          />
        </View>
        <View style={styles.content}>
          <Text style={styles.companyNameText}>Company name</Text>
          <Image source={require("./assets/companyImage.png")} />
          <View style={styles.inputContainer}>
            <Text style={styles.inputText}>Shipping Address</Text>
            <TextInput
              style={styles.input}
              onChangeText={(text) => setShippingAddress(text)}
              value={shippingAddress}
              placeholder="First Street 1, New York"
              placeholderTextColor="#9B9B9B"
              autoCapitalize="none"
              autoCorrect={false}
            />
          </View>
          <View style={styles.detailsCard}>
            <View style={styles.details}>
              <Text style={styles.detailsText}>Card Number</Text>
              <Text style={styles.detailsText}>XXXX XXXX XXXX 9001</Text>
            </View>
            <View style={styles.details}>
              <Text style={styles.detailsText}>Expiration date</Text>
              <Text style={styles.detailsText}>10/24</Text>
            </View>
            <View style={styles.details}>
              <Text style={styles.detailsText}>Card Holder</Text>
              <Text style={styles.detailsText}>Username</Text>
            </View>
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.inputText}>Delivery Options</Text>
            <TextInput
              style={styles.input}
              onChangeText={(text) => setDeliveryOptions(text)}
              value={deliveryOptions}
              placeholder="Click to see"
              placeholderTextColor="black"
              autoCapitalize="none"
              autoCorrect={false}
            />
            <Image
              source={require("./assets/dropdownIcon.png")}
              style={styles.searchIcon}
            />
          </View>
          <Button buttonText={"Pay secure"} />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  header: {
    marginVertical: 10,
    paddingHorizontal: 20
  },
  paletteContainer: {
    flexDirection: "row",
    backgroundColor: "#F1F1F1",
    height: 45,
    width: "100%",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "space-around",
    paddingHorizontal: 5
  },
  selected: {
    backgroundColor: "#fff",
    height: "80%",
    flex: 1,
    padding: 10,
    paddingHorizontal: 25,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#e6e6e6",
    marginHorizontal: 5
  },
  unSelected: {
    height: "80%",
    flex: 1,
    marginHorizontal: 5,
    backgroundColor: "#12D790",
    padding: 10,
    paddingHorizontal: 25,
    borderRadius: 10
  },
  threeDots: {
    alignSelf: "center",
    marginTop: 20
  },
  content: {
    paddingHorizontal: 20
  },
  companyNameText: {
    fontSize: 16,
    marginLeft: 20,
    marginVertical: 10
  },
  inputContainer: {
    flexDirection: "column",
    justifyContent: "center",
    marginVertical: 10
  },
  inputText: {
    fontSize: 16,
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
  searchIcon: {
    position: "absolute",
    right: 30,
    top: 50
  },
  detailsCard: {
    borderRadius: 10,
    shadowColor: "rgba(0, 0, 0, 0.5)",
    elevation: 5,
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingVertical: 10,
    height: 100
  },
  details: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    lineHeight: 20
  },
  detailsText: {
    fontSize: 14,
    lineHeight: 20,
    marginVertical: 1,
    color: "grey"
  }
});
export default OrderSummaryScreen;

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
    paddingHorizontal: 40,
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
