import React, {useState,useEffect} from 'react'
import {View,Text} from 'react-native'

const HistoryItem = (props) =>{
return(
    <View style={{backgroundColor:'white', borderRadius:2,}}>
        <View style={{display:'flex', flexDirection:'row', }}> 
            <Text style={{width:'20%'}}>From</Text>
            <Text>{props.title.from}</Text>
        </View>
        <View style={{display:'flex', flexDirection:'row', }}> 
            <Text style={{width:'20%'}}>To:</Text>
            <Text >{props.title.to}</Text>
        </View>
        <View style={{display:'flex', flexDirection:'row', }}> 
            <Text style={{width:'20%'}}>Amount</Text>
            <Text >{props.title.value}</Text>
        </View>        
    
    </View>
)
}

export default HistoryItem