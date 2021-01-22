import React from 'react';
import { SlideMenuIcon } from '../../navigator/slideMenuIcon';
import { createStackNavigator } from "react-navigation-stack";

import Chat from "./index";

export default ChatNavigator = createStackNavigator({
  Chat: {
    screen: Chat.screen,
    navigationOptions: ({ navigation }) => ({
      title: "Chat",
      headerLeft: <SlideMenuIcon navigationProps={navigation} />,
    }),
  }
});
