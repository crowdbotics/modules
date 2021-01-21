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
  static navigationOptions = ({ navigation }) => {
    return {
      headerLeft: <SlideMenuIcon navigationProps={navigation} />,
    };
  };

  state = {};

  render = () => (
    <View style={styles.container}>
      <Text>This is your new component -- NOT IN USE -- SPLASH</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 16,
  },
});
