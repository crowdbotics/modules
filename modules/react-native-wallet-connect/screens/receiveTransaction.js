import React, { useState, useEffect } from 'react'
// @ts-ignore
import QRCode from 'react-native-qrcode-svg'
import { View,StyleSheet } from 'react-native'
import {  walletProvider, } from '../utils';



const ReceiveTransaction = () => {
  const [account, setAccount] = useState(null)
  
  useEffect(() => {
    getAccount()
  }, [])

  const getAccount = async () => {
    const provider=await walletProvider()
    const accountAddress = provider.connector._accounts[0]
    const chainId = provider._chainID
    setAccount(`ethereum:${accountAddress}@${chainId}`)
  }

  return (
    <View style={styles.receive}>
      {account &&
        <QRCode
          value={account}
          size={300} />
      }
    </View>
  )
}
const styles=StyleSheet.create({
  receive:{display: "flex", flex: 1, alignSelf: "center", alignContent: "center", alignItems: "center", height: "100%", justifyContent: "center"}
})
export default ReceiveTransaction
