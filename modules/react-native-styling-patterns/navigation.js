import React, { useMemo } from "react";
import {
  View,
  Pressable,
  Text,
  StyleSheet,
  useWindowDimensions
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";

function Buttons({ routes }) {
  const { navigate } = useNavigation();
  const { name } = useRoute();

  const currentScreen = screen => {
    if (screen === name) return styles.current;
  };

  return routes.map(route => {
    return (
      <Pressable
        key={route.name}
        style={[styles.pressable, currentScreen(route.name)]}
        onPress={() => navigate(route.name)}
      >
        <Text style={styles.text}>{route.button}</Text>
      </Pressable>
    );
  });
}

export function Navigation({ routes }) {
  const { width } = useWindowDimensions();

  const wideScreen = useMemo(() => {
    if (width > 1200) return styles.row;
  }, [width]);

  return (
    <View style={wideScreen}>
      <Buttons routes={routes} />
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row"
  },
  current: {
    backgroundColor: "darkorange"
  },
  pressable: {
    flex: 1,
    padding: 12,
    margin: 5,
    borderWidth: 2,
    borderColor: "black",
    backgroundColor: "blue"
  },
  text: {
    fontSize: 18,
    color: "white"
  }
});
