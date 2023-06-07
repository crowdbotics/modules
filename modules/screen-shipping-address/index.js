import React, { useState } from "react";
import {
  Text,
  StyleSheet,
  View,
  Image,
  TextInput,
  ScrollView,
  Pressable
} from "react-native";

const ShippingAddressScreen = (params) => {
  const [address, setAddress] = useState("");
  const [paymentOptions, setPaymentOptions] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <View style={styles.paletteContainer}>
            <View style={styles.unSelected}></View>
            <View style={styles.unSelected}></View>
            <View style={styles.unSelected}></View>
          </View>
          <Image
            source={require("./assets/3Dots.png")}
            style={styles.threeDots}
          />
        </View>
        <View style={styles.inputs}>
          <View style={styles.inputContainer}>
            <Text style={styles.inputText}>Search</Text>
            <TextInput
              style={styles.input}
              onChangeText={(text) => setAddress(text)}
              value={address}
              placeholder="Search Username"
              placeholderTextColor="#9B9B9B"
              autoCapitalize="none"
              autoCorrect={false}
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.inputText}>Payment options</Text>
            <TextInput
              style={styles.input}
              onChangeText={(text) => setPaymentOptions(text)}
              value={paymentOptions}
              placeholder="Search Username"
              placeholderTextColor="#9B9B9B"
              autoCapitalize="none"
              autoCorrect={false}
            />
            <Image
              source={require("./assets/dropdownIcon.png")}
              style={styles.dropdownIcon}
            />
          </View>
        </View>
        <DetailsCard />
        <View style={styles.mapHeader}>
          <Text style={styles.mapHeaderText}>Map</Text>
          <Image source={require("./assets/locationIcon.png")} />
        </View>
        <View style={styles.mapImageContainer}>
          <Image source={require("./assets/map.png")} style={styles.mapImage} />
        </View>
        <View style={styles.halfInputs}>
          <View style={styles.inputContainer}>
            <Text style={styles.inputText}>City</Text>
            <TextInput
              style={styles.input}
              onChangeText={(text) => setCity(text)}
              value={city}
              placeholder="Enter"
              placeholderTextColor="#9B9B9B"
              autoCapitalize="none"
              autoCorrect={false}
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.inputText}>Country</Text>
            <TextInput
              style={styles.input}
              onChangeText={(text) => setCountry(text)}
              value={country}
              placeholder="Search Username"
              placeholderTextColor="#9B9B9B"
              autoCapitalize="none"
              autoCorrect={false}
            />
          </View>
        </View>
        <View style={styles.halfInputs}>
          <View style={styles.inputContainer}>
            <Text style={styles.inputText}>State</Text>
            <TextInput
              style={styles.input}
              onChangeText={(text) => setState(text)}
              value={state}
              placeholder="Search Username"
              placeholderTextColor="#9B9B9B"
              autoCapitalize="none"
              autoCorrect={false}
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.inputText}>Confirmation</Text>
            <View style={[styles.input, styles.confirmationBox]}>
              <Text style={styles.placeholderText}>Confirmation</Text>
              <Image source={require("./assets/checkbox.png")} />
            </View>
          </View>
        </View>
        <Button buttonText={"Continue"}>
          <Image source={require("./assets/arrow.png")} style={styles.arrow} />
        </Button>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  header: {
    paddingHorizontal: 20
  },
  paletteContainer: {
    flexDirection: "row",
    backgroundColor: "#F1F1F1",
    height: 45,
    width: "100%",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "space-around",
    paddingHorizontal: 5
  },
  selected: {
    backgroundColor: "#fff",
    height: "80%",
    flex: 1,
    padding: 10,
    paddingHorizontal: 25,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#e6e6e6",
    marginHorizontal: 5
  },
  unSelected: {
    height: "80%",
    flex: 1,
    marginHorizontal: 5,
    backgroundColor: "#12D790",
    padding: 10,
    paddingHorizontal: 25,
    borderRadius: 10
  },
  threeDots: {
    alignSelf: "center",
    marginTop: 20
  },
  inputs: {
    marginHorizontal: 15
  },
  inputContainer: {
    flexDirection: "column",
    justifyContent: "center",
    flex: 1,
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
    width: "100%",
    height: 50
  },
  placeholderText: {
    color: "#9B9B9B"
  },
  dropdownIcon: {
    position: "absolute",
    right: 30,
    top: 50
  },
  mapHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 20,
    paddingHorizontal: 20,
    marginVertical: 10
  },
  mapHeaderText: {
    fontSize: 16,
    color: "#111112",
    fontWeight: "bold"
  },
  mapImageContainer: {
    marginHorizontal: 20,
    marginVertical: 10,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "rgba(0, 0, 0, 0.5)",
    elevation: 5,
    backgroundColor: "#fff",
    borderRadius: 10
  },
  mapImage: {
    width: "100%",
    borderRadius: 10
  },
  halfInputs: {
    marginHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  confirmationBox: {
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row"
  },
  arrow: {
    marginLeft: 10,
    marginTop: 2
  }
});
export default ShippingAddressScreen;

const DetailsCard = () => {
  return (
    <View style={detailsCardStyles.detailsCard}>
      <View style={detailsCardStyles.pricing}>
        <Text style={detailsCardStyles.pricingText}>Order</Text>
        <Text style={detailsCardStyles.pricingText}>10.25$</Text>
      </View>
      <View style={detailsCardStyles.pricing}>
        <Text style={detailsCardStyles.pricingText}>Delivery</Text>
        <Text style={detailsCardStyles.pricingText}>1.25$</Text>
      </View>
      <View style={detailsCardStyles.pricing}>
        <Text style={detailsCardStyles.summaryText}>Summary</Text>
        <Text style={detailsCardStyles.summaryText}>11.50$</Text>
      </View>
    </View>
  );
};

const detailsCardStyles = StyleSheet.create({
  detailsCard: {
    marginVertical: 10,
    marginHorizontal: 20,
    height: 100,
    borderRadius: 10,
    shadowColor: "rgba(0, 0, 0, 0.5)",
    elevation: 10,
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingVertical: 10
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
    color: "#3E3E3E"
  },
  summaryText: {
    marginVertical: 1,
    fontSize: 14,
    fontWeight: "bold",
    color: "#3E3E3E",
    lineHeight: 20
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
    marginBottom: 40,
    marginTop: 20
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
