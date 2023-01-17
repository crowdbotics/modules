// @ts-ignore
import { getGlobalOptions } from "@options";
import options from "../options";
import axios from "axios";

const global = getGlobalOptions();
const BASE_URL = global.url;

const profileAPI = axios.create({
  baseURL: BASE_URL
});

const adduser = (data) => {
  return profileAPI.post("/modules/profile/user-profile/", data, {
    headers: { Authorization: `Token ${options.user_token}` }
  });
};

const getUser = () => {
  return profileAPI.get("/modules/profile/user-profile/", {
    headers: { Authorization: `Token ${options.user_token}` }
  });
};

const deleteUser = async () => {
  return profileAPI.delete("/modules/profile/user-profile/", {
    headers: { Authorization: `Token ${options.user_token}` }
  });
};

export const api = {
  adduser: adduser,
  getUser: getUser,
  deleteUser: deleteUser
};
