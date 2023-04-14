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

function saveSignature(payload) {
  return authAPI.post("/modules/signature/upload_signature/", payload);
}

export const api = {
  saveSignature
};
