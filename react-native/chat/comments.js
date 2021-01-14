import React from 'react';
import {
  FlatList,
  View,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {
  withStyles,
  Text,
  Avatar
} from 'react-native-ui-kitten';
import { data } from '../../../data';
import NavigationType from '../../../config/navigation/propTypes';

const moment = require('moment');

export class _Comments extends React.Component {
  static propTypes = {
    navigation: NavigationType.isRequired,
  };
  static navigationOptions = {
    title: 'Comments'.toUpperCase(),
    
  };

  constructor(props) {
    super(props);
    const postId = this.props.navigation.getParam('postId', undefined);
    this.state = {
      data: data.getComments(postId),
    };
  }

  extractItemKey = (item) => `${item.id}`;



  renderSeparator = () => (
    <View style={this.props.themedStyle.separator} />
  );

  renderItem = ({ item }) => {
    const user = data.getUser(item.userId)
    return(
    <View style={this.props.themedStyle.container}>
      <TouchableOpacity >
        <Avatar source={user.photo} size='giant' style={this.props.themedStyle.avatar}/>
      </TouchableOpacity>
      <View style={this.props.themedStyle.content}>
        <View style={this.props.themedStyle.contentHeader}>
          <Text category='s1' style={this.props.themedStyle.text}>{`${user.firstName} ${user.lastName}`}</Text>
          <Text category='c1' appearance='hint' style={this.props.themedStyle.textTime}>
            {moment().add(item.time, 'seconds').format('LT')}
          </Text>
        </View>
        <Text category='p2'  style={this.props.themedStyle.text}>{item.text}</Text>
      </View>
    </View>
  )};

  render = () => {
   

    return (
    <FlatList
      style={this.props.themedStyle.root}
      data={this.state.data}
      extraData={this.state}
      ItemSeparatorComponent={this.renderSeparator}
      keyExtractor={this.extractItemKey}
      renderItem={this.renderItem}
    />
  )};
}

export default Comments = withStyles(_Comments, theme => ({
  root: {
    backgroundColor: theme['color-basic-100'],
  },
  container: {
    paddingLeft: 19,
    paddingRight: 16,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'flex-start',
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
    color: theme['color-basic-1000']
  },
  textTime: {
    color: theme['color-basic-600'],
    marginTop: 5,
  }
}));
