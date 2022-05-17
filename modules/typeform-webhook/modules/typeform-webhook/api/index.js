
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

export const createWebHook = (oauthToken, formId) => {
  try {
    const res = fetch(`https://api.typeform.com/forms/${formId}/webhooks/asdfghijk`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${oauthToken}`,
        "Content-Type": "application/json; charset=UTF-8"
      },
      body: JSON.stringify({
        enabled: true,
        url: "https://test.com"
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
