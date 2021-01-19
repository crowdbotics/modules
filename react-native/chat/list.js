import React from 'react';
import { Text, TextInput, Image, FlatList, View, StyleSheet, TouchableOpacity } from 'react-native';
import { filter } from 'lodash';
import { data } from './data';
import { NavigationType } from './utils.js';
import { theme } from './index.js';

const moment = require('moment');

export default class _ChatList extends React.Component {
  static propTypes = {
    navigation: NavigationType.isRequired,
  };
  static navigationOptions = {
    title: 'Chat List'.toUpperCase(),
    headerBackTitle: null,
  };

  state = {
    data: {
      original: data.getChatList(),
      filtered: data.getChatList(),
    },
  };

  extractItemKey = item => `${item.withUserId}`;

  onInputChanged = text => {
    const pattern = new RegExp(text, 'i');
    const chats = filter(this.state.data.original, chat => {
      const filterResult = {
        firstName: chat.withUser.firstName.search(pattern),
        lastName: chat.withUser.lastName.search(pattern),
      };
      return filterResult.firstName !== -1 || filterResult.lastName !== -1
        ? chat
        : undefined;
    });
    this.setState({
      data: {
        original: this.state.data.original,
        filtered: chats,
      },
    });
  };

  onItemPressed = item => {
    const navigationParams = { userId: item.withUser.id };
    this.props.navigation.navigate('Chat', navigationParams);
  };

  renderSeparator = () => <View style={styles.separator} />;

  renderHeader = () => (
    <View style={styles.searchContainer}>
      <TextInput
        autoCapitalize="none"
        autoCorrect={false}
        onChangeText={this.onInputChanged}
        placeholder="Search"
        style={styles.input}
        textStyle={styles.text}
      />
    </View>
  );

  renderItem = ({ item }) => {
    const last = item.messages[item.messages.length - 1];
    return (
      <TouchableOpacity onPress={() => this.onItemPressed(item)}>
        <View style={styles.container}>
          <Image
            source={item.withUser.photo}
            style={styles.avatar}
          />
          <View style={styles.content}>
            <View style={styles.contentHeader}>
              <Text
                category="s1"
                style={
                  styles.text
                }>{`${item.withUser.firstName} ${item.withUser.lastName}`}</Text>
              <Text
                category="c1"
                appearance="hint"
                style={styles.textTime}>
                {moment()
                  .add(last.time, 'seconds')
                  .format('LT')}
              </Text>
            </View>
            <Text
              numberOfLines={2}
              category="p2"
              style={[{ paddingTop: 5 }, styles.text]}>
              {last.text}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  render = () => {
    return (
      <FlatList
        style={styles.root}
        data={this.state.data.filtered}
        extraData={this.state}
        ListHeaderComponent={this.renderHeader}
        ItemSeparatorComponent={this.renderSeparator}
        keyExtractor={this.extractItemKey}
        renderItem={this.renderItem}
      />
    );
  };
}

const styles = StyleSheet.create({
  root: {
    backgroundColor: theme['color-basic-100'],
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50
  },
  searchContainer: {
    backgroundColor: theme['color-basic-300'],
    // paddingHorizontal: 16,
    padding: 10,
    // height: 60,
    alignItems: 'center',
    justifyContent: 'center'
  },
  container: {
    paddingLeft: 19,
    paddingRight: 16,
    paddingBottom: 12,
    paddingTop: 7,
    flexDirection: 'row',
  },
  content: {
    marginLeft: 16,
    flex: 1,
  },
  contentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  separator: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: theme['color-basic-400'],
  },
  text: {
    color: theme['color-basic-1000'],
  },
  textTime: {
    color: theme['color-basic-600'],
    marginTop: 5,
  },
  input: {
    backgroundColor: theme['color-basic-100'],
    borderColor: theme['color-basic-400'],
    borderRadius: 25,
    padding: 15,
    width: "100 %"
  },
});
