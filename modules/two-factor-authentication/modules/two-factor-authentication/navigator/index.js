import React from 'react';
// @ts-ignore
import { createStackNavigator } from "@react-navigation/stack"
import AuthTypes from '../screens/authTypes';
import Verification from '../screens/verification';
import EnterNumber from '../screens/enterNumber';
import Home from '../screens/home';
import Email from '../screens/email';

const Stack = createStackNavigator();

const Navigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen options={{ headerShown: false }} name="AuthTypes" component={AuthTypes} />
      <Stack.Screen name="Verification" component={Verification} />
      <Stack.Screen name="EnterNumber" component={EnterNumber} />
      <Stack.Screen options={{ headerShown: false }} name="Home" component={Home} />
      <Stack.Screen name="Email" component={Email} />
    </Stack.Navigator>
  )
};
export default Navigator