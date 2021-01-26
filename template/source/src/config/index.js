import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Provider } from 'react-redux'
import store from './store.js';

import modules from "@modules";

import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

function Welcome({ navigation }) {
  const links = modules.map(module => {
    return (
      <Pressable
        onPress={() => navigation.navigate(module.name)}
        style={pressed}
        key={module.screen}
      >
        <Text style={styles.buttonText}>{module.name}</Text>
      </Pressable >
    )
  });
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Screens available ({modules.length})</Text>
      {links}
    </View>
  )
}

const App = () => {
  const modulesRoutes = modules.map(module => {
    return (
      <Stack.Screen key={module} name={module.name} component={module.screen} />
    )
  })
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Welcome">
          <Stack.Screen name="Welcome" component={Welcome} options={{ title: "Welcome to your app" }} />
          {modulesRoutes}
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

const pressed = ({ pressed }) => [
  { backgroundColor: pressed ? 'rgba(72, 61, 139, 0.75)' : 'rgba(72, 61, 139, 1)' },
  styles.button
];

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 100,
    padding: 13
  },
  text: {
    fontSize: 20
  },
  button: {
    borderRadius: 4,
    padding: 15,
    marginTop: 10
  },
  buttonText: {
    color: "white",
    textAlign: "center",
    fontSize: 16
  }
})

export default App;
