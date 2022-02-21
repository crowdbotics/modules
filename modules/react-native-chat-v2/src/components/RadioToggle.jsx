import React from 'react';
import { View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
const Checked = () => <Ionicons name="radio-button-on-outline" size={45} color="#333"/>;
const Unchecked = () => <Ionicons name="radio-button-off-outline" size={45} color="#333"/>;
export default ({ checked }) => {
    const Icon = checked ? Checked : Unchecked;
    return <View><Icon /></View>;
};
