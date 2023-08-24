import React, { useState } from "react";
import {
  Text,
  StyleSheet,
  View,
  ScrollView,
  Image,
  TextInput,
  Pressable,
  ImageBackground
} from "react-native";

const ScheduleWallet = ({ navigation }) => {
  const [cardNumber, setCardNumber] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [name, setName] = useState("");
  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.topHeader}>
          <ImageBackground
            source={require(// @ts-ignore
              "./assets/background.png")}
            resizeMode="cover"
            style={styles.backgroundImage}
          >
            <Image
              // @ts-ignore
              source={require("./assets/back.png")}
              style={styles.back}
            />
            <Text style={styles.heading}>Payment</Text>
            <TabView tabTitles={["Cards", "Add"]} selected={0} />
            <View style={styles.subheadingContainer}>
              <Text style={styles.subheading}>Card details</Text>
              <Text style={styles.subheading}>Update</Text>
            </View>
          </ImageBackground>
        </View>

        <View style={styles.cardInfo}>
          <Image
            // @ts-ignore
            source={require("./assets/Card-large.png")}
            style={styles.card}
          />
          <Image
            // @ts-ignore
            source={require("./assets/3Dots.png")}
            style={styles.threeDots}
          />
          <View style={styles.inputs}>
            <View style={styles.inputContainer}>
              <View style={styles.deleteCardContainer}>
                <Text style={styles.inputText}>Card Number</Text>
                <Image
                  // @ts-ignore
                  source={require("./assets/deleteIcon.png")}
                  style={styles.deleteIcon}
                />
              </View>
              <TextInput
                style={styles.input}
                onChangeText={(text) => setCardNumber(text)}
                value={cardNumber}
                placeholder="1234 5678 9012 3456"
                placeholderTextColor="#9B9B9B"
                autoCapitalize="none"
                autoCorrect={false}
              />
            </View>
            <View style={styles.halfInputs}>
              <View style={styles.inputContainer}>
                <Text style={styles.inputText}>Expiration Date</Text>
                <TextInput
                  style={[styles.input, styles.input1]}
                  onChangeText={(text) => setCardExpiry(text)}
                  value={cardExpiry}
                  placeholder="10/24"
                  placeholderTextColor="#9B9B9B"
                  autoCapitalize="none"
                  autoCorrect={false}
                />
              </View>
              <View style={styles.inputContainer}>
                <Text style={styles.inputText}>CVV</Text>
                <TextInput
                  style={[styles.input, styles.input2]}
                  onChangeText={(text) => setCvv(text)}
                  value={cvv}
                  placeholder="374"
                  placeholderTextColor="#9B9B9B"
                  autoCapitalize="none"
                  autoCorrect={false}
                />
              </View>
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.inputText}>Card Holder Name</Text>
              <TextInput
                style={styles.input}
                onChangeText={(text) => setName(text)}
                value={name}
                placeholder="Username"
                placeholderTextColor="#9B9B9B"
                autoCapitalize="none"
                autoCorrect={false}
              />
            </View>
          </View>
        </View>
        {/* <Button buttonText={"Withdraw money"} /> */}
      </ScrollView>
      <View style={styles.footer}>
        <Footer
          images={[
            // @ts-ignore
            require("./assets/home.png"),
            // @ts-ignore
            require("./assets/calender.png"),
            // @ts-ignore
            require("./assets/search.png"),
            // @ts-ignore
            require("./assets/user.png")
          ]}
          routes={[
            "homeScreen",
            "orderStatusScreen",
            "searchScreen",
            "accountScreen"
          ]}
          navigation={navigation}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  cardInfo: {
    padding: 20,
    paddingBottom: 70
  },
  card: {
    alignSelf: "center",
    height: 164,
    width: 354,
    resizeMode: "contain"
  },
  threeDots: {
    alignSelf: "center",
    marginVertical: 10,
    height: 8,
    width: 19,
    resizeMode: "contain"
  },
  deleteCardContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  deleteIcon: {
    marginRight: 10,
    height: 20,
    width: 20,
    resizeMode: "contain"
  },
  inputs: {
    justifyContent: "center"
  },
  inputContainer: {
    flexDirection: "column",
    flex: 1,
    justifyContent: "center"
  },
  inputText: {
    fontSize: 14,
    marginLeft: 20
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
  halfInputs: {
    justifyContent: "space-between",
    flexDirection: "row"
  },
  input1: {
    height: 50,
    borderRightWidth: 0,
    borderRightColor: "#fff",
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0
  },
  input2: {
    height: 50,
    borderLeftWidth: 0,
    borderLeftColor: "#fff",
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0
  },
  footer: {
    position: "absolute",
    flex: 0.1,
    left: 0,
    right: 0,
    bottom: 0
  },
  topHeader: {
    backgroundColor: "#23AAFA",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column"
  },
  subheadingContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20
  },
  subheading: { fontSize: 16, color: "#FFFFFF", paddingVertical: 20 },
  heading: { fontSize: 16, color: "#FFFFFF", paddingLeft: 20, marginTop: 10 },
  backgroundImage: {
    width: 438.55 - 70,
    height: 383.73 - 170,
    resizeMode: "cover" // or 'stretch',
  },
  back: {
    height: 18,
    width: 18,
    resizeMode: "contain",
    marginTop: 15,
    marginBottom: 10,
    marginLeft: 10
  }
});
export default ScheduleWallet;

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
          <Text style={{ color: index === selected ? "#fff" : "" }}>
            {title}
          </Text>
        </View>
      ))}
    </View>
  );
};

const tabViewStyles = StyleSheet.create({
  paletteContainer: {
    width: "70%",
    height: 48,
    backgroundColor: "#FFF",
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 10,
    padding: 6,
    marginVertical: 10,
    marginHorizontal: 20
  },
  selected: {
    borderRadius: 10,
    flex: 1,
    backgroundColor: "#23AAFA",
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
    backgroundColor: "#fff",
    borderRadius: 10
  }
});

const Footer = (props) => {
  return (
    <View style={[footerStyles.footer]}>
      {props.images.map((image, index) => (
        <Pressable
          style={footerStyles.footerItem}
          key={index}
          onPress={() => props.navigation.navigate(props.routes[index])}
        >
          <Image style={footerStyles.footerImage} source={image} />
        </Pressable>
      ))}
    </View>
  );
};

const footerStyles = StyleSheet.create({
  footer: {
    height: 60,
    backgroundColor: "#FFF",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 40,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 12
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.0,

    elevation: 24
  },
  footerItem: {
    alignItems: "center",
    justifyContent: "center",
    height: "100%"
  },
  footerItemText: {
    fontSize: 13,
    color: "#fff",
    marginTop: 5
  },
  footerImage: {
    width: 20,
    height: 20,
    resizeMode: "contain"
  }
});
