import React, { useEffect } from 'react';
import { View, StyleSheet, Image } from 'react-native';

const NEXT_SCREEN_NAME = 'TermsAndConditions';


const Splash = ({ navigation }) => {
  useEffect(() => {
    setTimeout(() => {
      navigation.navigate(NEXT_SCREEN_NAME);
    }, 3000)
  }, []);

  return (
    <View style={styles.container}>
      <Image style={styles.image} source={require('./assets/splashBack.png')} />
    </View>
  );
  }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  image: { width: '100%' },
});

export default {
  title: 'SplashScreen',
  navigator: Splash
}