import React from 'react'
import {Pressable,View,Text} from 'react-native'
const CurrencyList=({data,setModalVisible, modalVisible,setTestCurrency})=>{

    const pressHandler=()=>{
       setModalVisible(!modalVisible)
       setTestCurrency(data)
    }
    return(
      <View>
                    
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