// Please, update the values below as instructed in the README.md file.

// Web OAuth client id obtained from google developer console
export const GOOGLE_WEB_CLIENT_ID = "XXXXXX.apps.googleusercontent.com";
// iOS OAuth client id obtained from google developer console
export const GOOGLE_IOS_CLIENT_ID = "YYYYYY.apps.googleusercontent.com";
// Apple service id obtained from apple developer account.
export const APPLE_SERVICE_ID = "com.crowdbotics.APP_NAME";
// URL to redirect to once login is successfull
export const APPLE_REDIRECT_CALLBACK =
  "https://your-app-here.com/accounts/apple/login/callback/";

// -----------------------------------------------------
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
      "Network Error: It was not possible to establish a connection with the server."
  }
};

// This function extracts the exact error message from the whole error object
export const mapErrorMessage = error => {
  const message = error.message;
  return messageMap[message]
    ? { ...messageMap[message] }
    : { code: null, message };
};
