import React, {useState,useEffect} from 'react';
import {View, Text,TouchableOpacity, TextInput,Button,StyleSheet} from 'react-native' ;
// @ts-ignore
import Web3 from 'web3';
// @ts-ignore
import {ethers,providers} from 'ethers';
// @ts-ignore
import WalletConnectProvider from '@walletconnect/web3-provider';
// @ts-ignore
import { RNCamera } from 'react-native-camera';
// @ts-ignore
import QRCodeScanner from 'react-native-qrcode-scanner'
import { globalConnector } from './home';


const SendTransaction= (props)=>{
    const {data}=props.route.params
    const [sender,setSender]=useState('')
    const [qr,setQr]=useState(false)
    const [reciever, setReciever]= useState('')
    const [amount,setAmount] = useState('')

    useEffect(()=>{
      setSender(data)
      console.log('globalConnector', globalConnector)
    }, [])

    const onSuccess = e => {
      console.log(e)
      setReciever(e.data)
      setQr(false)  
    }


    const StartTransaction = async () =>{


      const provider = new WalletConnectProvider({
        rpc:{
          97: 'https://data-seed-prebsc-1-s1.binance.org:8545/',
        },
        chainId:97,
        connector: globalConnector,
        qrcode: false,
      })

      await provider.enable();
      const ethers_provider = await new providers.Web3Provider(provider);
      console.log('ethers_provider', ethers_provider)
      const signer = ethers_provider.getSigner();

      const web = new Web3(provider);


      const tx = {
        from: sender,
        to: "0x2784BdD74FC4E0FA6eDDfE2d6e77B60B1936c7DC",
        gas:250000,
        value:web.utils.toWei(String(0.01)),
      }

      const txHash = await web.eth.sendTransaction(tx)


    }

    console.log(props.route.params.data)
    return(
        <View style={{padding:10}}>
          {!qr ? <>
            <View style={{display:'flex', flexDirection:'row',alignItems:'center',padding:10}}>
              <Text>From:</Text>
              <TextInput style={{width:'90%', backgroundColor:'white', color:'black'}}>{sender}</TextInput>
            </View>
            <View style={{display:'flex', flexDirection:'row',alignItems:'center', justifyContent:'space-between',padding:10}}>
              <Text>To:</Text>
              <View style={{display:'flex',flexDirection:'row',alignItems:'center', width:'90%', }}>
                <TextInput style={{width:'90%', backgroundColor:'white', color:'black'}}>{reciever}</TextInput>
                <TouchableOpacity onPress={()=>setQr(true)}>
                  <Text style={{color:'red'}}>QR</Text>
                </TouchableOpacity>
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
        
          <TouchableOpacity >
            <Text style={{color:'red'}} onPress={()=>StartTransaction()}>Send</Text>
          </TouchableOpacity>
          
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