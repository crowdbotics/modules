import React from "react";
import { Text, StyleSheet, View, Image, TouchableHighlight, ScrollView } from "react-native";

const BuyNftScreen = (params) => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Image source={require("./assets/back.png")} style={styles.back} />
        <Text style={styles.heading}>Buy NFT</Text>
        <Text />
      </View>
      <Text style={styles.subHeading}>Current Balance</Text>
      <View style={styles.totalAmount}>
        <View style={styles.amountText}>
          <Text style={styles.photoList}>1256 ETH</Text>
          <Text style={styles.photoNo}>Wallet address: 0x25Ddgf546548564</Text>
        </View>
        <Image source={require("./assets/eth.png")} style={styles.uploadImg} />
      </View>
      <View style={styles.wrapper}>
        <View style={styles.centerContainer1}>
          <Image source={require("./assets/edit.png")} style={styles.editImg} />
        </View>
      </View>

      <View style={styles.mainWrapper}>
        <Text style={styles.WrapperText}>Name of the Collectible</Text>
        <View style={styles.wrapperSection}>
          <View style={styles.subSection}>
            <Text style={styles.text}>-</Text>
            <Text style={styles.text}>1</Text>
            <Text style={styles.text}>+</Text>
          </View>
          <Image source={require("./assets/bin.png")} style={styles.binImg} />
        </View>

      </View>

      <View style={styles.descriptionContainer}>
        <Text style={styles.descriptionText}>Description</Text>
        <Text style={styles.description}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Massa faucibus nisi egestas quis etiam nec feugiat. Scelerisque pellentesque at in accumsan cras tristique at id. At nullam lectus sapien nulla. At egestas cursus elit, tortor mattis gravida ornare proin ipsum. Duis purus turpis libero tristique dignissim.
        </Text>
      </View>

      <View style={styles.feeContainer}>
        <View>
          <Text style={[styles.mr10, { marginLeft: 15 }]}>Service fee</Text>
          <View style={styles.feeSection}>
            <Text>0.25 ETF</Text>
          </View>
        </View>
        <View>
          <Text style={[styles.mr10, { marginLeft: 15 }]}>You will pay</Text>
          <View style={styles.feeSection}>
            <Text>3.14 ETH</Text>
          </View>
        </View>
      </View>
      <View style={styles.buttonBottom}>
        <Button>Proceed</Button>
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
  photoList: {
    fontSize: 36,
    fontWeight: "400",
    marginBottom: 5
  },
  photoNo: {
    fontSize: 12,
    fontWeight: "400"
  },
  uploadImg: {
    height: 52,
    width: 52,
    resizeMode: "contain"
  },
  editImg: {
    height: 32,
    width: 32,
    resizeMode: "contain"
  },
  binImg: {
    height: 17.5,
    width: 16.5,
    resizeMode: "contain"
  },
  wrapper: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    marginBottom: 10
  },
  centerContainer1: {
    width: 346,
    height: 168,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fdf1d6",
    borderRadius: 10
  },

  descriptionContainer: { paddingHorizontal: 15, marginVertical: 20 },
  descriptionText: { fontSize: 16, fontWeight: "400", marginLeft: 10 },
  description: { fontSize: 12, marginVertical: 10, fontWeight: "500" },
  mr10: {
    marginLeft: 25,
    marginBottom: 10
  },
  feeContainer: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingHorizontal: 5 },
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
    marginVertical: 30
  },
  mainWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingLeft: 20,
    paddingRight: 15
  },
  WrapperText: { fontSize: 14, fontWeight: "500", color: "#313633" },
  wrapperSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: 100
  },
  subSection: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#F1F1F1",
    width: 75,
    paddingHorizontal: 5,
    paddingVertical: 5,
    borderRadius: 10
  },
  text: { fontSize: 14, fontWeight: "bold" }
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

export default BuyNftScreen;
