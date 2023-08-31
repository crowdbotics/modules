import React, { useRef, useState, useContext } from "react";
import { Text, View, StyleSheet, Image, TouchableOpacity, Alert } from "react-native";

import SignatureScreen from "react-native-signature-canvas";
import { saveSignature } from "./api";
import Button from "./components/Button";
import Loader from "./components/Loader";
import { OptionsContext } from "@options";
const Signature = () => {
  const options = useContext(OptionsContext);
  const ref = useRef(null);
  const [isLoading, setIsLoading] = useState(false);

  const style = `.m-signature-pad {box-shadow: none; border: none; border-radius:10px } 
              .m-signature-pad--body {border: none;}
              .m-signature-pad--footer {display: none; margin: 0px;}
              body,html {
              width: ${350}px; height: ${150}px;}`;

  const handleOK = (signature) => {
    setIsLoading(true);
    saveSignature({ image: signature }).then((res) => {
      setIsLoading(false);
      handleClear();
      Alert.alert("Info", "Signature uploaded successfully.");
    }).catch((error) => {
      setIsLoading(false);
      console.log("Error: ", error);
    });
  };

  const handleClear = () => {
    ref.current.clearSignature();
  };
  const handleEmpty = () => {
    console.log("Empty! No signature is detected");
  };
  const handleEnd = () => {
    ref.current.readSignature();
  };

  return (
    <View style={styles.container}>
      {isLoading && <Loader />}
      <View style={styles.head}>
        <Text style={styles.signatureText}>My signature</Text>
        <TouchableOpacity onPress={handleClear}>
          <Image source={require("./assets/image.png")} style={styles.image} />
        </TouchableOpacity>
      </View>
      <View style={styles.signatureContainer}>
        <SignatureScreen
          ref={ref}
          onOK={handleOK}
          onEmpty={handleEmpty}
          webStyle={style}
          trimWhitespace={true}
        />
      </View>
      <View>
        <Text>{options.text}</Text>
      </View>
      <View style={styles.btn}>
        <Button onPress={handleEnd}>Upload</Button>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    backgroundColor: "#fff"
  },
  signatureText: {
    fontWeight: "bold"
  },
  head: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  image: {
    height: 20,
    width: 20
  },
  signatureContainer: {
    alignItems: "center",
    justifyContent: "center",
    height: 150,
    marginVertical: 15,
    borderWidth: 1,
    borderColor: "#C4C4C4",
    borderRadius: 4
  },
  btn: {
    padding: "15%"
  }
});

export default {
  title: "Signature",
  navigator: Signature
};
