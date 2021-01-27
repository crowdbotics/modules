import React from "react";
import modules from "@modules";
import "react-native-gesture-handler";
import { View, Text, StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

const Empty = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Welcome to your brand new app!</Text>
    </View>
  )
};

const Navigation = () => {
  let screens = modules;
  if (!modules.length) {
    screens = [
      {
        name: "New App",
        screen: Empty
      }
    ];
  }
  const initial = screens.length ? screens[0].name : "";
  const routes = screens.map(screen => {
    return (
      <Stack.Screen key={screen} name={screen.name} component={screen.screen} />
    )
  })
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={initial}>
        {routes}
      </Stack.Navigator>
    </NavigationContainer>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 100,
    padding: 13
  },
  text: {
    fontSize: 20
  },
})

export default Navigation;
