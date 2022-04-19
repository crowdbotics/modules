import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ToastAndroid, Image } from 'react-native';
// @ts-ignore
import { RNCamera } from 'react-native-camera';
// @ts-ignore
import QRCodeScanner from 'react-native-qrcode-scanner'
import { globalConnector, parseAddress, walletProvider, fundTransfer, getBalance } from '../utils';
import Input from '../components/TextInput';
import Button from '../components/Button';
import Loader from '../components/Loader';
// @ts-ignore
import LinearGradient from 'react-native-linear-gradient';
// @ts-ignore
import ShimmerPlaceHolder from 'react-native-shimmer-placeholder'
// @ts-ignore
import qrIcon from '../assets/qr.png'

const SendTransaction = (props) => {
  const [sender, setSender] = useState('')
  const [qr, setQr] = useState(false)
  const [receiver, setReceiver] = useState('')
  const [amount, setAmount] = useState('0.01')
  const [isLoading, setIsLoading] = useState(false)
  const [toast, setToast] = useState(false)
  const [transactionError, setTransactionError] = useState(false)
  const [balance, setBalance] = useState(null)

  useEffect(() => {
    setSender(globalConnector._accounts[0])
    setToast(false)
    setTransactionError(false)
    getBalance().then(res => setBalance(res))
  }, [])

  const onSuccess = e => {
    const address = parseAddress(e.data).address
    setReceiver(address)
    setQr(false)
  }

  const StartTransaction = async () => {
    setIsLoading(true)
    const provider = walletProvider()
    fundTransfer(provider, sender, receiver, amount).then((res) => {
      setIsLoading(false)
      setToast(true)
      setBalance(null)
      getBalance().then(res => setBalance(res))
    }).catch((e) => {
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
    <View style={styles.main}>
      {isLoading && <Loader />}
      <View style={styles.mainPad}>
        <>
          {!qr ? <>
            <View style={styles.walletCard}>
              <View style={styles.wallet}>
                <Text style={styles.totalText}>Total</Text>
                <Text style={styles.availableText}>Available to send</Text>
              </View>
              <View>
                <Text style={styles.balanceText}>{balance ? `${balance}` : <ShimmerPlaceHolder style={{ borderRadius: 4, }} width={50} height={15} LinearGradient={LinearGradient} />}</Text>
              </View>
            </View>
            <View style={styles.center}>
              <View style={styles.from}>
                <Text>From</Text>
              </View>
              <View style={styles.blackColor} >
                <Input editable={false} value={sender} />
              </View>
            </View>
            <View style={styles.center}>
              <View style={styles.to}>
                <Text>To</Text>
              </View>
              <View style={styles.center}>
                <View style={[styles.blackColor, styles.inputField]}>
                  <View style={styles.receiver}>
                    <Input value={receiver} setValue={setReceiver} placeholder='Receiver Address' />
                  </View>
                  <View style={styles.qrCode}>
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
              <View style={styles.amountText}>
                <Text >Amount</Text>
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

          {toast && showToastWithGravity('Transaction has been submitted')}
          {transactionError && !toast && showToastWithGravity('request rejected')}
        </>

      </View>
      <View style={styles.bottomBtn}>
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
  center: { display: 'flex', flexDirection: 'column', paddingTop: 6 },
  blackColor: { color: 'black', borderColor: '#C4C4C4', borderRadius: 10, borderWidth: 0.5 },
  wp74: { width: '74%' },
  top: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: "space-between",
    backgroundColor: 'white',
    height: "15%",
    padding: 10
  },
  account: {
    display: 'flex',
    flexDirection: 'row',
    paddingTop: 30,
  },
  accountText: { display: 'flex', flexDirection: 'row', width: 80 },
  refreshIcon: {
    width: 20,
    height: 20,
  },
  pt10: { paddingVertical: 10 },
  balance: { display: "flex", flexDirection: "row", marginTop: 15 },
  walletCard: {
    backgroundColor: 'white',
    borderRadius: 10,
    height: 76,
    width: "100%",
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginTop: 25,
    marginBottom: 25,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: 'rgba(0,0,0,0.5)',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.23,
    shadowRadius: 1.62,
    elevation: 15,
  },
  main: {
    backgroundColor: 'white', height: '100%', display: 'flex', justifyContent: 'space-between',
  },
  wallet: {
    alignSelf: 'center', display: 'flex', flexDirection: 'column', 
  },
  totalText: {
    fontSize: 24, fontWeight: 'bold',
  },
  availableText: {
    color: '#7C7C7C', fontSize: 12,
  },
  balanceText: {
    fontSize: 23, fontWeight: '800',
  },
  from: {
    paddingLeft: 10, paddingBottom: 6,
  },
  to: {
    paddingLeft: 10, paddingBottom: 6, 
  },
  inputField: {
    display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
  },
  mainPad: {
    padding: 10 
  },
  receiver: {
    width: "90%",
  },
  qrCode: {
    paddingRight: 10, width: "10%",
  },
  amountText: {
    paddingLeft: 10, paddingBottom: 6,
  },
  bottomBtn: {
    paddingHorizontal: 30, marginBottom: 30,
  },
});

export default SendTransaction