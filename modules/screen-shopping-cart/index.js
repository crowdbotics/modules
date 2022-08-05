import React from "react";
import { Text, Image, StyleSheet, View, TouchableHighlight, ScrollView } from "react-native";

const ShoppingCartScreen = () => {
  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.headerCard}>
          <View style={styles.cardContent}>
            <Text style={styles.cardTextOne}>Order</Text>
            <Text style={styles.cardTextOne}>30.75$</Text>
          </View>
          <View style={styles.cardContent}>
            <Text style={styles.cardTextOne}>Delivery</Text>
            <Text style={styles.cardTextOne}>1.25$</Text>
          </View>
          <View style={styles.cardContent}>
            <Text style={styles.cardTextTwo}>Summary</Text>
            <Text style={styles.cardTextTwo}>32.00$</Text>
          </View>
        </View>
        <View style={styles.tabView}>
          <View style={styles.selectedTab}>
            <Text>Select all</Text>
          </View>
          <View style={styles.tabItem}>
            <Text>Delete selected</Text>
          </View>
        </View>
        <View style={styles.cardContent}>
          <Text style={styles.chartText}>Chart</Text>
          <Image resizeMode="contain" style={styles.cartImage} source={require("./assets/cart.png")} />
        </View>
        <OrderCard />
        <OrderCard />
        <OrderCard />
        <View style={styles.btnContainer}>
          <Button>
            Checkout
          </Button>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flex: 1,
    backgroundColor: "#FFF"
  },
  headerCard: {
    paddingHorizontal: 30,
    paddingVertical: 20,
    marginVertical: 10,
    backgroundColor: "#FFF",
    shadowColor: "rgba(0, 0, 0, 0.4)",
    elevation: 15,
    borderRadius: 8
  },
  cardContent: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 3
  },
  cardTextOne: {
    fontSize: 13,
    color: "#424347"
  },
  cardTextTwo: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#424347"
  },
  cartImage: {
    width: 31,
    height: 23
  },
  chartText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#1E2022"
  },
  tabView: {
    width: "70%",
    height: 48,
    backgroundColor: "#F1F1F1",
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 10,
    padding: 6,
    marginVertical: 20
  },
  selectedTab: {
    borderRadius: 10,
    backgroundColor: "#fff",
    width: "50%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "gray",
    elevation: 10
  },
  tabItem: {
    width: "50%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F1F1F1",
    borderRadius: 10
  },
  btnContainer: {
    marginVertical: 20,
    paddingHorizontal: "10%"
  }
});

export default ShoppingCartScreen;

const OrderCard = () => {
  return (
    <View style={orderStyles.container}>
      <View style={orderStyles.order}>
        <View style={orderStyles.image}>
          <Image source={require("./assets/edit.png")} />
        </View>
        <View style={orderStyles.description}>
          <Text>Order name</Text>
          <View style={orderStyles.bottomComponent}>
            <View style={orderStyles.quantity}>
              <Text>-</Text>
              <Text style={{ fontWeight: "bold" }}>3</Text>
              <Text>+</Text>
            </View>
            <Image source={require("./assets/delete.png")} style={orderStyles.img} />
          </View>
        </View>
      </View>
      <View>
        <Text style={orderStyles.orderPrice}>$10.25</Text>
      </View>
    </View>
  );
};

const orderStyles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 12,
    marginVertical: 10,
    backgroundColor: "#FFF",
    shadowColor: "rgba(0, 0, 0, 0.2)",
    elevation: 15,
    borderRadius: 10
  },
  order: {
    flexDirection: "row",
    alignItems: "center",
    padding: 5
  },
  image: {
    height: 60,
    width: 60,
    borderRadius: 30,
    backgroundColor: "rgba(0, 0, 0, 0.2)",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10
  },
  description: {
    flexDirection: "column",
    justifyContent: "space-between"

  },
  quantity: {
    width: 80,
    height: 30,
    backgroundColor: "#F1F1F1",
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 10,
    marginTop: 12

  },
  bottomComponent: {
    flexDirection: "row",
    alignItems: "center"
  },
  img: {
    marginLeft: 10,
    marginTop: 10
  },
  orderPrice: {
    fontSize: 30,
    fontWeight: "bold",
    marginRight: 10
  }
});

const Button = (props) => {
  return (
    <TouchableHighlight onPress={props.onPress} underlayColor='#DDDDDD'>
      <View style={[btnStyles.button, {
        backgroundColor: props.backgroundColor ? props.backgroundColor : "#000000",
        height: props.height ? props.height : 49,
        borderWidth: props.borderWidth ? props.borderWidth : 0,
        borderColor: props.borderColor ? props.borderColor : "#000000"
      }]}>
        <Text style={[btnStyles.text, { color: props.color ? props.color : "#ffffff" }]}>{props.children}</Text>
      </View>
    </TouchableHighlight>
  );
};

const btnStyles = StyleSheet.create({
  button: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10
  },
  text: {
    fontWeight: "bold",
    fontSize: 15
  }
});
