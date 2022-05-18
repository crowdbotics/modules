import base64 from "react-native-base64";

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
