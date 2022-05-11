import React, { useState } from "react";
import { View, StyleSheet, Text, Image } from "react-native";
import Input from "../TextInput";
import Button from "../Button";
import { getQr } from "../../api";
const QrGenerator = (props) => {
  const [key, setKey] = useState("");
  const [qr, setQr] = useState(null);

  const pressHandler = () => {
    getQr({ text: key })
      .then(res => res.json())
      .then(res => setQr(res.qrcode))
      .catch(e => console.log(e));
  };

  return (
    <View style={styles.container}>
      <View style={styles.input}>
        <Text style={styles.text}>Enter Qr Key:</Text>
        <Input placeholder='Enter' value={key} setValue={setKey} />
      </View>
      <View style={styles.qrContainer}>
        {qr && <Image source={{ uri: `data:image/png;base64,${qr}` }} style={styles.qr} />}
      </View>
      <View style={styles.btn}>
        <Button onPress={pressHandler}>Enter</Button>
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
