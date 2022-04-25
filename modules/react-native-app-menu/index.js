import React, { useContext } from "react";
import { OptionsContext, GlobalOptionsContext } from "@options";
import { View, Text, Pressable } from "react-native";
import { useNavigation, useNavigationState } from "@react-navigation/native";

function AppMenu() {
  const options = useContext(OptionsContext);
  return (
    <View style={options.styles.container}>
      <AppRoutes options={options} />
      <View style={options.styles.hr} />
      <GlobalOptions options={options} />
    </View>
  );
}

function AppRoutes({ options }) {
  const navigation = useNavigation();
  const routes = useNavigationState((state) =>
    state.routeNames.filter((name) => name !== options.title)
  );

  const pressed = ({ pressed }) => [
    pressed ? options.styles.buttonPressed : options.styles.buttonNotPressed,
    options.styles.button
  ];
  const links = routes.map((route) => {
    return (
      <Pressable
        onPress={() => navigation.navigate(route)}
        style={pressed}
        key={route}
      >
        <Text style={options.styles.buttonText}>{route}</Text>
      </Pressable>
    );
  });
  return (
    <View>
      <Text style={options.styles.text}>
        {options.copy}({routes.length})
      </Text>
      {links}
    </View>
  );
}

function GlobalOptions({ options }) {
  const global = useContext(GlobalOptionsContext);
  const globalInfo = Object.entries(global).map(([key, val]) => {
    return (
      <Text style={options.styles.text} key={key}>
        {key}: {val}
      </Text>
    );
  });
  return (
    <View>
      <Text style={options.styles.text}>
        Global options({Object.entries(global).length})
      </Text>
      {globalInfo}
    </View>
  );
}

export default {
  title: "App Menu",
  navigator: AppMenu
};
