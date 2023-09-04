
import { getGlobalOptions } from "@options";

const global = getGlobalOptions();
const BASE_URL = global.url;

export const getQr = async (data) => {
  try {
    const response = await fetch(`${BASE_URL}/modules/qr-code/qrcode/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });
    return response;
  } catch (error) {
    console.log("ERROR: ", error);
    throw new Error("NETWORK_ERROR").message;
  }
};
