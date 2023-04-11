// @ts-ignore
import { getGlobalOptions } from "@options";
import axios from "axios";

const global = getGlobalOptions();
const BASE_URL = global.url;

const authAPI = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" }
});

function getCode(payload) {
  return authAPI.get(
    `/modules/two-factor-authentication/2fa?id=${payload.id}`,
    null
  );
}

function sendVerification(payload) {
  return authAPI.post(
    "/modules/two-factor-authentication/twofactorauth/send_otp/",
    payload
  );
}

const verifyCode = async (data) => {
  try {
    const response = await fetch(`${BASE_URL}/modules/two-factor-authentication/verify/verify_otp/`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });
    return response.json();
  } catch (error) {
    throw new Error("NETWORK_ERROR").message;
  }
};

export const api = {
  getCode,
  sendVerification,
  verifyCode
};
