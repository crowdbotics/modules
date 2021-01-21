import React from "react";
import {
  View,
  Image,
  Text,
  StyleSheet,
} from "react-native";
import { SlideMenuIcon } from '../../navigator/slideMenuIcon';
import AppIntroSlider from 'react-native-app-intro-slider';

const slides = [
  {
    key: 'one',
    title: 'Title 1',
    text: 'Description.\nSay something cool',
    image: { uri: "https://crowdbotics-slack-dev.s3.amazonaws.com/media/project_component_resources/cb-icon.png" },
    backgroundColor: '#59b2ab',
  },
  {
    key: 'two',
    title: 'Title 2',
    text: 'Other cool stuff',
    image: { uri: "https://crowdbotics-slack-dev.s3.amazonaws.com/media/project_component_resources/cb-icon.png" },
    backgroundColor: '#febe29',
  },
  // {
  //   key: 'three',
  //   title: 'Rocket guy',
  //   text: 'I\'m already out of descriptions\n\nLorem ipsum bla bla bla',
  //   image: require('./assets/3.jpg'),
  //   backgroundColor: '#22bcb5',
  // }
];

export default class Blank extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerLeft: <SlideMenuIcon navigationProps={navigation} />,
    };
  };

  state = {};

  _renderItem = ({ item }) => {
    return (
      <View style={[styles.slide, { backgroundColor: item.backgroundColor }]}>
        <Text style={styles.title}>{item.title}</Text>
        <Image style={styles.image} source={item.image} />
        <Text style={styles.text}>{item.text}</Text>
      </View>
    );
  }

  _onDone = () => {
    this.props.navigation.navigate('LoginSignupScreen177769') // Login/Sign up Screen
  }


  render = () => (
    <View style={{ flex: 1, }}>
      <AppIntroSlider renderItem={this._renderItem} data={slides} onDone={this._onDone} />
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
