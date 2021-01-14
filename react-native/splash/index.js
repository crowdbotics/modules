import React from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';
import { styles } from './styles'

export default function Splash(props) {
  const { installed_blueprints, navigation: { navigate } } = props;

  if (installed_blueprints) {
    return installed_blueprints.map(item => {
      if (item.hasOwnProperty('access_route')) {
        return (
          <ScrollView contentContainerStyle={styles.itemsContainer}>
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
          </ScrollView>
        );
      }
    });
  } else {
    return (
      <ScrollView contentContainerStyle={styles.itemsContainer}>
        <View style={styles.empty}>
          <Text style={styles.emptyText}>No modules installed.</Text>
        </View>
      </ScrollView>
    )
  }
}
