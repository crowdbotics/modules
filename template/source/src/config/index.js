import React from 'react';
import { View, Text } from 'react-native';
import { Provider } from 'react-redux'
import store from './store.js';

import modules from "@modules";

const App = () => {
  return (
    <Provider store={store}>
      <View>
        <Text>Total modules installed: {Object.keys(modules).length}</Text>
        <Text>Modules: {Object.keys(modules)}</Text>
      </View>
    </Provider>
  );
};

export default App;
