import React, { useEffect, useState, useContext } from "react";
import { Text, View, FlatList } from "react-native";
import { OptionsContext, GlobalOptionsContext } from "@options";
import {  } from "./api";
import  SocialProfileScreen from "./screens/social-profile";
import SocialFeedScreen from "./screens/social-feed";
import PostDetailsScreen from "./screens/post-details";
import FollowersList from "./screens/followers";

import {getMyFeed} from "./api";

import Navigator from "./navigator";
import { slice } from "./store";

const SocialFeed = (props) => {
  const options = useContext(OptionsContext);
  const { styles, localOptions } = options;
  return (
    <Navigator/>
  );
};

export default {
  title: "Social Feed",
  navigator: Navigator,
  slice
};
