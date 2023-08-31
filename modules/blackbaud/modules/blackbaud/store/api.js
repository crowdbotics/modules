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
export const addAttendee = (accessToken, payload, eventId) => {
  const config = {
    method: "post",
    maxBodyLength: Infinity,
    url: `${BASE_URL}/modules/blackbaud/event/create_event_participant_for_attending_event/${eventId}/`,
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json"
    },
    data: payload
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
    url: `${BASE_URL}/modules/blackbaud/constituents/get_education_list_in_constituent/${data.id}/`,
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
    url: `${BASE_URL}/modules/blackbaud/constituents/get_education_record/${data.id}/`,
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
    url: `${BASE_URL}/modules/blackbaud/constituents/get_education_schools/`,
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
    url: `${BASE_URL}/modules/blackbaud/constituents/get_education_statuses/`,
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
    url: `${BASE_URL}/modules/blackbaud/constituents/get_education_subjects/`,
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
    url: `${BASE_URL}/modules/blackbaud/constituents/get_education_types/`,
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
    url: `${BASE_URL}/modules/blackbaud/event/${data.id}/get_event_attachment_list/`,
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
    url: `${BASE_URL}/modules/blackbaud/event/${data.id}/get_event_fees/`,
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
    url: `${BASE_URL}/modules/blackbaud/event/${data.id}/get_event_participant_options/`,
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
    url: `${BASE_URL}/modules/blackbaud/event/participants_list/${data.id}/`,
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
    url: `${BASE_URL}/modules/blackbaud/event/${data.id}/get_event_participant_donation/`,
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
    url: `${BASE_URL}/modules/blackbaud/event/${data.id}/get_event_participant_fee_payments/`,
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
    url: `${BASE_URL}/modules/blackbaud/event/${data.id}/get_event_participant_fees/`,
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
    url: `${BASE_URL}/modules/blackbaud/event/${data.id}/get_participant_options/`,
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
    url: `${BASE_URL}/modules/blackbaud/event/get_event_attachment/?event_id=${data.event_id}&attachment_id=${data.attachment_id}`,
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
    url: `${BASE_URL}/modules/blackbaud/event/get_event_attachment_tags/`,
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json"
    }
  };
  return axios.request(config);
};
export const getEventCategories = (accessToken) => {
  const config = {
    method: "get",
    maxBodyLength: Infinity,
    url: `${BASE_URL}/modules/blackbaud/event/get_event_categories/`,
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json"
    }
  };
  return axios.request(config);
};
export const getParticipant = (data) => {
  const config = {
    method: "get",
    maxBodyLength: Infinity,
    url: `${BASE_URL}/modules/blackbaud/event/get_participant/${data.id}/`,
    headers: {
      Authorization: `Bearer ${data.token}`,
      "Content-Type": "application/json"
    }
  };
  return axios.request(config);
};
export const getParticipantLevels = (accessToken) => {
  const config = {
    method: "get",
    maxBodyLength: Infinity,
    url: `${BASE_URL}/modules/blackbaud/event/get_participant_levels/`,
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json"
    }
  };
  return axios.request(config);
};
export const createActionAttachment = (accessToken, payload) => {
  const config = {
    method: "post",
    maxBodyLength: Infinity,
    url: `${BASE_URL}/modules/blackbaud/constituent/create_action_attachment/`,
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json"
    },
    data: payload
  };
  return axios.request(config);
};
export const createConstituentAction = (accessToken, payload) => {
  const config = {
    method: "post",
    maxBodyLength: Infinity,
    url: `${BASE_URL}/modules/blackbaud/constituent/create_constituent_action/`,
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json"
    },
    data: payload
  };
  return axios.request(config);
};
export const createRating = (accessToken, payload) => {
  const config = {
    method: "post",
    maxBodyLength: Infinity,
    url: `${BASE_URL}/modules/blackbaud/constituent/create_rating/`,
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json"
    },
    data: payload
  };
  return axios.request(config);
};
export const createRelationship = (accessToken, payload) => {
  const config = {
    method: "post",
    maxBodyLength: Infinity,
    url: `${BASE_URL}/modules/blackbaud/constituent/create_relationship/`,
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json"
    },
    data: payload
  };
  return axios.request(config);
};
export const deleteConstituentAction = (accessToken, id) => {
  const config = {
    method: "delete",
    maxBodyLength: Infinity,
    url: `${BASE_URL}/modules/blackbaud/constituent/delete_constituent_action/${id}/`,
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json"
    }
  };
  return axios.request(config);
};
export const deleteConstituentActionAttachment = (accessToken, id) => {
  const config = {
    method: "delete",
    maxBodyLength: Infinity,
    url: `${BASE_URL}/modules/blackbaud/constituent/delete_constituent_action_attachment/?attachment_id=${id}`,
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json"
    }
  };
  return axios.request(config);
};
export const deleteConstituentActionCustomField = (accessToken, id) => {
  const config = {
    method: "delete",
    maxBodyLength: Infinity,
    url: `${BASE_URL}/modules/blackbaud/constituent/delete_constituent_action_custom_field/${id}/`,
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json"
    }
  };
  return axios.request(config);
};
export const deleteRating = (accessToken, id) => {
  const config = {
    method: "delete",
    maxBodyLength: Infinity,
    url: `${BASE_URL}/modules/blackbaud/constituent/delete_rating/${id}/`,
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json"
    }
  };
  return axios.request(config);
};
export const deleteRelationship = (accessToken, id) => {
  const config = {
    method: "delete",
    maxBodyLength: Infinity,
    url: `${BASE_URL}/modules/blackbaud/constituent/delete_relationship/${id}/`,
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json"
    }
  };
  return axios.request(config);
};
export const editRelationship = (accessToken, id, payload) => {
  const config = {
    method: "patch",
    maxBodyLength: Infinity,
    url: `${BASE_URL}/modules/blackbaud/constituent/edit_relationship/${id}/`,
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json"
    },
    data: payload
  };
  return axios.request(config);
};
export const getConstituentActionAttachments = (accessToken, id) => {
  const config = {
    method: "get",
    maxBodyLength: Infinity,
    url: `${BASE_URL}/modules/blackbaud/constituent/get_constituent_action/${id}/attachments/`,
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json"
    }
  };
  return axios.request(config);
};
export const getConstituentActionCustomFieldsCategories = (accessToken) => {
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

export const getRatingCategories = (accessToken) => {
  const config = {
    method: "get",
    maxBodyLength: Infinity,
    url: `${BASE_URL}/modules/blackbaud/constituent/get_rating_categories/`,
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json"
    }
  };
  return axios.request(config);
};
export const getRelationshipDetails = (accessToken, id) => {
  const config = {
    method: "get",
    maxBodyLength: Infinity,
    url: `${BASE_URL}/modules/blackbaud/constituent/get_relationship_details/${id}/`,
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json"
    }
  };
  return axios.request(config);
};
export const getRelationshipListInAllConstituents = (accessToken) => {
  const config = {
    method: "get",
    maxBodyLength: Infinity,
    url: `${BASE_URL}/modules/blackbaud/constituent/get_relationship_list_in_all_constituents/`,
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json"
    }
  };
  return axios.request(config);
};

