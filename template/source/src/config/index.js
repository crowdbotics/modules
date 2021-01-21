import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { Button, View, Text, StyleSheet } from 'react-native';
import { Provider } from 'react-redux'
import store from './store.js';

import modules from "@modules";

import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

function Welcome({ navigation }) {
  const links = modules.map(module => {
    return (
      <View style={styles.button}>
        <Button
          key={module.screen}
          title={module.name}
          onPress={() => navigation.navigate(module.name)} />
      </View>
    )
  });
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Total modules installed: {modules.length}</Text>
      <Text style={styles.text}>Screens available:</Text>
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
          <Stack.Screen name="Welcome" component={Welcome} />
          {modulesRoutes}
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 100,
    padding: 10
  },
  text: {
    fontSize: 20
  },
  button: {
    marginTop: 10
  }
})

export default App;
