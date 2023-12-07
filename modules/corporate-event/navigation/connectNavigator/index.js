import { createStackNavigator } from "@react-navigation/stack"
import Connect from "../../screens/connect"
import ConnectDetails from "../../screens/connectDetails"

const ConnectNavigator = () => {
  const Stack = createStackNavigator()

  return (
    <Stack.Navigator
      initialRouteName={"connect"}
      screenOptions={{
        headerShown: false
      }}
    >
      <Stack.Screen name={"connect"} component={Connect} />
      <Stack.Screen name={"connectDetails"} component={ConnectDetails} />
    </Stack.Navigator>
  )
}

export default ConnectNavigator
