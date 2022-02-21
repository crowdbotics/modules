import React, { useRef, useState } from 'react';
import { Text, TextInput, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
const Placeholder = () => <View>
  <Ionicons name="camera" size={45}/>
  <Text>Search</Text>
</View>;
export default ({ value, onChange }) => {
    const inputRef = useRef(null);
    const [focused, setFocus] = useState(false);
    return <View style={{
        padding: 8,
        margin: 4,
        backgroundColor: 'grey',
        borderRadius: 4,
    }}>
    <TextInput ref={inputRef} onChangeText={onChange} value={value} placeholder="Search" placeholderTextColor="#ddd" style={{
        color: 'white',
        textAlign: 'center',
        fontSize: 16
    }}/>
  </View>;
};
