import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ToastAndroid } from 'react-native';
// @ts-ignore
import { RNCamera } from 'react-native-camera';
// @ts-ignore
import QRCodeScanner from 'react-native-qrcode-scanner'
import { globalConnector, parseAddress, walletProvider,fundTransfer } from '../utils';
import Input from '../components/TextInput';
import Button from '../components/Button';
import Loader from '../components/Loader';

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
      ToastAndroid.LONG,
      ToastAndroid.BOTTOM,
      25,
      50
    );
  };

  return (
    <View>
      {isLoading && <Loader />}
      <View style={{ padding: 10 }}>
        {!qr ? <>
          <View style={styles.center}>
            <View style={styles.wp20}>
              <Text style={{ paddingRight: 10 }}>From:</Text>
            </View>
            <View style={styles.wp80}>
              <Input style={styles.blackColor} editable={false} value={sender} />
            </View>
          </View>
          <View style={styles.center}>
            <View style={styles.wp20}>
              <Text style={{ paddingRight: 10 }}>To:</Text>
            </View>
            <View style={styles.center}>
              <View style={styles.wp74}>
                <Input style={styles.blackColor} value={receiver} setValue={setReceiver} placeholder='Receiver Address' />
              </View>
              <View style={styles.wp15}>
                <Button onPress={() => setQr(true)}>
                  QR
                </Button>
              </View>
            </View>
          </View>
          <View style={styles.center}>
            <View style={styles.wp20}>
              <Text style={{ paddingRight: 10 }}>Amount:</Text>
            </View>
            <View style={styles.wp80}>
              <Input style={styles.blackColor} setValue={setAmount} value={amount} />
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

        {!qr && <Button onPress={() => StartTransaction()} disabled={!receiver || !sender || !amount ? true : false}>Send</Button>}
        {toast && showToastWithGravity('Transaction successful')}
        {transactionError && !toast && showToastWithGravity('request rejected')}

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
  center:{ display: 'flex', flexDirection: 'row', alignItems: 'center' },
  wp20:{ width: '20%' },
  wp80:{ width: '80%' },
  blackColor: {color:'black'},
  wp15:{width:'15%'},
  wp74:{width:'74%'}
});

export default SendTransaction