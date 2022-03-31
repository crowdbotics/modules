
// @ts-ignore
import {  withWalletConnect } from '@walletconnect/react-native-dapp';
// @ts-ignore
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LogBox, Platform} from "react-native"
import App from './app';

LogBox.ignoreLogs(['react-native-gesture'])

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