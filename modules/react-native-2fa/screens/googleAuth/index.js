import React, { useEffect, useState, useContext } from "react";
import { Linking, View } from "react-native";
import { useRoute } from "@react-navigation/native";
import QRCode from "react-native-qrcode-svg";
import Button from "../../components/Button";
import { OptionsContext } from "@options";

/**
 * Google Authentication Component.
 * @returns {React.ReactNode} - The Google authentication component.
 */
const GoogleAuth = () => {
  const options = useContext(OptionsContext);
  const { styles } = options;

  const [link, setLink] = useState(null);
  const route = useRoute();

  /**
   * Open the provided link using Linking API if supported.
   */
  const openLink = () => {
    if (link) {
      const supported = Linking.canOpenURL(link);
      if (supported) {
        Linking.openURL(link);
      }
    }
  };

  useEffect(() => {
    setLink(route.params.link);
  }, [route.params.link]);

  return (
    <View style={styles.qrCodeMain}>
      <View style={styles.qrCodeContainer}>
        {link && <QRCode value={link} size={150} />}
      </View>
      <View style={styles.sameDeviceContainer}>
        <Button onPress={openLink}>Set up on same device</Button>
      </View>
    </View>
  );
};

export default GoogleAuth;
