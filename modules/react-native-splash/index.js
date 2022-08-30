import React, { useEffect } from "react";
import { View, StyleSheet, Image } from "react-native";
import PropTypes from "prop-types";

const Splash = ({ url, duration, mainContainerStyle = {}, imageResizeMode, imageStyle = {}, onDurationEnd }) => {
  useEffect(() => {
    if (duration) {
      setTimeout(() => {
        onDurationEnd();
      }, duration);
    }
  }, []);

  return (
    <View style={[styles.container, mainContainerStyle]}>
      <Image
        resizeMode={imageResizeMode || "cover" }
        style={[styles.image, imageStyle]}
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
  mainContainerStyle: PropTypes.object,
  imageResizeMode: PropTypes.string,
  imageStyle: PropTypes.object,
  onDurationEnd: PropTypes.func
};

export default {
  title: "Splash",
  navigator: Splash
};
