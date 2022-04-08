import React from 'react'
import {View, FlatList,Modal,StyleSheet} from 'react-native'
import CurrencyList from '../CurrencyList'
import { currencyData } from '../../utils'

const CurrencyModal= ({modalVisible,setModalVisible,currency,setTestCurrency}) =>{
    const renderItem=({item})=>{
        return(
          <View style={styles.modalView}> 
            <CurrencyList data={item} setModalVisible={setModalVisible} modalVisible={modalVisible} setTestCurrency={setTestCurrency}/>
          </View>  
        )
        }
    return(
      <View style={{display:'flex',flexDirection:'column', justifyContent:'center', alignItems:'center'}}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
          setModalVisible(!modalVisible);
          }}
          >
          <View style={styles.centeredView}>
            <FlatList
              data={currencyData}
                renderItem={renderItem}
                keyExtractor={item => item.chainId}
            />
          </View>
        </Modal> 
      </View>  
    )
}
const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
    backgroundColor:'grey',

  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    color:"blue",
    borderRadius: 20,
    padding: 15,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  }
})

export default CurrencyModal