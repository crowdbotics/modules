// eslint-disable-next-line prefer-regex-literals
export const validateEmail = new RegExp(
  "^[^\\s]+([.-]?\\w+)*@\\w+([.-]?\\w+)*(.\\w{2,3})+$"
);

// Change here the  name of the screen on navigator you want to redirect after Login
export const HOME_SCREEN_NAME = "Onboarding";

const errorStatements = {
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
      "Network Error: It was not possible to establish a connection with the server."
  }
};

// This function extracts the exact error message from the whole error object
export const mapErrorMessage = (error) => {
  const message = error.message;
  return errorStatements[message]
    ? { ...errorStatements[message] }
    : { code: null, message };
};

// This function identifies if some key is empty
export const validateConfig = (...params) => {
  const emptyKeys = [];
  params.forEach((obj, index) => {
    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key) && (obj[key] === null || obj[key] === undefined || obj[key] === "")) {
        emptyKeys.push({ index, key });
      }
    }
  });
  return emptyKeys;
};
