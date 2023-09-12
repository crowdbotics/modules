import axios from "axios";
import { getGlobalOptions } from "@options";

const global = getGlobalOptions();
const BASE_URL = "https://3a61-119-154-219-193.ngrok-free.app"; // change your BASE_URL in `options/options.js` to edit this value

const accessToken = "91e188303334617e2d464589f6d0751f99810480";

export const createReport = (payload) => {
  const config = {
    method: "post",
    maxBodyLength: Infinity,
    url: `${BASE_URL}/modules/flag-user-content/create-report/`,
    headers: {
      Authorization: `Token ${accessToken}`
    },
    data: payload
  };
  return axios.request(config);
};

export const getChoices = () => {
  const config = {
    method: "get",
    maxBodyLength: Infinity,
    url: `${BASE_URL}/modules/flag-user-content/choice_list/`,
    headers: {
      Authorization: `Token ${accessToken}`
    }
  };
  return axios.request(config);
};

export const getReportedList = () => {
  const config = {
    method: "get",
    maxBodyLength: Infinity,
    url: `${BASE_URL}/modules/flag-user-content/reported_list/`,
    headers: {
      Authorization: `Token ${accessToken}`
    }
  };
  return axios.request(config);
};
export const api = {
  createReport,
  getChoices,
  getReportedList
};
