
import { getGlobalOptions } from "@options";

const global = getGlobalOptions();
const BASE_URL = global.url;

export const sendVerification = async (data) => {
  try {
    const response = await fetch(`${BASE_URL}/modules/two-factor-authentication/twofactorauth/send_otp/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });
    return response;
  } catch (error) {
    throw new Error("NETWORK_ERROR").message;
  }
};

export const verifyCode = async (data) => {
  try {
    const response = await fetch(`${BASE_URL}/modules/two-factor-authentication/verify/verify_otp/`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });
    return response;
  } catch (error) {
    throw new Error("NETWORK_ERROR").message;
  }
};

export const getCode = async (id) => {
  const response = await fetch(`${BASE_URL}/modules/two-factor-authentication/2fa?id=${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    }
  });
  return await response.json();
};

export const verify2FA = async (data) => {
  try {
    const response = await fetch(`${BASE_URL}/modules/two-factor-authentication/2fa`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });
    return response;
  } catch (error) {
    throw new Error("NETWORK_ERROR").message;
  }
};

export const set2faMethod = async (data) => {
  try {
    const response = await fetch(`${BASE_URL}/modules/two-factor-authentication/twofactorauth/${data.id}/`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });
    return response;
  } catch (error) {
    throw new Error("NETWORK_ERROR").message;
  }
};

export const getUser = async (data) => {
  try {
    const response = await fetch(`${BASE_URL}/modules/two-factor-authentication/twofactorauth/${data.id}/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    });
    return await response.json();
  } catch (error) {
    throw new Error("NETWORK_ERROR").message;
  }
};
