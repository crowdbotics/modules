import Icon from 'react-native-vector-icons/FontAwesome';
import React from 'react';
import { Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { htmlContent } from './content';
import { styles } from './styles';

const TermsAndConditions = ({ navigation }) => {
  return (
    <View
      style={{
        flex: 1,
      }}>
      <View style={styles.heading}>
        <TouchableOpacity
          style={{ padding: 5 }}
          onPress={() => {
            navigation.goBack();
          }}>
          <Icon
            style={styles.icon}
            name={'arrow-left'}
            size={18}
            color="#FFFFFF"
          />
        </TouchableOpacity>
        <Text style={styles.header}>TERMS AND CONDITIONS</Text>
        <View></View>
      </View>

      <ScrollView style={styles.scrollview}>
        <Text style={styles.text}>{htmlContent}</Text>
      </ScrollView>
    </View>
  );
};

export default {
  title: "Terms and Conditions",
  navigator: TermsAndConditions
}
