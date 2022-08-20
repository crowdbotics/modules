import React from "react";
// @ts-ignore
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import PropTypes from "prop-types";

const Tab = createBottomTabNavigator();

function MyTabs({ tabList = [], headerShown = false, tabBarShowLabel = true, tabBarLabelPosition = "below-icon", tabBarActiveTintColor = "#e91e63", tabBarInactiveTintColor = "#893498", tabBarActiveBackgroundColor = "", tabBarInactiveBackgroundColor = "", tabBarStyle = {} }) {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: headerShown,
        tabBarShowLabel: tabBarShowLabel,
        tabBarLabelPosition: tabBarLabelPosition,
        tabBarActiveTintColor: tabBarActiveTintColor,
        tabBarInactiveTintColor: tabBarInactiveTintColor,
        tabBarActiveBackgroundColor: tabBarActiveBackgroundColor,
        tabBarInactiveBackgroundColor: tabBarInactiveBackgroundColor,
        tabBarStyle: tabBarStyle
      }}
    >
      {
        tabList?.map((tab, index) => {
          return (
            <Tab.Screen
              key={index}
              name={tab?.name}
              component={tab?.component}
              options={{
                tabBarItemStyle: tab?.tabBarItemStyle,
                tabBarLabel: tab?.label,
                tabBarIcon: tab?.tabBarIcon,
                tabBarIconStyle: tab?.tabBarIconStyle,
                tabBarBadge: tab?.tabBarBadge,
                tabBarBadgeStyle: tab?.tabBarBadgeStyle,
                tabBarLabelStyle: tab?.tabBarLabelStyle
              }}
            />
          );
        })
      }
    </Tab.Navigator>
  );
}

MyTabs.propTypes = {
  tabList: PropTypes.array,
  tabBarStyle: PropTypes.object,
  headerShown: PropTypes.bool,
  tabBarShowLabel: PropTypes.bool,
  tabBarActiveTintColor: PropTypes.string,
  tabBarLabelPosition: PropTypes.string,
  tabBarInactiveTintColor: PropTypes.string,
  tabBarActiveBackgroundColor: PropTypes.string,
  tabBarInactiveBackgroundColor: PropTypes.string,
  tabBarBackground: PropTypes.string
};
export default {
  title: "MyTabs",
  navigator: MyTabs
};
