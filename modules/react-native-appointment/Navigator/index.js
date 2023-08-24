import React from "react";

import { createStackNavigator } from "@react-navigation/stack";
import CreateAppointment from "../screens/createAppointment";
import Appointments from "../screens/appointments";
import Home from "../screens/home";
const Stack = createStackNavigator();

const Navigator = () => {
  return <Stack.Navigator screenOptions={{
    headerStyle: {
      elevation: 0
    },
    cardStyle: {
      backgroundColor: "#fff"
    }
  }}>
    <Stack.Screen options={{
      headerShown: false
    }} name="Home" component={Home} />
    <Stack.Screen name="AppointmentForm" component={CreateAppointment} />
    <Stack.Screen name="Appointments" component={Appointments} />
  </Stack.Navigator>;
};

export default Navigator;
