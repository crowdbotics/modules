import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
const Stack = createStackNavigator();

import Articles from "./index";
import Article from "./article";

export const ArticlesNavigator = () => {
  return (
    <Stack.Navigator headerMode="none" initialRouteName="Articles">
      <Stack.Screen name="Articles" component={Articles} />
      <Stack.Screen name="Article" component={Article} />
    </Stack.Navigator>
  )
}
