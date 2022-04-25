import React from "react";
import { SlideMenuIcon } from "../../navigator/slideMenuIcon";
import { createStackNavigator } from "react-navigation-stack";

import Maps from "./index";

const MapsNavigator = createStackNavigator({
  Maps: {
    screen: Maps.screen,
    navigationOptions: ({ navigation }) => ({
      title: "Maps",
      headerLeft: <SlideMenuIcon navigationProps={navigation} />
    })
  }
});

export default MapsNavigator;
