import { getGlobalOptions } from "@options";

const global = getGlobalOptions();
const BASE_URL = global;

export const saveSignature = async (data) => {
  try {
    const response = await fetch(`${BASE_URL}/modules/signature/upload_signature/`, {
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
