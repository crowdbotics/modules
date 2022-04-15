import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ToastAndroid, Image } from 'react-native';
// @ts-ignore
import { RNCamera } from 'react-native-camera';
// @ts-ignore
import QRCodeScanner from 'react-native-qrcode-scanner'
import { globalConnector, parseAddress, walletProvider,fundTransfer } from '../utils';
import Input from '../components/TextInput';
import Button from '../components/Button';
import Loader from '../components/Loader';
import ShimmerPlaceholder from 'react-native-shimmer-placeholder';
// @ts-ignore
import refreshIcon from '../refresh-icon.png';

// @ts-ignore
import qrIcon from '../qr.png'

const SendTransaction = (props) => {
  const [sender, setSender] = useState('')
  const [qr, setQr] = useState(false)
  const [receiver, setReceiver] = useState('')
  const [amount, setAmount] = useState('0.01')
  const [isLoading, setIsLoading] = useState(false)
  const [toast, setToast]= useState(false)
  const [transactionError, setTransactionError]= useState(false)

  useEffect(()=>{
    if(toast && !isLoading){
      props.navigation.goBack()
    }
  },[toast])

  useEffect(() => {
    setSender(globalConnector._accounts[0])
    setToast(false)
    setTransactionError(false)

  }, [])

  const onSuccess = e => {
    const address = parseAddress(e.data).address
    setReceiver(address)
    setQr(false)
  }

  const StartTransaction = async () => {

    setIsLoading(true)
    const provider = walletProvider()
    fundTransfer(provider,sender,receiver,amount).then((res)=>{
      setIsLoading(false)
      setToast(true)
    }).catch((e)=>{
      setIsLoading(false)
      setTransactionError(true)
    })
    
  }

  const showToastWithGravity = (message) => {
    ToastAndroid.showWithGravityAndOffset(
      message,
      ToastAndroid.SHORT,
      ToastAndroid.BOTTOM,
      25,
      50
    );
  };

  return (
    <View style={{backgroundColor:'white', height:'100%' ,display:'flex', justifyContent:'space-between'}}>
      {/* <View style={styles.top}>
        <View style={styles.account}>
          <TouchableOpacity >
            <Text style={styles.accountText} numberOfLines={1} ellipsizeMode='middle'>{globalConnector && globalConnector._accounts}</Text>
          </TouchableOpacity>
        </View>
        <View style={[styles.pt10, styles.balance]}>
          <TouchableOpacity style={{ marginLeft: 3 }} onPress={async () => await getAccount()}>
            <Image style={styles.refreshIcon} source={refreshIcon} />
          </TouchableOpacity>
          <View>
            <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{balance ? `${balance}` : <ShimmerPlaceholder style={{ borderRadius: 4, }} width={50} height={10} LinearGradient={LinearGradient} />}</Text>
            <Text style={{ color: '#7C7C7C', fontSize: 14, alignSelf: 'flex-end', textAlign: 'right' }}>Balance</Text>
          </View>


        </View>
      </View> */}
      {/* <View style={{display:'flex', flexDirection:'row', justifyContent:'space-between', alignItems:'center', backgroundColor:'#F1F1F1'}}>
        <View>
          <TouchableOpacity>
            <Text>Send</Text>
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity>
            <Text>Receive</Text>
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity>
            <Text>History</Text>
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity>
            <Text>History</Text>
          </TouchableOpacity>
        </View>
        
      </View> */}
     
      {isLoading && <Loader />}
      <View style={{ padding: 10}}>
        <>
          {!qr ? <>
            <View style={styles.center}>
              <View style={styles.walletCard}>
                <View style={{alignSelf:'center', display: 'flex', flexDirection:'column'}}>
                  <Text style={{fontSize: 24, fontWeight: 'bold' }}>Total</Text>
                  <Text style={{color: '#7C7C7C', fontSize:12}}>Available to send</Text>
                </View>
                <View>
                  <Text style={{fontSize: 23, fontWeight: '800' }}>
                    123123
                  </Text>
                </View>
              </View>
              <View>
                <Text style={{ paddingLeft: 10, paddingBottom:6 }}>From</Text>
              </View>
              <View style={styles.blackColor} >
                <Input editable={false} value={sender} />
              </View>
            </View>
            <View style={styles.center}>
              <View >
                <Text style={{ paddingLeft: 10, paddingBottom:3}}>To</Text>
              </View>
              <View style={styles.center}>
                <View style={[styles.blackColor,{display:'flex', flexDirection:'row', justifyContent:'space-between', alignItems:'center'}]}>
                  <View>
                  <Input value={receiver} setValue={setReceiver} placeholder='Receiver Address' />
                  </View>
                  <View style={{paddingRight:10,}}>
                  <TouchableOpacity onPress={() => setQr(true)}>
                    <Image
                    source={qrIcon}
                    />
                  </TouchableOpacity>
                  </View>
                </View>

              </View>
            </View>
            <View style={styles.center}>
              <View>
                <Text style={{ paddingLeft: 10, paddingBottom:6 }}>Amount</Text>
              </View>
              <View style={styles.blackColor}>
                <Input setValue={setAmount} value={amount} />
              </View>
            </View>
          </> : <QRCodeScanner
            onRead={onSuccess}
            flashMode={RNCamera.Constants.FlashMode.torch}
            topContent={
              <Text style={styles.centerText}>
                Scan QR code
              </Text>
            }
            bottomContent={
              <TouchableOpacity style={styles.buttonTouchable}>
                <Text style={styles.buttonText}>OK. Got it!</Text>
              </TouchableOpacity>
            }
          />
          }

          {toast && showToastWithGravity('Transaction successful')}
          {transactionError && !toast && showToastWithGravity('request rejected')}
        </>

      </View>
      <View style={{paddingHorizontal:30, marginBottom:30}}>
      {!qr && <Button onPress={() => StartTransaction()} disabled={!receiver || !sender || !amount ? true : false}>Send</Button>}
      </View>
    </View>

  )
}

const styles = StyleSheet.create({
  centerText: {
    flex: 1,
    fontSize: 18,
    padding: 32,
    color: '#777'
  },
  textBold: {
    fontWeight: '500',
    color: '#000'
  },
  buttonText: {
    fontSize: 21,
    color: 'rgb(0,122,255)'
  },
  buttonTouchable: {
    padding: 16
  },
  center:{ display: 'flex', flexDirection: 'column', paddingTop: 6},
  blackColor: {color:'black', borderColor:'#C4C4C4', borderRadius:10, borderWidth:0.5 },
  wp74:{width:'74%'},
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
  refreshIcon: {
    width: 20,
    height: 20,
  },
  pt10:{paddingVertical:10},
  balance: {display: "flex", flexDirection: "row", marginTop:15},
  walletCard: {
    backgroundColor: 'white',
    borderRadius: 10,
    height: 76,
    width: "100%",
    padding: 10,
    marginBottom: 20,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: 'lightgray',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.23,
    shadowRadius: 1.62,
    elevation: 15,
  }
});

export default SendTransaction