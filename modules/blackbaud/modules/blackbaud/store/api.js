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

export const getAddressList = (accessToken) => {
  const config = {
    method: "get",
    maxBodyLength: Infinity,
    url: `${globalOptions.url}/modules/blackbaud/constituents/get_address_list/`,
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json"
    }
  };
  return axios.request(config);
};

export const getConstituentCodeList = (accessToken) => {
  const config = {
    method: "get",
    maxBodyLength: Infinity,
    url: `${globalOptions.url}/modules/blackbaud/constituents/get_constituent_code_list/`,
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json"
    }
  };
  return axios.request(config);
};

export const getConstituentCodeDetails = (data) => {
  const config = {
    method: "get",
    maxBodyLength: Infinity,
    url: `${globalOptions.url}/modules/blackbaud/constituents/get_constituent_code_details/${data.id}/`,
    headers: {
      Authorization: `Bearer ${data.token}`,
      "Content-Type": "application/json"
    }
  };
  return axios.request(config);
};

export const getConstituentCodeListInConstituent = (data) => {
  const config = {
    method: "get",
    maxBodyLength: Infinity,
    url: `${globalOptions.url}/modules/blackbaud/constituents/get_constituent_code_list_in_constituent/${data.id}/`,
    headers: {
      Authorization: `Bearer ${data.token}`,
      "Content-Type": "application/json"
    }
  };
  return axios.request(config);
};

export const getConstituentCustomFieldCategories = (accessToken) => {
  const config = {
    method: "get",
    maxBodyLength: Infinity,
    url: `${globalOptions.url}/modules/blackbaud/constituents/get_constituent_custom_field_categories/`,
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json"
    }
  };
  return axios.request(config);
};

export const getConstituentCustomFieldCategoriesDetails = (accessToken) => {
  const config = {
    method: "get",
    maxBodyLength: Infinity,
    url: `${globalOptions.url}/modules/blackbaud/constituents/get_constituent_custom_field_categories_details/`,
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json"
    }
  };
  return axios.request(config);
};

export const getConstituentCustomFieldCategoriesValues = (data) => {
  const config = {
    method: "get",
    maxBodyLength: Infinity,
    url: `${globalOptions.url}/modules/blackbaud/constituents/get_constituent_custom_field_categories_values/?category_name=${data.name}`,
    headers: {
      Authorization: `Bearer ${data.token}`,
      "Content-Type": "application/json"
    }
  };
  return axios.request(config);
};

export const getConstituentCustomFieldList = (data) => {
  const config = {
    method: "get",
    maxBodyLength: Infinity,
    url: `${globalOptions.url}/modules/blackbaud/constituents/get_constituent_custom_field_list/`,
    headers: {
      Authorization: `Bearer ${data}`,
      "Content-Type": "application/json"
    }
  };
  return axios.request(config);
};

export const getConstituentList = (accessToken) => {
  const config = {
    method: "get",
    maxBodyLength: Infinity,
    url: `${globalOptions.url}/modules/blackbaud/constituents/list/`,
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json"
    }
  };
  return axios.request(config);
};

export const createConstituent = (data) => {
  const config = {
    method: "post",
    maxBodyLength: Infinity,
    url: `${globalOptions.url}/modules/blackbaud/constituents/create_constituent/`,
    headers: {
      Authorization: `Bearer ${data.token}`,
      "Content-Type": "application/json"
    },
    data: data.payload
  };
  return axios.request(config);
};

export const getChannels = (accessToken) => {
  const config = {
    method: "get",
    maxBodyLength: Infinity,
    url: `${globalOptions.url}/modules/blackbaud/consent/channels/`,
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json"
    }
  };
  return axios.request(config);
};

export const getConstituentAppealList = (data) => {
  const config = {
    method: "get",
    maxBodyLength: Infinity,
    url: `${globalOptions.url}/modules/blackbaud/constituents/constituent_appeal_list/${data.id}/`,
    headers: {
      Authorization: `Bearer ${data.token}`,
      "Content-Type": "application/json"
    }
  };
  return axios.request(config);
};

export const getConstituentAttachmentList = (data) => {
  const config = {
    method: "get",
    maxBodyLength: Infinity,
    url: `${globalOptions.url}/modules/blackbaud/constituents/constituent_attachment_list/${data.id}/`,
    headers: {
      Authorization: `Bearer ${data.token}`,
      "Content-Type": "application/json"
    }
  };
  return axios.request(config);
};

export const getConstituentDetails = (data) => {
  const config = {
    method: "get",
    maxBodyLength: Infinity,
    url: `${globalOptions.url}/modules/blackbaud/constituents/constituent_details/${data.id}/`,
    headers: {
      Authorization: `Bearer ${data.token}`,
      "Content-Type": "application/json"
    }
  };
  return axios.request(config);
};

export const getEducationList = (accessToken) => {
  const config = {
    method: "get",
    maxBodyLength: Infinity,
    url: `${globalOptions.url}/modules/blackbaud/constituents/get_education_list/`,
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json"
    }
  };
  return axios.request(config);
};

export const getCurrencyConfiguration = (accessToken) => {
  const config = {
    method: "get",
    maxBodyLength: Infinity,
    url: `${globalOptions.url}/modules/blackbaud/constituents/get_currencyconfiguration/`,
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json"
    }
  };
  return axios.request(config);
};

export const getCountries = (accessToken) => {
  const config = {
    method: "get",
    maxBodyLength: Infinity,
    url: `${globalOptions.url}/modules/blackbaud/constituents/get_countries/`,
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
  getAttendeeList,
  getAddressList,
  getConstituentCodeList,
  getConstituentCodeDetails,
  getConstituentCodeListInConstituent,
  getConstituentCustomFieldCategories,
  getConstituentCustomFieldCategoriesDetails,
  getConstituentCustomFieldCategoriesValues,
  getConstituentCustomFieldList,
  getConstituentList,
  createConstituent,
  getChannels,
  getConstituentAppealList,
  getConstituentAttachmentList,
  getConstituentDetails,
  getEducationList,
  getCurrencyConfiguration,
  getCountries,
};
