import { getGlobalOptions } from "@options";

const global = getGlobalOptions();
const BASE_URL = global.url; // change your BASE_URL in `options/options.js` to edit this value
const token = "Token 676364403988909cde7f501aa2efeaf9ca30d18c";
// FIXME: Make this call with Authorization
// Right now there is no login in this module but when this feture will be added
// there will be a user profile added make changes accordingly
export const fetchPaymentSheetParams = async (amount) => {
  const response = await fetch(`${BASE_URL}/modules/payments/payment_sheet/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: token
    },
    body: JSON.stringify({
      cents: parseFloat(amount) * 100
    })
  });

  const { paymentIntent, ephemeralKey, customer } = await response.json();
  __DEV__ && console.log("response", { paymentIntent, ephemeralKey, customer });
  return {
    paymentIntent,
    ephemeralKey,
    customer
  };
};

export const fetchPaymentHistory = async () => {
  const response = await fetch(
    `${BASE_URL}/modules/payments/get_payments_history/`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token
      }
    }
  );
  const { data } = await response.json();
  return data;
};
