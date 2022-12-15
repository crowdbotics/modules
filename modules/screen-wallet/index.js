import React, { useState } from "react";
import {
  Text,
  StyleSheet,
  View,
  ScrollView,
  Image,
  TextInput,
  Pressable
} from "react-native";

const WalletScreen = (params) => {
  const [cardNumber, setCardNumber] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [name, setName] = useState("");
  return (
    <View style={styles.container}>
      <ScrollView>
        <TabView tabTitles={["Linked cards", "Add card"]} selected={0} />
        <View style={styles.cardInfo}>
          <Image
            source={require("./assets/Card-large.png")}
            style={styles.card}
          />
          <Image
            source={require("./assets/3Dots.png")}
            style={styles.threeDots}
          />
          <View style={styles.inputs}>
            <View style={styles.inputContainer}>
              <View style={styles.deleteCardContainer}>
                <Text style={styles.inputText}>Card Number</Text>
                <Image
                  source={require("./assets/deleteIcon.png")}
                  style={styles.deleteIcon}
                />
              </View>
              <TextInput
                style={styles.input}
                onChangeText={(text) => setCardNumber(text)}
                value={cardNumber}
                placeholder="1234 5678 9012 3456"
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
                  placeholder="10/24"
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
                  placeholder="374"
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
            <View style={styles.confirmationCard}>
              <Text style={styles.confirmationText}>Confirm</Text>
              <Pressable onPress={() => {}}>
                <Image source={require("./assets/walletIcon.png")} />
              </Pressable>
            </View>
          </View>
        </View>
        <Button buttonText={"Withdraw money"} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  cardInfo: {
    padding: 20
  },
  card: {
    alignSelf: "center"
  },
  threeDots: {
    alignSelf: "center",
    marginVertical: 10
  },
  deleteCardContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  deleteIcon: {
    marginRight: 10
  },
  inputs: {
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
  confirmationCard: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 10,
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    shadowColor: "rgba(0,0,0,0.5)",
    elevation: 5,
    borderColor: "#e6e6e6",
    borderWidth: 1
  }
});
export default WalletScreen;
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
    width: "70%",
    height: 48,
    backgroundColor: "#F1F1F1",
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 10,
    padding: 6,
    marginVertical: 10,
    marginHorizontal: 20
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
    paddingHorizontal: 40,
    justifyContent: "center",
    marginBottom: 30
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
