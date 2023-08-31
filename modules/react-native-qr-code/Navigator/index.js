import React from "react";

import { createStackNavigator } from "@react-navigation/stack";
import Home from "../screens/Home";

const Stack = createStackNavigator();

const Navigator = () => {
  return <Stack.Navigator screenOptions={{ headerStyle: { elevation: 0 }, cardStyle: { backgroundColor: "#fff" } }}>
    <Stack.Screen options={{ headerShown: false }} name="Home" component={Home} />

  </Stack.Navigator>;
};
export default Navigator;
