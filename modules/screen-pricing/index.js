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
  const pricingPlans = [
    {
      id: 1,
      title: "Basic",
      icon: "balloon",
      price: {
        dollors: 3,
        centes: 99
      },
      features: {
        1: "Unlimited links",
        2: "Analytic support",
        3: "Chat Support",
        4: "Unlimited Users"
      }
    },
    {
      id: 2,
      title: "Advanced",
      icon: "airballoon",
      price: {
        dollors: 6,
        centes: 99
      },
      features: {
        1: "Unlimited links",
        2: "Analytic support",
        3: "Chat Support",
        4: "Optimized Hashtag"
      }
    },
    {
      id: 3,
      title: "Bussiness",
      icon: "airballoon-outline",
      price: {
        dollors: 9,
        centes: 99
      },
      features: {
        1: "Unlimited links",
        2: "Analytic support",
        3: "Chat Support",
        4: "Optimized Hashtag",
        5: "Periority Support",
        6: "Custom Integration"
      }
    }
  ];

  return (
    <ScrollView>
      {pricingPlans.map((plan, index) => {
        const objLength = Object.keys(plan?.features).length;
        return (
          <View style={styles.mainContainer} key={index}>
            <View style={[styles.subContainer]}>
              <Text style={styles.personalText}>{plan?.title}</Text>
              <View style={styles.mainIconView}>
                <MaterialCommunityIcons
                  style={styles.mainIcon}
                  name={plan?.icon}
                  color="blue"
                  size={100}
                />
              </View>
              <View style={styles.services}>
                {Array.apply(plan?.features, Array(objLength)).map((v, i) => (
                  <View style={styles.Box} key={i}>
                    <MaterialCommunityIcons
                      name="check"
                      style={styles.iconCheck}
                    />
                    <Text style={styles.Text}>
                      {Object.values(plan?.features)[i]}
                    </Text>
                  </View>
                ))}
              </View>
              <View style={styles.priceBox}>
                <Text style={styles.dollarSign}>$</Text>
                <Text style={styles.Price}>{plan?.price?.dollors}</Text>
                <Text style={styles.Cents}>{plan?.price?.centes}</Text>
              </View>
              <Text style={styles.monthlyText}>monthly</Text>
              <TouchableOpacity title="Get Started" style={styles.getStarted}>
                <Text style={styles.getStartedText}>Get Started</Text>
              </TouchableOpacity>
            </View>
          </View>
        );
      })}
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
