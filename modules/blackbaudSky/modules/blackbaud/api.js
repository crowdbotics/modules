import { localOptions } from "./options";
import axios from "axios";

const BASE_URL = localOptions.url; // change your BASE_URL in `/options.js` to edit this value

export const sendCode = async (code) => {
  let data = JSON.stringify({
    code
  });
  let config = {
    method: "post",
    maxBodyLength: Infinity,
    url: `${BASE_URL}/modules/blackbaud-sky/service/access/token/`,
    headers: {
      "Content-Type": "application/json"
    },
    data: data
  };
  return axios.request(config);
};

export const getListing = async (accessToken) => {
  let config = {
    method: "get",
    maxBodyLength: Infinity,
    url: `${BASE_URL}/modules/blackbaud-sky/service/events/list/`,
    headers: {
      Authorization: `Bearer ${accessToken}`,
    }
  };
  return axios.request(config);
};
