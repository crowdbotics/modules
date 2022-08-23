import axios from "axios";
import options from "../options";

/**
 *
 * @param {base url (edit the url variable in `options/options.js`) } baseUrl
 * @returns instance of axios
 */
const getAxios = (baseUrl) => {
  return axios.create({
    baseURL: baseUrl,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    }
  });
};

export function faqList(baseUrl, pageNo) {
  const faqAPI = getAxios(baseUrl);
  return faqAPI.get(
    `${options.path}?page=${pageNo}&records=${options.recordsPerPage}`
  );
}

export const api = {
  faqList
};
