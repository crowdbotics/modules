import React from 'react';
import {FlatList, View, StyleSheet, TouchableOpacity} from 'react-native';
import {filter} from 'lodash';
import {withStyles, Text, Input, Avatar} from 'react-native-ui-kitten';
import {data} from '../../../data';
import NavigationType from '../../../config/navigation/propTypes';

const moment = require('moment');

export class _ChatList extends React.Component {
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
    const navigationParams = {userId: item.withUser.id};
    this.props.navigation.navigate('Chat', navigationParams);
  };

  renderSeparator = () => <View style={this.props.themedStyle.separator} />;

  renderHeader = () => (
    <View style={this.props.themedStyle.searchContainer}>
      <Input
        autoCapitalize="none"
        autoCorrect={false}
        onChangeText={this.onInputChanged}
        placeholder="Search"
        style={this.props.themedStyle.input}
        textStyle={this.props.themedStyle.text}
      />
    </View>
  );

  renderItem = ({item}) => {
    const last = item.messages[item.messages.length - 1];
    return (
      <TouchableOpacity onPress={() => this.onItemPressed(item)}>
        <View style={this.props.themedStyle.container}>
          <Avatar
            source={item.withUser.photo}
            size="giant"
            style={this.props.themedStyle.avatar}
          />
          <View style={this.props.themedStyle.content}>
            <View style={this.props.themedStyle.contentHeader}>
              <Text
                category="s1"
                style={
                  this.props.themedStyle.text
                }>{`${item.withUser.firstName} ${item.withUser.lastName}`}</Text>
              <Text
                category="c1"
                appearance="hint"
                style={this.props.themedStyle.textTime}>
                {moment()
                  .add(last.time, 'seconds')
                  .format('LT')}
              </Text>
            </View>
            <Text
              numberOfLines={2}
              category="p2"
              style={[{paddingTop: 5}, this.props.themedStyle.text]}>
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
        style={this.props.themedStyle.root}
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

export default ChatList = withStyles(_ChatList, theme => ({
  root: {
    backgroundColor: theme['color-basic-100'],
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
    borderRadius: 25
  },
}));
