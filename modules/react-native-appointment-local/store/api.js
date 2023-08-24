import axios from "axios";
import { getGlobalOptions } from "@options";

const global = getGlobalOptions();
const BASE_URL = global.url;

export const createAppointment = (data, token) => {
  const config = {
    method: "post",
    maxBodyLength: Infinity,
    url: `${BASE_URL}/modules/appointment-local/appointment/`,
    headers: {
      Authorization: `Token ${token}`
    },
    data: data
  };
  return axios.request(config);
};

export const getAppointment = (token) => {
  const config = {
    method: "get",
    maxBodyLength: Infinity,
    url: `${BASE_URL}/modules/appointment-local/appointment/`,
    headers: {
      Authorization: `Token ${token}`
    }
  };
  return axios.request(config);
};

export const deleteAppointment = (id, token) => {
  const config = {
    method: "delete",
    maxBodyLength: Infinity,
    url: `${BASE_URL}/modules/appointment-local/appointment/${id}/`,
    headers: {
      Authorization: `Token ${token}`
    }
  };
  return axios.request(config);
};

export const getAppointmentSessions = (token) => {
  const config = {
    method: "get",
    maxBodyLength: Infinity,
    url: `${BASE_URL}/modules/appointment-local/appointment_session/`,
    headers: {
      Authorization: `Token ${token}`
    }
  };
  return axios.request(config);
};

export const getAppointmentTypes = (token) => {
  const config = {
    method: "get",
    maxBodyLength: Infinity,
    url: `${BASE_URL}/modules/appointment-local/meetings-information/`,
    headers: {
      Authorization: `Token ${token}`
    }
  };
  return axios.request(config);
};

export const getServiceProviders = (token) => {
  const config = {
    method: "get",
    maxBodyLength: Infinity,
    url: `${BASE_URL}/api/v1/get_users/`,
    headers: {
      Authorization: `Token ${token}`
    }
  };
  return axios.request(config);
};

export const api = {
  createAppointment,
  getAppointment,
  deleteAppointment,
  getAppointmentSessions,
  getAppointmentTypes,
  getServiceProviders
};
