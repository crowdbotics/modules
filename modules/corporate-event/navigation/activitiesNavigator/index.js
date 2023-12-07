import { createStackNavigator } from "@react-navigation/stack"
import Activities from "../../screens/activities"
import ActivityDetails from "../../screens/activityDetails"
import AboutCB from "../../screens/aboutCB"

const ActivitiesNavigator = () => {
  const Stack = createStackNavigator()

  return (
    <Stack.Navigator
      initialRouteName={"activities"}
      screenOptions={{
        headerShown: false
      }}
    >
      <Stack.Screen name={"aboutCB"} component={AboutCB} screenOptions={{
        headerShown: false
      }} />
      <Stack.Screen name={"activities"} component={Activities} />
      <Stack.Screen name={"activityDetails"} component={ActivityDetails} />
    </Stack.Navigator>
  )
}

export default ActivitiesNavigator
