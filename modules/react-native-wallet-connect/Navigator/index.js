import React from 'react';
import { View, Text, Pressable } from 'react-native';
// @ts-ignore
import { createStackNavigator } from "@react-navigation/stack"
import Home from '../screens/home';
import SendTransaction from '../screens/sendTransaction';




const Stack = createStackNavigator();

const Navigator = () => {
  return <Stack.Navigator>
    <Stack.Screen options={{ headerShown: false }} name="home" component={Home} />
    <Stack.Screen name="SendTransaction" component={SendTransaction}/>
   
  </Stack.Navigator>;
};
export default Navigator