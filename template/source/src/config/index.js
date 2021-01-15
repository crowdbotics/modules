import React from 'react';
import { View, Text } from 'react-native';
import { Provider } from 'react-redux'
import store from './store.js';

const App = () => {
  return (
    <Provider store={store}>
      <View><Text>Hi</Text></View>
    </Provider>
  );
};

export default App;
