# WalletConnect

## Configs

Run the following commands in the root directory
```
npm i --save react-native-crypto
npm i --save react-native-randombytes
npx react-native link react-native-randombytes
npm i --save-dev rn-nodeify@latest
npx rn-nodeify --install "stream" --hack
./node_modules/.bin/rn-nodeify --hack --install
```
Import the  following in the index.js in root directory
```
import './shim.js'
import crypto from 'crypto'
```
