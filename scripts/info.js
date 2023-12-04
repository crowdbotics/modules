import { invalid, section } from "../utils.js";
import { apiClient } from "./utils/apiClient.js";

export const info = async () => {
  const response = await apiClient.get({
    path: "/v2/user/"
  });

  if (!response.ok) {
    return invalid("Unable to make authenticated request to api.");
  }

  const body = await response.json();

  section("Current User:");
  console.table(body);
};
