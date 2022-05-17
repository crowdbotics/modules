import React, { useEffect, useState } from "react";
import { Text, StyleSheet, View, Switch } from "react-native";
import { getWebHook } from "../../api";

const FormItem = ({ form, toggleSwitch, oauthToken }) => {
  const [webhookList, setWebhookList] = useState(null);
  useEffect(() => {
    if (oauthToken) {
      getWebHook(oauthToken, form.id)
        .then(res => res.json())
        .then(res => {
          console.log("here..", res);
          setWebhookList(res);
        });
    }
  }, []);

  useEffect(() => {
    console.log("webhookList", webhookList);
  }, [webhookList]);
  return (
    <View style={styles.card}>
      <Text>{form.title}</Text>
      <View>
        <Switch
          trackColor={{ false: "#767577", true: "#81b0ff" }}
          thumbColor={"#000"}
          ios_backgroundColor="#3e3e3e"
          onValueChange={() => toggleSwitch()}
          value={form.id}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    marginVertical: 5,
    backgroundColor: "#fff",
    borderRadius: 5,
    padding: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderLeftWidth: 3,
    shadowColor: "gray",
    elevation: 10
  }
});

export default FormItem;
