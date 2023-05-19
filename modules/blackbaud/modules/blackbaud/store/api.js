import axios from "axios";
import { getGlobalOptions } from "@options";

const global = getGlobalOptions();
const BASE_URL = global.url; // change your BASE_URL in `options/options.js` to edit this value

export const getEventListing = accessToken => {
  const config = {
    method: "get",
    maxBodyLength: Infinity,
    url: `${BASE_URL}/modules/blackbaud/events/list/`,
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
    url: `${BASE_URL}/modules/blackbaud/event/details/${id}/`,
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
    url: `${BASE_URL}/modules/blackbaud/event/participants_list/${id}/`,
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
    url: `${BASE_URL}/modules/blackbaud/constituents/get_address_list/`,
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
    url: `${BASE_URL}/modules/blackbaud/constituents/get_constituent_code_list/`,
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
    url: `${BASE_URL}/modules/blackbaud/constituents/get_constituent_code_details/${data.id}/`,
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
    url: `${BASE_URL}/modules/blackbaud/constituents/get_constituent_code_list_in_constituent/${data.id}/`,
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
    url: `${BASE_URL}/modules/blackbaud/constituents/get_constituent_custom_field_categories/`,
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
    url: `${BASE_URL}/modules/blackbaud/constituents/get_constituent_custom_field_categories_details/`,
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
    url: `${BASE_URL}/modules/blackbaud/constituents/get_constituent_custom_field_categories_values/?category_name=${data.name}`,
    headers: {
      Authorization: `Bearer ${data.token}`,
      "Content-Type": "application/json"
    }
  };
  return axios.request(config);
};

export const getConstituentCustomFieldList = (accessToken) => {
  const config = {
    method: "get",
    maxBodyLength: Infinity,
    url: `${BASE_URL}/modules/blackbaud/constituents/get_constituent_custom_field_list/`,
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json"
    }
  };
  return axios.request(config);
};

export const getConstituentList = (accessToken) => {
  const config = {
    method: "get",
    maxBodyLength: Infinity,
    url: `${BASE_URL}/modules/blackbaud/constituents/list/`,
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
    url: `${BASE_URL}/modules/blackbaud/constituents/create_constituent/`,
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
    url: `${BASE_URL}/modules/blackbaud/consent/channels/`,
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
    url: `${BASE_URL}/modules/blackbaud/constituents/constituent_appeal_list/${data.id}/`,
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
    url: `${BASE_URL}/modules/blackbaud/constituents/constituent_attachment_list/${data.id}/`,
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
    url: `${BASE_URL}/modules/blackbaud/constituents/constituent_details/${data.id}/`,
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
    url: `${BASE_URL}/modules/blackbaud/constituents/get_education_list/`,
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
    url: `${BASE_URL}/modules/blackbaud/constituents/get_currencyconfiguration/`,
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
    url: `${BASE_URL}/modules/blackbaud/constituents/get_countries/`,
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json"
    }
  };
  return axios.request(config);
};

// start
export const getConstituentCustomFieldListSingleConstituent = (data) => {
  const config = {
    method: "get",
    maxBodyLength: Infinity,
    url: `${BASE_URL}/modules/blackbaud/constituents/get_constituent_custom_field_list_in_single_constituent/${data.id}/`,
    headers: {
      Authorization: `Bearer ${data.token}`,
      "Content-Type": "application/json"
    }
  };
  return axios.request(config);
};
export const getCustomFieldEducationList = (data) => {
  const config = {
    method: "get",
    maxBodyLength: Infinity,
    url: `${BASE_URL}/modules/blackbaud/constituents/get_custom_field_list_in_education/${data.id}/`,
    headers: {
      Authorization: `Bearer ${data.token}`,
      "Content-Type": "application/json"
    }
  };
  return axios.request(config);
};
export const getEducationCustomFieldCategories = (accessToken) => {
  const config = {
    method: "get",
    maxBodyLength: Infinity,
    url: `${BASE_URL}/modules/blackbaud/constituents/get_education_custom_field_categories/`,
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json"
    }
  };
  return axios.request(config);
};

