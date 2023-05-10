import React from "react";
// @ts-ignore
import { createStackNavigator } from "@react-navigation/stack";
import EventListing from "../screens/eventListing";
import Login from "../screens/login";
import EventDetails from "../screens/eventDetails";
import AttendeeList from "../screens/attendeeList";

const Stack = createStackNavigator();

const Navigator = () => {
  return (
    <Stack.Navigator initialRoutName="Login">
      <Stack.Screen
        options={{ headerShown: false }}
        name="Login"
        component={Login}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="EventListing"
        component={EventListing}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="EventDetails"
        component={EventDetails}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="AttendeeList"
        component={AttendeeList}
      />
    </Stack.Navigator>
  );
};
export default Navigator;
