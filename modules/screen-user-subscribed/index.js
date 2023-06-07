import React from "react";
import { Text, StyleSheet, View, Image, Pressable } from "react-native";

const UserSubscribedScreen = (params) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Info</Text>
      </View>
      <View style={styles.menuContainer}>
        <View style={styles.menuItem}>
          <View style={styles.description}>
            <Text style={styles.mainText}>Payment completed</Text>
            <Text style={styles.subText}>Total amount</Text>
          </View>
          <Text style={styles.pricingText}>$14.99</Text>
        </View>
        <View style={styles.menuItem}>
          <View style={styles.description}>
            <Text style={styles.mainText}>Beginner</Text>
            <Text style={styles.subText}>Subscription tier</Text>
          </View>
          <Image
            source={require("./assets/activeCheckbox.png")}
            style={styles.checkboxIcon}
          />
        </View>
      </View>

      <Button buttonText={"Continue"} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20
  },
  header: {
    flexDirection: "row",
    borderColor: "#e6e6e6",
    borderBottomWidth: 1,
    paddingVertical: 15,
    paddingHorizontal: 5
  },
  headerText: {
    fontSize: 14,
    fontWeight: "bold"
  },
  menuContainer: {
    marginBottom: 40
  },
  menuItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 15,
    borderColor: "#e6e6e6",
    borderBottomWidth: 1,
    alignItems: "center"
  },
  description: {
    flex: 3
  },
  mainText: {
    fontSize: 22,
    color: "#313633",
    marginBottom: 5
  },
  subText: {
    fontSize: 14,
    color: "#7c7c7c"
  },
  pricingText: {
    fontSize: 26,
    color: "#000",
    fontWeight: "bold",
    marginRight: 10
  },
  checkboxIcon: {
    marginRight: 10
  }
});

export default UserSubscribedScreen;
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
    paddingTop: 10,
    paddingHorizontal: 40,
    justifyContent: "center",
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
