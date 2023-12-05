import { invalid, section } from "../utils.js";
import { apiClient } from "./utils/apiClient.js";

const MODULES_PAGE_LIMIT = 50;

export const modulesList = async ({ search, visibility, page = 1 }) => {
  try {
    const params = { limit: MODULES_PAGE_LIMIT };

    if (page) {
      params.page = page;
    }

    if (search) {
      params.search = search;
    }

    if (visibility === "private") {
      // TODO - fill with stored org id.
      params.org_id = "12";
    }

    const response = await apiClient.get({
      path: "/v1/catalog/module/",
      params
    });

    const searchBody = await response.json();

    if (searchBody.results) {
      const printBody = searchBody.results.map((module) => ({
        id: module.id,
        title: module.title
      }));

      console.table(printBody);

      if (searchBody.next) {
        // TODO - this is just an example. This command will actually need to rebuild all the existing parameters.

        section(
          `More results exist. Run command \`modules list --page ${
            page + 1
          }\` to retrieve the next page.`
        );
      }
    }
  } catch {
    invalid("Unable to get modules. Please login and try again.");
    return;
  } finally {
    // preparingSpinner.stop();
  }
};
