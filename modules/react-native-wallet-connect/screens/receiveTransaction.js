import React, { useState, useEffect } from 'react'
// @ts-ignore
import QRCode from 'react-native-qrcode-svg'
import { View, Text, StyleSheet } from 'react-native'
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
    setAccount(`${accountAddress}`)
  }

  return (
    <>
      <Text style={styles.ReceiveTransaction}>Receive Transaction</Text>
      <View style={styles.receive}>
        <View style={styles.qrCode}>
          {account &&
            <QRCode
              value={account}
              size={200} />
          }
        </View>
      </View>
    </>
  )
}
const styles=StyleSheet.create({
  receive:{display: "flex", flex: 1, alignSelf: "center", marginTop: 25},
  ReceiveTransaction: {
    margin: 30, fontSize: 16,
  },
  qrCode: {
    borderColor:'#C4C4C4', borderWidth:2, padding:25, borderRadius:10,
  },
})
export default ReceiveTransaction
