import { invalid } from "../../utils.js";

export async function printServerFieldValidationErrors(
  response,
  actionMessage
) {
  let errorString = `${actionMessage}\n`;

  errorString = "Server returned the following errors:\n";

  if (response && response.errors) {
    response.errors.forEach((error) => {
      errorString += `\t- ${error.field}: ${error.message}\n`;
    });
  } else {
    errorString += "\t- Unexpected error occurred\n";
  }

  invalid(errorString);
}
