import { invalid } from "../../utils.js";

export async function printServerValidationErrors(response, actionMessage) {
  let errorString = `${actionMessage}\n`;

  if (response.status === 400) {
    errorString = "Server returned the following errors:\n";
    const data = await response.json();
    if (data && data.errors) {
      data.errors.forEach((error) => {
        errorString += `\t- ${error.field}: ${error.message}\n`;
      });
    } else {
      errorString += "\t- Unexpected error occurred\n";
    }
  } else {
    errorString += `Status code: ${response.status}`;
  }

  invalid(errorString);
}
