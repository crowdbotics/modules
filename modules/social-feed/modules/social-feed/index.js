import React, { useEffect, useState, useContext } from "react";
import { Text, View, FlatList } from "react-native";
import { OptionsContext } from "@options";
import {  } from "./api";

const SocialFeed = () => {
  const options = useContext(OptionsContext);
  const { styles, localOptions } = options;
  useEffect(async () => {

  }, []);
  // More info on all the options is below in the API Reference... just some common use cases shown here

  return (
    <View>
      <Text>Social Feed</Text>
    </View>
  );
};

export default {
  title: "Social Feed",
  navigator: SocialFeed
};
