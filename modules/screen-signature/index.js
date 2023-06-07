import React, { useState, useEffect } from "react";
import { Text, StyleSheet, View, Image, Pressable } from "react-native";

const SignatureScreen = (params) => {
  const [undertaking, setUndertaking] = useState("");
  useEffect(() => {
    setUndertaking(
      "I understand that uses my  dolor sit amet, consectetur adipiscing elit. Viverra auctor laoreet sodales congue sit volutpat quisque. Mattis nisl in convallis sed et. Est turpis aliquam est, ut mattis nisi, amet feugiat. Aliquet odio consequat, nisl mauris ullamcorper malesuada velit sem dolor. Dui morbi porttitor integer felis, pellentesque quam. Et accumsan justo, massa tincidunt arcu fermentum est. Sed nibh id vel, diam ut feugiat nec, placerat mauris. Neque lorem netus lacinia elit est libero sed. Commodo viverra et, neque augue augue mauris, nunc ut nec."
    );
  }, []);
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>My Signature</Text>
        <Image
          source={require("./assets/closeIcon.png")}
          style={styles.closeIcon}
        />
      </View>
      <View style={styles.signatureContainer}>
        <Image source={require("./assets/signature.png")} />
      </View>
      <Text style={styles.undertakingText}>{undertaking}</Text>
      <Button buttonText={"Upload"}></Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 10,
    alignItems: "center"
  },
  headerText: {
    fontSize: 18,
    fontWeight: "bold",
    padding: 2,
    marginVertical: 12
  },
  signatureContainer: {
    borderWidth: 1,
    borderColor: "#e6e6e6",
    marginHorizontal: 20,
    paddingVertical: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10
  },
  undertakingText: {
    marginHorizontal: 20,
    marginVertical: 20,
    fontSize: 14,
    textAlign: "justify",
    lineHeight: 20
  }
});
export default SignatureScreen;

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
