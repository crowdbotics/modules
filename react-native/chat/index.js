import React, {PureComponent} from 'react';
import {View, Platform, StyleSheet} from 'react-native';
import {Text, Button} from 'react-native-ui-kitten';

export default class Root extends PureComponent {
  static navigationOptions = {
    title: 'Messenger'.toUpperCase(),
    headerBackTitle: null,
  };

  render() {
    return (
      <View style={styles.container}>
        <Button
          onPress={() => this.props.navigation.navigate('ChatScreen')}
          style={styles.item}>
          Chat Screen
        </Button>

        <Button
          onPress={() => this.props.navigation.navigate('SplashScreen')}
          style={styles.item}>
          Main Menu
        </Button>
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
    height: Platform.select({ios: 20, android: 0}),
  },
  item: {
    borderBottomWidth: 1,
    marginTop: 20,
    borderBottomColor: 'gray',
  },
});
