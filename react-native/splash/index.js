import React from "react";
import {
  View,
  Image,
  ImageBackground,
  TouchableOpacity,
  Text,
  Button,
  Switch,
  TextInput,
  StyleSheet,
} from "react-native";
import DateTimePicker from 'react-native-datepicker';
import Icon from 'react-native-vector-icons/FontAwesome';
import Slider from '@react-native-community/slider';
import { CheckBox } from 'react-native-elements';
import { SlideMenuIcon } from '../../navigator/slideMenuIcon';

export default class Blank extends React.Component {
  componentDidMount() {
    setTimeout(() => {
      this.props.navigation.navigate('OnboardingSlideScreen177768') //onboarding
    }, 3000);
  }
  static navigationOptions = ({ navigation }) => {
    return {
      headerLeft: <SlideMenuIcon navigationProps={navigation} />,
    };
  };

  state = {};

  render = () => (
    <View style={styles.container}>
      <Image style={{ width: '100%', height: '100%' }} source={require('../../assets/images/splashBack.png')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