export const getRelationshipListInSingleConstituent = (accessToken, id) => {
  const config = {
    method: "get",
    maxBodyLength: Infinity,
    url: `${BASE_URL}/modules/blackbaud/constituent/get_relationship_list_in_single_constituent/${id}/`,
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json"
    }
  };
  return axios.request(config);
};

export const getRelationshipTypes = (accessToken) => {
  const config = {
    method: "get",
    maxBodyLength: Infinity,
    url: `${BASE_URL}/modules/blackbaud/constituent/get_relationship_types/`,
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json"
    }
  };
  return axios.request(config);
};

export const getSuffixes = (accessToken) => {
  const config = {
    method: "get",
    maxBodyLength: Infinity,
    url: `${BASE_URL}/modules/blackbaud/constituent/get_suffixes/`,
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json"
    }
  };
  return axios.request(config);
};

export const getTitles = (accessToken) => {
  const config = {
    method: "get",
    maxBodyLength: Infinity,
    url: `${BASE_URL}/modules/blackbaud/constituent/get_titles/`,
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
  addAttendee,
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
  getEventAttachmentTags,
  getEventCategories,
  getParticipant,
  getParticipantLevels,
  createActionAttachment,
  createConstituentAction,
  createRating,
  createRelationship,
  deleteConstituentAction,
  deleteConstituentActionAttachment,
  deleteConstituentActionCustomField,
  deleteRating,
  deleteRelationship,
  editRelationship,
  getConstituentActionAttachments,
  getConstituentActionCustomFieldsCategories,
  getRatingCategories,
  getRelationshipDetails,
  getRelationshipListInAllConstituents,
  getRelationshipListInSingleConstituent,
  getRelationshipTypes,
  getSuffixes,
  getTitles
};
