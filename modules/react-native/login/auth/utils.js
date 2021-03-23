const messageMap = {
  "Request failed with status code 400": {
    code: 400,
    message: "Invalid credentials.",
  },
  "Request failed with status code 403": {
    code: 403,
    message: "You do not have access to this resource.",
  },
  "Request failed with status code 500": {
    code: 500,
    message: "Unexpected Server Error.",
  },
  "Network Error": {
    code: null,
    message: "Please check your internet connection.",
  },
};

export const mapErrorMessage = (action) => {
  const message = action.response?.message;
  return messageMap[message]
    ? { ...messageMap[message], type: action.type }
    : { code: null, message, type: action.type };
};
