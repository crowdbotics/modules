import { invalid, section } from "../utils.js";
import { apiClient } from "./utils/apiClient.js";
import { getCurrentUserOrganization } from "./utils/organization.js";
import Table from "cli-table";
import ora from "ora";

const MODULES_PAGE_LIMIT = 50;

export const modulesList = async ({ search, visibility, page = 1 }) => {
  const loadingSpinner = ora("Loading Modules").start();

  try {
    const params = { limit: MODULES_PAGE_LIMIT };

    if (page) {
      params.page = page;
    }

    if (search) {
      params.search = search;
    }

    if (visibility === "private") {
      const organization = await getCurrentUserOrganization();

      if (!organization) {
        return invalid(
          "User must be a part of an organization to use private catalog. Please join an organization, or remove the '--visibility private' flag."
        );
      }

      params.org_id = organization.id;
    }

    const response = await apiClient.get({
      path: "/v1/catalog/module/",
      params
    });

    if (!response.ok) {
      invalid("Failed to catalog modules. Please log in and try again.");
    }

    const searchBody = await response.json();

    loadingSpinner.stop();

    if (searchBody.results) {
      const printBody = searchBody.results.map((module) => [
        module.id,
        module.title,
        module.description
      ]);

      const table = new Table({
        head: ["id", "Title", "Description"],
        colWidths: [10, 50, 80]
      });

      table.push(...printBody);
      console.log(table.toString());

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
    loadingSpinner.stop();
  }
};
