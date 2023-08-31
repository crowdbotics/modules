import React from "react";
// @ts-ignore
import { createStackNavigator } from "@react-navigation/stack";
import AutoComplete from "../screens/addressAutocomplete";
import Maps from "../screens/map";

const Stack = createStackNavigator();

const Navigator = () => {
  return (
    <Stack.Navigator screenOptions ={{ headerShown: false }}>
      <Stack.Screen name="AutoComplete" component={AutoComplete} />
      <Stack.Screen name="Maps" component={Maps} />
    </Stack.Navigator>
  );
};
export default Navigator;
