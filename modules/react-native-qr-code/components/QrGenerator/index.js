import React, { useState } from "react";
import { View, StyleSheet, Text, Image } from "react-native";
import Input from "../TextInput";
import Button from "../Button";
import { getQr } from "../../store";
import Loader from "../Loader";
import { unwrapResult } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";

const QrGenerator = () => {
  const [key, setKey] = useState("");
  const [qr, setQr] = useState(null);
  const [isLoader, setIsLoader] = useState(false);
  const dispatch = useDispatch();

  const pressHandler = async () => {
    setIsLoader(true);
    await dispatch(getQr({ text: key }))
      .then(unwrapResult)
      .then(res => {
        setIsLoader(false);
        setQr(res.qrcode);
      })
      .catch(error => {
        setIsLoader(false);
        console.log(error);
      });
  };

  return (
    <View style={styles.container}>
      { isLoader && <Loader /> }
      <View style={styles.input}>
        <Text style={styles.text}>Enter Qr Key:</Text>
        <Input placeholder='Enter' value={key} setValue={setKey} />
      </View>
      <View style={styles.qrContainer}>
        {qr && <Image source={{ uri: `data:image/png;base64,${qr}` }} style={styles.qr} />}
      </View>
      <View style={styles.btn}>
        <Button onPress={pressHandler}>Generate</Button>
      </View>
    </View>
  );
};
export default QrGenerator;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between"
  },
  text: {
    paddingVertical: 10
  },
  input: {
    padding: 20
  },
  btn: {
    paddingHorizontal: "15%",
    paddingBottom: 20
  },
  qrContainer: {
    alignSelf: "center"
  },
  qr: {
    height: 200,
    width: 200
  }

});
