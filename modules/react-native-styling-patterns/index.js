import React, { useContext } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { OptionsContext } from "@options";

import { Flex } from "./pages/flex";
import { OnLayout } from "./pages/on-layout";
import { UseWindowDimensions } from "./pages/use-window-dimensions";
import { MatchMedia } from "./pages/match-media";

const Stack = createStackNavigator();

const routesComponentMap = {
  flex: Flex,
  onLayout: OnLayout,
  useWindowDimensions: UseWindowDimensions,
  matchMedia: MatchMedia
};

function navigator() {
  const { routes } = useContext(OptionsContext);
  const firstRoute = routes[0];

  return (
    <Stack.Navigator
      initialRouteName={firstRoute.name}
      screenOptions={{ headerShown: false }}
    >
      {routes.map(route => (
        <Stack.Screen
          key={route.name}
          name={route.name}
          component={routesComponentMap[route.name]}
          options={{ title: route.page }}
        />
      ))}
    </Stack.Navigator>
  );
}

export default {
  title: "Styling Patterns",
  navigator
};
