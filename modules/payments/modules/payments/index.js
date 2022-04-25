import React, { useEffect, useState, useContext } from "react";
import { Text, View, FlatList } from "react-native";
import { OptionsContext } from "@options";
import { StripeProvider } from "@stripe/stripe-react-native";
import { CheckoutScreen } from "./checkout";
import { fetchPaymentHistory } from "./api";

const Payments = () => {
  const options = useContext(OptionsContext);
  const { styles, localOptions } = options;
  const [payments, setPayments] = useState([]);
  const [refresh, setRefresh] = useState(true);
  const getPayments = async () => {
    setRefresh(true);
    const res = await fetchPaymentHistory();
    setPayments(res);
    setRefresh(false);
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
      <View>
        <Text
          style={{ marginHorizontal: 15, marginTop: 15, paddingBottom: 10 }}
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
    </View>
  );
};

export default {
  title: "Payments",
  navigator: Payments
};
