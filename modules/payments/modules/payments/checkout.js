import React, { useContext, useEffect, useState } from "react";
import {
  Text,
  View,
  Alert,
  TextInput,
  Platform,
  TouchableOpacity
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
import { fetchPaymentSheetParams } from "./store";
import { unwrapResult } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { validateConfig } from "./utils";

export const CheckoutScreen = () => {
  const global = getGlobalOptions();

  // continued from above
  const dispatch = useDispatch();
  const options = useContext(OptionsContext);
  const {
    styles,
    MERCHANT_NAME,
    ENABLE_GOOGLE_PAY,
    ENABLE_APPLE_PAY,
    MERCHANT_COUNTRY_CODE,
    STRIPE_TEST_ENV,
    MERCHANT_CURRENCY
  } = options;

  // Transaction amount
  const [transactionAmount, setTransactionAmount] = useState({
    amount: "1"
  });

  // This state shows if google pay is ready to be used or not
  const [googlePayInitialized, setGooglePayInitialized] = useState(false);
  const [loading, setLoading] = useState(false);

  const { initPaymentSheet, presentPaymentSheet } = useStripe();

  const clientSecret = global.stripeSecretKey;

  const showAmountError = () => {
    Alert.alert("Error", "Please enter some amount");
  };

  // Fetch paymentIntent, ephemeralKey, customer from backend and initialize stripe payment sheet
  const initializePaymentSheet = async () => {
    const errors = validateConfig(
      MERCHANT_NAME,
      ENABLE_GOOGLE_PAY,
      MERCHANT_COUNTRY_CODE,
      STRIPE_TEST_ENV
    );
    if (!errors.length) {
      setLoading(true);
      await dispatch(fetchPaymentSheetParams(transactionAmount.amount))
        .then(unwrapResult)
        .then(async (res) => {
          setLoading(false);
          const { paymentIntent, ephemeralKey, customer } = res;
          const { error } = await initPaymentSheet({
            customerId: customer,
            customerEphemeralKeySecret: ephemeralKey,
            paymentIntentClientSecret: paymentIntent,
            merchantDisplayName: MERCHANT_NAME,
            applePay: false,
            googlePay: ENABLE_GOOGLE_PAY,
            merchantCountryCode: MERCHANT_COUNTRY_CODE,
            testEnv: STRIPE_TEST_ENV // use test environment
          });
          if (!error) {
            setLoading(true);
          }
        })
        .catch(() => {
          setLoading(false);
        });
    }
  };

  // Pay Through Credit Card
  const openPaymentSheet = async () => {
    if (transactionAmount.amount) {
      await initializePaymentSheet();
      const { error } = await presentPaymentSheet({ clientSecret });

      if (error) {
        setLoading(false);
        Alert.alert(`Error code: ${error.code}`, error.message);
      } else {
        setLoading(false);
        Alert.alert("Success", "Your payment is successfull!");
      }
    } else {
      showAmountError();
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
    if (transactionAmount.amount) {
      const errors = validateConfig(MERCHANT_COUNTRY_CODE, MERCHANT_CURRENCY);
      if (!errors.length) {
        const { error } = await presentApplePay({
          cartItems: [
            { label: MERCHANT_NAME, amount: transactionAmount.amount }
          ],
          country: MERCHANT_COUNTRY_CODE,
          currency: MERCHANT_CURRENCY,
          requiredShippingAddressFields: [
            "emailAddress",
            "phoneNumber",
            "name"
          ],
          requiredBillingContactFields: ["phoneNumber", "name"],
          jcbEnabled: true
        });

        if (error) {
          Alert.alert(error.code, error.message);
        } else {
          /**
           * This action dispatches the api which fetches the paymentIntent for apple pay
           * @param  {String} amount Transaction amount
           */
          await dispatch(fetchPaymentSheetParams(transactionAmount.amount))
            .then(unwrapResult)
            .then(async (res) => {
              const { paymentIntent } = res;
              const { error: confirmApplePayError } =
                await confirmApplePayPayment(paymentIntent);
              if (confirmApplePayError) {
                Alert.alert(
                  confirmApplePayError.code,
                  confirmApplePayError.message
                );
              } else {
                Alert.alert("Success", "Your payment is successfull!");
              }
            })
            .catch((error) => {
              console.log(error);
            });
        }
      }
    } else {
      showAmountError();
    }
  };
  if (ENABLE_GOOGLE_PAY) {
    // Google Pay related config
    const { initGooglePay } = useGooglePay();

    // Initialize Google Pay with provided credentials
    const initialize = async () => {
      const { error } = await initGooglePay({
        testEnv: STRIPE_TEST_ENV,
        merchantName: MERCHANT_NAME,
        countryCode: MERCHANT_COUNTRY_CODE,
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
      }
      setGooglePayInitialized(true);
    };

    useEffect(() => {
      if (Platform.OS === "android") {
        initialize();
      }
    }, [initGooglePay]);
  }

  // This function fetches paymentIntent from backend and displays the Google Pay sheet.
  const payGoogle = async () => {
    if (transactionAmount.amount) {
      const errors = validateConfig(MERCHANT_CURRENCY);
      if (!errors.length) {
        setLoading(true);
        await dispatch(fetchPaymentSheetParams(transactionAmount.amount))
          .then(unwrapResult)
          .then(async (res) => {
            setLoading(false);
            const { paymentIntent } = res;
            const { error } = await presentGooglePay({
              clientSecret: paymentIntent,
              currencyCode: MERCHANT_CURRENCY
            });

            if (error) {
              Alert.alert(error.code, error.message);
              return;
            }
            Alert.alert(
              "Success",
              "The SetupIntent was confirmed successfully."
            );
          })
          .catch((error) => {
            setLoading(false);
            console.log(error);
          });
      }
    } else {
      showAmountError();
    }
  };

  return (
    <View>
      <View style={styles.checkoutView}>
        <Text style={{}}>Amount</Text>
        <Input
          placeholder={"Enter Amount"}
          value={transactionAmount}
          setValue={setTransactionAmount}
        />
      </View>
      <View style={styles.buttonRow}>
        <TouchableOpacity
          style={[styles.button, styles.payNow]}
          onPress={openPaymentSheet}
          disabled={loading}
        >
          <Text style={styles.buttonText}>Pay Now</Text>
        </TouchableOpacity>

        {Platform.OS === "android" && ENABLE_GOOGLE_PAY && (
          <GooglePayButton
            disabled={!googlePayInitialized || loading}
            style={styles.payButton}
            type="pay"
            onPress={payGoogle}
          />
        )}

        {ENABLE_APPLE_PAY && isApplePaySupported && (
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

/**
 * Custom Text Input component
 * @param  {String} placeholder Placeholder string for the input
 * @param  {String} value current value of the input
 * @param  {Function} setValue Function used to update the current value of
 * @return {React.ReactNode}
 */
const Input = ({ placeholder, value, setValue }) => {
  const options = useContext(OptionsContext);
  const { styles } = options;
  return (
    <TextInput
      placeholder={placeholder}
      value={value.amount}
      onChangeText={(text) => setValue({ ...value, amount: text })}
      style={styles.inputField}
    />
  );
};
