import React, { useEffect, useState, useContext } from 'react';
import { Text, View, FlatList, TouchableOpacity, Alert, Modal, Pressable } from 'react-native';
import { OptionsContext, GlobalOptionsContext } from "@options";
import { ScrollView } from 'react-native-gesture-handler';
import { Dimensions } from 'react-native'
import { StripeProvider } from '@stripe/stripe-react-native';
import { useApplePay, useGooglePay, useStripe, presentGooglePay, ApplePayButton, GooglePayButton } from '@stripe/stripe-react-native';
import { fetchPlans , fetchPaymentSheetParams} from "./api";

const Subscription = (params) => {
  const options = useContext(OptionsContext);
  // console.log(options)
  const { styles, localOptions } = options;
  const clientSecret = global.stripeSecretKey;
  const { stripePublishKey, merchantIdentifier } = localOptions;
  const { initPaymentSheet, presentPaymentSheet } = useStripe();
  const [plans, setPlans] = useState([]);
  const [selectedPlan, setSelectedPlan] = useState("");
  const [preSelectedPlan, setPreSelectedPlan] = useState("qqq");
  const [subscribeBtn, setSubscribeBtn] = useState({
      isActive: false,
      text: ""
  })

  useEffect(()=>{
    
  }, [plans])
  

  // More info on all the options is below in the API Reference... just some common use cases shown here
  const subscribe = async () =>{
    const {paymentIntent,
      ephemeralKey,
      customer} = await fetchPaymentSheetParams(selectedPlan)
    const { error } = await initPaymentSheet({
      customerId: customer,
      customerEphemeralKeySecret: ephemeralKey,
      paymentIntentClientSecret: paymentIntent,
      merchantDisplayName: "SHahraiz",
      applePay: false,
      googlePay: true,
      merchantCountryCode:  "US",
      testEnv: true, // use test environment
    });

    const { error2 } = await presentPaymentSheet({ clientSecret });
  }

  useEffect(async () => {
    fetchPlans().then(response => response.json())
    .then((json) => {
      const { status, result } = json;
      setPlans(result);
      result.forEach((obj)=>{
        if (obj.is_subscribed){
          setSelectedPlan(obj.price_id)
          setPreSelectedPlan(obj.price_id)
          planSelected(obj)
        }
      })
    });
  }, [preSelectedPlan])

  const planSelected = (item) => {
      setSelectedPlan(item.price_id)
      let text = subscribeBtn.text
      let isActive = subscribeBtn.isActive
      if (item.price_id === preSelectedPlan){
        text = "Already Subscribed"
        isActive =  false
      }else{
        if (preSelectedPlan){
          text = "Change Plan"
        }else{
          text = "Subscribe"
        }
        
        isActive =  true
      }
      setSubscribeBtn({isActive,text})

  }

  const renderItem = ({ item }) => {
    if (!item) return;
    return (
        <TouchableOpacity style={[styles.listItemContainer, selectedPlan == item.price_id && styles.selected, {justifyContent: "space-between"}]} 
            onPress={()=>{planSelected(item)}}>
            <Text style={{fontSize: 24, fontWeight: "600"}}>{item.name}</Text>
            <Text><Text style={styles.bold}>Description:</Text> {item.description}</Text>
            <Text><Text style={styles.bold}>Price ID:</Text> {item.price_id}</Text>
            <Text style={{fontSize: 24, fontWeight: "600", alignSelf: 'flex-end', alignContent: "flex-end"}}>${item.price}/{item.interval}</Text>
        </TouchableOpacity>
    )
}

  return (
      <View>
        <StripeProvider
          publishableKey={stripePublishKey}
          merchantIdentifier={merchantIdentifier}
        >
          <Text>Subscription</Text>
          <FlatList
            horizontal={true}
            data={plans}
            renderItem={renderItem}
            keyExtractor={item => item.id}
            style={{ }}
            extraData={plans}
        />
        <TouchableOpacity onPress={()=> {subscribeBtn.isActive && subscribe()}} style={[styles.button, !subscribeBtn.isActive && styles.disabled]}>
              <Text style={styles.buttonText}>{subscribeBtn.text}</Text>
        </TouchableOpacity>
        </StripeProvider>
      </View>
  );
};

export default {
  title: "Subscription",
  navigator: Subscription
}
