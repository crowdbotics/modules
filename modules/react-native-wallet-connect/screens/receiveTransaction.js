import React, { useState, useEffect } from 'react'
// @ts-ignore
import QRCode from 'react-native-qrcode-svg'
import { View } from 'react-native'
import { globalConnector, } from '../utils';
// @ts-ignore
import WalletConnectProvider from '@walletconnect/web3-provider';

const ReceiveTransaction = () => {
  const [account, setAccount] = useState(null)

  useEffect(() => {
    getAccount()
  }, [])

  const getAccount = async () => {
    const provider = new WalletConnectProvider({
      rpc: {
        97: 'https://data-seed-prebsc-1-s1.binance.org:8545/',
      },
      chainId: 97,
      connector: globalConnector,
      qrcode: false,
    })
    const accountAddress = provider.connector._accounts[0]
    const chainId = provider._chainID
    setAccount(`Ethereum:${accountAddress}@${chainId}`)
  }

  return (
    <View style={{display: "flex", flex: 1, alignSelf: "center", alignContent: "center", alignItems: "center", height: "100%", justifyContent: "center"}}>
      {account &&
        <QRCode
          value={account}
          size={300} />
      }
    </View>
  )
}

export default ReceiveTransaction
