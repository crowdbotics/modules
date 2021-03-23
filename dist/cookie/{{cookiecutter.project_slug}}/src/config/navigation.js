import React from "react";
import "react-native-gesture-handler";
import { navigators, initialRoute } from "@modules";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

const Navigation = () => {
  const screens = navigators.map(([name, navigator]) => {
    return (
      <Stack.Screen key={name} name={name} component={navigator} />
    )
  });
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={initialRoute}>
        {screens}
      </Stack.Navigator>
    </NavigationContainer>
  )
}
export default Navigation;
