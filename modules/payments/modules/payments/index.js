/* eslint-disable no-unused-vars */
import React, { useContext } from "react";
import { Platform, Dimensions } from "react-native";
import { OptionsContext } from "@options";
import { StripeProvider } from "@stripe/stripe-react-native";
import { CheckoutScreen } from "./checkout";

import { ScrollView } from "react-native-gesture-handler";
import PaymentHistoryModal from "./paymentHistoryModal";
import InappPurchase from "./inappPurchase";

const Payments = (params) => {
  const options = useContext(OptionsContext);
  const { styles, localOptions } = options;

  const { stripePublishKey, merchantIdentifier } = localOptions;
  // More info on all the options is below in the API Reference... just some common use cases shown here

  return (
    <ScrollView>
      <StripeProvider
        publishableKey={stripePublishKey}
        merchantIdentifier={merchantIdentifier}
      >
        <CheckoutScreen />
      </StripeProvider>

      <PaymentHistoryModal></PaymentHistoryModal>
      {Platform.OS === "ios" &&
        <InappPurchase></InappPurchase>
      }

    </ScrollView>
  );
};

export default {
  title: "Payments",
  navigator: Payments
}
;
