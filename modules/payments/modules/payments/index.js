import React, { useEffect, useState, useContext } from "react";
import { Text, View, FlatList, Dimensions } from "react-native";
import { OptionsContext } from "@options";
import { StripeProvider } from "@stripe/stripe-react-native";
import { CheckoutScreen } from "./checkout";
import { fetchPaymentHistory, slice } from "./store";
import { unwrapResult } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";

const Payments = () => {
  const dispatch = useDispatch();
  const options = useContext(OptionsContext);
  const { styles, STRIPE_PUBLISH_KEY, MERCHANT_IDENTIFIER } = options;
  const [payments, setPayments] = useState([]);
  const [refresh, setRefresh] = useState(true);

  // This function fetches the recent payment records from backend
  const getPayments = async () => {
    setRefresh(true);
    await dispatch(fetchPaymentHistory())
      .then(unwrapResult)
      .then((res) => {
        setPayments(res?.data);
        setRefresh(false);
      })
      .catch((error) => {
        setRefresh(false);
        console.log(error);
      });
  };

  useEffect(async () => {
    await getPayments();
  }, []);

  /**
 * This function renders the payment component in the list
 * @param  {Object} item Contains details for payment component
 * @return {React.ReactNode}
 */
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
        publishableKey={STRIPE_PUBLISH_KEY}
        merchantIdentifier={MERCHANT_IDENTIFIER}
      >
        <CheckoutScreen />
      </StripeProvider>
      <PaymentsList
        renderItem={renderItem}
        payments={payments}
        getPayments={getPayments}
        refresh={refresh}
      />
    </View>
  );
};

export default {
  title: "Payments",
  navigator: Payments,
  slice
};

/**
 * This function renders the payment list showing recent records
 * @param  {React.ReactNode} renderItem Payment component to be rendered in Flatlist
 * @param  {Array} payments Data of the payment list
 * @param  {Function} getPayments This function fetches the latest payment records
 * @param  {Boolean} refresh This shows the loading status
 * @return {React.ReactNode}
 */
const PaymentsList = ({ renderItem, payments, getPayments, refresh }) => {
  const options = useContext(OptionsContext);
  const { styles } = options;
  return (
    <View style={{ height: Dimensions.get("screen").height - 260 }}>
      <Text style={styles.list}>Payment History</Text>
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
