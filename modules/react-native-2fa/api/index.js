// @ts-ignore
import { getGlobalOptions } from "@options";
import options from "../options";

const global = getGlobalOptions();
const BASE_URL = global.url;

export const sendVerification = async (data) => {
  try {
    const response = await fetch(`${BASE_URL}/modules/two-factor-authentication/send/otp`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${options.token}`
      },
      body: JSON.stringify(data)
    });
    return await response;
  } catch (error) {
    throw new Error("NETWORK_ERROR").message;
  }
};

export const getGoogleAuthenticatorQR = async () => {
  try {
    const response = await fetch(`${BASE_URL}/modules/two-factor-authentication/google/authenticator/qr`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${options.token}`
      }
    });
    return response;
  } catch (error) {
    throw new Error("NETWORK_ERROR").message;
  }
};

export const verifyCode = async (data) => {
  try {
    const response = await fetch(`${BASE_URL}/modules/two-factor-authentication/verify/otp`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${options.token}`
      },
      body: JSON.stringify(data)
    });
    return response;
  } catch (error) {
    throw new Error("NETWORK_ERROR").message;
  }
};
