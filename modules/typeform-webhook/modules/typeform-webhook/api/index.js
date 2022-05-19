import options from "../options";

export const getForms = (oauthToken) => {
  try {
    const res = fetch("https://api.typeform.com/forms", {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${oauthToken}`
      }
    }
    );
    return res;
  } catch (error) {
    throw new Error("NETWORK_ERROR").message;
  }
};

export const createWebHook = (oauthToken, formId, enabled) => {
  try {
    const res = fetch(`https://api.typeform.com/forms/${formId}/webhooks/cb-module`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${oauthToken}`,
        "Content-Type": "application/json; charset=UTF-8"
      },
      body: JSON.stringify({
        enabled: enabled,
        url: options.WEBHOOK_URL
      })
    }
    );
    return res;
  } catch (error) {
    throw new Error("NETWORK_ERROR").message;
  }
};

export const getWebHook = (oauthToken, id) => {
  try {
    const res = fetch(`https://api.typeform.com/forms/${id}/webhooks`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${oauthToken}`,
        "Content-Type": "application/json; charset=UTF-8"
      }
    }
    );
    return res;
  } catch (error) {
    throw new Error("NETWORK_ERROR").message;
  }
};
