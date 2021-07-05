import React from "react"
import { Provider } from "react-redux"
import "react-native-gesture-handler"
import { NavigationContainer } from "@react-navigation/native"
import { createStackNavigator } from "@react-navigation/stack"
import {
  configureStore,
  createReducer,
  combineReducers
} from "@reduxjs/toolkit"

import { screens } from "@screens"
import { hooks, slices, navigators, initialRoute } from "@modules"
import { connectors } from "@store"

const Stack = createStackNavigator()

import { OptionsContext, getOptions } from "@options"

const getNavigation = (modules, screens, initialRoute) => {
  const Navigation = () => {
    const routes = modules.concat(screens).map(([name, Navigator]) => {
      const Component = () => {
        return (
          <OptionsContext.Provider value={getOptions(Navigator)}>
            <Navigator />
          </OptionsContext.Provider>
        )
      }
      return <Stack.Screen key={name} name={name} component={Component} />
    })
    return (
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName={initialRoute}
          screenOptions={{ headerShown: true }}
        >
          {routes}
        </Stack.Navigator>
      </NavigationContainer>
    )
  }
  return Navigation
}

const getStore = slices => {
  const reducers = Object.fromEntries(
    slices.map(([name, slice]) => [name, slice.reducer])
  )

  const appState = {
    name: "HelloWorldIdentifier",
    url: "https://HelloWorldIdentifier.botics.co",
    version: "1.0.0"
  }

  const appReducer = createReducer(appState, _ => {
    return appState
  })

  const reducer = combineReducers({
    app: appReducer,
    ...reducers
  })

  return configureStore({
    reducer: reducer,
    middleware: getDefaultMiddleware => getDefaultMiddleware()
  })
}

const App = () => {
  const Navigation = getNavigation(navigators, screens, initialRoute)
  const store = getStore([...slices, ...connectors])

  let effects = {}
  hooks.map(([_, hook]) => {
    effects[hook.name] = hook()
  })

  return (
    <Provider store={store}>
      <Navigation />
    </Provider>
  )
}

export default App
