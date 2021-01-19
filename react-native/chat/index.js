import React, { PureComponent } from 'react';
import { Button, View, Platform, StyleSheet } from 'react-native';
import Chat from "./ChatScreen";

class Root extends PureComponent {
  static navigationOptions = {
    title: 'Messenger'.toUpperCase(),
    headerBackTitle: null,
  };

  render() {
    return (
      <View style={styles.container}>
        <Chat />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 10,
  },
  statusbar: {
    height: Platform.select({ ios: 20, android: 0 }),
  },
  item: {
    borderBottomWidth: 1,
    marginTop: 20,
    borderBottomColor: 'gray',
  },
});

export default {
  name: "Chat",
  screen: Root,
  reducer: null,
  actions: null
}
