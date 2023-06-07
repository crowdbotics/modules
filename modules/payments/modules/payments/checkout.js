import React, { useContext, useEffect, useState } from "react";
import {
  Text,
  View,
  Alert,
  TextInput,
  Platform,
  TouchableOpacity,
  Dimensions
} from "react-native";
import { OptionsContext, getGlobalOptions } from "@options";
import {
  useApplePay,
  useGooglePay,
  useStripe,
  presentGooglePay,
  ApplePayButton,
  GooglePayButton
} from "@stripe/stripe-react-native";
import { fetchPaymentSheetParams } from "./api";
const deviceWidth = Dimensions.get("window").width;

const global = getGlobalOptions();

export const CheckoutScreen = (params) => {
  // continued from above
  const options = useContext(OptionsContext);
  const { styles, localOptions } = options;
  const {
    merchantName,
    enableGooglePay,
    enableApplePay,
    merchantCountryCode,
    stripeTestEnv,
    merchantCurrency
  } = localOptions;
  const [value, setValue] = useState({
    amount: "1"
  });
  const [gPayinitialized, setGPayInitialized] = useState(false);
  const { initPaymentSheet, presentPaymentSheet } = useStripe();
  const [loading, setLoading] = useState(false);

  const clientSecret = global.stripeSecretKey;

  const initializePaymentSheet = async () => {
    const { paymentIntent, ephemeralKey, customer } =
      await fetchPaymentSheetParams(value.amount);

    const { error } = await initPaymentSheet({
      customerId: customer,
      customerEphemeralKeySecret: ephemeralKey,
      paymentIntentClientSecret: paymentIntent,
      merchantDisplayName: merchantName,
      applePay: false,
      googlePay: enableGooglePay,
      merchantCountryCode: merchantCountryCode,
      testEnv: stripeTestEnv // use test environment
    });
    __DEV__ && console.log(error);
    if (!error) {
      setLoading(true);
    }
  };

  // Pay Through Credit Card
  const openPaymentSheet = async () => {
    await initializePaymentSheet();
    const { error } = await presentPaymentSheet({ clientSecret });

    if (error) {
      Alert.alert(`Error code: ${error.code}`, error.message);
    } else {
      Alert.alert("Success", "Your order is confirmed!");
    }
  };

  // Apple Pay related config
  const { presentApplePay, confirmApplePayPayment, isApplePaySupported } =
    useApplePay({
      onShippingMethodSelected: (shippingMethod) => {
        __DEV__ && console.log("shippingMethod", shippingMethod);
        // Update cart summary based on selected shipping method.
      },
      onShippingContactSelected: (shippingContact) => {
        __DEV__ && console.log("shippingContact", shippingContact);
        // Make modifications to cart here e.g. adding tax.
        // handler(cart);
      }
    });

  const payApple = async () => {
    const { error, paymentMethod } = await presentApplePay({
      cartItems: [{ label: merchantName, amount: value.amount }],
      country: merchantCountryCode,
      currency: merchantCurrency,
      requiredShippingAddressFields: ["emailAddress", "phoneNumber", "name"],
      requiredBillingContactFields: ["phoneNumber", "name"],
      jcbEnabled: true
    });

    if (error) {
      Alert.alert(error.code, error.message);
    } else {
      __DEV__ && console.log(JSON.stringify(paymentMethod, null, 2));
      const { paymentIntent } = await fetchPaymentSheetParams(value.amount);

      const { error: confirmApplePayError } = await confirmApplePayPayment(
        paymentIntent
      );

      if (confirmApplePayError) {
        Alert.alert(confirmApplePayError.code, confirmApplePayError.message);
      } else {
        Alert.alert("Success", "The payment was confirmed successfully!");
      }
    }
  };
  if (enableGooglePay) {
    // Google Pay related config
    const { initGooglePay } = useGooglePay();

    useEffect(() => {
      async function initialize() {
        const { error } = await initGooglePay({
          testEnv: stripeTestEnv,
          merchantName: merchantName,
          countryCode: merchantCountryCode,
          billingAddressConfig: {
            format: "FULL",
            isPhoneNumberRequired: true,
            isRequired: false
          },
          existingPaymentMethodRequired: false,
          isEmailRequired: true
        });

        if (error) {
          Alert.alert(error.code, error.message);
          return;
        }
        setGPayInitialized(true);
      }
      if (Platform.OS === "android") {
        initialize();
      }
    }, [initGooglePay]);
  }

  const payGoogle = async () => {
    const { paymentIntent } = await fetchPaymentSheetParams(value.amount);
    const { error } = await presentGooglePay({
      clientSecret: paymentIntent,
      currencyCode: merchantCurrency
    });

    if (error) {
      Alert.alert(error.code, error.message);
      return;
    }
    Alert.alert("Success", "The SetupIntent was confirmed successfully.");
  };

  return (
    <View>
      <View style={{ paddingHorizontal: 15, margin: 20 }}>
        <Text style={{}}>Amount</Text>
        <TextInput
          placeholder={"Enter Amount"}
          value={value.amount}
          onChangeText={(text) => setValue({ ...value, amount: text })}
          style={styles.inputField}
        ></TextInput>
      </View>
      <View style={{ flexDirection: "row", justifyContent: "center" }}>
        <TouchableOpacity
          style={[styles.button, styles.payNow]}
          onPress={openPaymentSheet}
        >
          <Text style={styles.buttonText}>Pay Now</Text>
        </TouchableOpacity>

        {Platform.OS === "android" && enableGooglePay && (
          <GooglePayButton
            disabled={!gPayinitialized || loading}
            style={[
              styles.payButton,
              { width: deviceWidth / 2.5, height: 52, marginTop: 5 }
            ]}
            type="pay"
            onPress={payGoogle}
          />
        )}

        {enableApplePay && isApplePaySupported && (
          <ApplePayButton
            onPress={payApple}
            type="plain"
            borderRadius={4}
            style={styles.payButton}
          />
        )}
      </View>
    </View>
  );
};
