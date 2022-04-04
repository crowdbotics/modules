import React from 'react';
// @ts-ignore
import { createStackNavigator } from "@react-navigation/stack"
import Home from '../screens/home';
import SendTransaction from '../screens/sendTransaction';
import ReceiveTransaction from '../screens/receiveTransaction';




const Stack = createStackNavigator();

const Navigator = () => {
  return <Stack.Navigator>
    <Stack.Screen options={{ headerShown: false }} name="home" component={Home} />
    <Stack.Screen name="SendTransaction" component={SendTransaction}/>
    <Stack.Screen name="ReceiveTransaction" component={ReceiveTransaction}/>
   
  </Stack.Navigator>;
};
export default Navigator