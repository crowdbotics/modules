import React, { useRef, useContext, useEffect, useState } from 'react';
import { Text, View, Pressable, Button, Alert } from 'react-native';
import { OptionsContext, GlobalOptionsContext } from "@options";
import { useNavigation, useNavigationState } from "@react-navigation/native";
import { StripeProvider } from '@stripe/stripe-react-native';


const Payments = (params) => {
  // More info on all the options is below in the API Reference... just some common use cases shown here
  const actionSheet = useRef(null);
  const options = useContext(OptionsContext);
  const gOptions = useContext(GlobalOptionsContext);
  const [data, setData] = useState([]);
  const { styles, buttonText } = options;
  const navigation = useNavigation()
  console.log(navigation)
  
  return (
    
      <StripeProvider
          publishableKey="pk_test_FrvlAsdLgTI9r0qdAO1KcXLI"
          merchantIdentifier="merchant.com.crowdbotics.inaday"
        >
          <CheckoutScreen />
      </StripeProvider>
  );
};

export default {
  title: "Payments",
  navigator: Payments
}

import { CardField, useStripe } from '@stripe/stripe-react-native';

function PaymentScreen() {
  const { confirmPayment } = useStripe();

  return (
    <CardField
      postalCodeEnabled={true}
      placeholder={{
        number: '4242 4242 4242 4242',
      }}
      cardStyle={{
        backgroundColor: '#FFFFFF',
        textColor: '#000000',
      }}
      style={{
        width: '100%',
        height: 50,
        marginVertical: 30,
      }}
      onCardChange={(cardDetails) => {
        console.log('cardDetails', cardDetails);
      }}
      onFocus={(focusedField) => {
        console.log('focusField', focusedField);
      }}
    />
  );
}


function CheckoutScreen() {
  // continued from above

  const { initPaymentSheet, presentPaymentSheet } = useStripe();
  const [loading, setLoading] = useState(false);
  const API_URL = "http://localhost:3000";
  const clientSecret = 'sk_test_51EA1HwDWvyLYvYlERNHHINu6Ngdh8MjRGxqRMNc69rOEAJAbv7ru8Ivi07JpUUMG2YbktCNLBO3SxV7NMwDyRjq4007822BMDs'
  const fetchPaymentSheetParams = async () => {
    const response = await fetch(`${API_URL}/payment-sheet`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    const { paymentIntent, ephemeralKey, customer } = await response.json();
    console.log('response', { paymentIntent, ephemeralKey, customer })
    return {
      paymentIntent,
      ephemeralKey,
      customer,
    };
  };

  const initializePaymentSheet = async () => {
    const {
      paymentIntent,
      ephemeralKey,
      customer,
    } = await fetchPaymentSheetParams();

    const { error } = await initPaymentSheet({
      customerId: customer,
      customerEphemeralKeySecret: ephemeralKey,
      paymentIntentClientSecret: paymentIntent,
      applePay: true
    });
    if (!error) {
      setLoading(true);
    }
  };

  const openPaymentSheet = async () => {
    const { error } = await presentPaymentSheet({ clientSecret });

    if (error) {
      Alert.alert(`Error code: ${error.code}`, error.message);
    } else {
      Alert.alert('Success', 'Your order is confirmed!');
    }
  };
  
  useEffect(() => {
    initializePaymentSheet();
  }, []);

  return (
    <View>
      <Button
        variant="primary"
        disabled={!loading}
        title="Checkout"
        onPress={openPaymentSheet}
      />
    </View>
  );
  
}