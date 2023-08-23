import React from "react";

import {
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  StyleSheet
} from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const PricingScreen = () => {
  return (
    <ScrollView>
      <View style={styles.mainContainer}>
        <View style={[styles.subContainer]}>
          <Text style={styles.personalText}>Personal</Text>
          <View style={styles.mainIconView}>
            <MaterialCommunityIcons
              style={styles.mainIcon}
              name="balloon"
              color="blue"
              size={100}
            />
          </View>
          <View style={styles.services}>
            <View style={styles.Box}>
              <MaterialCommunityIcons name="check" style={styles.iconCheck} />
              <Text style={styles.Text}>1 User</Text>
            </View>
            <View style={styles.Box}>
              <MaterialCommunityIcons name="close" style={styles.iconClose} />
              <Text style={styles.Text}>Plugins Features</Text>
            </View>

            <View style={styles.Box}>
              <MaterialCommunityIcons name="check" style={styles.iconCheck} />
              <Text style={styles.Text}>Unlimited Space</Text>
            </View>

            <View style={styles.Box}>
              <MaterialCommunityIcons name="check" style={styles.iconCheck} />
              <Text style={styles.Text}>24/7 Support</Text>
            </View>
          </View>
          <View style={styles.priceBox}>
            <Text style={styles.dollarSign}>$</Text>
            <Text style={styles.Price}>3</Text>
            <Text style={styles.Cents}>99</Text>
          </View>
          <Text style={styles.monthlyText}>monthly</Text>
          <TouchableOpacity title="Get Started" style={styles.getStarted}>
            <Text style={styles.getStartedText}>Get Started</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View>
        <View style={[styles.subContainer]}>
          <Text style={styles.personalText}>Advanced</Text>
          <View style={styles.mainIconView}>
            <MaterialCommunityIcons
              style={styles.mainIcon}
              name="airballoon"
              color="blue"
              size={100}
            />
          </View>
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <View style={styles.Box}>
              <MaterialCommunityIcons name="check" style={styles.iconCheck} />
              <Text style={styles.Text}>2 User</Text>
            </View>
            <View style={styles.Box}>
              <MaterialCommunityIcons name="close" style={styles.iconClose} />
              <Text style={styles.Text}>Plugins Features</Text>
            </View>

            <View style={styles.Box}>
              <MaterialCommunityIcons name="check" style={styles.iconCheck} />
              <Text style={styles.Text}>Unlimited Space</Text>
            </View>

            <View style={styles.Box}>
              <MaterialCommunityIcons name="check" style={styles.iconCheck} />
              <Text style={styles.Text}>24/7 Support</Text>
            </View>
          </View>
          <View style={styles.priceBox}>
            <Text style={styles.dollarSign}>$</Text>
            <Text style={styles.Price}>6</Text>
            <Text style={styles.Cents}>99</Text>
          </View>
          <Text style={styles.monthlyText}>monthly</Text>
          <TouchableOpacity title="Get Started" style={styles.getStarted}>
            <Text style={styles.getStartedText}>Get Started</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View>
        <View style={[styles.subContainer]}>
          <Text style={styles.personalText}>Business</Text>
          <View style={styles.mainIconView}>
            <MaterialCommunityIcons
              style={styles.mainIcon}
              name="airballoon-outline"
              color="blue"
              size={100}
            />
          </View>
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <View style={styles.Box}>
              <MaterialCommunityIcons name="check" style={styles.iconCheck} />
              <Text style={styles.Text}>3 User</Text>
            </View>
            <View style={styles.Box}>
              <MaterialCommunityIcons name="close" style={styles.iconClose} />
              <Text style={styles.Text}>Plugins Features</Text>
            </View>

            <View style={styles.Box}>
              <MaterialCommunityIcons name="check" style={styles.iconCheck} />
              <Text style={styles.Text}>Unlimited Space</Text>
            </View>

            <View style={styles.Box}>
              <MaterialCommunityIcons name="check" style={styles.iconCheck} />
              <Text style={styles.Text}>24/7 Support</Text>
            </View>
          </View>
          <View style={styles.priceBox}>
            <Text style={styles.dollarSign}>$</Text>
            <Text style={styles.Price}>9</Text>
            <Text style={styles.Cents}>99</Text>
          </View>
          <Text style={styles.monthlyText}>monthly</Text>
          <TouchableOpacity title="Get Started" style={styles.getStarted}>
            <Text style={styles.getStartedText}>Get Started</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default PricingScreen;

const styles = StyleSheet.create({
  subContainer: {
    shadowColor: "#afa7a7",
    shadowOffset: {
      width: 0,
      height: 4
    },
    shadowOpacity: 0.2,
    shadowRadius: 5.62,
    elevation: 8,
    width: "95%",
    borderRadius: 10,
    marginVertical: 10,
    alignSelf: "center"
  },

  main: {
    backgroundColor: "#f1f1f1",
    width: "100%"
  },

  Text: {
    fontSize: 18,
    marginLeft: 10
  },
  personalText: {
    alignSelf: "center",
    marginTop: 30,
    fontSize: 30,
    fontWeight: "bold",
    color: "blue"
  },
  Box: {
    marginTop: 10,
    flexDirection: "row",
    alignSelf: "flex-start",
    marginLeft: 50
  },
  services: {
    justifyContent: "center",
    alignItems: "center"
  },
  mainIconView: {
    alignSelf: "center",
    marginBottom: 20,
    marginTop: 20,
    backgroundColor: "#DCDCDC",
    borderRadius: 70,
    height: 130,
    width: 130
  },

  mainIcon: {
    alignSelf: "center",
    marginTop: 14
  },

  iconClose: {
    color: "red",
    fontSize: 27
  },
  iconCheck: {
    color: "blue",
    fontSize: 27
  },

  dollarSign: {
    alignSelf: "center",
    marginTop: -20,
    fontSize: 25,
    fontWeight: "bold",
    color: "blue"
  },

  Price: {
    alignSelf: "center",
    marginTop: 20,
    fontSize: 80,
    fontWeight: "bold",
    color: "blue"
  },
  Cents: {
    alignSelf: "center",
    marginTop: -20,
    fontSize: 25,
    fontWeight: "bold",
    color: "blue"
  },
  monthlyText: {
    fontWeight: "bold",
    fontSize: 20,
    marginLeft: 180,
    marginTop: -30
  },
  getStarted: {
    marginTop: 20,
    backgroundColor: "blue",
    marginBottom: 30,
    height: 45,
    width: 240,
    alignSelf: "center"
  },
  getStartedText: {
    fontSize: 20,
    fontWeight: "bold",
    alignSelf: "center",
    color: "white",
    textAlignVertical: "center",
    marginTop: 7
  },
  priceBox: {
    flexDirection: "row",
    alignSelf: "center"
  }
});
