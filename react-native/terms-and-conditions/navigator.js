import { createStackNavigator } from "react-navigation-stack";

import Terms from "./index.js";

export default TermsBlueprintNavigator = createStackNavigator(
  {
    Terms: { screen: Terms }
  },
  {
    initialRouteName: "Terms",
    defaultNavigationOptions: ({ navigation }) => ({ header: null }),
  }
);
