import React, { useState, useContext } from "react";
import { View, Text, StyleSheet, ScrollView, SafeAreaView, TouchableOpacity, ToastAndroid, Linking } from "react-native";
import { sendQuery } from "../api";
import Button from "../components/Button";
import Loader from "../components/Loader";
import Input from "../components/TextInput";
import { validateEmail } from "../utils";
import { OptionsContext } from "@options";

const ContactForm = () => {
  const options = useContext(OptionsContext);
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [emailValidations, setEmailValidations] = useState("");
  const [messageValidations, setMessageValidations] = useState("");

  const pressHandler = async () => {
    setEmailValidations("");
    setMessageValidations("");

    if (!validateEmail(email)) {
      setEmailValidations("Please provide correct email address");
      return;
    }
    if (message === "") {
      setMessageValidations("Please enter a message");
      return;
    }

    setIsLoading(true);
    await sendQuery({ email, message, name })
      .then((res) => res.json())
      .then((res) => showToastWithGravity(res.message))
      .catch((error) => showToastWithGravity(error.message));

    setName("");
    setEmail("");
    setMessage("");
    setMessageValidations("");
    setEmailValidations("");
    setIsLoading(false);
  };
  const showToastWithGravity = (message) => {
    ToastAndroid.showWithGravityAndOffset(
      message,
      ToastAndroid.SHORT,
      ToastAndroid.BOTTOM,
      25,
      50
    );
  };

  return (
    <SafeAreaView>
      <ScrollView>
        {isLoading && <Loader />}
        <View style={{ padding: 20 }}>
          <View>
            <Text style={styles.text}>Name</Text>
            <View style={styles.textInput}>
              <Input placeholder='Name' setValue={setName} value={name} />
            </View>

          </View>
          <View style={styles.pt14}>
            <Text style={styles.text}>Email address</Text>
            <View style={styles.textInput}>
              <Input placeholder='Email' setValue={setEmail} value={email} />
            </View>
            {emailValidations !== "" && <Text style={styles.validations} >{emailValidations}</Text>}

          </View>
          <View style={styles.pt14}>
            <Text style={styles.text}>Message</Text>
            <View style={[styles.textInput, { height: 150 }]}>
              <Input placeholder='Message' setValue={setMessage} value={message} multiline={true} />
            </View>
            {messageValidations !== "" && <Text style={styles.validations}>{messageValidations}</Text>}
          </View>
          <View style={styles.button}>
            <Button onPress={pressHandler}>Submit</Button>
          </View>
          <View style={styles.or}>
            <Text>OR</Text>
          </View>
          <TouchableOpacity style={styles.link} onPress={() => Linking.openURL(`mailto:${options.email}`)}>
            <Text style={styles.linkText}>Send us an email</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>

  );
};

const styles = StyleSheet.create({
  text: { paddingLeft: 10, paddingBottom: 10 },
  textInput: { borderWidth: 0.5, borderRadius: 10, borderColor: "#C4C4C4", paddingVertical: 3 },
  pt14: { paddingTop: 14 },
  button: { paddingHorizontal: 20, marginTop: 40, height: 50 },
  or: { display: "flex", justifyContent: "center", alignItems: "center", marginVertical: 20 },
  link: { display: "flex", justifyContent: "center", alignItems: "center" },
  linkText: { textDecorationLine: "underline", color: "#0000ee" },
  validations: { color: "red" }

});
export default ContactForm;
