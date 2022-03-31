import React from 'react';
// @ts-ignore
import { useWalletConnect, withWalletConnect } from '@walletconnect/react-native-dapp';
// @ts-ignore
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';
import {Text, Button} from "react-native"



function App(){
  const connector = useWalletConnect();
  if (!connector.connected) {
  
    return <Button title="Connect" onPress={() => connector.connect()} />;
  }
  return <Button title="Kill Session" onPress={() => connector.killSession()} />;
}

const WalletConnect = withWalletConnect(App, {
  redirectUrl: Platform.OS === 'web' ? window.location.origin : 'yourappscheme://',
  storageOptions: {
    asyncStorage: AsyncStorage,
  },
});

export default {
  title: "WalletConnect",
  navigator: WalletConnect
}