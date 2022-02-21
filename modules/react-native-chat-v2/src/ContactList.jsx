import React from 'react';
import { FlatList, View, Text, TouchableOpacity } from 'react-native';
import { ListViewStyle } from './styles';
import Circle from './components/Circle';
const ListViewItem = ({ item, index, length, onPress }) => {
    const letter = (item.name ? item.name[0] : '').toUpperCase();
    return <TouchableOpacity onPress={onPress} style={ListViewStyle.container}>
    <View style={{ flexDirection: 'row' }}>
      <Circle letter={letter}/>
      <View style={[{ flexDirection: 'column' }, index !== length - 1 ? ListViewStyle.separator : {}]}>
        <Text style={ListViewStyle.title}>{item.name}</Text>
        <Text style={ListViewStyle.subtitle}>last seen</Text>
      </View>
    </View>
  </TouchableOpacity>;
};
export default ({ data, onPress }) => <FlatList data={data} renderItem={({ item, index }) => <ListViewItem key={item._id} index={index} length={data.length} item={item} onPress={() => onPress(item)}/>} keyExtractor={({ _id }) => `${_id}`}/>;
