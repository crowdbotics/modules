import React from 'react';
import { TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
export const CreateButton = ({ onPress }) => <TouchableOpacity onPress={onPress}>
    <Ionicons name="create-outline" size={24} color="black"/>
  </TouchableOpacity>;
