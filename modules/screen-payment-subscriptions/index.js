import React, { useState } from "react";
import {
  Text,
  StyleSheet,
  View,
  TextInput,
  Image,
  Pressable,
  ScrollView
} from "react-native";

const PaymentSubscriptionScreen = (params) => {
  const [cardNumber, setCardNumber] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [name, setName] = useState("");
  return (
    <View style={styles.container}>
      <ScrollView>
        <TabView tabTitles={["Beginner", "Intermediate", "VIP"]} selected={0} />
        <View style={styles.subPallet}>
          <View style={styles.planDes}>
            <Text style={[styles.fnt25, styles.boldText]}>Beginner</Text>
            <Text style={styles.fnt16}>Description</Text>
          </View>
          <View style={styles.subPricing}>
            <Text style={[styles.fnt25, styles.boldText]}>$14.99 </Text>
            <Text style={styles.fnt16}>per month</Text>
          </View>
        </View>
        <View style={styles.cardContainer}>
          <View style={styles.tile}>
            <Text style={styles.tileText}>Pay Subscription</Text>
            <Image source={require("./assets/walletIcon.png")} />
          </View>
          <View style={styles.separator}></View>
          <View style={styles.tile}>
            <Text style={styles.tileText}>Add card</Text>
            <Image source={require("./assets/addCardIcon.png")} />
          </View>
        </View>
        <View style={styles.inputs}>
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
        </View>
        <View style={styles.buttonsContainer}>
          <Button buttonText={"Confirm"} />
          <Button buttonText={"Cancel"} outline={true} />
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
  subPallet: {
    marginHorizontal: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    shadowColor: "rgba(0,0,0,0.5)",
    elevation: 10
  },
  planDes: {
    flex: 0.4,
    padding: 10,
    justifyContent: "center",
    alignItems: "flex-start"
  },
  subPricing: {
    flex: 0.6,
    padding: 10,
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "center"
  },
  boldText: {
    fontWeight: "bold"
  },
  fnt25: {
    fontSize: 25
  },
  fnt16: {
    fontSize: 16
  },
  cardContainer: {
    marginHorizontal: 20,
    marginVertical: 20,
    padding: 10,
    elevation: 10,
    backgroundColor: "#fff",
    shadowColor: "rgba(0,0,0,0.5)",
    borderRadius: 10
  },
  tile: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10
  },
  separator: {
    borderBottomColor: "#F0F2F7",
    borderBottomWidth: 1
  },
  inputs: {
    paddingHorizontal: 20,
    justifyContent: "center",
    height: 300
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
    width: "100%",
    height: 50
  },
  halfInputs: {
    justifyContent: "space-between",
    flexDirection: "row"
  },
  input1: {
    height: 50,
    borderRightWidth: 0,
    borderRightColor: "#fff",
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0
  },
  input2: {
    height: 50,
    borderLeftWidth: 0,
    borderLeftColor: "#fff",
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    paddingHorizontal: 20
  }
});
export default PaymentSubscriptionScreen;

const TabView = ({ tabTitles, selected }) => {
  return (
    <View style={tabViewStyles.paletteContainer}>
      {tabTitles.map((title, index) => (
        <View
          style={
            index === selected
              ? tabViewStyles.selected
              : tabViewStyles.unSelected
          }
          key={index}
        >
          <Text>{title}</Text>
        </View>
      ))}
    </View>
  );
};

const tabViewStyles = StyleSheet.create({
  paletteContainer: {
    marginHorizontal: 20,
    width: "80%",
    height: 48,
    backgroundColor: "#F1F1F1",
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 10,
    padding: 6,
    marginVertical: 20
  },
  selected: {
    borderRadius: 10,
    flex: 1,
    backgroundColor: "#fff",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "gray",
    elevation: 10
  },
  unSelected: {
    flex: 1,
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F1F1F1",
    borderRadius: 10
  }
});

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
    paddingHorizontal: 5,
    justifyContent: "center",
    marginBottom: 20,
    flex: 1
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
