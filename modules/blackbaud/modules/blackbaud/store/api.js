import axios from "axios";
import { globalOptions } from "../../../options/options";

export const getEventListing = (accessToken) => {
  const config = {
    method: "get",
    maxBodyLength: Infinity,
    url: `${globalOptions.url}/modules/blackbaud/events/list/`,
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  };
  return axios.request(config);
};

export const getEventDetails = (accessToken, id) => {
  const config = {
    method: "get",
    maxBodyLength: Infinity,
    url: `${globalOptions.url}/modules/blackbaud/event/details/${id}/`,
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json"
    }
  };
  return axios.request(config);
};

export const getAttendeeList = (accessToken, id) => {
  const config = {
    method: "get",
    maxBodyLength: Infinity,
    url: `${globalOptions.url}/modules/blackbaud/event/participants_list/${id}/`,
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json"
    }
  };
  return axios.request(config);
};

export const api = {
  getEventListing,
  getEventDetails,
  getAttendeeList
};
