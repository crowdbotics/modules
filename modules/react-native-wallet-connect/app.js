import React, { useEffect, useState } from 'react';
// @ts-ignore
import { useWalletConnect} from '@walletconnect/react-native-dapp';
import { Text, Button, View, TouchableOpacity } from "react-native"
// @ts-ignore
import { useFocusEffect } from '@react-navigation/native'
// @ts-ignore
import {SvgUri} from 'react-native-svg';

const App = () => {
  const connector = useWalletConnect();
  const [connectedWallet, setConnectedWallet] = useState(null)
  const [isSwitch, setIsSwitch] = useState(false)
  const [changeWallet, setChangeWallet] = useState(false)

  useFocusEffect(
    React.useCallback(() => {
      if(connector._peerMeta) {
        setConnectedWallet(connector._peerMeta)
      }
      if(connector.connected) {
        setIsSwitch(false)
      }
    }, [connector])
  )

  useEffect(() => {
    if(isSwitch) {
      if(!connector.connected){
      connector.connect()
      }
    }
  }, [isSwitch])

  const switchSession=async ()=>{
    await connector.killSession()
    setChangeWallet(true)
  }

  useEffect(() => {
    if(!connector.connected && changeWallet) {
      setIsSwitch(true)
      setChangeWallet(false)
    } 
   
  }, [connector])

  return (
    <View style={{height: '100%', display: "flex", flexDirection:'column', justifyContent: "space-between", padding: 10}}>
      <View>
        { connector.connected && connectedWallet && <>
          <View style={{display:'flex', flexDirection:'row', alignItems:'center', justifyContent: "space-between"}}> 
            <View style={{display:'flex', flexDirection:'row', alignItems:'center'}}>  
              <SvgUri
                uri = {connectedWallet.icons[0]}
                height = "50"
                width = "50"
              /> 
              <Text style={{alignSelf:'center'}}>{connectedWallet.name}</Text>
            </View>
            <TouchableOpacity  onPress={() => connector.killSession()} >
              <Text style={{color:'red', fontWeight:'bold'}}>Kill Session</Text>
            </TouchableOpacity>
          </View>
        </> }
      </View>
      <View style={{display: 'flex', justifyContent:'center', alignItems:'center'}}>
          {!connector.connected && <Text style={{fontWeight:'bold'}}>Connect your Wallet</Text>}
      </View>
      <View>
        {!connector.connected ? <Button title="Connect to Wallet" onPress={() => connector.connect()} /> : <Button title="Switch Session" onPress={switchSession} />}
      </View>
    </View>
  )
}
export default App