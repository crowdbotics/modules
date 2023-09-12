import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "./screens/Home";
import BlockedUsers from "./screens/BlockedUsers";
const Stack = createStackNavigator();

const Navigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="BlockedUser" component={BlockedUsers} />
    </Stack.Navigator>
  );
};

export default Navigator;
