import base64 from "react-native-base64";
/**
 * Parse the query string from a URL and return the parameters as an object.
 * @param {string} url - The URL containing the query string.
 * @returns {Object} - An object containing the parsed parameters.
 */
export const parseQueryString = (url) => {
  const regex = /[?&]([^=#]+)=([^&#]*)/g;
  const params = {};
  let match;
  /* eslint-disable no-cond-assign */
  while (match = regex.exec(url)) {
    params[match[1]] = match[2];
  }
  return params;
};

/**
 * Get the OAuth token using the provided code.
 * @param {Object} code - The code object containing grant_type, code, client_id, client_secret, and redirect_uri.
 * @returns {Promise<Object>} - A Promise that resolves to the JSON response containing the access token.
 */
export const getOauthToken = async (code) => {
  const formBody = [];
  for (const property in code) {
    const encodedKey = encodeURIComponent(property);
    const encodedValue = encodeURIComponent(code[property]);
    formBody.push(encodedKey + "=" + encodedValue);
  }
  const res = await fetch("https://api.typeform.com/oauth/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
      Authorization: `Basic ${base64.encode(`${code.client_id}:${code.client_secret}`)}`
    },
    body: formBody.join("&")
  });
  return res.json();
};

/**
 * Group an array of data objects by their tokens and return an array of grouped data.
 * @param {Array} data - An array of data objects containing a form_answers property with a token field.
 * @returns {Array} - An array of objects with title and data properties, grouped by tokens.
 */
export function groupByToken(data) {
  const groupData = [];
  if (data.length > 0) {
    const tokens = data[0]?.form_answers.map((obj) => obj.token);
    tokens.forEach((token) => {
      const tmpData = [];
      data.forEach((obj) => {
        const formAnswer = obj.form_answers.find(
          (formAnswer) => formAnswer.token === token
        );
        tmpData.push({ ...obj, form_answers: formAnswer });
      });
      groupData.push({
        title: {
          token: token,
          submitted_at: tmpData[0].form_answers.submitted_at
        },
        data: tmpData
      });
    });
    return groupData;
  } else {
    return groupData;
  }
}

/**
 * Format a date string to a localized date representation.
 * @param {string} date - The date string to be formatted.
 * @returns {string} - The formatted date string in the local date representation.
 */
export const formatDate = (date) => {
  return new Date(date).toLocaleString();
};

/**
 * Validate an array of parameters to check if any of them are empty (undefined, null, or empty strings).
 * @param {...*} params - Any number of parameters to be validated.
 * @returns {Array} - An array containing the names of invalid parameters.
 */
export const validateConfig = (...params) => {
  const invalidParams = [];
  for (let i = 0; i < params.length; i++) {
    const param = params[i];
    const paramName = `param${i + 1}`;

    if (param === undefined || param === null || param === "") {
      invalidParams.push(paramName);
    }
  }
  return invalidParams;
};

/**
 * Extract the exact error message from an error object.
 * @param {Object} error - The error object.
 * @returns {string} - The exact error message.
 */
export const mapErrors = (error) => {
  let errorMessage = null;
  const errorsList = error.response.data;
  if (error.message === "Network Error") {
    errorMessage = "Network Error";
  } else if (errorsList) {
    const message = Object.keys(errorsList).map(element => {
      if (typeof errorsList[element] === "object") {
        return Object.keys(errorsList[element]).map(el => `${element}: ${errorsList[element][el]}`);
      } else {
        return `${element}: ${errorsList[element]}`;
      }
    });
    errorMessage = message.join("\n");
  } else {
    errorMessage = error.message;
  }
  return errorMessage;
};
