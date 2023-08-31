import React from "react";
import {
  Text,
  View,
  StyleSheet, Image, ScrollView, Pressable
} from "react-native";

const SubscriptionDetails = () => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Image source={require("./assets/back.png")} style={styles.back} />
        <Text style={styles.heading}>Subscription</Text>
        <Text />
      </View>
      <View style={styles.reviewContainer}>
        <Text style={styles.review}>Current Subscription</Text>
        <Text style={styles.edit}>Free</Text>
      </View>

      <View style={styles.listContainer}>
        <Text style={styles.title}>Premium Subscription</Text>
        <View style={styles.descContainer}>
          <Text style={styles.desc}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec egestas ultrices risus at neque, at. Cras cursus parturient nec, quam convallis viverra arcu. Lorem pellentesque cras vulputate velit ante tellus.
          </Text>
          <Text style={styles.desc}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec egestas ultrices risus at neque, at. Cras cursus parturient nec, quam convallis viverra arcu. Lorem pellentesque cras vulputate velit ante tellus.
          </Text>
        </View>
        <View style={styles.priceContainer}>
          <Text style={styles.price}>Price:</Text>
          <Text style={styles.price}> $14.99</Text>
        </View>

        <Button buttonText={"Upgrade to Premium"} />
      </View>

    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 30,
    marginTop: 15,
    marginBottom: 30
  },
  back: { width: 11.25, height: 20, resizeMode: "contain", marginLeft: -15 },
  heading: { fontSize: 16, color: "#000" },
  reviewContainer: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", backgroundColor: "#fff", paddingHorizontal: 20, paddingVertical: 20, marginVertical: 15 },
  review: { fontSize: 16, color: "#231F20" },
  edit: { color: "#12D790", fontSize: 16 },
  listContainer: { flex: 1, backgroundColor: "#FFF", marginTop: 30, paddingHorizontal: 10, paddingBottom: 25 },
  title: { fontSize: 24, marginLeft: 20, marginTop: 15, marginBottom: 20, fontWeight: "bold" },
  descContainer: { paddingHorizontal: 20 },
  desc: { color: "#757575", marginBottom: 5 },
  priceContainer: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingHorizontal: 20, marginVertical: 20 },
  price: { fontSize: 24, fontWeight: "bold" }
});

const Button = (params) => {
  const btnStyle = {
    backgroundColor: params.outline ? "#fff" : "#12D790",
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
    marginBottom: 10,
    marginTop: 60
  },
  btn: {
    backgroundColor: "#12D790",
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
export default SubscriptionDetails;
