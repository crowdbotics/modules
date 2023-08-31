import React, { Fragment, useState, useEffect } from "react";
import { StyleSheet, Text } from "react-native";

import QRCodeScanner from "react-native-qrcode-scanner";

import { RNCamera } from "react-native-camera";
import QrModal from "../Modal";

const QrScanner = (props) => {
  const [data, setData] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    if (data !== "") {
      setModalVisible(true);
    }
  }, [data]);

  const onSuccess = e => {
    setData(e.data);
  };

  return (
    <Fragment>
      <QRCodeScanner
        onRead={onSuccess}
        flashMode={RNCamera.Constants.FlashMode.torch}
        topContent={
          <Text style={styles.centerText}>
          </Text>
        }
      />
      <QrModal modalVisible={modalVisible} setModalVisible={setModalVisible} data={data}/>

    </Fragment>
  );
};

export default QrScanner;

const styles = StyleSheet.create({
  centerText: {
    flex: 1,
    fontSize: 18,
    padding: 32,
    color: "#777"
  },
  textBold: {
    fontWeight: "500",
    color: "#000"
  },
  buttonText: {
    fontSize: 21,
    color: "rgb(0,122,255)"
  },
  buttonTouchable: {
    padding: 16
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  btn: {
    paddingHorizontal: "10%",
    width: "100%"
  }
});
