import React, { useEffect, useState, useContext } from "react";
import { Text, View, FlatList } from "react-native";
import { OptionsContext } from "@options";
import {  } from "./api";
import  SocialProfileScreen from "./screens/social-profile";
import SocialFeedScreen from "./screens/social-feed";
import PostDetailsScreen from "./screens/post-details";
import FollowersList from "./screens/followers";

const SocialFeed = () => {
  const options = useContext(OptionsContext);
  const { styles, localOptions } = options;
  useEffect(async () => {

  }, []);
  // More info on all the options is below in the API Reference... just some common use cases shown here

  return (
    <View>
      {/* <SocialProfileScreen /> */}
      <SocialFeedScreen />
      {/* <PostDetailsScreen /> */}
      {/* <FollowersList /> */}
    </View>
  );
};

export default {
  title: "Social Feed",
  navigator: SocialFeed
};
