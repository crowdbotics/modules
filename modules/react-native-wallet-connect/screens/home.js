import React, { useEffect, useState } from 'react';
// @ts-ignore
import { useWalletConnect} from '@walletconnect/react-native-dapp';
import { Text, View, TouchableOpacity,StyleSheet, Image} from "react-native"
// @ts-ignore
import {  useFocusEffect } from '@react-navigation/native'
import { globalConnector, setGlobalConnector, switchMetamask, walletProvider } from '../utils';
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

// @ts-ignore
import walletIcon from '../wallet.png';
// @ts-ignore
import icon from '../icon.png';

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
    useEffect(()=>{
      if(connector.connected){
        connector.on("session_update", (error, payload) => {
          getAccount()
          if (error) {
            throw error;
          }
        })
      }
    },[connector])

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

  const handleCurrencyModalItemPress = async (chainId) => {
    await switchMetamask(chainId)
  }
  return (
    <>

      {connector.connected && connectedWallet &&
        <View style={styles.top}>
          <View style={styles.account}>
            <TouchableOpacity onPress={switchCurrencyHandler}>
              <Text style={styles.accountText} numberOfLines={1} ellipsizeMode='middle'>{globalConnector && globalConnector._accounts}</Text>
            </TouchableOpacity>
          </View>
          <View style={[styles.pt10, styles.balance]}>
          <TouchableOpacity style={{ marginLeft: 3 }} onPress={async () => await getAccount()}>
              <Image style={styles.refreshIcon} source={refreshIcon} />
            </TouchableOpacity>
            <View>
              <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{balance ? `${balance}` : <ShimmerPlaceHolder style={{ borderRadius: 4, }} width={50} height={10} LinearGradient={LinearGradient} />}</Text>
              <Text style={{ color: '#7C7C7C', fontSize: 14, alignSelf:'flex-end', textAlign:'right' }}>Balance</Text>
            </View>


          </View>
        </View>
      }

      <View style={connector.connected ? styles.container : styles.homeContainer}>
        <View>
          { connector.connected && connectedWallet && <>


            <View>
              <View style={{display:'flex', flexDirection:'row', justifyContent:'space-between', marginBottom:20, marginTop:10}}>
                <Text>Wallet</Text>
                <Text>Balance</Text>
              </View>
              <View style={styles.walletCard}>
                <View style={{display:'flex', flexDirection:'row',}}>
                  <Image source={icon}/>
                  <TouchableOpacity onPress={()=>props.navigation.navigate('SendTransaction')} style={{alignSelf:'center'}}>
                    <Text style={{color:'#26292A', fontSize:14, marginLeft:10, alignSelf:'center'}}>Metamask</Text>
                  </TouchableOpacity>
                  
                </View>
                <View>
                  <Text>
                    {balance}
                  </Text>
                </View>
              </View>
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
        {
          !connector.connected && <View style={styles.connectText}>
            
          {!connector.connected && <Image style={{marginBottom:10}} source={walletIcon} />}
          {!connector.connected && <Text style={styles.fwb}>Connect your Wallet</Text>}
      </View>
        }    
        <View style={styles.btn}>
          {!connector.connected ? <Button onPress={() => connector.connect()}>Connect to wallet</Button> :
                <Button onPress={() => connector.killSession()} style={styles.kill}>Kill Session</Button>}
        </View>
      </View>
      {/* <Button onPress={switchSession}>Switch Session</Button> */}
      <View>
          <CurrencyModal modalVisible={modalVisible} setModalVisible={setModalVisible} onItemPress={handleCurrencyModalItemPress}/>
      </View>
    </>  
    
  )
}

const styles=StyleSheet.create({
  container:{
    height: '85%', 
    display: "flex", 
    flexDirection:'column', 
    justifyContent: "space-between", 
    padding: 10,
    borderTopRightRadius:10,
    borderTopLeftRadius:10,
  },
  homeContainer: {
    height: '100%', 
    display: "flex", 
    flexDirection:'column', 
    justifyContent: "space-between", 
    padding: 10,
    borderTopRightRadius:10,
    borderTopLeftRadius:10,
  },
  top:{
    display:'flex', 
    flexDirection:'row', 
    justifyContent: "space-between",
    backgroundColor:'white',
    height:"15%",
    padding:10
  },
  account:{
    display:'flex', 
    flexDirection:'row',
    paddingTop:30, 
  },
  accountText:{display:'flex', flexDirection:'row', width: 80 },
  kill:{backgroundColor:'red', color:'white', fontWeight:'bold', marginRight:'15'},
  pt10:{paddingVertical:10},
  funds:{display:'flex', flexDirection:'row', width:'100%', justifyContent: "space-between", marginTop: 20 },
  fundButton:{width: '48%' },
  connectText: {display: 'flex', justifyContent:'center', alignItems:'center'},
  refreshIcon: {
    width: 20,
    height: 20,
  },
  balance: {display: "flex", flexDirection: "row", marginTop:15},
  fwb:{fontWeight:'bold'},
  btn: {textAlign:'center' ,marginBottom:20, paddingHorizontal:30},
  walletCard:{backgroundColor:'white', borderRadius:10, height:76, width:"100%", padding:10, display:'flex', flexDirection:'row', alignItems:'center', justifyContent:'space-between' }
})
export default Home