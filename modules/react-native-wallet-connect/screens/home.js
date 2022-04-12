import React, { useEffect, useState } from 'react';
// @ts-ignore
import { useWalletConnect} from '@walletconnect/react-native-dapp';
import { Text, View, TouchableOpacity,StyleSheet, Image} from "react-native"
// @ts-ignore
import {  useFocusEffect } from '@react-navigation/native'
import { globalConnector, setGlobalConnector, walletProvider } from '../utils';
import Button from '../components/Button';
// @ts-ignore
import Web3 from 'web3'
// @ts-ignore
import refreshIcon from "../refresh-icon.png"

// @ts-ignore
import LinearGradient from 'react-native-linear-gradient';
// @ts-ignore
import ShimmerPlaceHolder from 'react-native-shimmer-placeholder'
import CurrencyModal from '../components/CurrencyModal';

const Home = (props) => {
  const connector = useWalletConnect();
  const [connectedWallet, setConnectedWallet] = useState(null)
  const [isSwitch, setIsSwitch] = useState(false)
  const [changeWallet, setChangeWallet] = useState(false)
  const [balance, setBalance] = useState(null)
  const [modalVisible, setModalVisible]=useState(false)
  
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
    setBalance(null)
    setGlobalConnector(null)
    setChangeWallet(true)
  }

  useEffect(() => {
    if(!connector.connected && changeWallet) {
      setIsSwitch(true)
      setChangeWallet(false)
    } 
  }, [connector])

  useFocusEffect(
    React.useCallback(()=>{
      if(globalConnector){
        getAccount()
      }
    },[])
  )
    useEffect(()=>{
      if(globalConnector){
        getAccount()
      }
    }, [globalConnector])


  const getAccount = async () => {
    setBalance(null)
    const provider=walletProvider()
    await provider.enable();
    const web = new Web3(provider);

  
    web.eth.getAccounts((err, res) => {
      web.eth.getBalance(res[0], async (error, amount)=>{
        setBalance(await web.utils.fromWei(amount, "ether"))
      })
    })
  }

  const switchCurrencyHandler= () => {
      setModalVisible(!modalVisible)
  }

  return (
    <>
      <View style={styles.container}>
        <View>
          { connector.connected && connectedWallet && <>

            <View style={styles.top}> 
              <View style={styles.account}>  
                <TouchableOpacity onPress={switchCurrencyHandler}>
                  <Text style={styles.accountText} numberOfLines={1} ellipsizeMode='middle'>{globalConnector && globalConnector._accounts}</Text>
                </TouchableOpacity>  
              </View>
              <TouchableOpacity  onPress={() => connector.killSession()} >
                <Text style={styles.kill}>Kill Session</Text>
              </TouchableOpacity>
            </View>
            <View style={[styles.pt10, {display: "flex", flexDirection: "row"}]}>
              <Text>Balance: {balance ? `${balance}ETH` : <ShimmerPlaceHolder style={{borderRadius: 4}} width={50} height={10} LinearGradient={LinearGradient} />}</Text>
              <TouchableOpacity style={{marginLeft: 10}} onPress={async () => await getAccount()}>
                <Image style={styles.refreshIcon} source={refreshIcon}/>
              </TouchableOpacity>
            </View>
            <View style={styles.funds}>
              <View style={styles.fundButton}>
                <Button onPress={()=>{props.navigation.navigate('ReceiveTransaction')}}>Receive Funds</Button >
              </View>  
              <View style={styles.fundButton}>
                <Button  onPress={()=>{props.navigation.navigate('SendTransaction')}}>Send Funds</Button>
              </View>
            </View>
            <View style={styles.pt10}>
                <Button  onPress={()=>{props.navigation.navigate('TransactionHistory')}}>Transaction History</Button>
            </View>

          </> }
        </View>
        <View style={styles.connectText}>
            {!connector.connected && <Text style={{fontWeight:'bold'}}>Connect your Wallet</Text>}
        </View>
        <View>
          {!connector.connected ? <Button onPress={() => connector.connect()}>Connect to wallet</Button> : <Button onPress={switchSession}>Switch Session</Button>}
        </View>
      </View>
      <View>
          <CurrencyModal  modalVisible={modalVisible} setModalVisible={setModalVisible}/>
      </View>
    </>  
    
  )
}

const styles=StyleSheet.create({
  container:{
    height: '100%', 
    display: "flex", 
    flexDirection:'column', 
    justifyContent: "space-between", 
    padding: 10
  },
  top:{
    display:'flex', 
    flexDirection:'row', 
    alignItems:'center', 
    justifyContent: "space-between",
    marginTop: 10
  },
  account:{
    display:'flex', 
    flexDirection:'row', 
    alignItems:'center'
  },
  accountText:{display:'flex', flexDirection:'row', width: 80 },
  kill:{color:'red', fontWeight:'bold'},
  pt10:{paddingVertical:10},
  funds:{display:'flex', flexDirection:'row', width:'100%', justifyContent: "space-between", marginTop: 20 },
  fundButton:{width: '48%' },
  connectText: {display: 'flex', justifyContent:'center', alignItems:'center'},
  refreshIcon: {
    width: 20,
    height: 20,
  }
})
export default Home