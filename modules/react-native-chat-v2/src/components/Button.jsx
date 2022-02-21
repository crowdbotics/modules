import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
export default ({ title, onPress }) => {
    return <TouchableOpacity onPress={onPress}>
    <Text>{title}</Text>
  </TouchableOpacity>;
};
export const InlineButton = ({ title, onPress }) => {
    return <TouchableOpacity onPress={onPress} style={{ paddingHorizontal: 8, paddingVertical: 8 }}>
    <Text style={{ fontSize: 16 }}>{title}</Text>
  </TouchableOpacity>;
};
