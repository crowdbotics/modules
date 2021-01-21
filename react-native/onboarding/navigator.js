import { createStackNavigator } from "react-navigation-stack";

import Onboarding from "./index.js";

export default OnboardingBlueprintNavigator = createStackNavigator(
  {
    Onboarding: { screen: Onboarding }
  },
  {
    initialRouteName: "Onboarding",
    defaultNavigationOptions: ({ navigation }) => ({ header: null }),
  }
);
