import React, { useState, useEffect } from "react";
import { Text, StyleSheet, View, Image } from "react-native";

const ContactUsScreen = (params) => {
  const [aboutText, setAboutText] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  useEffect(() => {
    setAboutText(
      "I understand that uses my dolor sit amet, consectetur adipiscing elit. Viverra auctor laoreet sodales congue sit volutpat quisque. Mattis nisl in convallis sed et. Est turpis aliquam est, ut mattis nisi, amet feugiat. Aliquet odio consequat, nisl mauris ullamcorper malesuada velit sem dolor. Dui morbi porttitor integer felis, pellentesque quam. Et accumsan justo, massa tincidunt arcu fermentum est. Sed nibh id vel, diam ut feugiat nec, placerat mauris. Neque lorem netus lacinia elit est libero sed. Commodo viverra et, neque augue augue mauris, nunc ut nec."
    );
    setEmail("contact@gmail.com");
    setPhone("+1-555-555-5555");
  }, []);
  return (
    <View style={styles.container}>
      <View style={styles.aboutText}>
        <Text style={styles.text}>{aboutText}</Text>
      </View>
      <View style={styles.infoContainer}>
        <Image source={require("./assets/email.png")} />
        <Text style={styles.infoText}>{email}</Text>
      </View>
      <View style={styles.infoContainer}>
        <Image source={require("./assets/phone.png")} />
        <Text style={styles.infoText}>{phone}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  aboutText: {
    padding: 20
  },
  text: {
    fontSize: 14,
    lineHeight: 20,
    textAlign: "justify"
  },
  headingTxt: {
    fontSize: 24,
    fontWeight: "bold",
    padding: 2,
    marginVertical: 12
  },
  infoContainer: {
    flexDirection: "row",
    padding: 20,
    alignItems: "center"
  },
  infoText: {
    fontSize: 14,
    marginLeft: 15
  }
});
export default ContactUsScreen;
