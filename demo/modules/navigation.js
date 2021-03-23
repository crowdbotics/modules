import React from "react";
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

export const getNavigation = (navigators, initialRoute) => {
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
  return Navigation;
}
