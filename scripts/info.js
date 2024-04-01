import { invalid, section } from "../utils.js";
import { apiClient } from "./utils/apiClient.js";
import { validateEnvironmentDependencies } from "./utils/environment.js";

export const info = async () => {
  validateEnvironmentDependencies(undefined, true);

  const response = await apiClient.get({
    path: "/v2/user/"
  });

  if (!response.ok) {
    return invalid("Unable to make authenticated request to api.");
  }

  const body = await response.json();

  const organization = body.organization;
  delete body.organization;
  section("Current User:");
  console.table(body);

  section("Organization:");
  console.table(organization);
};
