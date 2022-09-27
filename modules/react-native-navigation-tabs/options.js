import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { View, Text } from "react-native";
import React from "react";

function Feed() {
  return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <Text>Feed!</Text>
        </View>
  );
}

const tabList = [
  {
    name: "Feed",
    component: Feed,
    label: "Feed",
    tabIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="view-gallery" color={color} size={size} />
    )
  },
  {
    name: "Profile",
    component: Feed,
    label: "Profile",
    tabIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account" color={color} size={size} />
    )
  },
  {
    name: "Notifications",
    component: Feed,
    label: "Updates",
    tabIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account-child-outline" color={color} size={size} />
    )
  }
];

export default {
  tabList: tabList
};
