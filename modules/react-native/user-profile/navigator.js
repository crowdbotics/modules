import React from "react";
import { createStackNavigator } from 'react-navigation-stack';
import { SlideMenuIcon } from '../../navigator/slideMenuIcon';
import UserProfile from './index';

export default (UserNavigator = createStackNavigator(
  {
    UserProfile: {
      screen: UserProfile,
      navigationOptions: ({ navigation }) => ({
        title: 'User Profile',
        headerLeft: <SlideMenuIcon navigationProps={navigation} />,
      }),
    },
  },
  {
    initialRouteName: 'UserProfile',
  },
));
