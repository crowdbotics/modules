import React, { useEffect, useState } from "react";
import { StyleSheet, Switch, Text, View, TouchableOpacity } from "react-native";
import { getWebHook } from "../../api";

const FormItem = (props) => {
  const [webhook, setWebhook] = useState({
    enabled: props.isEnabled
  });

  useEffect(() => {
    getWebHook(props.oauthToken, props.form.id)
      .then(res => res.json())
      .then(res => {
        if (res.items.length) {
          setWebhook(res.items[0]);
        }
      });
  }, [props.isEnabled]);

  return (
    <TouchableOpacity onPress={() => props.navigation.navigate("Typeform", { url: props.form._links })}>
      <View style={styles.cardContainer}>
        <View style={styles.card}>
          <Text>{props.form.title}</Text>
          <View>
            <Switch
              trackColor={{ false: "#767577", true: "#81b0ff" }}
              thumbColor={"#000" }
              ios_backgroundColor="#3e3e3e"
              onValueChange={(event) => props.toggleSwitch(props.form.id, event)}
              value={webhook.enabled}
            />
          </View>
        </View>
        <View>
          <TouchableOpacity onPress={() => { props.navigation.navigate("Responses", { formId: props.form.id, token: props.oauthToken }); }}>
            <Text style={styles.resText}>Responses</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {

    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"

  },
  cardContainer: {
    shadowColor: "gray",
    elevation: 10,
    borderLeftWidth: 3,
    marginVertical: 5,
    backgroundColor: "#fff",
    borderRadius: 5,
    padding: 10
  },
  resText: {
    color: "#808080",
    textDecorationLine: "underline"
  }
});

export default FormItem;
