import React from "react";
// @ts-ignore
import { createStackNavigator } from "@react-navigation/stack";

// @ts-ignore
import TypeForm from "../screen/Typeform.js";
import TypeformWebhook from "../screen/TypeformWebhook";
import Responses from "../screen/Responses.js";

const Stack = createStackNavigator();

const Navigator = () => {
  return <Stack.Navigator screenOptions={{ headerStyle: { elevation: 0 }, cardStyle: { backgroundColor: "#fff" } }}>
    <Stack.Screen options={{ headerShown: false }} name="Home" component={TypeformWebhook} />
    <Stack.Screen name="Typeform" component={TypeForm} />
    <Stack.Screen name="Responses" component={Responses} />

  </Stack.Navigator>;
};
export default Navigator;
