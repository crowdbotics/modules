import { localOptions } from "./options";
import axios from "axios";

const BASE_URL = localOptions.url; // change your BASE_URL in `/options.js` to edit this value

export const getListing = (accessToken) => {
  const config = {
    method: "get",
    maxBodyLength: Infinity,
    url: `${BASE_URL}/modules/blackbaud-sky/service/events/list/`,
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  };
  return axios.request(config);
};