export const getEducationDegrees = (accessToken) => {
  const config = {
    method: "get",
    maxBodyLength: Infinity,
    url: `${BASE_URL}/modules/blackbaud/constituents/get_education_degrees/`,
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json"
    }
  };
  return axios.request(config);
};
export const getEducationConstituentList = (data) => {
  const config = {
    method: "get",
    maxBodyLength: Infinity,
    url: `${globalOptions.url}/modules/blackbaud/constituents/get_education_list_in_constituent/${data.id}/`,
    headers: {
      Authorization: `Bearer ${data.token}`,
      "Content-Type": "application/json"
    }
  };
  return axios.request(config);
};
export const getEducationRecord = (data) => {
  const config = {
    method: "get",
    maxBodyLength: Infinity,
    url: `${globalOptions.url}/modules/blackbaud/constituents/get_education_record/${data.id}/`,
    headers: {
      Authorization: `Bearer ${data.token}`,
      "Content-Type": "application/json"
    }
  };
  return axios.request(config);
};
export const getEducationsSchools = (accessToken) => {
  const config = {
    method: "get",
    maxBodyLength: Infinity,
    url: `${globalOptions.url}/modules/blackbaud/constituents/get_education_schools/`,
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json"
    }
  };
  return axios.request(config);
};
export const getEducationStatuses = (accessToken) => {
  const config = {
    method: "get",
    maxBodyLength: Infinity,
    url: `${globalOptions.url}/modules/blackbaud/constituents/get_education_statuses/`,
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json"
    }
  };
  return axios.request(config);
};
export const getEducationSubject = (accessToken) => {
  const config = {
    method: "get",
    maxBodyLength: Infinity,
    url: `${globalOptions.url}/modules/blackbaud/constituents/get_education_subjects/`,
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json"
    }
  };
  return axios.request(config);
};
export const getEducationTypes = (accessToken) => {
  const config = {
    method: "get",
    maxBodyLength: Infinity,
    url: `${globalOptions.url}/modules/blackbaud/constituents/get_education_types/`,
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json"
    }
  };
  return axios.request(config);
};
export const getEventAttachmentList = (data) => {
  const config = {
    method: "get",
    maxBodyLength: Infinity,
    url: `${globalOptions.url}/modules/blackbaud/event/${data.id}/get_event_attachment_list/`,
    headers: {
      Authorization: `Bearer ${data.token}`,
      "Content-Type": "application/json"
    }
  };
  return axios.request(config);
};
export const getEventFees = (data) => {
  const config = {
    method: "get",
    maxBodyLength: Infinity,
    url: `${globalOptions.url}/modules/blackbaud/event/${data.id}/get_event_fees/`,
    headers: {
      Authorization: `Bearer ${data.token}`,
      "Content-Type": "application/json"
    }
  };
  return axios.request(config);
};
export const getEventParticipantOptions = (data) => {
  const config = {
    method: "get",
    maxBodyLength: Infinity,
    url: `${globalOptions.url}/modules/blackbaud/event/${data.id}/get_event_participant_options/`,
    headers: {
      Authorization: `Bearer ${data.token}`,
      "Content-Type": "application/json"
    }
  };
  return axios.request(config);
};
export const getEventParticipantsList = (data) => {
  const config = {
    method: "get",
    maxBodyLength: Infinity,
    url: `${globalOptions.url}/modules/blackbaud/event/participants_list/${data.id}/`,
    headers: {
      Authorization: `Bearer ${data.token}`,
      "Content-Type": "application/json"
    }
  };
  return axios.request(config);
};
export const getEventParticipantsDonation = (data) => {
  const config = {
    method: "get",
    maxBodyLength: Infinity,
    url: `${globalOptions.url}/modules/blackbaud/event/${data.id}/get_event_participant_donation/`,
    headers: {
      Authorization: `Bearer ${data.token}`,
      "Content-Type": "application/json"
    }
  };
  return axios.request(config);
};
export const getEventParticipantFeePayments = (data) => {
  const config = {
    method: "get",
    maxBodyLength: Infinity,
    url: `${globalOptions.url}/modules/blackbaud/event/${data.id}/get_event_participant_fee_payments/`,
    headers: {
      Authorization: `Bearer ${data.token}`,
      "Content-Type": "application/json"
    }
  };
  return axios.request(config);
};
export const getEventParticipantFees = (data) => {
  const config = {
    method: "get",
    maxBodyLength: Infinity,
    url: `${globalOptions.url}/modules/blackbaud/event/${data.id}/get_event_participant_fees/`,
    headers: {
      Authorization: `Bearer ${data.token}`,
      "Content-Type": "application/json"
    }
  };
  return axios.request(config);
};
export const getParticipantOptions = (data) => {
  const config = {
    method: "get",
    maxBodyLength: Infinity,
    url: `${globalOptions.url}/modules/blackbaud/event/${data.id}/get_participant_options/`,
    headers: {
      Authorization: `Bearer ${data.token}`,
      "Content-Type": "application/json"
    }
  };
  return axios.request(config);
};
export const getEventAttachment = (data) => {
  const config = {
    method: "get",
    maxBodyLength: Infinity,
    url: `${globalOptions.url}/modules/blackbaud/event/get_event_attachment/?event_id=${data.event_id}&attachment_id=${data.attachment_id}`,
    headers: {
      Authorization: `Bearer ${data.token}`,
      "Content-Type": "application/json"
    }
  };
  return axios.request(config);
};
export const getEventAttachmentTags = (accessToken) => {
  const config = {
    method: "get",
    maxBodyLength: Infinity,
    url: `${globalOptions.url}/modules/blackbaud/event/get_event_attachment_tags/`,
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
  getConstituentCustomFieldListSingleConstituent,
  getCustomFieldEducationList,
  getEducationCustomFieldCategories,
  getEducationDegrees,
  getEducationConstituentList,
  getEducationRecord,
  getEducationsSchools,
  getEducationStatuses,
  getEducationSubject,
  getEducationTypes,
  getEventAttachmentList,
  getEventFees,
  getEventParticipantOptions,
  getEventParticipantsList,
  getEventParticipantsDonation,
  getEventParticipantFeePayments,
  getEventParticipantFees,
  getParticipantOptions,
  getEventAttachment,
  getEventAttachmentTags
};
