import { Text, TouchableOpacity, View } from "react-native";
import { ListViewStyle } from "../styles";
import RadioToggle from "./RadioToggle";
import Circle from "./Circle";
import React from "react";
export const ListViewItem = ({ item, selectedItems, onPress }) => {
    const letter = (item.name ? item.name[0] : '').toUpperCase();
    return <TouchableOpacity onPress={onPress} style={ListViewStyle.container}>
    <View style={{ flexDirection: 'row' }}>
      <RadioToggle checked={new Set(selectedItems).has(item._id)}/>
      <Circle letter={letter}/>
      <View style={{ flexDirection: 'column' }}>
        <Text>{item.name}</Text>
        <Text>last seen</Text>
      </View>
    </View>
  </TouchableOpacity>;
};
export const ChatMember = ({ member }) => <View style={ListViewStyle.container}>
  <Text style={ListViewStyle.title}>{member.name}</Text>
  <Text style={ListViewStyle.subtitle}>last seen recently</Text>
</View>;
export const ManagedChatMember = ({ member, buttonText, onPress }) => <View style={[ListViewStyle.container, { flexDirection: 'row', justifyContent: 'space-between' }]}>
  <View style={{ flexDirection: 'column' }}>
    <Text style={ListViewStyle.title}>{member.name}</Text>
    <Text style={ListViewStyle.subtitle}>last see recently</Text>
  </View>
  <View style={{ flexDirection: 'column' }}>
    <TouchableOpacity onPress={onPress}>
      <Text style={ListViewStyle.title}>{buttonText}</Text>
    </TouchableOpacity>
  </View>
</View>;
