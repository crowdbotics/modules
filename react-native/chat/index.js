import React from 'react';
import {
  FlatList,
  View,
  Platform,
  Image,
  TouchableOpacity,
  Text,
  TextInput,
  Keyboard,
  InteractionManager,
  StyleSheet
} from 'react-native';
import { delay } from 'lodash';
import { data } from './data';
import { scale } from './utils.js';
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { NavigationType } from './utils.js';

const moment = require('moment');

class _Chat extends React.Component {
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
    const userId = undefined;
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
      <View style={{ alignItems: 'center' }}>
        <Text category='s1' style={{ color: 'black' }}>{`${user.firstName} ${user.lastName}`}</Text>
        <Text category='c1' style={{ color: 'grey' }}>Online</Text>
      </View>
    </TouchableOpacity>
  );

  static renderNavigationAvatar = (navigation, user) => (
    <TouchableOpacity onPress={() => _Chat.onNavigationAvatarPressed(navigation, user)}>
      <Image source={user.photo} />
    </TouchableOpacity>
  );

  renderDate = (date) => (
    <Text style={styles.time} category='c2' appearance='hint'>
      {moment().add(date, 'seconds').format('LT')}
    </Text>
  );

  renderItem = ({ item }) => {
    const isIncoming = item.type === 'in';
    const backgroundColor = isIncoming
      ? styles.messageInBackground
      : styles.messageOutBackground;
    const itemStyle = isIncoming ? styles.itemIn : styles.itemOut;

    return (
      <View style={[styles.item, itemStyle]}>
        {!isIncoming && this.renderDate(item.time)}
        <View style={[styles.balloon, backgroundColor]}>
          <Text category='p1' style={styles.text} style={[{ paddingTop: 5 }, styles.text]}>{item.text}</Text>
        </View>
        {isIncoming && this.renderDate(item.time)}
      </View>
    );
  };

  render = () => {
    return (
      <KeyboardAwareScrollView
        style={styles.container}
        onResponderRelease={Keyboard.dismiss}>
        <FlatList
          ref={this.setListRef}
          extraData={this.state}
          style={styles.list}
          data={this.state.data.messages}
          keyExtractor={this.extractItemKey}
          renderItem={this.renderItem}
        />
        <View style={styles.footer}>
          <TouchableOpacity style={styles.plus}>
            <Text category='h1' status='success'>+</Text>
          </TouchableOpacity>
          <TextInput
            onFocus={this.scrollToEnd}
            onBlur={this.scrollToEnd}
            onChangeText={this.onInputChanged}
            value={this.state.message}
            placeholder="Type a text..."
            style={styles.input}
            textStyle={styles.text}
          />
          <TouchableOpacity onPress={this.onSendButtonPressed} style={styles.send} >
            <Image source={require('./data/sendIcon.png')} />
          </TouchableOpacity>
        </View>
      </KeyboardAwareScrollView>

    )
  }
}

export const theme = {
  "color-danger-400": "#ff708d",
  "color-basic-100": "white",
  "color-basic-300": "#edf0f4",
  "color-basic-400": "#dde1eb",
  "color-basic-500": "#C5CEE0",
};

const styles = StyleSheet.create({
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
});

export default {
  name: "Chat",
  screen: _Chat,
  reducer: null,
  actions: null
}
