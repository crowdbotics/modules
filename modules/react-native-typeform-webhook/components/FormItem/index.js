import React, { useEffect, useState, useContext } from "react";
import { Switch, Text, View, TouchableOpacity } from "react-native";
import { getWebHook } from "../../store/index";
import { useDispatch } from "react-redux";
import { unwrapResult } from "@reduxjs/toolkit";
import { OptionsContext } from "@options";
/**
 * Form component representing a single form item in the list.
 * @param  {Object} props - Props for the FormItem component.
 * @param  {Boolean} props.isEnabled - State for if the switch is enabled or not.
 * @param  {String} props.oauthToken - Typeform OAuth token.
 * @param  {Function} props.navigation - Navigation method to navigate through screens.
 * @param  {Function} props.toggleSwitch - Function to change the state of the switch.
 * @param  {Object} props.form - Object containing details about a particular form.
 * @returns {React.ReactNode}
 */
const FormItem = (props) => {
  const options = useContext(OptionsContext);
  const { styles } = options;

  const { isEnabled, oauthToken, navigation, toggleSwitch, form } = props;
  const dispatch = useDispatch();

  // State for Switch component
  const [webhook, setWebhook] = useState({
    enabled: isEnabled
  });

  useEffect(() => {
    // This action dispatches an api to fetch webHooks with oauthToken and formId in params
    dispatch(getWebHook({ token: oauthToken, id: form.id }))
      .then(unwrapResult)
      .then((res) => {
        if (res?.items.length) {
          setWebhook(res?.items[0]);
        }
      });
  }, [isEnabled]);

  const navigateWithLink = () => {
    navigation.navigate("Typeform", { url: form?._links });
  };

  const navigateWithIdToken = () => {
    navigation.navigate("Responses", { formId: form?.id, token: oauthToken });
  };

  return (
    <View style={styles.cardContainer}>
      <View style={styles.card}>
        <Text style={styles.colouredText}>{form?.title}</Text>
        <Switch
          trackColor={{ false: "#767577", true: "#81b0ff" }}
          thumbColor={"#000"}
          ios_backgroundColor="#3e3e3e"
          onValueChange={(event) => toggleSwitch(form?.id, event)}
          value={webhook.enabled}
        />
      </View>
      <TouchableOpacity
        onPress={navigateWithLink}
        style={styles.responseButton}
      >
        <Text style={styles.resText}>Survey</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={navigateWithIdToken}
        style={styles.responseButton}
      >
        <Text style={styles.resText}>Responses</Text>
      </TouchableOpacity>
    </View>
  );
};

export default FormItem;
