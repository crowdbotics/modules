import { createStackNavigator } from "@react-navigation/stack"
import SessionDetails from "../../screens/sessionDetails"
import Sessions from "../../screens/sessions"

const SessionNavigator = () => {
  const Stack = createStackNavigator()

  return (
    <Stack.Navigator
      initialRouteName={"session"}
      screenOptions={{
        headerShown: false
      }}
    >
      <Stack.Screen name={"session"} component={Sessions} />
      <Stack.Screen name={"sessionDetails"} component={SessionDetails} />
    </Stack.Navigator>
  )
}

export default SessionNavigator
