import React from 'react'
import { GiftedChat } from 'react-native-gifted-chat'
import PubNubReact from 'pubnub-react';
import { appConfig } from "../../../../config/app.js";
import uuid from 'uuid'

export default class ChatScreen extends React.Component {

  constructor(props) {
    super(props);
    this.pubnub = new PubNubReact({
      publishKey: appConfig.pubPublishKey,
      subscribeKey: appConfig.pubSubscribeKey
    });
    
    this.state = {
      messages: [],
     }

    this.pubnub.init(this);

    this.id = this.randomid();
  }

  randomid = () => {
    return uuid()
  };

  componentWillUnmount() {
    this.pubnub.unsubscribe({ channels: ['ReactChat'] });
  }

  componentDidMount() {
    this.pubnub.subscribe({
      channels: ["ReactChat"],
      message: message => console.log("sub", message),
    });

    this.pubnub.getMessage("ReactChat", m => {
      this.setState(previousState => ({
        messages: GiftedChat.append(previousState.messages, m["message"]),
      }));
    });
  }

  onSend(messages = []) {
    this.pubnub.publish({
      message: messages,
      channel: "ReactChat",
    });
  }

  render() {
    return (
      <GiftedChat
        messages={this.state.messages}
        onSend={messages => this.onSend(messages)}
        user={ {
          _id: this.id,
          name: 'React Native',
          avatar: 'https://i.pravatar.cc/140',
        }}
      />
    )
  }
}
