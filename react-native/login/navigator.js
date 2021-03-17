import { createStackNavigator } from "react-navigation-stack";

import LoginSignup from "./index.js";
import PasswordRecover from "./screens/PasswordRecover";

export default LoginSignupBlueprintNavigator = createStackNavigator(
  {
    LoginSignup,
    PasswordRecover
  },
  {
    initialRouteName: "LoginSignup",
    defaultNavigationOptions: ({ navigation }) => ({ header: null }),
  }
);
