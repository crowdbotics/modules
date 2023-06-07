import React, { useEffect, useState, Fragment, useContext } from "react";
// @ts-ignore
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import PropTypes from "prop-types";
import { View, Text, StyleSheet } from "react-native";
// @ts-ignore
import { OptionsContext } from "@options";
const Tab = createBottomTabNavigator();

function MyTabs({ tabList = [], headerShown = false, tabBarShowLabel = true, tabBarLabelPosition = "below-icon", tabBarActiveTintColor = "", tabBarInactiveTintColor = "", tabBarActiveBackgroundColor = "", tabBarInactiveBackgroundColor = "", tabBarStyle = {}, riseCenteredBtn = false }) {
  const [tabData, setTabData] = useState(null);
  const options = useContext(OptionsContext);
  const checkLength = (length) => {
    if (length % 2 === 0) {
      return false;
    } else {
      return true;
    }
  };

  // @ts-ignore
  useEffect(async () => {
    if (tabList.length !== 0) {
      const tabLength = tabList.length;
      const check = await checkLength(tabLength);
      if (riseCenteredBtn && check) {
        const theMiddle = Math.floor(tabList.length / 2);
        const value = tabList[theMiddle];
        value.tabBarItemStyle = { marginTop: -30, backgroundColor: value?.tabBarItemStyle?.backgroundColor || tabBarStyle?.backgroundColor || "#fff", height: 70, borderRadius: 60 };
      }
      setTabData(tabList);
    } else {
      const tabArray = options.tabList;
      const tabLength = tabArray.length;
      const check = await checkLength(tabLength);
      if (riseCenteredBtn && check) {
        const theMiddle = Math.floor(tabArray.length / 2);
        const value = tabArray[theMiddle];
        value.tabBarItemStyle = { marginTop: -30, backgroundColor: value?.tabBarItemStyle?.backgroundColor || tabBarStyle?.backgroundColor || "#fff", height: 70, borderRadius: 60 };
      }
      setTabData(options.tabList);
    }
  }, [riseCenteredBtn, tabList, options.tabList]);

  return (
    <Fragment>
      {
        !tabData
          ? <View style={styles.warning}><Text style={styles.text}>No Data Found!</Text></View>
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
  tabBarBackground: PropTypes.string,
  riseCenteredBtn: PropTypes.bool
};
export default {
  title: "MyTabs",
  navigator: MyTabs
};

const styles = StyleSheet.create({
  warning: { flex: 1, alignItems: "center", justifyContent: "center" },
  text: { fontWeight: "bold", fontSize: 16 }
});
