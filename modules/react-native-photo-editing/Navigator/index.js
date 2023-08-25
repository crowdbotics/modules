import React from "react";

import { createStackNavigator } from "@react-navigation/stack";
import Crop from "../Screens/crop";
import Filters from "../Screens/filters";
import Edits from "../Screens/edits";
import Shadows from "../Screens/shadows";
import ImagePicker from "../Screens/imagePicker";
const Stack = createStackNavigator();

const Navigator = () => {
  return <Stack.Navigator screenOptions={{ headerStyle: { elevation: 0 }, animationEnabled: false, cardStyle: { backgroundColor: "#fff" } }}>
    <Stack.Screen options={{ headerShown: false }} name="imagePicker" component={ImagePicker} />
    <Stack.Screen options={{ headerShown: false }} name="crop" component={Crop} />
    <Stack.Screen options={{ headerShown: false }} name="filter" component={Filters}/>
    <Stack.Screen options={{ headerShown: false }} name="edit" component={Edits}/>
    <Stack.Screen options={{ headerShown: false }} name="shadow" component={Shadows}/>
  </Stack.Navigator>;
};
export default Navigator;
