import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import Circle from '../Components/Circle';
import { ListViewStyle } from '../Navigator/styles';

export const ChannelListItem = ({ item, index, length, onPress }) => {
    const letter = (item.name ? item.name[0] : '').toUpperCase();
    const lastMessage = '';
    return <TouchableOpacity onPress={onPress} style={ListViewStyle.container}>
    <View style={{ flexDirection: 'row' }}>
      <Circle letter={letter} source={item.custom.caption}/>
      <View style={[{ flexDirection: 'column' }, index !== length - 1 ? ListViewStyle.separator : {}]}>
        <Text style={ListViewStyle.title}>{item.name}</Text>
        <Text style={ListViewStyle.subtitle} numberOfLines={2}>{lastMessage}</Text>
      </View>
    </View>
  </TouchableOpacity>;
};
