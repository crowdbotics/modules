import { createStackNavigator } from "react-navigation-stack";

import Privacy from "./index";

export default PrivacyBlueprintNavigator = createStackNavigator(
  {
    Privacy: { screen: Privacy.navigator }
  },
  {
    initialRouteName: "Privacy",
    defaultNavigationOptions: ({ navigation }) => ({ header: null }),
  }
);
