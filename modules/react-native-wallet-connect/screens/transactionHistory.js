import React, { useState, useEffect } from 'react'
import { globalConnector, walletProvider } from '../utils'
// @ts-ignore
import Web3 from 'web3';
import { Text, SectionList, View,StyleSheet } from 'react-native'
import Loader from '../components/Loader';

const TransactionHistory = () => {

  const [transactionList, setTransactionList] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    setIsLoading(true)
    getTransactionHistory()
  }, [])
  

  const getTransactionHistory = async () => {
    const provider = walletProvider()
    provider.enable()
    const web = new Web3(provider)
    let block = await web.eth.getBlock('latest');
    let number = block.number;
    let transactions = block.transactions;
    
    let transaction = []
    if (block != null && block.transactions != null) {
       for (let txHash of block.transactions) {

        try {
          let tx = await web.eth.getTransaction(txHash);
            transaction.push({...tx,value:await web.utils.fromWei(tx.value, "ether")})
          
        } catch (error) {
          console.log(error);
        }
      }
      setTransactionList(transaction)
      setIsLoading(false)
    }
  }
  
  // if (address == tx.to.toLowerCase()) {
  //     console.log("from: " + tx.from.toLowerCase() + " to: " + tx.to.toLowerCase() + " value: " + tx.value);
  // }
  const Item = ({title}) =>{
    return(
    
        
        <View style={styles.container}>
            <View style={styles.center}> 
                <Text style={styles.wp20}>From</Text>
                <Text style={{width:100}} numberOfLines={1} ellipsizeMode='middle'>{title.from}</Text>
            </View>
            <View style={styles.center}> 
                <Text style={styles.wp20}>To:</Text>
                <Text style={{width:100}} numberOfLines={1} ellipsizeMode='middle'>{title.to}</Text>
            </View>
            <View style={styles.center}> 
                <Text style={styles.wp20}>Amount</Text>
                <Text>{parseInt(title.value).toFixed(4)}</Text>
            </View>        
        
        </View>
       
    )
    }


  return (
    <>
      {isLoading && <Loader/>}
      <View style={{padding:10}}>
        
        {transactionList.length ? <SectionList
          sections={[{
            title: 'Transactions',
            data: transactionList
          }]}
          keyExtractor={(item, index) => item + index}
          renderItem={({ item }) => <Item title={item} />}
          renderSectionHeader={({ section: { title } }) => (
            <Text>{title}</Text>
          )} /> : null}
      </View>
    </>  
  )


}
const styles = StyleSheet.create({
  container:{backgroundColor:'white', borderRadius:6, padding:10, marginVertical:9},
  center:{display:'flex', flexDirection:'row', },
  wp20:{ width: '20%' }

});

export default TransactionHistory