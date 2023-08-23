export const dateFunc = (date) => {
  const yyyy = date.getFullYear().toString();
  const mm = (date.getMonth() + 1).toString();
  const dd = date.getDate().toString();

  const mmChars = mm.split("");
  const ddChars = dd.split("");
  return (yyyy + "-" + (mmChars[1] ? mm : "0" + mmChars[0]) + "-" + (ddChars[1] ? dd : "0" + ddChars[0]));
};

export const mapErrors = (error) => {
  let errorMessage = null
  const errorsList = error.response.data
  if (error.message === "Network Error") {
    errorMessage = "Network Error"
  } else if (errorsList) {
    const message = Object.keys(errorsList).map(element => {
      if (typeof errorsList[element] === "object") {
        return Object.keys(errorsList[element]).map(el => `${element}: ${errorsList[element][el]}`)
      } else {
        return `${element}: ${errorsList[element]}`
      }
    })
    errorMessage = message.join("\n")
  } else {
    errorMessage = error.message
  }
  return errorMessage
}

export const checkLoading = (...params) => {
  return params.some(param => param.loading === "pending");
}