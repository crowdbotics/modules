import React, { useState, useEffect } from "react";
import { Text, StyleSheet, View, Image } from "react-native";

const MapLiveTrackingScreen = (params) => {
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
  return (
    <View style={styles.container}>
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
      <Image source={require("./assets/map.png")} style={styles.mapImage} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  orderContainer: {
    flex: 1,
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
  mapImage: {
    flex: 1,
    width: "90%",
    height: "90%",
    resizeMode: "contain",
    alignSelf: "center"
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
    fontSize: 20,
    fontWeight: "bold"
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
  }
});
export default MapLiveTrackingScreen;
