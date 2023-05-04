import axios from "axios";
import { globalOptions } from "../../../options/options";

export const getEventListing = (accessToken) => {
  const config = {
    method: "get",
    maxBodyLength: Infinity,
    url: `${globalOptions.url}/modules/blackbaud-sky/service/events/list/`,
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  };
  return axios.request(config);
};

export const api = {
  getEventListing
};
