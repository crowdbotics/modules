/**
 * Extracts the error message from the error object.
 * @param  {Object} error - Error object containing the response data.
 * @returns {string} - Extracted error message.
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

/**
 * Identifies if some key is empty in the provided objects.
 * @param  {...Object} params - Objects to be checked for empty keys.
 * @returns {Array} - Array containing the index and key of the empty keys.
 */
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
