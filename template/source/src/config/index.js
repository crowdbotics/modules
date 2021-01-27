import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { Provider } from 'react-redux'
import store from './store.js';

import modules from "@modules";
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

const App = () => {
  const initialRoute = modules.length ? modules[0].name : "";
  const modulesRoutes = modules.map(module => {
    return (
      <Stack.Screen key={module} name={module.name} component={module.screen} />
    )
  })
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName={initialRoute}>
          {modulesRoutes}
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
