
// Please, update the value below with your backend's client id.
export const GOOGLE_WEB_CLIENT_ID = '39330537799-kbek3v23psd9bkhkvovv47nvisq1fhpi.apps.googleusercontent.com'
export const GOOGLE_IOS_CLIENT_ID = '39330537799-u0blpksbu34kffg2oadk1bescb4793g5.apps.googleusercontent.com'
export const APPLE_SERVICE_ID = 'com.crowdbotics.test-deploy-0211-de-19317'
export const APPLE_REDIRECT_CALLBACK = 'https://test-deploy-0211-de-19317.botics.co/accounts/apple/login/callback/'

const messageMap = {
  'Request failed with status code 400': {
    code: 400,
    message: 'Invalid credentials.',
  },
  'Request failed with status code 403': {
    code: 403,
    message: 'You do not have access to this resource.',
  },
  'Request failed with status code 500': {
    code: 500,
    message: 'Unexpected Server Error.',
  },
  'Network Error': {
    code: null,
    message: 'Please check your internet connection.',
  },
};

export const mapErrorMessage = action => {
  const message = action.response?.message;
  return messageMap[message]
    ? {...messageMap[message], type: action.type}
    : {code: null, message, type: action.type};
};
