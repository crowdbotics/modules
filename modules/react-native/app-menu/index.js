import React from "react";
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { useNavigationState } from "@react-navigation/native";

const title = "App Menu";

function AppMenu({ navigation }) {
  const routes = useNavigationState(
    state => state.routeNames.filter(name => name !== title)
  );
  const links = routes.map(route => {
    return (
      <Pressable
        onPress={() => navigation.navigate(route)}
        style={pressed}
        key={route}
      >
        <Text style={styles.buttonText}>{route}</Text>
      </Pressable >
    )
  });
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Routes available ({routes.length})</Text>
      {links}
    </View>
  )
}

const pressed = ({ pressed }) => [
  pressed ? styles.buttonPressed : styles.buttonNotPressed,
  styles.button
];

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 100,
    padding: 13
  },
  text: {
    fontSize: 20
  },
  buttonPressed: {
    backgroundColor: 'rgba(72, 61, 139, 0.75)'
  },
  buttonNotPressed: {
    backgroundColor: 'rgba(72, 61, 139, 1)'
  },
  button: {
    borderRadius: 4,
    padding: 15,
    marginTop: 10
  },
  buttonText: {
    color: "white",
    textAlign: "center",
    fontSize: 16
  }
})

export default {
  title: title,
  navigator: AppMenu
}
