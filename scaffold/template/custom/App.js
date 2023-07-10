import React, { useContext } from "react"
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
import { modules, reducers, hooks } from "@modules"
import { connectors } from "@store"
import {
  GlobalOptionsContext,
  OptionsContext,
  getOptions,
  getGlobalOptions
} from "@options"

const Stack = createStackNavigator()

const getNavigation = modules => {
  const globalOptions = getGlobalOptions()

  const initialRoute =
    globalOptions.initialRoute || (modules[0] && modules[0].value.title)

  const Navigation = () => {
    const routes = modules.map(mod => {
      const pakage = mod.package
      const name = mod.value.title
      const Navigator = mod.value.navigator
      const Component = props => {
        return (
          <OptionsContext.Provider value={getOptions(pakage)}>
            <Navigator {...props} />
          </OptionsContext.Provider>
        )
      }
      return <Stack.Screen key={name} name={name} component={Component} />
    })

    const { screenOptions } = globalOptions

    return (
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName={initialRoute}
          screenOptions={screenOptions}
        >
          {routes}
        </Stack.Navigator>
      </NavigationContainer>
    )
  }
  return Navigation
}

const getStore = globalState => {
  const appReducer = createReducer(globalState, _ => {
    return globalState
  })

  const reducer = combineReducers({
    app: appReducer,
    ...reducers,
    ...connectors
  })

  return configureStore({
    reducer: reducer,
    middleware: getDefaultMiddleware => getDefaultMiddleware()
  })
}

const App = () => {
  const global = useContext(GlobalOptionsContext)
  const Navigation = getNavigation(modules.concat(screens))
  const store = getStore(global)

  let effects = {}
  hooks.map(hook => {
    effects[hook.name] = hook.value()
  })

  return (
    <Provider store={store}>
      <Navigation />
    </Provider>
  )
}

export default App
