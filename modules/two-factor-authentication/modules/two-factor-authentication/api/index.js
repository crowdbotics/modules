import { getGlobalOptions } from "@options";


const global = getGlobalOptions();
const BASE_URL = "https://b7e6-39-53-96-150.ngrok.io" // global.url; // change your BASE_URL in `options/options.js` to edit this value

export const smsVerification = async (data) => {
  const response = await fetch(`${BASE_URL}/modules/two-factor-authentication/phonenumber/send_otp/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data)
  })
  return response
};

export const verifyCode= async (data) => {
  const response = await fetch(`${BASE_URL}/modules/two-factor-authentication/verify/verify_otp/`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data)
  })
  return response.json()
};