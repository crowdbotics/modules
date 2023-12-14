import { invalid, valid } from "../utils.js";
import { apiClient } from "./utils/apiClient.js";

export const sendFeedback = async (message) => {
  if (!message) {
    return;
  }
  const response = await apiClient.post({
    path: "/v2/cli-feedback/",
    body: { message }
  });
  if (!response.ok) {
    return invalid("Unable to send feedback at this time, please try again.");
  }
  return valid("👍 Thanks for the feedback!");
};
