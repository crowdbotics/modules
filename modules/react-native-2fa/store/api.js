// @ts-ignore
import { getGlobalOptions } from "@options";
import axios from "axios";
import options from "../options";

const global = getGlobalOptions();
const BASE_URL = global.url;

const authAPI = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" }
});

function getCode(id) {
  return authAPI.get(`/modules/two-factor-authentication/2fa?id=${id}`, null);
}

function sendVerification(payload) {
  return authAPI.post(
    "/modules/two-factor-authentication/twofactorauth/send_otp/",
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${options.token}`
      }
    }
  );
}

function verifyCode(payload) {
  return authAPI.post(
    "/modules/two-factor-authentication/verify/verify_otp/",
    payload,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${options.token}`
      }
    }
  );
}

function getGoogleAuthenticatorQR(payload) {
  return authAPI.get(
    "/modules/two-factor-authentication/google/authenticator/qr",
    payload,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${options.token}`
      }
    }
  );
}

function verify2FA(payload) {
  return authAPI.post("/modules/two-factor-authentication/2fa", payload);
}

function set2faMethod(payload) {
  return authAPI.patch(
    `/modules/two-factor-authentication/twofactorauth/${payload.id}/`,
    payload
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
  getGoogleAuthenticatorQR,
  verify2FA,
  set2faMethod,
  getUser
};
