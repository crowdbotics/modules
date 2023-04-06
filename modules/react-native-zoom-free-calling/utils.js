export const API_URL = "https://api.zoom.us";

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

export const parseMeetingId = (url) => {
  return url.split("?").shift().split("/").pop();
};

export const parseStartDate = (dateString) => {
  const date = new Date(dateString);
  return date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + "T" +
          date.getHours() + "-" + date.getMinutes() + "-" + date.getSeconds();
};

export const makeId = (length) => {
  let result = "";
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};
