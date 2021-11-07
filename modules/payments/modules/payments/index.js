import React, { useEffect, useState } from 'react';
import { Text, View, FlatList } from 'react-native';
import { StripeProvider } from '@stripe/stripe-react-native';
import {CheckoutScreen} from "./checkout";
import {fetchPaymentHistory} from "./api";

const Payments = (params) => {
  const [payments, setPayments] = useState([])
  const [refresh, setRefresh] = useState(true)
  const get_payments = async () => {
    setRefresh(true);
    const res = await fetchPaymentHistory()
    setPayments(res)
    setRefresh(false);
  }

  useEffect(async ()=>{
      await get_payments()
  }, [])
  // More info on all the options is below in the API Reference... just some common use cases shown here
  const renderItem = ({item}) => {
    return (
      <View style={{padding: 10, margin: 10, backgroundColor: "#c9c9c9c9", borderRadius: 10}}>
            <Text>{item.amount} cents {item.currency}</Text>
            <Text><Text style={{fontWeight: "600"}}>Payment Method:</Text> {item.payment_method_types?.[0]} {item.charges?.data?.[0]?.payment_method_details?.card?.brand} - {item.charges?.data?.[0]?.payment_method_details?.card?.last4} </Text>
            <Text><Text style={{fontWeight: "600"}}>Status:</Text> {item.status}</Text>
      </View>
    )
  }

  return (
      <View>
        <StripeProvider
            publishableKey="pk_test_FrvlAsdLgTI9r0qdAO1KcXLI"
            merchantIdentifier="merchant.com.crowdbotics.inaday"
          >
            <CheckoutScreen />
        </StripeProvider>
        <View >
            <Text style={{marginHorizontal: 15, marginTop: 15, paddingBottom: 10}}>Payment History</Text>
            <FlatList
              data={payments}
              renderItem={renderItem}
              keyExtractor={item => item.id}
              onRefresh={get_payments}
              refreshing={refresh}
            />
        </View>
      </View>
  );
};

export default {
  title: "Payments",
  navigator: Payments
}