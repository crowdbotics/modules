import React from 'react'
import {Pressable,View,Text} from 'react-native'
import { switchMetamask } from '../../utils'
// @ts-ignore
import {utils} from 'ethers'
const CurrencyList=({data,setModalVisible,modalVisible})=>{

    const pressHandler=async()=>{

       setModalVisible(!modalVisible)
      
       await switchMetamask(utils.hexValue(data.chainId))
    }
    return(
      <View style={{padding:12}}>
                    
        {modalVisible && <Pressable
          style={{}}
          onPress={pressHandler}
        >
          <Text>{data.title}</Text>
        </Pressable>}
      </View>
    )

}
export default CurrencyList