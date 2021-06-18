import React from "react";
import { Provider } from "react-redux";
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from '@react-navigation/stack';
import { configureStore, createReducer, combineReducers } from "@reduxjs/toolkit";

import { screens } from "@screens";
import { hooks, slices, navigators, initialRoute } from "@modules";
import { connectors } from "@store";

const Stack = createStackNavigator();

const getNavigation = (modules, screens, initialRoute) => {
  const Navigation = () => {
    const routes = modules.concat(screens).map(([name, navigator]) => {
      return (
        <Stack.Screen key={name} name={name} component={navigator} screenOptions={ { headerShown: false } } />
      )
    });
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName={initialRoute}>
          {routes}
        </Stack.Navigator>
      </NavigationContainer>
    )
  }
  return Navigation;
}

const getStore = slices => {
  const reducers = Object.fromEntries(slices.map(([name, slice]) => [name, slice.reducer]));

  const appState = {
    name: "HelloWorldIdentifier",
    url: "https://HelloWorldIdentifier.botics.co",
    version: "1.0.0"
  }

  const appReducer = createReducer(appState, _ => {
    return appState;
  })

  const reducer = combineReducers({
    app: appReducer,
    ...reducers
  });

  return configureStore({
    reducer: reducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware()
  });
}


const App = () => {
  const Navigation = getNavigation(navigators, screens, initialRoute);
  const store = getStore([...slices, ...connectors]);

  let effects = {};
  hooks.map(([_, hook]) => {
    effects[hook.name] = hook();
  });

  return (
    <Provider store={store}>
      <Navigation />
    </Provider>
  );
};

export default App;
