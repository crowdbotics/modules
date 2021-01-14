import React from "react";
import { createAppContainer } from 'react-navigation';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { SlideMenuIcon } from './slideMenuIcon';

import chat from "modules/chat";
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
    screen: splash,
    navigationOptions: ({ navigation }) => ({
      title: "Installed modules",
      headerLeft: <SlideMenuIcon navigationProps={navigation} />,
    })
  },
  Chat: {
    screen: chat,
    navigationOptions: ({ navigation }) => ({
      title: "Chat screen",
      headerLeft: <SlideMenuIcon navigationProps={navigation} />,
    })
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
