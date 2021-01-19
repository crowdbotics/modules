import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Provider } from 'react-redux'
import store from './store.js';

import modules from "@modules";

const App = () => {
  return (
    <Provider store={store}>
      <View style={styles.container}>
        <Text>Total modules installed: {Object.keys(modules).length}</Text>
        <Text>Modules: {Object.keys(modules)}</Text>
      </View>
    </Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 100
  }
})

export default App;
