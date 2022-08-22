import React, { useEffect, useState, Fragment } from "react";
// @ts-ignore
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import PropTypes from "prop-types";
import { View, Text, StyleSheet } from "react-native";

const Tab = createBottomTabNavigator();

function MyTabs({ tabList = null, headerShown = false, tabBarShowLabel = true, tabBarLabelPosition = "below-icon", tabBarActiveTintColor = "", tabBarInactiveTintColor = "", tabBarActiveBackgroundColor = "", tabBarInactiveBackgroundColor = "", tabBarStyle = {}, riseCenteredBtn = false }) {
  const [tabData, setTabData] = useState(null);

  useEffect(() => {
    if (riseCenteredBtn) {
      const theMiddle = Math.floor(tabList.length / 2);
      const value = tabList[theMiddle];
      value.tabBarItemStyle = { marginTop: -30, backgroundColor: "#fff", height: 70, borderRadius: 60 };
    }
    setTabData(tabList);
  }, []);

  return (
    <Fragment>
      {
        !tabData
          ? <View style={styles.warning}><Text style={styles.text}>No Tab Data Found</Text></View>
          : <Tab.Navigator
          screenOptions={{
            headerShown: headerShown,
            tabBarShowLabel: tabBarShowLabel,
            tabBarLabelPosition: tabBarLabelPosition,
            tabBarActiveTintColor: tabBarActiveTintColor || "#dc4555",
            tabBarInactiveTintColor: tabBarInactiveTintColor || "#7f4062",
            tabBarActiveBackgroundColor: tabBarActiveBackgroundColor,
            tabBarInactiveBackgroundColor: tabBarInactiveBackgroundColor,
            tabBarStyle: tabBarStyle
          }}
        >
          {
            tabData?.map((tab, index) => {
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
      }
    </Fragment>

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

const styles = StyleSheet.create({
  warning: { flex: 1, alignItems: "center", justifyContent: "center" },
  text: { fontWeight: "bold", fontSize: 16 }
});
