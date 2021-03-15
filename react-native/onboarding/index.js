import React from "react";
import {
  View,
  Image,
  Text,
  StyleSheet,
} from "react-native";
import { slides } from "./slides";
import AppIntroSlider from 'react-native-app-intro-slider';

const REDIRECT_SCREEN_NAME = 'LoginAndSignup177769'


const Onboarding = ({ navigation }) =>  {

  const renderItem = ({ item }) => {
    return (
      <View style={[styles.slide, { backgroundColor: item.backgroundColor }]}>
        <Text style={styles.title}>{item.title}</Text>
        <Image style={styles.image} source={item.image} />
        <Text style={styles.text}>{item.text}</Text>
      </View>
    );
  }

  const onDone = () => {
    navigation.navigate(REDIRECT_SCREEN_NAME)
  }


  return (
    <View style={{ flex: 1, }}>
      <AppIntroSlider renderItem={renderItem} data={slides} onDone={onDone} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 16,
  },
  slide: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 320,
    height: 320,
    marginVertical: 32,
  },
  text: {
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'center',
  },
  title: {
    fontSize: 22,
    color: 'white',
    textAlign: 'center',
  },
});

export default {
  title: 'Onboarding',
  navigator: Onboarding
}