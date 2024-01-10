import { invalid, section } from "../utils.js";
import { apiClient } from "./utils/apiClient.js";
import { configFile } from "./utils/configFile.js";
import { DEFAULT_HOST, HOST_CONFIG_NAME } from "./utils/constants.js";
import { getCurrentUserOrganization } from "./utils/organization.js";
import Table from "cli-table";
import ora from "ora";
import { formatUrlPath } from "./utils/url.js";

const MODULES_PAGE_LIMIT = 50;

export const modulesList = async ({ search, visibility = "", page = 1 }) => {
  const loadingSpinner = ora("Loading Modules").start();

  try {
    const params = { limit: MODULES_PAGE_LIMIT, code_included: true };

    if (page) {
      params.page = page;
    }

    if (search) {
      params.search = search;
    }

    if (visibility.toLowerCase() === "private") {
      const organization = await getCurrentUserOrganization();

      params.org_id = organization.id;
      params.visibility = "Private";
    }

    if (visibility.toLowerCase() === "public") {
      params.visibility = "Public";
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

    if (!searchBody || searchBody.results.length === 0) {
      section("No results found. Please adjust your search criteria.");
      return;
    }

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
  } catch {
    invalid("Unable to get modules. Please login and try again.");
  } finally {
    loadingSpinner.stop();
  }
};

export const modulesGet = async (id) => {
  const loadingSpinner = ora("Loading Module").start();

  const moduleResponse = await apiClient.get({
    path: `/v1/catalog/module/${id}`
  });

  loadingSpinner.stop();

  if (!moduleResponse.ok) {
    if (moduleResponse.status === 404) {
      invalid(`Cannot find requested module with id ${id}.`);
    } else {
      invalid("Unable to get module. Please login and try again.");
    }

    return;
  }

  const module = await moduleResponse.json();

  section(`Name: \n${module.title}`);
  section(`Description: \n${module.description}`);
  section(`ID: \n${module.id}`);
  section(`Slug: \n${module.slug}`);
  section(`Visibility: \n${module.visibility}`);

  const host = configFile.get(HOST_CONFIG_NAME) || DEFAULT_HOST;
  section(
    `Module Details: ${formatUrlPath(host)}/dashboard/catalogs/${module.id}`
  );
};
