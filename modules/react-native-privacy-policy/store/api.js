import axios from "axios";
import { getGlobalOptions } from "@options";

const global = getGlobalOptions();
const BASE_URL = global.url; // change your BASE_URL in `options/options.js` to edit this value

const authAPI = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json"
  }
});

function fetchPrivacy(payload) {
  return authAPI.get("/modules/privacy-policy/");
}

export const api = {
  fetchPrivacy
};
