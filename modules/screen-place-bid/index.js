import React from "react";
import { Text, StyleSheet, View, Image, TextInput, TouchableHighlight, ScrollView } from "react-native";

const PlaceBidScreen = (params) => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Image source={require("./assets/back.png")} style={styles.back} />
        <Text style={styles.heading}>Place a bid</Text>
        <Text />
      </View>
      <Text style={styles.subHeading}>Current Balance</Text>
      <View style={styles.totalAmount}>
        <View style={styles.amountText}>
          <Text style={styles.priceText}>1256 ETH</Text>
          <Text style={styles.walletAdd}>Wallet address: 0x25Ddgf546548564</Text>
        </View>
        <Image source={require("./assets/eth.png")} style={styles.ethImg} />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.mr10}>Name of the NFT</Text>
        <Input placeholder="Enter" />
      </View>

      <Text style={styles.mt10}>Enter quantity - Available</Text>
      <View style={[styles.chooseContainer, { justifyContent: "space-evenly" }]}>
        <Image source={require("./assets/minus.png")} style={styles.priceImg} />
        <TextInput placeholder='2.75 ETH' placeholderTextColor="#000" style={styles.inputPrice} />
        <Image source={require("./assets/plus.png")} style={styles.priceImg} />
      </View>
      <View style={styles.bidContainer}>
        <Text style={styles.bidText}>You must bid higher than 2.75 ETH</Text>
      </View>
      <Text style={styles.mt10}>Amount of bid</Text>
      <View style={[styles.chooseContainer, { justifyContent: "space-evenly" }]}>
        <Image source={require("./assets/minus.png")} style={styles.priceImg} />
        <TextInput placeholder='1' placeholderTextColor="#000" style={styles.inputPrice} />
        <Image source={require("./assets/plus.png")} style={styles.priceImg} />
      </View>
      <View style={styles.bidContainer}>
        <Text style={styles.bidText}>Quantity</Text>
      </View>

      <View style={styles.feeContainer}>
      <View>
        <Text style={[styles.mr10, { marginLeft: 15 }]}>Service fee</Text>
        <View style={styles.feeSection}>
          <Text>0.25 ETF</Text>
        </View>
      </View>
      <View>
        <Text style={[styles.mr10, { marginLeft: 15 }]}>You will pay </Text>
        <View style={styles.feeSection}>
          <Text>3.14 ETH</Text>
        </View>
      </View>
      </View>

      <View style={styles.buttonBottom}>
        <Button>Place a Bid</Button>
        <Button backgroundColor="#fff" color="#000" borderWidth={1} >
          Cancel
        </Button>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 10
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 30,
    marginTop: 10,
    marginBottom: 40
  },
  back: { width: 11.25, height: 20, resizeMode: "contain", marginLeft: -20 },
  heading: { fontSize: 16, color: "#000", marginLeft: 20 },
  subHeading: { fontSize: 16, fontWeight: "400", marginLeft: 13 },
  totalAmount: {
    paddingHorizontal: 15,
    borderRadius: 10,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    marginTop: 5
  },
  amountText: {
    display: "flex",
    flexDirection: "column"
  },
  priceText: {
    fontSize: 36,
    fontWeight: "400",
    marginBottom: 5
  },
  walletAdd: {
    fontSize: 12,
    fontWeight: "400"
  },
  ethImg: {
    height: 52,
    width: 52,
    resizeMode: "contain"
  },
  inputContainer: {
    marginTop: 25
  },
  mr10: {
    marginLeft: 25,
    marginBottom: 10
  },
  mt10: {
    marginLeft: 25,
    marginBottom: 10,
    marginTop: 10
  },
  chooseContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: 55,
    borderColor: "#C4C4C4",
    borderWidth: 1,
    borderRadius: 10,
    paddingLeft: 10,
    paddingRight: 20,
    marginHorizontal: 5
  },
  priceImg: { width: 27, height: 27, resizeMode: "contain" },
  inputPrice: { fontSize: 16 },
  bidContainer: { justifyContent: "center", alignItems: "center", marginTop: 3 },
  bidText: { fontSize: 12, color: "#939396" },
  feeContainer: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingHorizontal: 5, marginTop: 10 },
  feeSection: {
    justifyContent: "center",
    alignItems: "flex-start",
    height: 55,
    borderColor: "#C4C4C4",
    borderWidth: 1,
    borderRadius: 10,
    paddingLeft: 10,
    paddingRight: 20,
    width: 170
  },
  buttonBottom: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    marginBottom: 10,
    marginTop: 20
  }
});

const Input = (props) => {
  return (
    <View>
      <TextInput
        style={textStyles.input}
        placeholder={props.placeholder}
        value={props.value}
        onChangeText={(num) => props.setValue(num)}
        placeholderTextColor="#000"
        editable={props.editable !== false}
      />
      {props.errorText ? <Text style={textStyles.error}>{props.errorText}</Text> : null}
    </View>
  );
};

const textStyles = StyleSheet.create({

  input: {
    backgroundColor: "#fff",
    height: 53,
    borderColor: "#C4C4C4",
    color: "#000",
    borderRadius: 10,
    fontSize: 14,
    borderWidth: 1,
    paddingHorizontal: 10,
    marginHorizontal: 5
  },
  error: {
    fontSize: 13,
    color: "#FA060D",
    paddingTop: 8
  }
});

const Button = (props) => {
  return (
    <TouchableHighlight onPress={props.onPress} underlayColor="#DDDDDD">
      <View
        style={[
          btnStyles.button,
          {
            backgroundColor: props.backgroundColor ? props.backgroundColor : "#000000",
            height: props.height ? props.height : 49,
            borderWidth: props.borderWidth ? props.borderWidth : 0,
            borderColor: props.borderColor ? props.borderColor : "#000000"
          }
        ]}
      >
        <Text style={[btnStyles.text, { color: props.color ? props.color : "#ffffff" }]}>
          {props.children}
        </Text>
      </View>
    </TouchableHighlight>
  );
};

const btnStyles = StyleSheet.create({
  button: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    marginVertical: 10,
    width: 150
  },
  text: {
    fontWeight: "bold",
    fontSize: 15
  }
});

export default PlaceBidScreen;
