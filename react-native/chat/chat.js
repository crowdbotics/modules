import React from 'react';
import {
  FlatList,
  View,
  Platform,
  Image,
  TouchableOpacity,
  Keyboard,
  InteractionManager,
} from 'react-native';
import {
  Button,
  Text,
  Input,
  Avatar,
  withStyles,
} from 'react-native-ui-kitten';
import { delay } from 'lodash';
import { FontAwesome } from '../../../assets/icons';
import { data } from '../../../data';
import { scale } from '../../../utils/scale';
import NavigationType from '../../../config/navigation/propTypes';
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
// import Icon from "react-native-vector-icons/FontAwesome5";

const moment = require('moment');

export class _Chat extends React.Component {
  static propTypes = {
    navigation: NavigationType.isRequired,
  };
  static navigationOptions = ({ navigation }) => {
    const userId = navigation.state.params ? navigation.state.params.userId : undefined;
    const user = data.getUser(userId);
    return ({
      headerTitle: _Chat.renderNavigationTitle(navigation, user),
      headerRight: _Chat.renderNavigationAvatar(navigation, user),
      
    });
  };

  constructor(props) {
    super(props);
    const userId = this.props.navigation.getParam('userId', undefined);
    this.state = {
      data: data.getConversation(userId),
    };
  }

  componentDidMount() {
    InteractionManager.runAfterInteractions(() => {
      this.listRef.scrollToEnd();
    });
  }

  setListRef = (ref) => {
    this.listRef = ref;
  };

  extractItemKey = (item) => `${item.id}`;

  scrollToEnd = () => {
    if (Platform.OS === 'ios') {
      this.listRef.scrollToEnd();
    } else {
      delay(this.listRef.scrollToEnd, 100);
    }
  };

  onInputChanged = (text) => {
    this.setState({ message: text });
  };

  onSendButtonPressed = () => {
    if (!this.state.message) {
      return;
    }
    this.state.data.messages.push({
      id: this.state.data.messages.length, time: 0, type: 'out', text: this.state.message,
    });
    this.setState({ message: '' });
    this.scrollToEnd(true);
  };

  static onNavigationTitlePressed = (navigation, user) => {
    navigation.navigate('ProfileV1', { id: user.id });
  };

  static onNavigationAvatarPressed = (navigation, user) => {
    navigation.navigate('ProfileV1', { id: user.id });
  };

  static renderNavigationTitle = (navigation, user) => (
    <TouchableOpacity onPress={() => _Chat.onNavigationTitlePressed(navigation, user)}>
      <View style={{alignItems: 'center'}}>
        <Text category='s1' style={{color: 'black'}}>{`${user.firstName} ${user.lastName}`}</Text>
        <Text category='c1' style={{color: 'grey'}}>Online</Text>
      </View>
    </TouchableOpacity>
  );

  static renderNavigationAvatar = (navigation, user) => (
    <TouchableOpacity onPress={() => _Chat.onNavigationAvatarPressed(navigation, user)}>
      <Avatar source={user.photo} size='small' style={{marginRight: 16}}/>
    </TouchableOpacity>
  );

  renderDate = (date) => (
    <Text style={this.props.themedStyle.time} category='c2' appearance='hint'>
      {moment().add(date, 'seconds').format('LT')}
    </Text>
  );

  renderItem = ({ item }) => {
    const isIncoming = item.type === 'in';
    const backgroundColor = isIncoming
      ? this.props.themedStyle.messageInBackground
      : this.props.themedStyle.messageOutBackground;
    const itemStyle = isIncoming ? this.props.themedStyle.itemIn : this.props.themedStyle.itemOut;

    return (
      <View style={[this.props.themedStyle.item, itemStyle]}>
        {!isIncoming && this.renderDate(item.time)}
        <View style={[this.props.themedStyle.balloon, backgroundColor]}>
          <Text category='p1' style={this.props.themedStyle.text} style={[{ paddingTop: 5 }, this.props.themedStyle.text]}>{item.text}</Text>
        </View>
        {isIncoming && this.renderDate(item.time)}
      </View>
    );
  };

  render = () => {
    return(
    <KeyboardAwareScrollView
      style={this.props.themedStyle.container}
      onResponderRelease={Keyboard.dismiss}>
      <FlatList
        ref={this.setListRef}
        extraData={this.state}
        style={this.props.themedStyle.list}
        data={this.state.data.messages}
        keyExtractor={this.extractItemKey}
        renderItem={this.renderItem}
      />
      <View style={this.props.themedStyle.footer}>
        <TouchableOpacity style={this.props.themedStyle.plus}>
        <Text category='h1' status='success'>+</Text>
        </TouchableOpacity>
        <Input
          onFocus={this.scrollToEnd}
          onBlur={this.scrollToEnd}
          onChangeText={this.onInputChanged}
          value={this.state.message}
          placeholder="Type a text..."
          style={this.props.themedStyle.input}
          textStyle={this.props.themedStyle.text}
        />
        <TouchableOpacity onPress={this.onSendButtonPressed} style={this.props.themedStyle.send} >
          <Image source={require('../../../assets/icons/sendIcon.png')} />
        </TouchableOpacity>
      </View>
    </KeyboardAwareScrollView>

  )}
}

export default Chat = withStyles(_Chat, theme => ({
  header: {
    alignItems: 'center',
  },
  avatar: {
    marginRight: 16,
  },
  container: {
    flex: 1,
    backgroundColor: theme['color-basic-100'],
  },
  list: {
    paddingHorizontal: 17,
  },
  footer: {
    flexDirection: 'row',
    minHeight: 60,
    padding: 10,
    backgroundColor: theme['color-basic-300'],
    alignItems: 'center',

  },
  item: {
    marginVertical: 14,
    flex: 1,
    flexDirection: 'row',
  },
  itemIn: {},
  itemOut: {
    alignSelf: 'flex-end',
  },
  balloon: {
    maxWidth: scale(250),
    paddingHorizontal: 15,
    paddingTop: 10,
    paddingBottom: 15,
    borderRadius: 20,
  },
  time: {
    alignSelf: 'flex-end',
    margin: 15,
  },
  plus: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    marginRight: 7,
  },
  send: {
    width: 40,
    height: 40,
    marginLeft: 10,
    borderColor: theme["color-danger-400"],
    backgroundColor: theme["color-danger-400"],
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 25,
  },
  messageInBackground: {
    backgroundColor: theme['color-basic-300']
  },
  messageOutBackground: {
    backgroundColor: theme['color-basic-500']
  },
  text: {
    color: theme['color-basic-1000']
  },
  input: {
    backgroundColor: theme['color-basic-100'],
    borderColor: theme['color-basic-400'],
    borderRadius: 25,
    flex: 1,

  },
}));
