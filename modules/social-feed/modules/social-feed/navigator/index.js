import React from "react";
// @ts-ignore
import { createStackNavigator } from "@react-navigation/stack";

// @ts-ignore
import SocialFeedScreen from "../screens/social-feed.js";
import SocialProfileScreen from "../screens/social-profile.js";
import PostDetailsScreen from "../screens/post-details.js";
import FollowersList from "../screens/followers.js";
import FollowingList from "../screens/following.js";
import CreatePostScreen from "../screens/create-post.js";

const Stack = createStackNavigator();

const Navigator = () => {
  return <Stack.Navigator headerMode="screen" screenOptions={{ headerStyle: { elevation: 0 }, cardStyle: { backgroundColor: "#fff" } }}>
    <Stack.Screen options={{ headerShown: false }} name="Home" component={SocialFeedScreen} />
    <Stack.Screen name="SocialProfileScreen" component={SocialProfileScreen} />
    <Stack.Screen name="PostDetailsScreen" component={PostDetailsScreen} />
    <Stack.Screen name="FollowersList" component={FollowersList} />
    <Stack.Screen name="FollowingList" component={FollowingList} />
    <Stack.Screen name="Create Post" component={CreatePostScreen} />
</Stack.Navigator>;
};
export default Navigator;
