import React, { useState, useContext } from "react";
import { Text, StyleSheet, View } from "react-native";
import { set2faMethod } from "../../api";
import Button from "../../components/Button";
import Loader from "../../components/Loader";
import { OptionsContext } from "@options";
const AuthTypes = (props) => {
  const options = useContext(OptionsContext);
  const [isLoading, setIsLoading] = useState(false);

  const onSMS = async () => {
    setIsLoading(true);
    await set2faMethod({
      id: options.user.id,
      method: "SMS"
    }).then((res) => {
      setIsLoading(false);
      props.navigation.navigate("Verification");
    }).catch((err) => {
      setIsLoading(false);
      console.log("Error: ", err);
    });
  };

  const onEmail = async () => {
    setIsLoading(true);
    await set2faMethod({
      id: options.user.id,
      method: "EMAIL"
    }).then((res) => {
      setIsLoading(false);
      props.navigation.navigate("Verification");
    }).catch((err) => {
      setIsLoading(false);
      console.log("Error: ", err);
    });
  };

  const on2FA = async () => {
    setIsLoading(true);
    await set2faMethod({
      id: options.user.id,
      method: "2FA"
    }).then((res) => {
      setIsLoading(false);
      props.navigation.navigate("GoogleAuth");
    }).catch((err) => {
      setIsLoading(false);
      console.log("Error: ", err);
    });
  };

  return (
    <>
      {isLoading && <Loader/>}
      <View style={styles.main}>
        <Text style={styles.text}>Verification methods</Text>
        <Text style={styles.text13}>Please select an option for verification from the following:</Text>
        <View style={options.styles.FlexRowSpaceBetween}>
          <View style={[options.styles.wp50, options.styles.p5]}>
            <Button onPress={onSMS} clicked={options.user.method === "SMS"}>
              SMS
            </Button>
          </View>
          <View style={[options.styles.wp50, options.styles.p5]}>
            <Button onPress={onEmail} clicked={options.user.method === "EMAIL"}>
              Email
            </Button>
          </View>
        </View>
        <View style={[options.styles.wp100, options.styles.p5]}>
          <Button onPress={on2FA} clicked={options.user.method === "2FA"}>
            2FA
          </Button>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  main: {
    padding: 10
  },
  text: {
    marginBottom: 5,
    marginTop: 12,
    fontWeight: "bold",
    fontSize: 18
  },
  text13: {
    fontSize: 13,
    marginBottom: 12
  }

});

export default AuthTypes;
