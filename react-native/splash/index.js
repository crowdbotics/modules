import React, { Component } from "react";
import { Text, ScrollView, TouchableOpacity } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';
import { styles } from './styles'

export default class App extends Component {
  static navigationOptions = {
    title: 'Installed blueprints',
  };

  renderItems() {
    const {
      navigation: { navigate },
    } = this.props;

    const installed_blueprints = [];

    return installed_blueprints.map(item => {
      if (item.hasOwnProperty('access_route')) {
        return (
          <TouchableOpacity
            onPress={_ => navigate(item.access_route)}
            style={styles.item}
            key={`${item.name}--blueprint-button`}>
            <Icon
              style={styles.itemLogo}
              name={item.icon_name ? item.icon_name : 'pencil-square-o'}
              size={40}
              color="#F88087"
            />
            <Text style={styles.itemFont}>{item.human_name}</Text>
          </TouchableOpacity>
        );
      }
    });
  }

  render() {
    return (
      <ScrollView contentContainerStyle={styles.itemsContainer}>
        {this.renderItems()}
      </ScrollView>
    );
  }
}
