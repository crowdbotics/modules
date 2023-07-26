// This function extracts the error message from the error object
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
