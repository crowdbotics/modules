import React from "react";
import { Text, Image, StyleSheet, View, TouchableHighlight, ScrollView, TextInput } from "react-native";

const BillingScreen = () => {
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
        <View style={styles.deliveryDetailsContainer}>
          <Text style={styles.deliveryDetails}>Delivery details</Text>
          <Text style={styles.label}>
            Address
          </Text>
          <View style={styles.inputIcon}>
            <Input value="Maple Ave, Los Angeles" style={styles.inputStyle} placeholder='Enter'/>
            <Image style={styles.icon} source={require("./assets/check.png")}/>
          </View>
        </View>
        <OrderCard />
        <OrderCard />
        <OrderCard />
        <View style={styles.btnContainer}>
          <Button>
            Proceed
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
  deliveryDetailsContainer: {
    marginBottom: 20
  },
  deliveryDetails: {
    padding: 20,
    fontWeight: "bold",
    fontSize: 14,
    color: "#1E2022"
  },
  label: {
    fontSize: 14,
    paddingLeft: 20,
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
  btnContainer: {
    marginVertical: 20,
    paddingHorizontal: "10%"
  }
});

export default BillingScreen;

const OrderCard = () => {
  return (
    <View style={orderStyles.container}>
      <View style={orderStyles.order}>
        <View style={orderStyles.image}>
          <Image source={require("./assets/edit.png")} />
        </View>
        <View style={orderStyles.description}>
          <Text style={orderStyles.orderName}>Order name</Text>
          <Text style={orderStyles.quantity}>Quantity: 1</Text>
          <Text style={orderStyles.inStock}>In stock</Text>
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
  fontWeightBold: {
    fontWeight: "bold"
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
  orderName: {
    fontSize: 15,
    fontWeight: "bold"
  },
  quantity: {
    fontSize: 13,
    color: "#3E3E3E"
  },
  inStock: {
    fontSize: 13,
    color: "#12D790"
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

const Input = (props) => {
  return (
    <View>
      <TextInput
        style={inputStyles.input}
        placeholder={props.placeholder}
        value={props.value}
        onChangeText={props.setValue}
        placeholderTextColor='#ddd'
      />
      {props.errorText ? <Text style={inputStyles.error}>{props.errorText}</Text> : null}
    </View>
  );
};
const inputStyles = StyleSheet.create({
  input: {
    backgroundColor: "#fff",
    height: 49,
    color: "#000",
    borderRadius: 10,
    fontSize: 14,
    paddingHorizontal: 15
  },
  error: {
    fontSize: 13,
    color: "#FA060D",
    paddingTop: 8
  }
});
