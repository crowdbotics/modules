import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";

const VideoScreen = () => {
  return (
        <View style={styles.container}>
          <View style={styles.header}>
              <Image source={require(
                
                "./assets/back.png")} />
          </View>
          <View style={styles.logoContainer}>
              <Image source={require(
                
                "./assets/logo.png")} />
          </View>
        <View>
          <View style={styles.slide}>
            <Image style={styles.slideImg} source={require(
              
              "./assets/slide.png")} />
          </View>
          <View style={styles.reloadIcons}>
            <Image source={require(
            
              "./assets/reload.png")} />
            <Image source={require(
            
              "./assets/pause.png")} />
          </View>
          <View style={styles.slider}>
            <Image style={styles.sliderImg} source={require(
            
              "./assets/slider.png")} />
          </View>
          <View style={styles.reloadIcons}>
            <Text>00.00</Text>
            <Text>30.00</Text>
          </View>
          <View style={styles.playArea}>
            <Image source={require(
              
              "./assets/save.png")} />
              <Image style={styles.reverseIcon} source={require(
              
                "./assets/reverse.png")} />
              <Image style={styles.stopIcon} source={require(
              
                "./assets/stop.png")} />
              <Image style={styles.forwardIcon} source={require(
              
                "./assets/forward.png")} />
              <Image source={require(
              
                "./assets/download.png")} />
          </View>
        </View>
    </View>
  );
};

const styles = StyleSheet.create({

  container: {
    backgroundColor: "#FCF1D6",
    display: "flex",
    paddingVertical: 30,
    height: "100%",
    justifyContent: "space-between"
  },
  header: {
    paddingHorizontal: 25
  },
  logoContainer: {
    alignSelf: "center"
  },
  slide: {
    justifyContent: "flex-end",
    flexDirection: "row",
    paddingHorizontal: 25,
    marginBottom: 20
  },
  reloadIcons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 25
  },
  slider: {
    marginHorizontal: 25
  },
  sliderImg: {
    width: "100%",
    resizeMode: "contain"
  },
  playArea: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 25,
    justifyContent: "space-between",
    marginTop: 20
  },
  reverseIcon: {
    height: 48,
    width: 48
  },
  stopIcon: {
    height: 48,
    width: 48
  },
  forwardIcon: {
    height: 48,
    width: 48
  },
  slideImg: {
    height: 90,
    borderRadius: 5
  }
});

export default VideoScreen;
