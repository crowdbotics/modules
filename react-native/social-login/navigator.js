import { createStackNavigator } from "react-navigation-stack";

import LoginSignup from "./screens";
import PasswordReset from "./screens/reset";

export default LoginSignupBlueprintNavigator = createStackNavigator(
  {
    LoginSignup: {
      screen: LoginSignup.screen
    },
    PasswordReset
  },
  {
    initialRouteName: "LoginSignup",
    defaultNavigationOptions: ({ navigation }) => ({ header: null }),
  }
);
