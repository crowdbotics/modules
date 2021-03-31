import React from "react";
import { Provider } from "react-redux";
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from '@react-navigation/stack';
import { configureStore, createReducer, combineReducers } from "@reduxjs/toolkit";

import { hooks, slices, navigators, initialRoute } from "@modules";

const Stack = createStackNavigator();

const getNavigation = (navigators, initialRoute) => {
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

const getStore = slices => {
  const reducers = Object.fromEntries(slices.map(([name, slice]) => [name, slice.reducer]));

  const appState = {
    name: "ProjectNameIdentifier",
    url: "https://ProjectNameIdentifier.botics.co",
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
  const Navigation = getNavigation(navigators, initialRoute);
  const store = getStore(slices);

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
