import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
// @ts-ignore
import Web3 from 'web3';
// @ts-ignore
import { providers } from 'ethers';
// @ts-ignore
import WalletConnectProvider from '@walletconnect/web3-provider';
// @ts-ignore
import { RNCamera } from 'react-native-camera';
// @ts-ignore
import QRCodeScanner from 'react-native-qrcode-scanner'
import { globalConnector, parseAddress } from '../utils';
import Input from '../components/TextInput';
import Button from '../components/Button';
import Loader from '../components/Loader';

const SendTransaction = (props) => {
  const [sender, setSender] = useState('')
  const [qr, setQr] = useState(false)
  const [receiver, setReceiver] = useState('')
  const [amount, setAmount] = useState('0.01')
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    setSender(globalConnector._accounts[0])
  }, [])

  const onSuccess = e => {
    const address = parseAddress(e.data).address
    setReceiver(address)
    setQr(false)
  }


  const StartTransaction = async () => {

    setIsLoading(true)
    const provider = new WalletConnectProvider({
      rpc: {
        97: 'https://data-seed-prebsc-1-s1.binance.org:8545/',
      },
      chainId: 97,
      connector: globalConnector,
      qrcode: false,
    })

    await provider.enable();
    const ethers_provider = await new providers.Web3Provider(provider);
    const signer = ethers_provider.getSigner();

    const web = new Web3(provider);

    const tx = {
      from: sender,
      to: receiver,
      gas: 250000,
      value: web.utils.toWei(amount),
    }
    web.eth.sendTransaction(tx, (err, transactionHash) => {
      setIsLoading(false)
    })
  }

  return (
    <View>
      {isLoading && <Loader />}
      <View style={{ padding: 10 }}>
        {!qr ? <>
          <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
            <View style={{ width: '20%' }}>
              <Text style={{ paddingRight: 10 }}>From:</Text>
            </View>
            <View style={{ width: '80%' }}>
              <Input style={{ color: 'black' }} editable={false} value={sender} />
            </View>
          </View>
          <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
            <View style={{ width: '20%' }}>
              <Text style={{ paddingRight: 10 }}>To:</Text>
            </View>
            <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', }}>
              <View style={{ width: '74%' }}>
                <Input style={{ color: 'black' }} value={receiver} setValue={setReceiver} placeholder='Receiver Address' />
              </View>
              <View style={{ width: '15%' }}>
                <Button onPress={() => setQr(true)}>
                  QR
                </Button>
              </View>
            </View>
          </View>
          <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
            <View style={{ width: '20%' }}>
              <Text style={{ paddingRight: 10 }}>Amount:</Text>
            </View>
            <View style={{ width: '80%' }}>
              <Input style={{ color: 'black' }} setValue={setAmount} value={amount} />
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

        {!qr && <Button onPress={() => StartTransaction()}>Send</Button>}

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
  }
});

export default SendTransaction