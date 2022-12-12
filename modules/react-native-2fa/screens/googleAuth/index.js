import React, { useEffect, useState } from "react";
import { Linking, StyleSheet, View } from "react-native";
import { useRoute } from '@react-navigation/native';
import QRCode from "react-native-qrcode-svg";
import Button from "../../components/Button";


const GoogleAuth = () => {
  const [link, setLink] = useState(null);
  const route = useRoute();

  const openLink = () => {
    const supported = Linking.canOpenURL(link);
    if (supported) {
      Linking.openURL(link);
    }
  };

  useEffect(() => {
    setLink(route.params["link"])
  }, []);

  return (
    <View style={styles.main}>
      <View style={styles.pt30}>
        {link && <QRCode value={link} size={150} />}
      </View>
      <View>
        <View style={styles.sameDevice}>
          <Button onPress={openLink}>
            Set up on same device
          </Button>
        </View>
      </View>
    </View>
  );
};
export default GoogleAuth;

const styles = StyleSheet.create({
  main: {
    padding: 10,
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column"
  },
  sameDevice: {
    paddingTop: 30,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  },
  pt30: {
    paddingTop: 30,
    alignSelf: "center"
  }
});
