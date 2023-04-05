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

function verify2FA(payload) {
  return authAPI.post("/modules/two-factor-authentication/2fa", payload);
}

function set2faMethod(payload) {
  return authAPI.patch(
    `/modules/two-factor-authentication/twofactorauth/${payload.id}/`,
    { method: payload.method }
  );
}

function getUser(payload) {
  return authAPI.get(
    `/modules/two-factor-authentication/twofactorauth/${payload.id}/`,
    payload
  );
}

export const api = {
  getCode,
  sendVerification,
  verifyCode,
  verify2FA,
  set2faMethod,
  getUser
};
