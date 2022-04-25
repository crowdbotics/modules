import React from "react";
import { TextInput, View, StyleSheet } from "react-native";

const SearchBar = ({ value, onChange }) => {
  return (
    <View style={styles.container}>
      <TextInput onChangeText={onChange} value={value} placeholder="Search" placeholderTextColor="#ddd" style={styles.inputStyle} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 2,
    marginBottom: 10,
    backgroundColor: "#f0f3f7"
  },
  inputStyle: {
    fontSize: 16,
    color: "#000"
  }
});
export default SearchBar;
