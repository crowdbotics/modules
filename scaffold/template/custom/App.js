import "react-native-gesture-handler"
import React from "react"
import { NavigationContainer } from "@react-navigation/native"
import { OptionsContext, getOptions } from "@options"
import { Provider } from "react-redux"
import { configureStore, combineReducers } from "@reduxjs/toolkit"
import { connectors } from "@store"
import { createStackNavigator } from "@react-navigation/stack"
import { hooks, slices, navigators, initialRoute } from "@modules"
import { screens } from "@screens"

const Stack = createStackNavigator()

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

  const reducer = combineReducers({
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
