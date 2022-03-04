import { Text, TouchableOpacity, View } from "react-native";
import RadioToggle from "./RadioToggle";
import Circle from "../Components/Circle";
import React from "react";
import options from "../options"

export const ListViewItem = ({ item, selectedItems, onPress }) => {
    const letter = (item.name ? item.name[0] : '').toUpperCase();
    return <TouchableOpacity onPress={onPress} style={options.ListViewStyle.container}>
    <View style={{ flexDirection: 'row' }}>
      <RadioToggle checked={new Set(selectedItems).has(item._id)}/>
      <Circle letter={letter} source=""/>
      <View style={{ flexDirection: 'column' }}>
        <Text>{item.name}</Text>
        <Text>last seen</Text>
      </View>
    </View>
  </TouchableOpacity>;
};
export const ChatMember = ({ member }) => <View style={options.ListViewStyle.container}>
  <Text style={options.ListViewStyle.title}>{member.name}</Text>
  <Text style={options.ListViewStyle.subtitle}>last seen recently</Text>
</View>;

export const ManagedChatMember = ({ member, buttonText, onPress }) => <View style={[options.ListViewStyle.container, { flexDirection: 'row', justifyContent: 'space-between' }]}>
  <View style={{ flexDirection: 'column' }}>
    <Text style={options.ListViewStyle.title}>{member.name}</Text>
    <Text style={options.ListViewStyle.subtitle}>last see recently</Text>
  </View>
  <View style={{ flexDirection: 'column' }}>
    <TouchableOpacity onPress={onPress}>
      <Text style={options.ListViewStyle.title}>{buttonText}</Text>
    </TouchableOpacity>
  </View>
</View>;
