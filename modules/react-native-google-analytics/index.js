import React, { useEffect, useState, useContext } from "react";
import { Text, View, ScrollView, Switch, TouchableOpacity } from "react-native";
// @ts-ignore
import analytics, { firebase } from "@react-native-firebase/analytics";
// @ts-ignore
import { OptionsContext } from "@options";

const App = () => {
  const options = useContext(OptionsContext);
  const {
    styles, logBeginCheckout,
    logAddPaymentInfo,
    logAddShippingInfo,
    logAddToCart,
    logAddToWishlist,
    logAppOpen,
    logCampaignDetails,
    logJoinGroup,
    setUserProperty,
    logViewCart,
    logShare,
    logSignUp,
    logScreenView,
    logRemoveFromCart,
    logPurchase,
    logLogin,
    logEarnVirtualCurrency,
    logEvent,
    logGenerateLead,
    logLevelEnd,
    logLevelStart,
    logLevelUp,
    logPostScore,
    logRefund,
    logSearch,
    logSelectContent,
    logSelectItem,
    logSelectPromotion,
    logSpendVirtualCurrency,
    logTutorialBegin,
    logTutorialComplete,
    logUnlockAchievement,
    logViewItem,
    logViewItemList,
    logViewPromotion,
    logViewSearchResults,
    resetAnalyticsData,
    setDefaultEventParameters,
    setSessionTimeoutDuration,
    setUserId,
    setUserProperties
  } = options;

  const [appId, setAppId] = useState("");
  const [isEnabled, setIsEnabled] = useState(true);

  const trackingToggle = async () => {
    await firebase.analytics().setAnalyticsCollectionEnabled(!isEnabled);
    setIsEnabled(!isEnabled);
  };

  useEffect(() => {
    const appId = async () => {
      const appInstanceId = await analytics().getAppInstanceId();
      setAppId(appInstanceId);
      await analytics().logAppOpen();
    };
    appId();
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.trackingContainer}>
          <Text>Enable Tracking</Text>
          <Switch
            trackColor={{ false: "#767577", true: "#a5b0ff" }}
            thumbColor={isEnabled ? "#1549b2" : "#f4f3f4"}
            onValueChange={trackingToggle}
            value={isEnabled}
            style={styles.switch}
          />
        </View>
        <View style={styles.appIdContainer}>
          <Text style={styles.appIdHeading}>AppID:</Text>
          <Text style={styles.appIdText}>{appId}</Text>
        </View>
        <View style={styles.sectionContainer}>
          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={async () => logLogin({
              method: "facebook.com"
            })} style={styles.button}>
              <Text style={styles.text}>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={async () => logSignUp({
              method: "email"
            })} style={styles.button}>
              <Text style={styles.text}>SignUp</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={async () => logAddToCart({
              currency: "usd",
              items: [],
              value: 1
            })} style={styles.button}>
              <Text style={styles.text}>AddToCart</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={async () => logAddToWishlist({
              currency: "usd",
              items: [],
              value: 1
            })} style={styles.button}>
              <Text style={styles.text}>AddToWishlist</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={async () => logAppOpen()} style={styles.button}>
              <Text style={styles.text}>AppOpen</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={async () => logAddShippingInfo({
              shipping_tier: "clothing",
              coupon: "co_1234567",
              currency: "usd",
              items: [],
              value: 1
            })} style={styles.button}>
              <Text style={styles.text}>AddShippingInfo</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={async () => logCampaignDetails({
              aclid: "clothing",
              campaign: "promotion",
              content: "clothing",
              cp1: "abcd",
              medium: "email",
              source: "newsletter",
              term: "abcd"
            })} style={styles.button}>
              <Text style={styles.text}>CampaignDetails</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={async () => logEarnVirtualCurrency({
              virtual_currency_name: "usd",
              value: 3
            })} style={styles.button}>
              <Text style={styles.text}>EarnVirtualCurrency</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={async () => logGenerateLead({
              currency: "usd",
              value: 2
            })} style={styles.button}>
              <Text style={styles.text}>GenerateLead</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={async () => logJoinGroup({
              group_id: "1234567"
            })} style={styles.button}>
              <Text style={styles.text}>JoinGroup</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={async () => logEvent("basket", {
              id: 3745092,
              item: "mens grey t-shirt",
              description: ["round neck", "long sleeved"],
              size: "L"
            })} style={styles.button}>
              <Text style={styles.text}>Event</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={async () => logLevelEnd({
              level: 2,
              success: "abcd"
            })} style={styles.button}>
              <Text style={styles.text}>LevelEnd</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={async () => logLevelStart({
              level: 2
            })} style={styles.button}>
              <Text style={styles.text}>LevelStart</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={async () => logLevelUp({
              character: "ninja",
              level: 2
            })} style={styles.button}>
              <Text style={styles.text}>LevelUp</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={async () => logPostScore({
              character: "ninja",
              level: 2,
              score: 60
            })} style={styles.button}>
              <Text style={styles.text}>PostScore</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={async () => logPurchase({
              affiliation: "clothing",
              coupon: "co_1234567",
              currency: "usd",
              tax: 32,
              items: [],
              shipping: 2,
              transaction_id: "trans_1234567",
              value: 1
            })} style={styles.button}>
              <Text style={styles.text}>Purchase</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={async () => logRemoveFromCart({
              currency: "usd",
              items: [],
              value: 32
            })} style={styles.button}>
              <Text style={styles.text}>RemoveFromCart</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={async () => logScreenView({
              screen_class: "gentsLogs",
              screen_name: "clothing"
            })} style={styles.button}>
              <Text style={styles.text}>ScreenView</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={async () => logRefund({
              affiliation: "clothing",
              coupon: "ref_2dsg323",
              currency: "usd",
              tax: 32,
              items: [],
              shipping: 2,
              transaction_id: "df24234",
              value: 1
            })} style={styles.button}>
              <Text style={styles.text}>Refund</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={async () => logSearch({
              destination: "new york",
              end_date: "2022-02-04",
              number_of_nights: 3,
              number_of_passengers: 32,
              number_of_rooms: 6,
              origin: "new york",
              search_term: "df24234",
              start_date: "2022-02-03",
              travel_class: "business"
            })} style={styles.button}>
              <Text style={styles.text}>Search</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={async () => logSelectContent({
              content_type: "shirts",
              item_id: "abcd6568"
            })} style={styles.button}>
              <Text style={styles.text}>SelectContent</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={async () => logSelectItem({
              content_type: "shirts",
              item_list_id: "abcd6568",
              item_list_name: "gents_shirt",
              items: []
            })} style={styles.button}>
              <Text style={styles.text}>SelectItem</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={async () => logSelectPromotion({
              creative_name: "clothing",
              creative_slot: "clothing",
              items: [],
              location_id: "nef24234",
              promotion_id: "df24234",
              promotion_name: "travel_class"
            })} style={styles.button}>
              <Text style={styles.text}>SelectPromotion</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => logAddPaymentInfo({
              payment_type: "clothing",
              coupon: "co_1234567",
              currency: "usd",
              items: [],
              value: 1
            })} style={styles.button}>
              <Text style={styles.text}>AddPaymentInfo</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={async () => setUserId("user_1234567")} style={styles.button}>
              <Text style={styles.text}>setUserId</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={async () => logTutorialBegin()} style={styles.button}>
              <Text style={styles.text}>TutorialBegin</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={async () => logUnlockAchievement({
              achievement_id: "ac_32432432"
            })} style={styles.button}>
              <Text style={styles.text}>UnlockAchievement</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={async () => logViewCart({
              currency: "usd",
              items: [],
              value: 32
            })} style={styles.button}>
              <Text style={styles.text}>ViewCart</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={async () => logTutorialComplete()} style={styles.button}>
              <Text style={styles.text}>TutorialComplete</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={async () => logViewItem({
              currency: "aud",
              value: 2,
              items: []
            })} style={styles.button}>
              <Text style={styles.text}>ViewItem</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={async () => logViewItemList({
              item_list_id: "gs_fdf242345",
              item_list_name: "gents_shirt",
              items: []
            })} style={styles.button}>
              <Text style={styles.text}>ViewItemList</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={async () => logViewPromotion({
              creative_name: "clothing",
              creative_slot: "clothing",
              items: [],
              location_id: "nef24234",
              promotion_id: "df24234",
              promotion_name: "travel_class"
            })} style={styles.button}>
              <Text style={styles.text}>ViewPromotion</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={async () => logBeginCheckout({
              coupon: "co_1234567",
              currency: "usd",
              items: [],
              value: 1
            })} style={styles.button}>
              <Text style={styles.text}>BeginCheckout</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={async () => resetAnalyticsData()} style={styles.button}>
              <Text style={styles.text}>ResetAnalyticsData</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={async () => logViewSearchResults({
              search_term: "sleeves"
            })} style={styles.button}>
              <Text style={styles.text}>ViewSearchResults</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={async () => logShare({
              content_type: "clothing",
              item_id: "abcd",
              method: "facebook"
            })} style={styles.button}>
              <Text style={styles.text}>Share</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={async () => setUserProperty("saad", "abcd")} style={styles.button}>
              <Text style={styles.text}>SetUserProperty</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={async () => setUserProperties({
              name: "john",
              value: "68568"
            })} style={styles.button}>
              <Text style={styles.text}>SetUserProperties</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={async () => setSessionTimeoutDuration(5000)} style={styles.button}>
              <Text style={styles.text}>SetSessionTimeoutDuration</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={async () => logSpendVirtualCurrency({
              item_name: "T-Shirt",
              value: 56,
              virtual_currency_name: "usd"
            })} style={styles.button}>
              <Text style={styles.text}>SpendVirtualCurrency</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={async () => setDefaultEventParameters({ // params:any
              event_name: "search"
            })} style={styles.button}>
              <Text style={styles.text}>SetDefaultEventParameters</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default {
  title: "GoogleAnalytics",
  navigator: App
};
