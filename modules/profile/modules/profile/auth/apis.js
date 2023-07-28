// @ts-ignore
import { getGlobalOptions } from "@options";
import axios from "axios";

const global = getGlobalOptions();
const BASE_URL = global.url;

const profileAPI = axios.create({
  baseURL: BASE_URL
});

const adduser = (data, token) => {
  return profileAPI.post("/modules/profile/user-profile/", data, {
    headers: { Authorization: `Token ${token}` }
  });
};

const getUser = (token) => {
  return profileAPI.get("/modules/profile/user-profile/", {
    headers: { Authorization: `Token ${token}` }
  });
};

const deleteUser = async (token) => {
  return profileAPI.delete("/modules/profile/user-profile/", {
    headers: { Authorization: `Token ${token}` }
  });
};

export const api = {
  adduser: adduser,
  getUser: getUser,
  deleteUser: deleteUser
};
