import { getGlobalOptions } from "@options";

const global = getGlobalOptions();
const BASE_URL = global.url; // change your BASE_URL in `options/options.js` to edit this value
const token = "your token here";
// FIXME: Make this call with Authorization
// Right now there is no login in this module but when this feture will be added
// there will be a user profile added make changes accordingly
export const fetchPaymentSheetParams = async (priceTier) => {
  const response = await fetch(`${BASE_URL}/modules/subscription/buy_subscription_plan/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: token
    },
    body: JSON.stringify({
      price_tier: priceTier
    })
  });

  const { customer, paymentIntent, ephemeralKey } = await response.json();
  __DEV__ && console.log("response", { paymentIntent, ephemeralKey, customer, response });
  return {
    paymentIntent,
    ephemeralKey,
    customer
  };
};

export const fetchPlans = async () => {
  const response = await fetch(`${BASE_URL}/modules/subscription/get_subscription_plans/`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: token
    }
  });
  return response;
};

export const cancelPlan = async () => {
  const response = await fetch(`${BASE_URL}/modules/subscription/cancel_subscription_plan/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: token
    }
  });
  return response;
};
