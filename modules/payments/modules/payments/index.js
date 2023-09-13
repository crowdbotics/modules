import React, { useEffect, useState, useContext } from "react";
import { Text, View, FlatList, Dimensions } from "react-native";
import { OptionsContext } from "@options";
import { StripeProvider } from "@stripe/stripe-react-native";
import { CheckoutScreen } from "./checkout";
import { fetchPaymentHistory, slice } from "./store";
import { unwrapResult } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";

/**
 * Payments component for managing payment history and rendering the CheckoutScreen.
 * @returns {React.ReactNode}
 */
const Payments = () => {
  const dispatch = useDispatch();
  const options = useContext(OptionsContext);
  const { styles, STRIPE_PUBLISH_KEY, MERCHANT_IDENTIFIER } = options;
  const [payments, setPayments] = useState([]);
  const [refresh, setRefresh] = useState(true);

  /**
   * Fetches the recent payment records from the backend.
   */
  const getPayments = async () => {
    setRefresh(true);
    try {
      const res = await dispatch(fetchPaymentHistory());
      const paymentData = unwrapResult(res)?.data;
      setPayments(paymentData);
      setRefresh(false);
    } catch (error) {
      setRefresh(false);
      console.log(error);
    }
  };

  useEffect(() => {
    getPayments();
  }, []);

  /**
   * Renders the payment component in the list.
   * @param  {Object} item - Contains details for the payment component.
   * @returns {React.ReactNode}
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
 * PaymentsList component to render the payment list showing recent records.
 * @param  {Object} props - Props for the PaymentsList component.
 * @param  {React.ReactNode} props.renderItem - Payment component to be rendered in Flatlist.
 * @param  {Array} props.payments - Data of the payment list.
 * @param  {Function} props.getPayments - Function to fetch the latest payment records.
 * @param  {Boolean} props.refresh - Loading status for refreshing the list.
 * @returns {React.ReactNode}
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
