import React, { useEffect, useState } from 'react';
// @ts-ignore
import { useWalletConnect} from '@walletconnect/react-native-dapp';
import { Text, View, TouchableOpacity,} from "react-native"
// @ts-ignore
import {  useFocusEffect } from '@react-navigation/native'
// @ts-ignore
import {SvgUri} from 'react-native-svg';
import { globalConnector, setGlobalConnector, walletProvider } from '../utils';
import Button from '../components/Button';
// @ts-ignore
import Web3 from 'web3'
// @ts-ignore
import WalletConnectProvider from '@walletconnect/web3-provider';

const Home = (props) => {
  const connector = useWalletConnect();
  const [connectedWallet, setConnectedWallet] = useState(null)
  const [isSwitch, setIsSwitch] = useState(false)
  const [changeWallet, setChangeWallet] = useState(false)
  const [balance, setBalance] = useState('')

  useFocusEffect(
    React.useCallback(() => {
      if(connector._peerMeta) {
        setConnectedWallet(connector._peerMeta)
      }
      if(connector.connected) {
        setIsSwitch(false)
        setGlobalConnector(connector);
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
    // if(connector.connected){
    //   getAccount()
    // }
   
  }, [connector])

  useFocusEffect(
    React.useCallback(()=>{
      if(globalConnector){
        
        getAccount()
      }
    },[globalConnector])
  )



  const getAccount = async () => {
    
    const provider=walletProvider()
    await provider.enable();
    const web = new Web3(provider);

  
    web.eth.getAccounts((err, res) => {
      
      web.eth.getBalance(res[0], async (error, amount)=>{
        setBalance(await web.utils.fromWei(amount, "ether"))
      })
    })
  }

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
                <Text style={{alignSelf:'center', width: 80}} numberOfLines={1} ellipsizeMode='middle'>{globalConnector && globalConnector._accounts}</Text>
              </View>
              <TouchableOpacity  onPress={() => connector.killSession()} >
                <Text style={{color:'red', fontWeight:'bold'}}>Kill Session</Text>
              </TouchableOpacity>
            </View>
            <View style={{padding:10}}>
              <Text>Balance: {balance ? `${balance} ETH` : '--'}</Text>
            </View>
            <View style={{display:'flex', flexDirection:'row', width:'100%', marginTop: 20 }}>
              <View style={{width:'50%', padding: 10 }}>
                <Button onPress={()=>{props.navigation.navigate('ReceiveTransaction')}} style={{width:'50%'}}>Receive Funds</Button >
              </View>  
              <View style={{ width:'50%', padding: 10 }}>
                <Button  onPress={()=>{props.navigation.navigate('SendTransaction')}} style={{width:'50%'}}>Send Funds</Button>
              </View>
            </View>
            <View style={{padding: 10 }}>
                <Button  onPress={()=>{props.navigation.navigate('TransactionHistory')}}>Transaction History</Button>
            </View>

          </> }
        </View>
        <View style={{display: 'flex', justifyContent:'center', alignItems:'center'}}>
            {!connector.connected && <Text style={{fontWeight:'bold'}}>Connect your Wallet</Text>}
        </View>
        <View>
          {!connector.connected ? <Button onPress={() => connector.connect()}>Connect to wallet</Button> : <Button onPress={switchSession}>Switch Session</Button>}
        </View>
      </View>
    
  )
}
export default Home