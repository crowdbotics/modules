import { getGlobalOptions } from "@options";
import axios from "axios";

const global = getGlobalOptions();
const BASE_URL = global.url; // change your BASE_URL in `options/options.js` to edit this value

export const sendMessage = async payload => {
//   const token = await AsyncStorage.getItem("accessToken");
  const config = {
    method: "post",
    maxBodyLength: Infinity,
    url: `${BASE_URL}/modules/open-ai-chat/chat/`,
    headers: {
    //   Authorization: `Token ${token}`
    },
    data: payload
  };
  return axios.request(config);
};

export const getMessages = async () => {
//   const token = await AsyncStorage.getItem("accessToken");
  const config = {
    method: "get",
    maxBodyLength: Infinity,
    url: `${BASE_URL}/modules/open-ai-chat/chat/`,
    headers: {
    //   Authorization: `Token ${token}`
    }
  };
  return axios.request(config);
};

export const api = {
  getMessages,
  sendMessage
};
