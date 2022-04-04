import React, { useState, useEffect } from 'react'
// @ts-ignore
import QRCode from 'react-native-qrcode-svg'
import { View } from 'react-native'

import { globalConnector, } from '../utils';
// @ts-ignore
import Web3 from 'web3';

// @ts-ignore
import WalletConnectProvider from '@walletconnect/web3-provider';
// @ts-ignore

const ReceiveTransaction = () => {

  const [account,setAccount]= useState(null)

  useEffect(() => {
    getAccount()
  }, [])
  
  const getAccount = async () => {
    const provider = new WalletConnectProvider({
      rpc:{
        97: 'https://data-seed-prebsc-1-s1.binance.org:8545/',
      },
      chainId:97,
      connector: globalConnector,
      qrcode: false,
    })
    const accountAddress=provider.connector._accounts[0]
    const chainId=provider._chainID
    console.log(`Ethereum: ${accountAddress}@${chainId}`);
    setAccount(`Ethereum: ${accountAddress}@${chainId}`)
    // await provider.enable();
    // const ethers_provider = await new providers.Web3Provider(provider);
    // const signer = ethers_provider.getSigner();

    // const web = new Web3(provider);

    // web.eth.getAccounts((err, res) => {
    //   console.log(err, '=============',res)
    //   web.eth.getBalance(res[0], (error,result)=>{
    //     console.log(error,'aaaaaaaaaaa',result);
    //   })
    // })
  }

  return (
    <View>
      {account &&
      <QRCode
        value={account}
        size={200}/>
      }
    </View>
  )
}

export default ReceiveTransaction
