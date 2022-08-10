import React from "react";
import { Text, StyleSheet, View, Image, Pressable } from "react-native";

const UploadMediaScreen = (params) => {
  return (
    <View style={styles.container}>
      <View style={styles.menu}>
        <View style={styles.menuItem}>
          <Text style={styles.menuItemText}>Take photo or video</Text>
          <Image source={require("./assets/cameraIcon.png")} />
        </View>
        <View style={styles.menuItem}>
          <Text style={styles.menuItemText}>Photo Library</Text>
          <Image source={require("./assets/libraryIcon.png")} />
        </View>
        <View style={styles.menuItem}>
          <Text style={styles.menuItemText}>Browse</Text>
          <Image source={require("./assets/menuIcon.png")} />
        </View>
      </View>
      <Button buttonText="Cancel" outline={true} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
    justifyContent: "flex-end"
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 15,
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderColor: "#ccc"
  },
  menuItemText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
    textAlign: "left"
  }
});
export default UploadMediaScreen;

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
    paddingHorizontal: 20,
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
