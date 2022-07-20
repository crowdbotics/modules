import React, { useEffect } from "react";
import { View, StyleSheet, Image } from "react-native";
import PropTypes from "prop-types";

const Splash = ({ url, duration, onDone }) => {
  useEffect(() => {
    setTimeout(() => {
      onDone();
    }, duration);
  }, []);

  return (
    <View style={styles.container}>
      <Image
        resizeMode="cover"
        style={styles.image}
        source={{ uri: url }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF"
  },
  image: { width: "100%", height: "100%" }
});

Splash.propTypes = {
  url: PropTypes.string,
  duration: PropTypes.number,
  onDone: PropTypes.func
};

export default {
  title: "Splash Upgrade",
  navigator: Splash
};
