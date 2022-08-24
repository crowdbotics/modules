import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Image } from "react-native";

const OrderInvoice = () => {
  const [order, setOrder] = useState({});
  useEffect(() => {
    setOrder({
      name: "Product name",
      totalPrice: 10,
      image: require("./assets/productImage.png"),
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Auctor aliquam augue placerat mattis amet velit nisi nisl dui imperdiet et in. .",
      promoPrice: 0,
      deliveryFee: 0,
      productPrice: 10,
      status: "Delivered",
      barcode: require("./assets/barcodeImage.png")
    });
  }, []);
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Order Id</Text>
      <Text style={styles.subHeading}>#2345123</Text>
      <View style={styles.invoiceCard}>
        <View style={styles.header}>
          <Image source={order.image} style={styles.image} />
          <Text style={styles.name}>{order.name}</Text>
          <Text style={styles.price}>
            ${order.totalPrice && order.totalPrice.toFixed(2)}
          </Text>
        </View>
        <View style={styles.descriptionContainer}>
          <Text style={styles.fnt16}>Order&apos;s descriptions</Text>
          <Text style={styles.description}>{order.description}</Text>
        </View>
        <View style={styles.detailsContainer}>
          <View style={styles.flexRow}>
            <Text style={styles.fnt16}>Promo</Text>
            <Text style={styles.fnt16}>
              ${order.promoPrice && order.promoPrice.toFixed(2)}
            </Text>
          </View>
          <View style={styles.flexRow}>
            <Text style={styles.fnt16}>Delivery Fee</Text>
            <Text style={styles.fnt16}>
              ${order.deliveryFee && order.deliveryFee.toFixed(2)}
            </Text>
          </View>
          <View style={styles.flexRow}>
            <Text style={styles.fnt16}>Product Price</Text>
            <Text style={styles.fnt16}>
              ${order.productPrice && order.productPrice.toFixed(2)}
            </Text>
          </View>
          <View style={styles.flexRow}>
            <Text style={styles.fnt16}>Total Price</Text>
            <Text style={styles.fnt16}>
              ${order.totalPrice && order.totalPrice.toFixed(2)}
            </Text>
          </View>
        </View>
        <View style={styles.flexRow}>
          <Text style={styles.fnt16}>Status</Text>
          <Text>{order.status}</Text>
        </View>
        <Image source={order.barcode} style={styles.barcode} />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  heading: {
    fontSize: 24,
    textTransform: "uppercase",
    color: "#7C7C7C",
    textAlign: "center"
  },
  subHeading: {
    fontSize: 24,
    textTransform: "uppercase",
    color: "#000",
    textAlign: "center"
  },
  invoiceCard: {
    width: 340,
    height: 570,
    backgroundColor: "#F0F2F7",
    alignSelf: "center",
    marginTop: 20,
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 20
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 1,
    paddingVertical: 20,
    borderBottomColor: "#000"
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25
  },
  name: {
    fontSize: 16,
    color: "#3E4462",
    flex: 1,
    marginLeft: 10
  },
  price: {
    fontSize: 24,
    fontWeight: "bold"
  },
  descriptionContainer: {
    borderBottomColor: "#000",
    borderBottomWidth: 1,
    paddingVertical: 10
  },
  description: {
    marginVertical: 5,
    textAlign: "justify"
  },
  fnt16: {
    fontSize: 16
  },
  flexRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  detailsContainer: {
    paddingVertical: 20,
    borderBottomColor: "#000",
    borderBottomWidth: 1,
    marginBottom: 10
  },
  barcode: {
    width: 250,
    height: 100,
    resizeMode: "contain",
    alignSelf: "center",
    marginTop: 40
  }
});

export default OrderInvoice;
