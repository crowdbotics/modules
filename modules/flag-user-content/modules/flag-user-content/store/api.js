import { getGlobalOptions } from "@options";
import axios from "axios";
import localOptions from "../options";

const global = getGlobalOptions();
const BASE_URL = global.url; // change your BASE_URL in `options/options.js` to edit this value

const { ACCESS_TOKEN } = localOptions;

export const createReport = (payload) => {
  const config = {
    method: "post",
    maxBodyLength: Infinity,
    url: `${BASE_URL}/modules/flag-user-content/create-report/`,
    headers: {
      Authorization: `Token ${ACCESS_TOKEN}`
    },
    data: payload
  };
  return axios.request(config);
};

export const getChoices = () => {
  const config = {
    method: "get",
    maxBodyLength: Infinity,
    url: `${BASE_URL}/modules/flag-user-content/choice-list/`,
    headers: {
      Authorization: `Token ${ACCESS_TOKEN}`
    }
  };
  return axios.request(config);
};

export const getReportedList = () => {
  const config = {
    method: "get",
    maxBodyLength: Infinity,
    url: `${BASE_URL}/modules/flag-user-content/reported-list/`,
    headers: {
      Authorization: `Token ${ACCESS_TOKEN}`
    }
  };
  return axios.request(config);
};
export const api = {
  createReport,
  getChoices,
  getReportedList
};
