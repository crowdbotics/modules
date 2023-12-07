import { createStackNavigator } from "@react-navigation/stack"
import SessionDetails from "../../screens/sessionDetails"
import Sessions from "../../screens/sessions"
import Home from "../../screens/home"
import ActivityDetails from "../../screens/activityDetails"

const HomeNavigator = () => {
  const Stack = createStackNavigator()

  return (
    <Stack.Navigator
      initialRouteName={"home"}
      screenOptions={{
        headerShown: false
      }}
    >
      <Stack.Screen name={"home"} component={Home} />
      <Stack.Screen name={"session"} component={Sessions} />
      <Stack.Screen name={"activityDetails"} component={ActivityDetails} />
      <Stack.Screen name={"sessionDetails"} component={SessionDetails} />
    </Stack.Navigator>
  )
}

export default HomeNavigator
