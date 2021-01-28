import React from "react";
import modules from "@modules";
import { View, Text, StyleSheet, Pressable } from 'react-native';

function Welcome({ navigation }) {
  const modulesList = modules.filter(module => module.name !== "Welcome");
  const links = modulesList.map(module => {
    return (
      <Pressable
        onPress={() => navigation.navigate(module.name)}
        style={pressed}
        key={module.name}
      >
        <Text style={styles.buttonText}>{module.name}</Text>
      </Pressable >
    )
  });
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Screens available ({modulesList.length})</Text>
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
  name: "Welcome",
  navigator: Welcome,
  reducer: null,
  actions: null
}
