import React, { useState } from "react";
import {
  Text,
  StyleSheet,
  View,
  ScrollView,
  SafeAreaView,
  Image,
  TextInput,
  Pressable
} from "react-native";

const AddPaymentMethodScreen = (params) => {
  const [paymentOption, setPaymentOption] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [name, setName] = useState("");
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <View style={styles.paletteContainer}>
            <View style={styles.unSelected}></View>
            <View style={styles.unSelected}></View>
            <View style={styles.selected}></View>
          </View>
          <Image
            source={require("./assets/3Dots.png")}
            style={styles.threeDots}
          />
        </View>
        <View style={styles.inputs}>
          <View style={styles.inputContainer}>
            <Text style={styles.inputText}>Payment Options</Text>
            <TextInput
              style={styles.input}
              onChangeText={(text) => setPaymentOption(text)}
              value={paymentOption}
              placeholder="Master Card"
              placeholderTextColor="#9B9B9B"
              autoCapitalize="none"
              autoCorrect={false}
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.inputText}>Card Number</Text>
            <TextInput
              style={styles.input}
              onChangeText={(text) => setCardNumber(text)}
              value={cardNumber}
              placeholder="Enter your Card Number"
              placeholderTextColor="#9B9B9B"
              autoCapitalize="none"
              autoCorrect={false}
            />
          </View>
          <View style={styles.halfInputs}>
            <View style={styles.inputContainer}>
              <Text style={styles.inputText}>Expiration Date</Text>
              <TextInput
                style={[styles.input, styles.input1]}
                onChangeText={(text) => setCardExpiry(text)}
                value={cardExpiry}
                placeholder="Enter your last name"
                placeholderTextColor="#9B9B9B"
                autoCapitalize="none"
                autoCorrect={false}
              />
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.inputText}>CVV</Text>
              <TextInput
                style={[styles.input, styles.input2]}
                onChangeText={(text) => setCvv(text)}
                value={cvv}
                placeholder="CVV"
                placeholderTextColor="#9B9B9B"
                autoCapitalize="none"
                autoCorrect={false}
              />
            </View>
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.inputText}>Card Holder Name</Text>
            <TextInput
              style={styles.input}
              onChangeText={(text) => setName(text)}
              value={name}
              placeholder="Username"
              placeholderTextColor="#9B9B9B"
              autoCapitalize="none"
              autoCorrect={false}
            />
          </View>
          <View style={styles.checkBoxContainer}>
            <Text style={styles.inputText}>Save this card details</Text>
            <Image
              source={require("./assets/checkbox.png")}
              style={styles.checkBox}
            />
          </View>
        </View>
        <View style={styles.btnContainer}>
          <Pressable style={styles.btn}>
            <Text style={styles.btnText}>Continue</Text>
            <Image
              source={require("./assets/arrow.png")}
              style={styles.arrow}
            />
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  header: {
    padding: 20
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
  inputs: {
    paddingHorizontal: 20,
    justifyContent: "center"
  },
  inputContainer: {
    flexDirection: "column",
    flex: 1,
    justifyContent: "center"
  },
  inputText: {
    fontSize: 14,
    marginLeft: 20
  },
  input: {
    borderWidth: 1,
    borderColor: "#e6e6e6",
    borderRadius: 10,
    padding: 10,
    paddingLeft: 20,
    marginVertical: 10,
    width: "100%"
  },
  halfInputs: {
    justifyContent: "space-between",
    flexDirection: "row",
    flex: 1
  },
  input1: {
    borderRightWidth: 0,
    borderRightColor: "#fff",
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
    flex: 0.8
  },
  input2: {
    borderLeftWidth: 0,
    borderLeftColor: "#fff",
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
    flex: 0.2
  },
  checkBoxContainer: {
    borderWidth: 1,
    borderColor: "#e6e6e6",
    padding: 10,
    marginVertical: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    borderRadius: 10
  },
  btnContainer: {
    padding: 30,
    paddingTop: 10,
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
    flexDirection: "row"
  },
  arrow: {
    marginLeft: 10,
    marginTop: 2
  },
  btnText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold"
  }
});
export default AddPaymentMethodScreen;
