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
        // TODO - command should be built in a more robust way to support future flags easier.

        let suggestedCommand = `modules list --page ${page + 1}`;

        if (search) {
          suggestedCommand += ` --search ${search}`;
        }

        if (visibility) {
          suggestedCommand += ` --visibility ${visibility}`;
        }

        section(
          `More results exist. Run command \`${suggestedCommand}\` to retrieve the next page.`
        );
      }
    }
  } catch {
    invalid("Unable to get modules. Please login and try again.");
  } finally {
    // preparingSpinner.stop();
  }
};
