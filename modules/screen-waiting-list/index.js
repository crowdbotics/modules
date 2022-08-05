import React from "react";
import { Text, StyleSheet, View, TouchableHighlight, Image, ScrollView } from "react-native";

const WaitingList = (params) => {
  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.image}>
            <Image source={require("./assets/edit.png")} />
          </View>
          <View style={styles.description}>
            <Text>Business name</Text>
            <View style={styles.orderInfo}>
              <Image source={require("./assets/time.png")} style={styles.img}/>
              <Text>45-55 min</Text>
            </View>
            <View style={styles.orderInfo}>
              <Image source={require("./assets/location.png")} style={styles.img}/>
              <Text>12126 FIrst St, LA</Text>
            </View>
          </View>
        </View>
        <View style={styles.text}>
          <Text>Choose notification</Text>
        </View>
        <View style={styles.tabView}>
          <View style={styles.follow}>
            <Text>SMS</Text>
          </View>
          <View style={styles.messages}>
            <Text>Email</Text>
          </View>
        </View>
        <View style={styles.text}>
          <Text>Your Order</Text>
        </View>
        <View>
          <OrderCard />
        </View>
        <View>
          <OrderCard />
        </View>
        <View>
          <OrderCard />
        </View>
        <View style={styles.btn}>
          <Button>
            Order
          </Button>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: "#fff",
    flex: 1
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    shadowColor: "rgba(0, 0, 0, 0.2)",
    elevation: 5,
    borderRadius: 8,
    height: 100
  },
  image: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
    backgroundColor: "#F9D8D9",
    borderRadius: 10,
    width: 80,
    height: "100%",
    marginLeft: 10

  },
  description: {
    borderRadius: 10,
    height: "100%"
  },
  text: {
    marginLeft: 10,
    marginVertical: 20
  },
  tabView: {
    width: "70%",
    height: 48,
    backgroundColor: "#F1F1F1",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    borderRadius: 10,
    paddingVertical: 6,
    marginLeft: 10
  },
  follow: {
    borderRadius: 10,
    backgroundColor: "#fff",
    width: "45%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center"
  },
  messages: {
    width: "45%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F1F1F1"
  },
  btn: {
    paddingHorizontal: "10%"
  },
  orderInfo: {
    flexDirection: "row"

  },
  img: {
    marginRight: 8
  }

});
export default WaitingList;

const OrderCard = () => {
  return (
    <View style={orderStyles.container}>
      <View style={orderStyles.order}>
        <View style={orderStyles.image}>
          <Image source={require("./assets/edit.png")}/>
        </View>
        <View style={orderStyles.description}>
          <Text>Order name</Text>
          <View style={orderStyles.bottomComponent}>
            <View style={orderStyles.quantity}>
              <Text>-</Text>
              <Text>3</Text>
              <Text>+</Text>
            </View>
            <Image source={require("./assets/delete.png")} style={orderStyles.img}/>
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
    marginBottom: 20,
    shadowColor: "rgba(0, 0, 0, 0.2)",
    elevation: 5,
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
