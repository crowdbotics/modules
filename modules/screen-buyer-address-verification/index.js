
import * as React from "react";
import { Text, View, StyleSheet, Image, ScrollView } from "react-native";

import Input from "./components/Input/index";
import Button from "./components/Button/index";
import check from "./assets/check.png";
import rating from "./assets/rating.png";
import arrived from "./assets/arrived.png";
import departure from "./assets/departure.png";

const BuyerAddressVerification = () => {
  return (
  <ScrollView style={styles.mainContainer}>
    <View style={styles.header}>
      <Text style={styles.heading}>
        Delivery details
      </Text>
      <Text style={styles.label}>
        Address
      </Text>
      <View style={styles.input}>
        <Input placeholder='Maple Ave, Los Angeles'/>
      </View>
      <Text style={styles.label}>
        Verify address
      </Text>
      <View style={styles.inputIcon}>
        <Input style={styles.inputStyle} placeholder='Enter'/>
        <Image style={styles.icon} source={check}/>
      </View>
    </View>

    <View style={styles.line}></View>

    <View style={styles.container}>
      <Text style={styles.orderHeading}>
        Order details
      </Text>

      <View style={styles.ratingView}>
          <Text style={styles.shippingText}> Free Shipping </Text>
          <View style={styles.rateRow}>
            <Image style={styles.rateIcon} source={rating}/>
            <Image style={styles.rateIcon} source={rating}/>
            <Image style={styles.rateIcon} source={rating}/>
            <Image style={styles.rateIcon} source={rating}/>
            <Image style={styles.rateIcon} source={rating}/>
          </View>
      </View>

      <View style={styles.orderPrice}>
        <Text style={styles.orderText}>
          Order name
        </Text>

        <Text style={styles.priceCut}>
          $22/kg
        </Text>
      </View>

      <View style={styles.additionalInfo}>
        <Text style={styles.infoText}>
          Additional info
        </Text>

        <Text style={styles.price}>$18<Text style={styles.kgText}>/kg</Text></Text>
      </View>

      <View style={styles.borderline}></View>

      <View style={styles.customerInfo}>
        <Text style={styles.customerText}>
          Customer name
        </Text>

        <Text style={styles.addText}>
          Additional info
        </Text>
      </View>

      <View style={styles.borderLine}></View>

      <View style={styles.main}>
        <View style={styles.iconArea}>
          <Image style={styles.departureicon} source={departure}/>
          <View style={styles.verticalLine}></View>
          <Image style={styles.arrivedicon} source={arrived}/>
        </View>

        <View style={styles.mainArea}>
          <View style={styles.addressText}>
            <View style={styles.textarea}>
              <Text>S Main St, Los Angeles</Text>
              <Text>Shop Location</Text>
            </View>
          </View>
          <View style={styles.addressTextTwo}>
            <View style={styles.textarea}>
              <Text>Maple Ave, Los Angeles</Text>
              <Text>Delivery Location</Text>
            </View>
          </View>
        </View>
     </View>

      <View style={styles.btn}>
        <Button>Purchase</Button>
      <View/>

     </View>

     </View>
  </ScrollView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: "#fff"
  },
  header: {
    padding: 20
  },
  addressText: {
    fontSize: 14,
    fontWeight: "400",
    marginTop: 10
  },
  departureicon: {
    height: 25,
    width: 25,
    marginTop: 18

  },

  arrivedicon: {
    height: 25,
    width: 25
  },
  heading: {
    fontSize: 14,
    fontWeight: "600",
    paddingLeft: 10
  },
  label: {
    fontSize: 12,
    paddingLeft: 10,
    paddingTop: 10,
    paddingBottom: 10
  },

  inputIcon: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 0.5,
    borderColor: "#C4C4C4",
    borderRadius: 10
  },
  inputStyle: {
    flex: 1,
    borderWidth: 0
  },

  icon: {
    height: 18,
    width: 18,
    marginRight: 10
  },
  input: {
    borderWidth: 0.5,
    borderColor: "#C4C4C4",
    borderRadius: 10
  },
  line: {
    borderBottomColor: "#C4C4C4",
    borderBottomWidth: 1,
    marginHorizontal: 6,
    paddingTop: 20
  },

  borderline: {
    borderBottomColor: "#C4C4C4",
    borderBottomWidth: 1,
    paddingTop: 10
  },

  borderLine: {
    borderBottomColor: "#C4C4C4",
    borderBottomWidth: 1,
    paddingTop: 15
  },

  container: {
    padding: 20
  },

  orderHeading: {
    paddingLeft: 20,
    fontWeight: "600"
  },
  ratingView: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },

  rateIcon: {
    height: 16,
    width: 16,
    marginRight: 3
  },

  rateRow: {
    display: "flex",
    flexDirection: "row",
    paddingTop: 20
  },

  shippingText: {
    paddingTop: 20,
    color: "#7c7c7c"
  },

  orderText: {
    fontSize: 22,
    fontWeight: "600",
    paddingTop: 10
  },

  customerText: {
    fontSize: 16,
    fontWeight: "600",
    paddingTop: 10
  },

  orderPrice: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },

  additionalInfo: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },

  customerInfo: {
    display: "flex",
    flexDirection: "column"
  },

  infoText: {
    fontSize: 14,
    color: "#7c7c7c"
  },

  priceCut: {
    fontSize: 12,
    color: "#7c7c7c",
    textDecorationLine: "line-through"
  },

  kgText: {
    fontSize: 12,
    color: "#7c7c7c"
  },
  price: {
    fontSize: 22,
    fontWeight: "600"
  },
  addText: {
    paddingTop: 10,
    fontSize: 14,
    color: "#7c7c7c"
  },

  textarea: {
    marginLeft: 10
  },
  main: {
    paddingTop: 10,
    display: "flex",
    flexDirection: "row"
  },
  verticalLine: {
    height: 45,
    width: 1,
    borderColor: "#7c7c7c",
    borderWidth: 1,
    borderStyle: "dashed",
    marginLeft: 11
  },
  mainArea: {
    display: "flex",
    flexDirection: "column"
  },
  addressTextTwo: {
    marginTop: 30
  },
  btn: {
    marginTop: 30,
    marginBottom: 10
  }
});

export default BuyerAddressVerification;
