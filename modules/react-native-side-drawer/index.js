import React, { useContext } from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { OptionsContext } from "@options";
const Drawer = createDrawerNavigator();

const SideDrawer = ({
  screenSet,
  initialRouteName = "",
  drawerType = "front",
  screenOptions,
  drawerPosition = "left",
  drawerStyle = {},
  overlayColor = "transparent",
  hideStatusBar = false,
  edgeWidth = 300,
  keyboardDismissMode = "on-drag",
  minSwipeDistance = 300

}) => {
  const options = useContext(OptionsContext);
  const { drawerOptions } = options;

  return (
    <Drawer.Navigator
      initialRouteName={initialRouteName || drawerOptions.initialRouteName}
      drawerType={drawerType || drawerOptions.drawerType}
      screenOptions={screenOptions || drawerOptions.screenOptions}
      drawerPosition={drawerPosition || drawerOptions.drawerPosition}
      drawerStyle={drawerStyle || drawerOptions.drawerStyle}
      overlayColor={overlayColor || drawerOptions.overlayColor}
      hideStatusBar={hideStatusBar || drawerOptions.hideStatusBar}
      edgeWidth={edgeWidth || drawerOptions.edgeWidth}
      keyboardDismissMode={keyboardDismissMode || drawerOptions.keyboardDismissMode}
      minSwipeDistance={minSwipeDistance || drawerOptions.minSwipeDistance}
    >
      {options.screenSet
        ? options.screenSet.map((screen, index) => (
          <Drawer.Screen
            key={index}
            name={screen?.name}
            component={screen?.component}
            options={screen?.options}
          />
        ))
        : screenSet.map((screen, index) => (
          <Drawer.Screen
            key={index}
            name={screen?.name}
            component={screen?.component}
            options={screen?.options}
          />
        ))
      }

    </Drawer.Navigator>
  );
};

export default {
  title: "SideDrawer",
  navigator: SideDrawer
};
