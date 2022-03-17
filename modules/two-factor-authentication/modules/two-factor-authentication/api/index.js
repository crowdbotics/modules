import { getGlobalOptions } from "@options";


const global = getGlobalOptions();
const BASE_URL = "https://9a8a-39-53-182-70.ngrok.io" // global.url; // change your BASE_URL in `options/options.js` to edit this value

export const smsVerification = async (data) => {
  const response = await fetch(`${BASE_URL}/modules/two-factor-authentication/phonenumber/send_otp/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data)
  })
  
  return response.json()
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