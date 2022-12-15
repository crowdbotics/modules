import React, { useEffect, useState, useContext } from "react";
import { Text, View, ScrollView, Switch, TouchableOpacity } from "react-native";
// @ts-ignore
import { OptionsContext } from "@options";

const App = () => {
  const options = useContext(OptionsContext);
  const {
    styles, setAnalyticsCollectionEnabled,
    getAppInstanceId,
    logBeginCheckout,
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
    await setAnalyticsCollectionEnabled(!isEnabled);
    setIsEnabled(!isEnabled);
  };

  useEffect(() => {
    const appId = async () => {
      await logAppOpen();
      const appInstanceId = await getAppInstanceId();
      setAppId(appInstanceId);
    };
    appId();
  }, []);

  const handlelogLogin = async () => {
    await logLogin({
      method: "facebook.com"

    }).catch((err) => console.log("error: ", err));
  };

  const handlelogSignUp = async () => {
    await logSignUp({
      method: "email"
    }).catch((err) => console.log("error: ", err));
  };

  const handlelogAddToCart = async () => {
    await logAddToCart({
      currency: "usd",
      items: [],
      value: 1
    }).catch((err) => console.log("error: ", err));
  };

  const handlelogAddToWishlist = async () => {
    await logAddToWishlist({
      currency: "usd",
      items: [],
      value: 1
    }).catch((err) => console.log("error: ", err));
  };

  const handlelogAddShippingInfo = async () => {
    await logAddShippingInfo({
      shipping_tier: "clothing",
      coupon: "co_1234567",
      currency: "usd",
      items: [],
      value: 1
    }).catch((err) => console.log("error: ", err));
  };

  const handlelogCampaignDetails = async () => {
    await logCampaignDetails({
      aclid: "clothing",
      campaign: "promotion",
      content: "clothing",
      cp1: "abcd",
      medium: "email",
      source: "newsletter",
      term: "abcd"
    }).catch((err) => console.log("error: ", err));
  };

  const handlelogEarnVirtualCurrency = async () => {
    await logEarnVirtualCurrency({
      virtual_currency_name: "usd",
      value: 3
    }).catch((err) => console.log("error: ", err));
  };

  const handlelogGenerateLead = async () => {
    await logGenerateLead({
      currency: "usd",
      value: 2
    }).catch((err) => console.log("error: ", err));
  };

  const handlelogJoinGroup = async () => {
    await logJoinGroup({
      group_id: "1234567"
    }).catch((err) => console.log("error: ", err));
  };

  const handlelogEvent = async () => {
    await logEvent("basket", {
      id: 3745092,
      item: "mens grey t-shirt",
      description: ["round neck", "long sleeved"],
      size: "L"
    }).catch((err) => console.log("error: ", err));
  };

  const handlelogLevelEnd = async () => {
    await logLevelEnd({
      level: 2,
      success: "abcd"
    }).catch((err) => console.log("error: ", err));
  };

  const handlelogLevelStart = async () => {
    await logLevelStart({
      level: 2
    }).catch((err) => console.log("error: ", err));
  };

  const handlelogLevelUp = async () => {
    await logLevelUp({
      character: "ninja",
      level: 2
    }).catch((err) => console.log("error: ", err));
  };
  const handlelogPostScore = async () => {
    await logPostScore({
      character: "ninja",
      level: 2,
      score: 60
    }).catch((err) => console.log("error: ", err));
  };

  const handlelogPurchase = async () => {
    await logPurchase({
      affiliation: "clothing",
      coupon: "co_1234567",
      currency: "usd",
      tax: 32,
      items: [],
      shipping: 2,
      transaction_id: "trans_1234567",
      value: 1
    }).catch((err) => console.log("error: ", err));
  };

  const handlelogRemoveFromCart = async () => {
    await logRemoveFromCart({
      currency: "usd",
      items: [],
      value: 32
    }).catch((err) => console.log("error: ", err));
  };

  const handlelogScreenView = async () => {
    await logScreenView({
      screen_class: "gentsLogs",
      screen_name: "Gents t-shirts"
    }).catch((err) => console.log("error: ", err));
  };

  const handlelogRefund = async () => {
    await logRefund({
      affiliation: "clothing",
      coupon: "ref_2dsg323",
      currency: "usd",
      tax: 32,
      items: [],
      shipping: 2,
      transaction_id: "df24234",
      value: 1
    }).catch((err) => console.log("error: ", err));
  };

  const handlelogSearch = async () => {
    await logSearch({
      destination: "new york",
      end_date: "2022-02-04",
      number_of_nights: 3,
      number_of_passengers: 32,
      number_of_rooms: 6,
      origin: "new york",
      search_term: "df24234",
      start_date: "2022-02-03",
      travel_class: "business"
    }).catch((err) => console.log("error: ", err));
  };

  const handlelogSelectContent = async () => {
    await logSelectContent({
      content_type: "shirts",
      item_id: "abcd6568"
    }).catch((err) => console.log("error: ", err));
  };

  const handlelogSelectItem = async () => {
    await logSelectItem({
      content_type: "shirts",
      item_list_id: "abcd6568",
      item_list_name: "gents_shirt",
      items: []
    }).catch((err) => console.log("error: ", err));
  };

  const handlelogSelectPromotion = async () => {
    await logSelectPromotion({
      creative_name: "clothing",
      creative_slot: "clothing",
      items: [],
      location_id: "nef24234",
      promotion_id: "df24234",
      promotion_name: "travel_class"
    }).catch((err) => console.log("error: ", err));
  };
  const handlelogAddPaymentInfo = async () => {
    await logAddPaymentInfo({
      payment_type: "clothing",
      coupon: "co_1234567",
      currency: "usd",
      items: [],
      value: 1
    }).catch((err) => console.log("error: ", err));
  };

  const handlesetUserId = async () => {
    await setUserId("user_1234567").catch((err) => console.log("error: ", err));
  };

  const handlelogUnlockAchievement = async () => {
    await logUnlockAchievement({
      achievement_id: "ac_32432432"
    }).catch((err) => console.log("error: ", err));
  };

  const handlelogViewCart = async () => {
    await logViewCart({
      currency: "usd",
      items: [],
      value: 32
    }).catch((err) => console.log("error: ", err));
  };

  const handlelogViewItem = async () => {
    await logViewItem({
      currency: "aud",
      value: 2,
      items: []
    }).catch((err) => console.log("error: ", err));
  };

  const handlelogViewItemList = async () => {
    await logViewItemList({
      item_list_id: "gs_fdf242345",
      item_list_name: "gents_shirt",
      items: []
    }).catch((err) => console.log("error: ", err));
  };

  const handlelogViewPromotion = async () => {
    await logViewPromotion({
      creative_name: "clothing",
      creative_slot: "clothing",
      items: [],
      location_id: "nef24234",
      promotion_id: "df24234",
      promotion_name: "travel_class"
    }).catch((err) => console.log("error: ", err));
  };

  const handlelogBeginCheckout = async () => {
    await logBeginCheckout({
      coupon: "co_1234567",
      currency: "usd",
      items: [],
      value: 1
    }).catch((err) => console.log("error: ", err));
  };

  const handlelogViewSearchResults = async () => {
    await logViewSearchResults({
      search_term: "sleeves"
    }).catch((err) => console.log("error: ", err));
  };

  const handlelogShare = async () => {
    await logShare({
      content_type: "clothing",
      item_id: "abcd",
      method: "facebook"
    }).catch((err) => console.log("error: ", err));
  };

  const handlesetUserProperty = async () => {
    await setUserProperty("name", "john").catch((err) => console.log("error: ", err));
  };

  const handlesetUserProperties = async () => {
    await setUserProperties({
      name: "john",
      value: "68568"
    }).catch((err) => console.log("error: ", err));
  };

  const handlesetSessionTimeoutDuration = async () => {
    await setSessionTimeoutDuration(5000).catch((err) => console.log("error: ", err));
  };

  const handlelogSpendVirtualCurrency = async () => {
    await logSpendVirtualCurrency({
      item_name: "T-Shirt",
      value: 56,
      virtual_currency_name: "usd"
    }).catch((err) => console.log("error: ", err));
  };

  const handlesetDefaultEventParameters = async () => {
    await setDefaultEventParameters({
      event_name: "search"
    }).catch((err) => console.log("error: ", err));
  };

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
            <TouchableOpacity onPress={handlelogLogin} style={styles.button}>
              <Text style={styles.text}>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handlelogSignUp} style={styles.button}>
              <Text style={styles.text}>SignUp</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={handlelogAddToCart} style={styles.button}>
              <Text style={styles.text}>AddToCart</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handlelogAddToWishlist} style={styles.button}>
              <Text style={styles.text}>AddToWishlist</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={async () => logAppOpen()} style={styles.button}>
              <Text style={styles.text}>AppOpen</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handlelogAddShippingInfo} style={styles.button}>
              <Text style={styles.text}>AddShippingInfo</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={handlelogCampaignDetails} style={styles.button}>
              <Text style={styles.text}>CampaignDetails</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handlelogEarnVirtualCurrency} style={styles.button}>
              <Text style={styles.text}>EarnVirtualCurrency</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={handlelogGenerateLead} style={styles.button}>
              <Text style={styles.text}>GenerateLead</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handlelogJoinGroup} style={styles.button}>
              <Text style={styles.text}>JoinGroup</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={handlelogEvent} style={styles.button}>
              <Text style={styles.text}>Event</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handlelogLevelEnd} style={styles.button}>
              <Text style={styles.text}>LevelEnd</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={handlelogLevelStart} style={styles.button}>
              <Text style={styles.text}>LevelStart</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handlelogLevelUp} style={styles.button}>
              <Text style={styles.text}>LevelUp</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={handlelogPostScore} style={styles.button}>
              <Text style={styles.text}>PostScore</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handlelogPurchase} style={styles.button}>
              <Text style={styles.text}>Purchase</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={handlelogRemoveFromCart} style={styles.button}>
              <Text style={styles.text}>RemoveFromCart</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handlelogScreenView} style={styles.button}>
              <Text style={styles.text}>ScreenView</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={handlelogRefund} style={styles.button}>
              <Text style={styles.text}>Refund</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handlelogSearch} style={styles.button}>
              <Text style={styles.text}>Search</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={handlelogSelectContent} style={styles.button}>
              <Text style={styles.text}>SelectContent</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handlelogSelectItem} style={styles.button}>
              <Text style={styles.text}>SelectItem</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={handlelogSelectPromotion} style={styles.button}>
              <Text style={styles.text}>SelectPromotion</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handlelogAddPaymentInfo} style={styles.button}>
              <Text style={styles.text}>AddPaymentInfo</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={handlesetUserId} style={styles.button}>
              <Text style={styles.text}>setUserId</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={async () => logTutorialBegin()} style={styles.button}>
              <Text style={styles.text}>TutorialBegin</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={handlelogUnlockAchievement} style={styles.button}>
              <Text style={styles.text}>UnlockAchievement</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handlelogViewCart} style={styles.button}>
              <Text style={styles.text}>ViewCart</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={async () => logTutorialComplete()} style={styles.button}>
              <Text style={styles.text}>TutorialComplete</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handlelogViewItem} style={styles.button}>
              <Text style={styles.text}>ViewItem</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={handlelogViewItemList} style={styles.button}>
              <Text style={styles.text}>ViewItemList</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handlelogViewPromotion} style={styles.button}>
              <Text style={styles.text}>ViewPromotion</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={handlelogBeginCheckout} style={styles.button}>
              <Text style={styles.text}>BeginCheckout</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={async () => resetAnalyticsData()} style={styles.button}>
              <Text style={styles.text}>ResetAnalyticsData</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={handlelogViewSearchResults} style={styles.button}>
              <Text style={styles.text}>ViewSearchResults</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handlelogShare} style={styles.button}>
              <Text style={styles.text}>Share</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={handlesetUserProperty} style={styles.button}>
              <Text style={styles.text}>SetUserProperty</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handlesetUserProperties} style={styles.button}>
              <Text style={styles.text}>SetUserProperties</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={handlesetSessionTimeoutDuration} style={styles.button}>
              <Text style={styles.text}>SetSessionTimeoutDuration</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handlelogSpendVirtualCurrency} style={styles.button}>
              <Text style={styles.text}>SpendVirtualCurrency</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={handlesetDefaultEventParameters} style={styles.button}>
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
