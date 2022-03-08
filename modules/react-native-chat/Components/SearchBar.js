import React from 'react';
import { TextInput, View } from 'react-native';

export default ({ value, onChange }) => {
  return (
    <View style={{ padding: 2, marginBottom: 10, backgroundColor: "#f0f3f7" }}>
      <TextInput onChangeText={onChange} value={value} placeholder="Search" placeholderTextColor="#ddd" style={{ fontSize: 16 }} />
    </View>
  );
};
