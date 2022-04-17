import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import { verifyAppleIAPReceipt, fetchAppleIAPProducts } from "./api";
import RNIap from 'react-native-iap';

const InappPurchase = () => {

  const [value, setValue] = useState({
    products: [],
    apple_iap_product_ids: []
  });

  const [apple_iap_product_ids, set_apple_iap_product_ids] = useState([])

  const productIds = Platform.select({
    ios: apple_iap_product_ids,
    android: [
      'com.example.coins100'
    ]
  });

  useEffect(async () => {
    RNIap.initConnection();
    await getAppleIAPProductIds();
    getAvailablePurchases();
  }, [])

  const getProducts = async () => {
    const products = await RNIap.getProducts(productIds);
    console.log("products", products)
    setValue({ ...value, products: products })
  }

  const getAppleIAPProductIds = async () => {
    var {status, data} = await fetchAppleIAPProducts();
    if (data){
      console.log("data", data)
      data.forEach((obj)=>{
        apple_iap_product_ids.push(obj.product_id)
      });
      console.log("value", apple_iap_product_ids)
      getProducts();
      
    }
  }

  const getAvailablePurchases = async () => {
    try {
      const purchases = await RNIap.getAvailablePurchases();
      // TODO: use this function to get the purchases from apple server and verify them through our server
      console.log('Available purchases :: ', purchases);
      if (purchases && purchases.length > 0) {
        console.log('Available purchases :: ', purchases);
        // This zero index to be replaced or adjusted by requirements if the app only has one type of inapp payment plan then 0 is enough
        // however if there are multiple then you might want to iterate of verify in bulk.
        verifyAppleIAPReceipt(purchases[0])
      } else {
        // Alert.alert('Restore Error', 'No previous purchase found')
      }
    } catch (err) {
      console.log('getAvailablePurchases err', err);
      // this._restorePurchaseButton.hideLoading();
      Alert.alert('Restore Error', err.message)

    }
  };


  const requestPurchase = async (sku) => {
    try {
      let res = await RNIap.requestPurchase(sku);
      console.log('requestPurchase res', res);
      verifyAppleIAPReceipt(res)
    } catch (err) {
      console.log('requestPurchase err', err);
      Alert.alert('Purchase Error', err.message)
    }
  };

    return (
        <View>
            <Text style={[styles.text, styles.firstTitle]}>Apple Products</Text>
            <FlatList
                data={value.products}
                renderItem={({ item }) => (
                    <View style={styles.listItemContainer}>
                        <Text>{item.title}</Text>
                        <Text>{item.description}</Text>
                        <Text>{item.price}</Text>
                        <Text>{item.type}</Text>
                        <TouchableOpacity onPress={async () => {
                            requestPurchase(item.productId);
                        }} style={[styles.button,]}>
                            <Text style={styles.buttonText}>{item.type == 'iap' ? "Buy" : "Subscribe"}</Text>
                        </TouchableOpacity>
                    </View>
                )}
                keyExtractor={item => item.productId}
            />
        </View>
    )

}

const styles = StyleSheet.create({
    hr: {
        marginTop: 20,
        marginBottom: 20,
        borderBottomColor: "black",
        borderBottomWidth: 1,
      },
      container: {
        flex: 1,
        height: 100,
        padding: 13,
      },
      text: {
        color: "black",
        fontSize: 20,
      },
      payButton: {
        width: '40%',
        height: 50,
        alignSelf: 'center',
      },
      button: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 4,
        elevation: 3,
        backgroundColor: 'black',
        margin: 5,
        height: 50,
      },
      buttonText: {
        fontSize: 16,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: 'white',
      },
      payNow: { 
        width: '40%', 
        alignSelf: 'center', 
        backgroundColor: '#016f70'
      },
      inputField: {
        padding: 15, 
        borderWidth: 1, 
        fontSize: 18, 
        borderRadius: 8, 
        backgroundColor: "#fff"
      },
      bold: {
        fontWeight: "600"
      },
      listItemContainer: {
        padding: 10, 
        margin: 10, 
        backgroundColor: "#c9c9c9c9", 
        borderRadius: 10
      },
      firstTitle: {
        paddingHorizontal: 15, 
        paddingVertical: 10
      }
})

export default InappPurchase;