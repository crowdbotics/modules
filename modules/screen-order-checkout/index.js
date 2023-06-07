import React, { useState, useEffect } from "react";
import {
  Text,
  StyleSheet,
  View,
  SafeAreaView,
  ScrollView,
  Image,
  TextInput,
  Pressable
} from "react-native";

const BillingPreferencesScreen = (params) => {
  const [billingAddress, setBillingAddress] = useState("");
  const [shippingAddress, setShippingAddress] = useState("");
  const [cardDetails, setCardDetails] = useState({});
  useEffect(() => {
    setCardDetails({
      balance: "11,225.11",
      type: "Visa",
      cardNumber: "XXXX XXXX XXXX 9001",
      validThru: "10/24"
    });
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <TabView tabTitles={["Linked Cards", "Instant"]} selected={1} />
          <Image
            source={require("./assets/card.png")}
            style={styles.cardIcon}
          />
        </View>
        <View style={styles.cardInfo}>
          <DebitCard cardDetails={cardDetails} />
          <Image
            source={require("./assets/3Dots.png")}
            style={styles.threeDots}
          />
          <View style={styles.inputContainer}>
            <Text style={styles.inputText}>Billing Address</Text>
            <TextInput
              style={styles.input}
              onChangeText={(text) => setBillingAddress(text)}
              value={billingAddress}
              placeholder="Enter your Billing Address"
              placeholderTextColor="#9B9B9B"
              autoCapitalize="none"
              autoCorrect={false}
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.inputText}>Shipping Address</Text>
            <TextInput
              style={styles.input}
              onChangeText={(text) => setShippingAddress(text)}
              value={shippingAddress}
              placeholder="Enter your Shipping Address"
              placeholderTextColor="#9B9B9B"
              autoCapitalize="none"
              autoCorrect={false}
            />
          </View>
        </View>
        <View style={styles.history}>
          <TabView
            tabTitles={["Purchase History", "Order status"]}
            selected={1}
          />
          <View style={styles.detailsCard}>
            <Text style={styles.detailsHeading}>DETAILS</Text>
            <View style={styles.pricing}>
              <Text style={styles.pricingText}>Order</Text>
              <Text style={styles.pricingText}>10.25$</Text>
            </View>
            <View style={styles.pricing}>
              <Text style={styles.pricingText}>Delivery</Text>
              <Text style={styles.pricingText}>1.25$</Text>
            </View>
            <View style={styles.pricing}>
              <Text style={styles.summaryText}>Summary</Text>
              <Text style={styles.summaryText}>11.50$</Text>
            </View>
          </View>
        </View>
        <View style={styles.chartContainer}>
          <View style={styles.cardContent}>
            <Text style={styles.chartText}>Chart</Text>
            <Image
              resizeMode="contain"
              style={styles.cartImage}
              source={require("./assets/cart.png")}
            />
          </View>
          <OrderCard />
        </View>
        <Button buttonText={"Order"} onPress={() => {}} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  header: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    paddingHorizontal: 20
  },
  cardIcon: {
    flex: 0.2,
    width: 30,
    height: 20,
    marginLeft: 20,
    resizeMode: "contain"
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
  inputContainer: {
    flexDirection: "column",
    flex: 1,
    justifyContent: "center",
    marginHorizontal: 5
  },
  inputText: {
    fontSize: 16,
    marginLeft: 20,
    color: "#111112"
  },
  input: {
    borderWidth: 1,
    borderColor: "#e6e6e6",
    borderRadius: 10,
    padding: 10,
    paddingLeft: 20,
    marginVertical: 10,
    width: "100%"
  },
  history: {
    paddingHorizontal: 20
  },
  historyDate: {
    fontSize: 16,
    marginVertical: 10,
    color: "#9B9B9B",
    marginLeft: 20
  },
  detailsCard: {
    marginVertical: 10,
    borderRadius: 10,
    shadowColor: "rgba(0, 0, 0, 0.5)",
    elevation: 5,
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingVertical: 10
  },
  detailsHeading: {
    fontSize: 16,
    color: "grey",
    marginBottom: 20
  },
  pricing: {
    marginHorizontal: 20,
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    lineHeight: 20
  },
  pricingText: {
    fontSize: 14,
    lineHeight: 20,
    marginVertical: 1,
    color: "#111112"
  },
  summaryText: {
    marginVertical: 1,
    fontSize: 14,
    fontWeight: "bold",
    color: "#111112",
    lineHeight: 20
  },
  chartContainer: {
    paddingHorizontal: 20
  },
  cardContent: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 3
  },
  chartText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#1E2022"
  },
  cartImage: {
    width: 31,
    height: 23
  }
});
export default BillingPreferencesScreen;

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
    flex: 1,
    height: 48,
    backgroundColor: "#F1F1F1",
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 10,
    padding: 6,
    marginVertical: 10
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
              <Text style={orderStyles.boldText}>3</Text>
              <Text>+</Text>
            </View>
            <Image
              source={require("./assets/delete.png")}
              style={orderStyles.img}
            />
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
    shadowColor: "rgba(0, 0, 0, 0.5)",
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
  },
  boldText: {
    fontWeight: "bold"
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
    marginVertical: 20
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

const DebitCard = (props) => {
  return (
    <View style={debitCardStyles.container}>
      <View style={debitCardStyles.upperHalf}>
        <View style={debitCardStyles.balanceContainer}>
          <Text style={debitCardStyles.balanceText}>Balance</Text>
          <Text style={debitCardStyles.balance}>
            ${props.cardDetails.balance}
          </Text>
        </View>
        <View style={debitCardStyles.cardTypeContainer}>
          {props.cardDetails.type === "Visa"
            ? (
            <Image
              source={require("./assets/visa.png")}
              style={debitCardStyles.cardTypeImage}
            />
              )
            : (
            <Image
              source={require("./assets/masterCard.png")}
              style={debitCardStyles.cardTypeImage}
            />
              )}
        </View>
      </View>
      <View style={debitCardStyles.lowerHalf}>
        <View style={debitCardStyles.numberContainer}>
          <Text style={debitCardStyles.numberText}>
            {props.cardDetails.cardNumber}
          </Text>
        </View>
        <View style={debitCardStyles.validityContainer}>
          <Text style={debitCardStyles.validityText}>
            {props.cardDetails.validThru}
          </Text>
          <Text style={debitCardStyles.validityText}>Valid Thru</Text>
        </View>
      </View>
    </View>
  );
};
const debitCardStyles = StyleSheet.create({
  container: {
    width: "100%",
    height: 164,
    backgroundColor: "#000",
    borderRadius: 10,
    elevation: 10,
    paddingHorizontal: 20,
    paddingVertical: 20
  },
  whiteText: {
    color: "#fff"
  },
  upperHalf: {
    flex: 1,
    flexDirection: "row"
  },
  lowerHalf: {
    flex: 1,
    flexDirection: "row"
  },
  balanceContainer: {
    flex: 1,
    justifyContent: "center"
  },
  balanceText: {
    fontSize: 13,
    color: "#e6e6e6"
  },
  balance: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff"
  },
  cardTypeContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "flex-end"
  },
  cardTypeImage: {
    height: 80,
    width: 100,
    marginBottom: 10,
    resizeMode: "contain",
    marginLeft: 10
  },
  numberContainer: {
    flex: 1,
    justifyContent: "flex-end"
  },
  numberText: {
    fontSize: 13,
    color: "#fff"
  },
  validityContainer: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "flex-end"
  },
  validityText: {
    fontSize: 13,
    color: "#fff",
    marginRight: 10
  }
});
