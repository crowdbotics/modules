import React, { useState, useEffect } from 'react'
import { globalConnector, walletProvider } from '../utils'
// @ts-ignore
import Web3 from 'web3';
import { Text, SectionList, View, StyleSheet, Image } from 'react-native'
import Loader from '../components/Loader';
// @ts-ignore
import walletIcon from '../assets/wallet.png';

const TransactionHistory = () => {

  const [transactionList, setTransactionList] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    getTransactionHistory()
    return () => {
      setTransactionList([]);
    };
  }, [])


  const getTransactionHistory = async () => {
    const provider = walletProvider()
    provider.enable()
    const web = new Web3(provider)
    var currentBlock = await web.eth.getBlockNumber();
    var n = await web.eth.getTransactionCount(globalConnector._accounts[0], currentBlock);
    var bal = await web.eth.getBalance(globalConnector._accounts[0], currentBlock);
    var tmpTransactionList = JSON.parse(JSON.stringify(transactionList))
    for (var i = currentBlock; i >= 0 && (n > 0 || bal > 0); --i) {
      try {
        setIsLoading(true)
        var block = await web.eth.getBlock(i, true)
        if (block && block.transactions) {
          block.transactions.forEach(async (e) => {
            if (globalConnector._accounts[0] == e.from) {
              if (e.from != e.to)
                bal = bal + (e.value);
              tmpTransactionList.push({
                to: e.to,
                from: e.from,
                value: e.value.toString(10)
              })
              setTransactionList(tmpTransactionList)
              --n;
            }
            if (globalConnector._accounts[0] == e.to) {
              if (e.from != e.to)
                bal = bal - (e.value);
              tmpTransactionList.push({
                to: e.to,
                from: e.from,
                value: e.value.toString(5)
              })
              setTransactionList(tmpTransactionList)
            }
          });
        }
        setIsLoading(false)
      } catch (e) {
        console.error("Error in block " + i, e);
      }
    }
  }
  const Item = ({ title }) => {
    return (
      <View style={styles.walletCard}>
        <View style={styles.walletInner}>
          <Image source={walletIcon} />
          <View style={styles.walletCarder}>
            <Text style={styles.from} numberOfLines={1} ellipsizeMode='middle'>From: {title.from}</Text>
            <Text style={styles.to} numberOfLines={1} ellipsizeMode='middle'>To: {title.to}</Text>
          </View>

        </View>
        <View>
          <Text>
            {parseInt(title.value).toFixed(4)}
          </Text>
        </View>
      </View>

    )
  }


  return (
    <>
      {isLoading && <Loader />}
      <View style={styles.mainPad}>

        {transactionList.length ? <SectionList
          sections={[{
            title: 'Transactions',
            data: transactionList
          }]}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => <Item title={item} />}
          renderSectionHeader={({ section: { title } }) => (
            <Text style={styles.title}>{title}</Text>
          )} /> : null}
      </View>
    </>
  )


}
const styles = StyleSheet.create({
  container: { backgroundColor: 'white', borderRadius: 6, padding: 10, marginVertical: 9 },
  center: { display: 'flex', flexDirection: 'row', },
  wp20: { width: '20%' },
  walletCard:{backgroundColor:'white', borderBottomWidth: 1, borderBottomColor: 'lightgray', height:76, width:"100%", padding:10, display:'flex', flexDirection:'row', alignItems:'center', justifyContent:'space-between' },
  walletInner: {
    display: 'flex', flexDirection: 'row',
  },
  walletCarder: {
    alignSelf: 'center', display: 'flex', flexDirection: 'column',
  },
  from: {
    color: '#26292A', fontSize: 14, marginLeft: 10,width:115
  },
  to: {
    color: '#26292A', fontSize: 14, marginLeft: 10, width: 115
  },
  mainPad: {
    padding: 10,
  },
  title: {
    marginHorizontal: 10, marginVertical: 20, fontSize: 14,
  },
});

export default TransactionHistory