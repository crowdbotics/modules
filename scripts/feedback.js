import { invalid } from "../utils.js";
import { apiClient } from "./utils/apiClient.js";

export const sendFeedback = async (message) => {
  if (!message) {
    return;
  }
  try {
    const response = await apiClient.post({
      path: "/v2/cli-feedback/",
      body: { message }
    });

    if (response.status === 401) {
      return invalid("There was an error sending your feedback. Please ensure you have logged in with the 'login' command, then try again.");
    }

    if (!response.ok) {
      return invalid("Unable to send feedback at this time, please try again.");
    }
  } catch (error) {
    return invalid(error);
  }

  return console.log("👍 Thanks for the feedback!");
};
