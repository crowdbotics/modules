// @ts-ignore
import { getGlobalOptions } from "@options";

const global = getGlobalOptions();
const BASE_URL = global.url;

export const sendQuery = async (data) => {
  try {
    const response = await fetch(`${BASE_URL}/modules/contact-us/contact_us/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });
    return response;
  } catch (error) {
    throw new Error("NETWORK_ERROR").message;
  }
};
