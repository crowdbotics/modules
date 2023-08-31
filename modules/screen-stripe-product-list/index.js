import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Image, FlatList } from "react-native";

const StripeProductList = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    setProducts([
      {
        name: "SUB MEALS 1",
        price: 8,
        subscription: "Monthly",
        updateDate: "07 June",
        createDate: "30 May 22",
        image: require("./assets/productImage.png")
      },
      {
        name: "SUB MEALS 1",
        price: 8,
        subscription: "Monthly",
        updateDate: "07 June",
        createDate: "30 May 22",
        image: require("./assets/productImage.png")
      },
      {
        name: "SUB MEALS 1",
        price: 8,
        subscription: "Monthly",
        updateDate: "07 June",
        createDate: "30 May 22",
        image: require("./assets/productImage.png")
      },
      {
        name: "SUB MEALS 1",
        price: 8,
        subscription: "Monthly",
        updateDate: "07 June",
        createDate: "30 May 22",
        image: require("./assets/productImage.png")
      },
      {
        name: "SUB MEALS 1",
        price: 8,
        subscription: "Monthly",
        updateDate: "07 June",
        createDate: "30 May 22",
        image: require("./assets/productImage.png")
      }
    ]);
  }, []);
  return (
    <View style={styles.container}>
      <FlatList
        data={products}
        renderItem={({ item }) => (
          <View style={styles.productContainer}>
            <View style={styles.header}>
              <Image source={item.image} style={styles.productImage} />
              <Text style={styles.productTitle}>{item.name}</Text>
              <View style={styles.priceContainer}>
                <Text>US${item.price.toFixed(2)}</Text>
                <Text style={styles.subText}>Monthly</Text>
              </View>
            </View>
            <View style={styles.flexRow}>
              <Image
                source={require("./assets/editIcon.png")}
                style={styles.icon}
              />
              <Text style={styles.itemText}>Updated</Text>
              <Text style={[styles.itemValue, styles.green]}>
                {item.updateDate}
              </Text>
            </View>
            <View style={styles.flexRow}>
              <Image
                source={require("./assets/createIcon.png")}
                style={styles.icon}
              />
              <Text style={styles.itemText}>Created</Text>
              <Text style={styles.itemValue}>{item.createDate}</Text>
            </View>
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  productContainer: {
    marginHorizontal: 20,
    marginVertical: 10,
    padding: 10,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    backgroundColor: "#fff"
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    borderBottomColor: "#eee",
    borderBottomWidth: 1,
    marginBottom: 10
  },
  productImage: {
    width: 40,
    height: 40,
    borderRadius: 10
  },
  priceContainer: {
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "flex-end"
  },
  subText: {
    color: "#999",
    fontSize: 12
  },
  productTitle: {
    fontSize: 16,
    flex: 1,
    marginLeft: 20
  },
  flexRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 5
  },
  icon: {
    width: 20,
    height: 20
  },
  itemText: {
    fontSize: 14,
    flex: 1,
    marginLeft: 20
  },
  itemValue: {
    fontSize: 12,
    color: "#999"
  },
  green: {
    color: "#12D790"
  }
});

export default StripeProductList;
