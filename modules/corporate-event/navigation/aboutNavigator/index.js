import { createStackNavigator } from "@react-navigation/stack"
import Activities from "../../screens/activities"
import ActivityDetails from "../../screens/activityDetails"
import Board from "../../screens/board"
import BoardDetails from "../../screens/boardDetails"
import Team from "../../screens/team"
import TeamDetails from "../../screens/teamDetails"
import About from "../../screens/about"
import Offerings from "../../screens/offerings"
import Concierge from "../../screens/concierge"
import OfferingDetails from "../../screens/offeringDetails"
import MaturityModel from "../../screens/maturityModel"

const AboutNavigator = () => {
  const Stack = createStackNavigator()

  return (
    <Stack.Navigator
      initialRouteName={"about"}
      screenOptions={{
        headerShown: false
      }}
    >
      <Stack.Screen name={"About"} component={About} />
      
      <Stack.Screen name={"concierge"} component={Concierge} />

      <Stack.Screen name={"board"} component={Board} />
      <Stack.Screen name={"boardDetails"} component={BoardDetails} />

      <Stack.Screen name={"team"} component={Team} />
      <Stack.Screen name={"teamDetails"} component={TeamDetails} />

      <Stack.Screen name={"maturity model"} component={MaturityModel} />

      <Stack.Screen name={"offerings"} component={Offerings} />
      <Stack.Screen name={"offeringDetails"} component={OfferingDetails} />
    </Stack.Navigator>
  )
}

export default AboutNavigator
