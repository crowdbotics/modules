import { getGlobalOptions } from "@options";
import options from "../options";
import axios from "axios";

const global = getGlobalOptions();
const BASE_URL = global.url; // change your BASE_URL in `options/options.js` to edit this value

// FIXME: Make this call with Authorization
// Right now there is no login in this module but when this feture will be added
// there will be a user profile added make changes accordingly

const authAPI = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Authorization: options.token
  }
});

function fetchPaymentSheetParams(amount) {
  return authAPI.post("/modules/payments/create_payment_intent_sheet/", {
    cents: parseFloat(amount) * 100
  });
}

function fetchPaymentHistory() {
  return authAPI.get("/modules/payments/get_payments_history/");
}

export const api = {
  fetchPaymentSheetParams,
  fetchPaymentHistory
};
