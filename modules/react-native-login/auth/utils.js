const messageMap = {
  "Request failed with status code 400": {
    code: 400,
    message: "Invalid credentials."
  },
  "Request failed with status code 403": {
    code: 403,
    message: "You do not have access to this resource."
  },
  "Request failed with status code 500": {
    code: 500,
    message: "Unexpected Server Error."
  },
  "Network Error": {
    code: null,
    message:
      "Network Error: Problem occurred while establishing a connection with the server."
  }
};

export const mapErrorMessage = (error) => {
  const message = error.message;
  return messageMap[message]
    ? { ...messageMap[message] }
    : { code: null, message };
};
