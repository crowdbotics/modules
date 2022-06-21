// @ts-ignore
import analytics from "@react-native-firebase/analytics";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    height: "100%"
  },
  sectionContainer: { marginVertical: 10 },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "100%"
  },
  button: {
    backgroundColor: "#000",
    margin: 5,
    width: "46%",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 7
  },
  text: { color: "#fff", textAlign: "center", fontWeight: "bold", fontSize: 16 },
  appIdContainer: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-start",
    backgroundColor: "#f4f3f4",
    margin: 10,
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 7
  },
  appIdHeading: { fontSize: 22, color: "#000", marginBottom: 5, fontWeight: "bold" },
  appIdText: { fontSize: 16 },
  trackingContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    margin: 10,
    paddingHorizontal: 10
  },
  switch: { borderWidth: 2, borderColor: "#000" }
});

const logBeginCheckout = async (data) => {
  await analytics().logBeginCheckout(data);
};

const logAddPaymentInfo = async (data) => {
  await analytics().logAddPaymentInfo(data);
};

const logAddShippingInfo = async (data) => {
  await analytics().logAddShippingInfo(data);
};

const logAddToCart = async (data) => {
  await analytics().logAddToCart(data);
};

const logAddToWishlist = async (data) => {
  await analytics().logAddToWishlist(data);
};

const logAppOpen = async () => {
  await analytics().logAppOpen();
};
const logCampaignDetails = async (data) => {
  await analytics().logCampaignDetails(data);
};

const logJoinGroup = async (data) => {
  await analytics().logJoinGroup(data);
};

const logLogin = async (data) => {
  await analytics().logLogin(data);
};

const logPurchase = async (data) => {
  await analytics().logPurchase(data);
};

const logRemoveFromCart = async (data) => {
  await analytics().logRemoveFromCart(data);
};

const logScreenView = async (data) => {
  await analytics().logScreenView(data);
};

const logSignUp = async (data) => {
  await analytics().logSignUp(data);
};

const logShare = async (data) => {
  await analytics().logShare(data);
};
const logViewCart = async (data) => {
  await analytics().logViewCart(data);
};

const setUserProperty = async (name, value) => { // params: (String name, String value)
  await analytics().setUserProperty(name, value);
};

const setUserProperties = async (data) => {
  await analytics().setUserProperties(data);
};

const logEarnVirtualCurrency = async (data) => {
  await analytics().logEarnVirtualCurrency(data);
};

const logEvent = async (eventName, eventData) => {
  await analytics().logEvent(eventName, eventData);
};

const logGenerateLead = async (data) => {
  await analytics().logGenerateLead(data);
};

const logLevelEnd = async (data) => {
  await analytics().logLevelEnd(data);
};

const logLevelStart = async (data) => {
  await analytics().logLevelStart(data);
};

const logLevelUp = async (data) => {
  await analytics().logLevelUp(data);
};

const logPostScore = async (data) => {
  await analytics().logPostScore(data);
};

const logRefund = async (data) => {
  await analytics().logRefund(data);
};

const logSearch = async (data) => {
  await analytics().logSearch(data);
};

const logSelectContent = async (data) => {
  await analytics().logSelectContent(data);
};

const logSelectItem = async (data) => {
  await analytics().logSelectItem(data);
};

const logSelectPromotion = async (data) => {
  await analytics().logSelectPromotion(data);
};

const logSpendVirtualCurrency = async (data) => {
  await analytics().logSpendVirtualCurrency(data);
};

const logTutorialBegin = async () => {
  await analytics().logTutorialBegin();
};

const logTutorialComplete = async () => {
  await analytics().logTutorialComplete();
};

const logUnlockAchievement = async (data) => {
  await analytics().logUnlockAchievement(data);
};

const logViewItem = async (data) => {
  await analytics().logViewItem(data);
};

const logViewItemList = async (data) => {
  await analytics().logViewItemList(data);
};

const logViewPromotion = async (data) => {
  await analytics().logViewPromotion(data);
};

const logViewSearchResults = async (data) => {
  await analytics().logViewSearchResults(data);
};

const resetAnalyticsData = async () => {
  await analytics().resetAnalyticsData();
};

const setDefaultEventParameters = async (data) => { // params: any
  await analytics().setDefaultEventParameters(data);
};

const setSessionTimeoutDuration = async (timeInMilliseconds) => { // milliseconds
  await analytics().setSessionTimeoutDuration(timeInMilliseconds);
};

const setUserId = async (userId) => {
  await analytics().setUserId(userId);
};

export default {
  styles: styles,
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
};
