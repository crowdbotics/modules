import React, { useState, useEffect } from 'react'
import { GiftedChat, Actions } from 'react-native-gifted-chat'
import metadata from './metadata'
import PubNub from 'pubnub'
import { usePubNub, PubNubProvider } from "pubnub-react"
import isUrl from 'is-url'
import { launchImageLibrary } from 'react-native-image-picker';

const client = new PubNub({
  subscribeKey: 'demo',
  publishKey: 'demo',
  uuid: 0
})

const user = {
  _id: 0,
  name: 'Vlad Rimsha',
  avatar: 'https://ca.slack-edge.com/T2R0TP3DM-UDU3PDY81-25eda549c0b1-512',
}

export default () => <PubNubProvider client={client}><_App /></PubNubProvider>

const _App = () => {
  const pubnub = usePubNub()
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (!pubnub) return

    setMessages(previousMessages => GiftedChat.append(previousMessages, {
      _id: 1,
      text: 'Ben never tests anything',
      createdAt: new Date(),
      user
    }))

    const listener = {
      message: envelop => {
        setMessages(previousMessages => GiftedChat.append(previousMessages, envelop.message))
      },
      file: envelop => {
        setMessages(previousMessages => GiftedChat.append(previousMessages, {
          ...envelop.userMetadata.user,
          image: envelop.file.url
        }))
        console.log('got a new file', envelop)
      }
    }

    pubnub.setUUID(0)
    pubnub.addListener(listener)
    pubnub.subscribe({ channels: ['chat'] })

    return () => {
      pubnub.removeListener(listener)
      pubnub.unsubscribeAll()
    }

  }, [pubnub])


  const onSend = (messages = []) => {
    messages.forEach(async message => {
      if (isUrl(message.text)) {
        const meta = await metadata(message.text)
        if (meta.hybridGraph) {
          message.image = meta.hybridGraph.image || meta.hybridGraph.imageSecureUrl
        }
      }
      pubnub.publish({ channel: 'chat', message: { ...message, user } })
    })
  }

  const pickImage = async () => {
    await launchImageLibrary({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
    }, (res) => {
      if (res.didCancel) return

      pubnub.sendFile({
        channel: 'chat',
        file: { uri: result.uri, name: result.fileName, mimeType: result.type },
        meta: {
          user
        }
      })
    })
  }

  return (
    <GiftedChat
      messages={messages}
      renderUsernameOnMessage={true}
      onSend={onSend}
      renderActions={() => <Actions onPressActionButton={pickImage} />}
      user={user}
    />
  )
}
