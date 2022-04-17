import React, { useEffect, useState } from 'react';
// @ts-ignore
import { useWalletConnect } from '@walletconnect/react-native-dapp';
import { Text, View, TouchableOpacity, StyleSheet, Image } from "react-native"
// @ts-ignore
import { useFocusEffect } from '@react-navigation/native'
import { getBalance, globalConnector, setGlobalConnector, switchMetamask } from '../utils';
import Button from '../components/Button';
// @ts-ignore
import refreshIcon from "../assets/refresh-icon.png"

// @ts-ignore
import LinearGradient from 'react-native-linear-gradient';
// @ts-ignore
import ShimmerPlaceHolder from 'react-native-shimmer-placeholder'
import CurrencyModal from '../components/CurrencyModal';

// @ts-ignore
import walletIcon from '../assets/wallet.png';

const Home = (props) => {
  const connector = useWalletConnect();
  const [connectedWallet, setConnectedWallet] = useState(null)
  const [isSwitch, setIsSwitch] = useState(false)
  const [changeWallet, setChangeWallet] = useState(false)
  const [balance, setBalance] = useState(null)
  const [modalVisible, setModalVisible] = useState(false)

  useFocusEffect(
    React.useCallback(() => {
      if (connector._peerMeta) {
        setConnectedWallet(connector._peerMeta)
      }
      if (connector.connected) {
        setIsSwitch(false)
        setGlobalConnector(connector);
      }
    }, [connector])
  )

  useEffect(() => {
    if (isSwitch) {
      if (!connector.connected) {
        connector.connect()
      }
    }
  }, [isSwitch])

  const switchSession = async () => {
    await connector.killSession()
    setBalance(null)
    setGlobalConnector(null)
    setChangeWallet(true)
  }

  useEffect(() => {
    if (!connector.connected && changeWallet) {
      setIsSwitch(true)
      setChangeWallet(false)
    }
  }, [connector])

  useFocusEffect(
    React.useCallback(() => {
      if (globalConnector) {
        getAccount()
      }
    }, [])
  )
  useEffect(() => {
    if (globalConnector) {
      getAccount()
    }
  }, [globalConnector])
  useEffect(() => {
    if (connector.connected) {
      connector.on("session_update", (error, payload) => {
        getAccount()
        if (error) {
          throw error;
        }
      })
    }
  }, [connector])

  const getAccount = () => {
    setBalance(null)
    getBalance().then(res => setBalance(res))
  }

  const switchCurrencyHandler = () => {
    setModalVisible(!modalVisible)
  }

  const handleCurrencyModalItemPress = async (chainId) => {
    await switchMetamask(chainId)
  }
  return (
    <>

      {connector.connected && connectedWallet &&
        <View style={styles.top}>
          <View style={[styles.account, {display: 'flex', flexDirection: 'column'}]}>
            <TouchableOpacity onPress={switchCurrencyHandler}>
              <Text style={styles.accountText} numberOfLines={1} ellipsizeMode='middle'>{globalConnector && globalConnector._accounts}</Text>
            </TouchableOpacity>
            <View style={{marginTop: 25, width: 120}}>
              <Button height={40} backgroundColor="#F1F1F1" color="#000000" onPress={switchSession}>Switch wallet</Button>
            </View>
          </View>
          <View style={[styles.pt10, styles.balance]}>
            <TouchableOpacity style={{ marginRight: 5, marginTop: 4 }} onPress={async () => await getAccount()}>
              <Image style={styles.refreshIcon} source={refreshIcon} />
            </TouchableOpacity>
            <View>
              <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{balance ? `${balance}` : <ShimmerPlaceHolder style={{ borderRadius: 4, }} width={50} height={15} LinearGradient={LinearGradient} />}</Text>
              <Text style={{ color: '#7C7C7C', fontSize: 14, alignSelf: 'flex-end', textAlign: 'right' }}>Balance</Text>
            </View>
          </View>
        </View>
      }

      <View style={connector.connected ? styles.container : styles.homeContainer}>
        <View>
          {connector.connected && connectedWallet && <>
            <View>
              <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginBottom: 28, marginTop: 14, paddingHorizontal: 23 }}>
                <Text style={{ fontSize: 16 }}>Wallet</Text>
                <Text style={{ fontSize: 16 }}>Balance</Text>
              </View>
              <TouchableOpacity style={styles.walletCard} onPress={() => props.navigation.navigate('MyWallet')}>
                <View style={{ display: 'flex', flexDirection: 'row', }}>
                  <Image source={walletIcon} />
                  <Text style={{ color: '#26292A', fontSize: 14, marginLeft: 10, alignSelf: 'center' }}>{connectedWallet.name}</Text>
                </View>
                <View>
                  <Text>
                    {balance}
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </>}
        </View>
        {
          !connector.connected && <View style={styles.connectText}>

            {!connector.connected && <Image style={{ marginBottom: 10 }} source={walletIcon} />}
            {!connector.connected && <Text style={styles.fwb}>Connect your Wallet</Text>}
          </View>
        }
        <View style={styles.btn}>
          {!connector.connected ? <Button onPress={() => connector.connect()}>Connect to wallet</Button> :
            <Button onPress={() => connector.killSession()} style={styles.kill}>Kill Session</Button>}
        </View>
      </View>
      <View>
        <CurrencyModal modalVisible={modalVisible} setModalVisible={setModalVisible} onItemPress={handleCurrencyModalItemPress} />
      </View>
    </>

  )
}

const styles = StyleSheet.create({
  container: {
    height: '75%',
    display: "flex",
    flexDirection: 'column',
    justifyContent: "space-between",
    padding: 10,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    backgroundColor: '#F1F1F1'
  },
  homeContainer: {
    height: '100%',
    display: "flex",
    flexDirection: 'column',
    justifyContent: "space-between",
    padding: 10,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    backgroundColor: '#F1F1F1'
  },
  top: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: "space-between",
    height: '25%',
    padding: 10
  },
  account: {
    display: 'flex',
    flexDirection: 'row',
    paddingTop: 30,
  },
  accountText: { display: 'flex', flexDirection: 'row', width: 80 },
  kill: { backgroundColor: 'red', color: 'white', fontWeight: 'bold', marginRight: '15' },
  pt10: { paddingVertical: 10 },
  funds: { display: 'flex', flexDirection: 'row', width: '100%', justifyContent: "space-between", marginTop: 20 },
  fundButton: { width: '48%' },
  connectText: { display: 'flex', justifyContent: 'center', alignItems: 'center' },
  refreshIcon: {
    width: 20,
    height: 20,
  },
  balance: { display: "flex", flexDirection: "row", marginTop: 15 },
  fwb: { fontWeight: 'bold' },
  btn: { textAlign: 'center', marginBottom: 20, paddingHorizontal: 30 },
  walletCard: { backgroundColor: 'white', borderRadius: 10, height: 76, width: "100%", padding: 10, display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }
})
export default Home