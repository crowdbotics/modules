import React from 'react';
// @ts-ignore
import { createStackNavigator } from "@react-navigation/stack"
import Home from '../screens/home';



const Stack = createStackNavigator();

const Navigator = () => {
  return <Stack.Navigator screenOptions={{ headerStyle: { elevation: 0 }, cardStyle: { backgroundColor: '#fff' }}}>
    <Stack.Screen options={{ headerShown: false }} name="home" component={Home} />
   
  </Stack.Navigator>;
};
export default Navigator