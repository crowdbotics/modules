import React, { useEffect, useState, useContext } from "react";
import { Text, View, FlatList, StyleSheet } from "react-native";
import { OptionsContext } from "@options";
import { StripeProvider } from "@stripe/stripe-react-native";
import { CheckoutScreen } from "./checkout";
import { fetchPaymentHistory, slice } from "./store";
import { unwrapResult } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";

const Payments = () => {
  const dispatch = useDispatch();
  const options = useContext(OptionsContext);
  const { styles, localOptions } = options;
  const [payments, setPayments] = useState([]);
  const [refresh, setRefresh] = useState(true);
  const getPayments = async () => {
    setRefresh(true);
    await dispatch(fetchPaymentHistory())
      .then(unwrapResult)
      .then(res => {
        setPayments(res.data);
        setRefresh(false);
      })
      .catch(error => {
        setRefresh(false);
        console.log(error);
      });
  };
  const { stripePublishKey, merchantIdentifier } = localOptions;
  useEffect(async () => {
    await getPayments();
  }, []);
  // More info on all the options is below in the API Reference... just some common use cases shown here
  const renderItem = ({ item }) => {
    return (
      <View style={styles.listItemContainer}>
        <Text>
          {item.amount} cents {item.currency}
        </Text>
        <Text>
          <Text style={styles.bold}>Payment Method:</Text>{" "}
          {item.payment_method_types?.[0]}{" "}
          {item.charges?.data?.[0]?.payment_method_details?.card?.brand} -{" "}
          {item.charges?.data?.[0]?.payment_method_details?.card?.last4}{" "}
        </Text>
        <Text>
          <Text style={styles.bold}>Status:</Text> {item.status}
        </Text>
      </View>
    );
  };

  return (
    <View>
      <StripeProvider
        publishableKey={stripePublishKey}
        merchantIdentifier={merchantIdentifier}
      >
        <CheckoutScreen />
      </StripeProvider>
      < PaymentsList renderItem={renderItem} payments={payments} getPayments={getPayments} refresh={refresh} />
    </View>
  );
};

export default {
  title: "Payments",
  navigator: Payments,
  slice
};

const PaymentsList = ({ renderItem, payments, getPayments, refresh }) => {
  return (
    <View>
      <Text
        style={paymentStyles.list}
      >
        Payment History
      </Text>
      <FlatList
        data={payments}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        onRefresh={getPayments}
        refreshing={refresh}
      />
    </View>
  );
};

const paymentStyles = StyleSheet.create({
  list: { marginHorizontal: 15, marginTop: 15, paddingBottom: 10 }
});
