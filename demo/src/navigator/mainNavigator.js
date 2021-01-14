import React from 'react';
import { View, Text } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createDrawerNavigator } from 'react-navigation-drawer';

import splash from "modules/splash";

import SideMenu from './sideMenu';
//@BlueprintImportInsertion

/**
 * new navigators can be imported here
 */

const AppNavigator = {

  //@BlueprintNavigationInsertion

  /** new navigators can be added here */
  Splash: {
    screen: splash
  }
};

const DrawerAppNavigator = createDrawerNavigator(
  {
    ...AppNavigator,
  },
  {
    contentComponent: SideMenu
  },
);

const AppContainer = createAppContainer(DrawerAppNavigator);

export default AppContainer;
