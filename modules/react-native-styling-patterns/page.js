import React, { useMemo, useContext } from "react";
import {
  ScrollView,
  SafeAreaView,
  StyleSheet,
  Text,
  Pressable,
  useWindowDimensions,
  Linking
} from "react-native";
import { Navigation } from "./navigation";
import { OptionsContext } from "@options";

export function Page({ children }) {
  const { routes, links } = useContext(OptionsContext);
  const { width } = useWindowDimensions();

  const responsiveStyles = useMemo(
    () => (width > 1200 ? styles.big : styles.small),
    [width]
  );

  return (
    <SafeAreaView style={[styles.container, responsiveStyles]}>
      <ScrollView style={styles.content}>
        <Pressable onPress={() => Linking.openURL(links.module)}>
          <Text style={styles.text}>React Native Styling Patterns</Text>
        </Pressable>
        <Navigation routes={routes} />
        {children}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  small: {
    width: "100%"
  },
  big: {
    width: 1200
  },
  text: {
    margin: 5,
    marginBottom: 25,
    fontSize: 32,
    color: "blue"
  },
  container: {
    margin: "auto",
    marginTop: 0
  },
  content: {
    padding: 25
  }
});
