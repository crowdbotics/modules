import React, { useEffect, useState, useContext, useRef } from "react";
import { Text, View, FlatList, TouchableOpacity, ActivityIndicator } from "react-native";
import { OptionsContext } from "@options";
import { StripeProvider, useStripe } from "@stripe/stripe-react-native";
import { fetchPlans, fetchPaymentSheetParams, cancelPlan } from "./api";

const Subscription = () => {
  const options = useContext(OptionsContext);
  const { styles, localOptions } = options;
  const clientSecret = global.stripeSecretKey;
  const { stripePublishKey, merchantIdentifier } = localOptions;
  const { initPaymentSheet, presentPaymentSheet } = useStripe();
  const [plans, setPlans] = useState([]);
  const [selectedPlan, setSelectedPlan] = useState("");
  const [preSelectedPlan, setPreSelectedPlan] = useState("");
  const [loading, setLoading] = useState(false);
  const [cancelLoading, setCancelLoading] = useState(false);
  const flatListRef = useRef();
  const [subscribeBtn, setSubscribeBtn] = useState({
    isActive: false,
    text: ""
  });

  // More info on all the options is below in the API Reference... just some common use cases shown here
  const subscribe = async () => {
    setLoading(true);
    const { paymentIntent, ephemeralKey, customer } = await fetchPaymentSheetParams(selectedPlan);
    await initPaymentSheet({
      customerId: customer,
      customerEphemeralKeySecret: ephemeralKey,
      paymentIntentClientSecret: paymentIntent,
      merchantDisplayName: "SHahraiz",
      merchantCountryCode: "US",
      testEnv: __DEV__ // use test environment
    });

    await presentPaymentSheet({ clientSecret });
    setLoading(false);
    setTimeout(() => {
      setPreSelectedPlan(null);
      refreshPlans();
    }, 2000);
  };

  const refreshPlans = async () => {
    fetchPlans().then(response => response.json())
      .then((json) => {
        const { result } = json;
        setPlans(result);
        result.forEach((obj, i) => {
          if (obj.is_subscribed) {
            setSelectedPlan(obj.price_id);
            setPreSelectedPlan(obj.price_id);
            planSelected(obj);
            setTimeout(() => {
              flatListRef.current.scrollToIndex({ animated: true, index: i, viewPosition: 0.5 });
            }, 200);
          }
        });
      });
  };
  useEffect(async () => {
    await refreshPlans();
  }, [preSelectedPlan]);

  const planSelected = (item) => {
    setSelectedPlan(item.price_id);
    let text = subscribeBtn.text;
    let isActive = subscribeBtn.isActive;
    if (item.price_id === preSelectedPlan) {
      text = "Already Subscribed";
      isActive = false;
    } else {
      if (preSelectedPlan) {
        text = "Change Plan";
      } else {
        text = "Subscribe";
      }

      isActive = true;
    }
    setSubscribeBtn({ isActive, text });
  };

  const cancelSub = async () => {
    setCancelLoading(true);
    await cancelPlan();
    setTimeout(() => {
      setPreSelectedPlan("");
      refreshPlans();
    }, 2000);
    setCancelLoading(false);
  };
  const renderItem = ({ item }) => {
    if (!item) return;
    return (
        <TouchableOpacity style={[styles.listItemContainer, selectedPlan === item.price_id && styles.selected, { justifyContent: "space-between" }]}
            onPress={() => { planSelected(item); }}>
            {preSelectedPlan === item.price_id && <View style={styles.selectedPlanTag}><Text style={{ color: "white" }}>Current Plan</Text></View>}
            <Text style={{ fontSize: 24, fontWeight: "600" }}>{item.name}</Text>
            <Text>{item.description}</Text>
            <Text><Text style={styles.bold}>Price ID:</Text> {item.price_id}</Text>
            <Text style={{ fontSize: 24, fontWeight: "600", alignSelf: "flex-end", alignContent: "flex-end" }}>${item.price}/{item.interval}</Text>
        </TouchableOpacity>
    );
  };

  return (
      <View>
        <StripeProvider
          publishableKey={stripePublishKey}
          merchantIdentifier={merchantIdentifier}
        >
          <View style={styles.headerContainer}>
              <Text style={{ fontSize: 20 }}>Choose a</Text>
              <Text style={{ fontSize: 54 }}>Subscription</Text>
              <Text style={{ fontSize: 20 }}>Plan</Text>
          </View>
          <FlatList
            horizontal={true}
            data={plans}
            renderItem={renderItem}
            keyExtractor={item => item.id}
            style={{ }}
            extraData={plans}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            ref={flatListRef}
        />
        {subscribeBtn.isActive && <TouchableOpacity onPress={() => { subscribeBtn.isActive && subscribe(); }} style={[styles.button]}>
            {loading ? <ActivityIndicator></ActivityIndicator> : <Text style={styles.buttonText}>{subscribeBtn.text}</Text>}
        </TouchableOpacity>}
        {preSelectedPlan !== "" && <TouchableOpacity onPress={() => { cancelSub(); }} style={[styles.button, { backgroundColor: "#DF202C" }]}>
          {cancelLoading ? <ActivityIndicator></ActivityIndicator> : <Text style={styles.buttonText}>Cancel Subscription</Text>}
        </TouchableOpacity>}
        </StripeProvider>
      </View>
  );
};

export default {
  title: "Subscription",
  navigator: Subscription
};
