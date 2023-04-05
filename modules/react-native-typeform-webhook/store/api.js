import options from "../options";
// @ts-ignore
import { getGlobalOptions } from "@options";

const global = getGlobalOptions();
import axios from "axios";
const BASE_URL = global.url;
const TYPEFORM_BASE_URL = "https://api.typeform.com"

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


function createWebHook({oauthToken, formId, enabled}) {
    return typeformAPI.put(`/forms/${formId}/webhooks/${options.WEBHOOK_TAG}`, {
        enabled: enabled,
        url: options.WEBHOOK_URL
    }, {
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${oauthToken}`,
        }
    })
}

function getWebHook(oauthToken, id) {
    return typeformAPI.get(`/forms/${id}/webhooks`, null, {
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${oauthToken}`,
        }
    } )
}

function getResponses(payload) {
    return authAPI.get(`/modules/typeform-webhook/form-answer/${payload.formId}`, null, {
        headers: {
            Accept: "application/json",
        }
    } )
}

export  const api = {
    getForms,
    createWebHook,
    getWebHook,
    getResponses
};