import { apiClient } from "./apiClient.js";

export const getCurrentUserOrganization = async () => {
  try {
    const response = await apiClient.get({
      path: "/v2/user/"
    });

    const userBody = await response.json();

    return userBody.organization;
  } catch {
    return undefined;
  }
};
