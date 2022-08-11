import React, { useContext } from "react";
import { Text, View, Image, TouchableOpacity, StyleSheet } from "react-native";
// @ts-ignore
import emailIcon from "../emailIcon.png";
import { OptionsContext } from "@options";

const ContactUs = (props) => {
  const options = useContext(OptionsContext);
  return (
    <View style={styles.pt30}>
      <Text style={{ fontSize: 15 }}>{options.textMessage}</Text>
      <View style={styles.email}>
        <View style={styles.mr15}>
            <Image
            source={emailIcon}
            style={styles.image}
            />
        </View>
        <View>
            <TouchableOpacity onPress={() => props.navigation.navigate("ContactForm") }>
                <Text style={styles.text}>{options.email}</Text>
            </TouchableOpacity>
        </View>

      </View>

    </View>
  );
};
const styles = StyleSheet.create({
  email: { display: "flex", flexDirection: "row", alignItems: "center", marginVertical: 30 },
  pt30: { padding: 30 },
  image: { height: 20, width: 25 },
  mr15: { marginRight: 15 },
  text: { color: "#284752", fontSize: 15 }

});
export default ContactUs;
