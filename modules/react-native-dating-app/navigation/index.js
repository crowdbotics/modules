import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import {
  HomeScreen,
  SettingScreen,
  Profile,
  ChatScreen,
  loginScreen,
  signUp,
  CreatePostScreen,
  Splash
} from "../screens";
import ChatDetailsScreen from "../screens/chat/chatDetails";
import { forgotPass } from "../screens/forgotPass";
import { createNew } from "../screens/createNew";
import { ProfileSetup } from "../screens/profileSetup";

const Stack = createStackNavigator();

export const AppNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: true }}>
      <Stack.Screen name="Splash" component={Splash} options={{ headerShown: false }} />
      <Stack.Screen name="Log in" component={loginScreen} options={{ headerShown: false }} />
      <Stack.Screen name="ProfileSetup" component={ProfileSetup} options={{ headerShown: false }} />
      <Stack.Screen name="Sign up" component={signUp} />
      <Stack.Screen name="forgot" component={forgotPass} />
      <Stack.Screen name="create" component={createNew} />
      <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Settings" component={SettingScreen} />
      <Stack.Screen name="Profile" component={Profile} options={{ headerShown: false }} />
      <Stack.Screen name="Chat" component={ChatScreen} />
      <Stack.Screen name="ChatDetails" component={ChatDetailsScreen} options={{ headerShown: false }} />
      <Stack.Screen name="CreatePost" component={CreatePostScreen}/>
    </Stack.Navigator>
  );
};
