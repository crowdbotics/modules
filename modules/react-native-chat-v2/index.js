import React, { useState, useEffect } from 'react'
import { GiftedChat, Actions } from 'react-native-gifted-chat'
import * as Permissions from 'react-native-permissions'
import metadata from './metadata'
import PubNub from 'pubnub'
import { usePubNub, PubNubProvider } from 'pubnub-react'
import isUrl from 'is-url'
import { Alert, Platform } from 'react-native'
import ImagePicker from 'react-native-image-crop-picker'

const checkPermission = async permission => {
  const checkStatus = await Permissions.check(permission)
  if (checkStatus !== Permissions.RESULTS.GRANTED) {
    const requestStatus = await Permissions.request(permission)
    if (requestStatus !== Permissions.RESULTS.GRANTED) {
      return false
    }
  }
  return true
}

const getPermissions = async () => {
  const cameraPermission = Platform.select({
    android: Permissions.PERMISSIONS.ANDROID.CAMERA,
    ios: Permissions.PERMISSIONS.IOS.CAMERA,
  })
  const cameraStatus = await checkPermission(cameraPermission)
  const storagePermission = Platform.select({
    android: Permissions.PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
    ios: Permissions.PERMISSIONS.IOS.PHOTO_LIBRARY,
  })
  const storageStatus = await checkPermission(storagePermission)
  return (
    cameraStatus === Permissions.RESULTS.GRANTED &&
    storageStatus === Permissions.RESULTS.GRANTED
  )
}

const client = new PubNub({
  subscribeKey: 'demo',
  publishKey: 'demo',
  uuid: 0,
})

const user = {
  _id: 0,
  name: 'Vlad Rimsha',
  avatar: 'https://ca.slack-edge.com/T2R0TP3DM-UDU3PDY81-25eda549c0b1-512',
}

const Container = () => (
  <PubNubProvider client={client}>
    <_App />
  </PubNubProvider>
)

const _App = () => {
  const pubnub = usePubNub()
  const [messages, setMessages] = useState([])

  useEffect(() => {
    if (!pubnub) return

    (async () => {
      if (Platform.OS !== 'web') {
        const status = getPermissions()
        if (!status) {
          Alert.alert('Sorry we need camera roll permissions to make this work')
        }
      }
    })()

    setMessages(previousMessages =>
      GiftedChat.append(previousMessages, {
        _id: 1,
        text: 'Ben never tests anything',
        createdAt: new Date(),
        user,
      }),
    )

    const listener = {
      message: envelop => {
        setMessages(previousMessages =>
          GiftedChat.append(previousMessages, envelop.message),
        )
      },
      file: envelop => {
        setMessages(previousMessages =>
          GiftedChat.append(previousMessages, {
            ...envelop.userMetadata.user,
            image: envelop.file.url,
          }),
        )
      },
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
          message.image =
            meta.hybridGraph.image || meta.hybridGraph.imageSecureUrl
        }
      }
      pubnub.publish({ channel: 'chat', message: { ...message, user } })
    })
  }

  const pickImage = async () => {
    try {
      const result = await ImagePicker.openPicker({
        mediaType: 'photo',
      })

      pubnub.sendFile({
        channel: 'chat',
        file: { uri: result.path, name: result.filename, mimeType: result.mime },
        meta: {
          user,
        },
      })
    } catch (e) {
      console.log('user canselled')
    }
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

export default ({
  title: 'Chat',
  navigator: Container
})