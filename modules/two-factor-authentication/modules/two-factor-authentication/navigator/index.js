import React from "react";
// @ts-ignore
import { createStackNavigator } from "@react-navigation/stack";
import AuthTypes from "../screens/authTypes";
import Verification from "../screens/verification";
import Home from "../screens/home";
import GoogleAuth from "../screens/googleAuth";

const Stack = createStackNavigator();

const Navigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen options={{ headerShown: false }} name="Verification" component={Verification} />
      <Stack.Screen name="AuthTypes" component={AuthTypes} />
      <Stack.Screen name="GoogleAuth" component={GoogleAuth} />
      <Stack.Screen options={{ headerShown: false }} name="Home" component={Home} />
    </Stack.Navigator>
  );
};
export default Navigator;
