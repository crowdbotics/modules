import { createStackNavigator } from "react-navigation-stack";
import { SlideMenuIcon } from '../../navigator/slideMenuIcon';

import Splash from "./index.js";

export default SplashBlueprintNavigator = createStackNavigator(
  {
    Splash: { screen: Splash.navigator }
  },
  {
    initialRouteName: "Splash",
    navigationOptions: ({ navigation }) => ({
      title: "Splash Screen",
      headerLeft: <SlideMenuIcon navigationProps={navigation} />,
    }),
  }
);
