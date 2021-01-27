import modules from "@modules";
import { View, Text, StyleSheet, Pressable } from 'react-native';

function Welcome({ navigation }) {
  const links = modules.map(module => {
    return (
      <Pressable
        onPress={() => navigation.navigate(module.name)}
        style={pressed}
        key={module.screen}
      >
        <Text style={styles.buttonText}>{module.name}</Text>
      </Pressable >
    )
  });
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Screens available ({modules.length})</Text>
      {links}
    </View>
  )
}

const pressed = ({ pressed }) => [
  { backgroundColor: pressed ? 'rgba(72, 61, 139, 0.75)' : 'rgba(72, 61, 139, 1)' },
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
  screen: Welcome,
  reducer: null,
  actions: null
}
