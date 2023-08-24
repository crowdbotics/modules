import options from "../options";
// @ts-ignore
import { getGlobalOptions } from "@options";
import axios from "axios";

const global = getGlobalOptions();
const BASE_URL = global.url;
const TYPEFORM_BASE_URL = "https://api.typeform.com";

const authAPI = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" }
});

const typeformAPI = axios.create({
  baseURL: TYPEFORM_BASE_URL
});

function getForms(oauthToken) {
  return typeformAPI.get("/forms", {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${oauthToken}`
    }
  });
}

function createWebHook(token, id, isEnable) {
  return typeformAPI.put(`/forms/${id}/webhooks/${options.WEBHOOK_TAG}`, {
    enabled: isEnable,
    url: options.WEBHOOK_URL
  }, {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`
    }
  });
}

function getWebHook(token, id) {
  return typeformAPI.get(`/forms/${id}/webhooks`, {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`
    }
  });
}

function getResponses(payload) {
  return authAPI.get(`/modules/typeform-webhook/form-answer/${payload.formId}/`, {
    headers: {
      Accept: "application/json"
    }
  });
}

export const api = {
  getForms,
  createWebHook,
  getWebHook,
  getResponses
};
