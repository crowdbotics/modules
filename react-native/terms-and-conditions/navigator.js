import { createStackNavigator } from "react-navigation-stack";

import Terms from "./index.js";

export default TermsAndConditionsNavigator = createStackNavigator(
  {
    Terms: { screen: Terms.navigator }
  },
  {
    initialRouteName: "Terms",
    defaultNavigationOptions: ({ navigation }) => ({ header: null }),
  }
);
