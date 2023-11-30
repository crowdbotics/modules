import { invalid, section } from "../utils.js";
import { configFile } from "./utils/configFile.js";
import { TOKEN_CONFIG_NAME } from "./utils/constants.js";

export const info = async () => {
  const token = configFile.get(TOKEN_CONFIG_NAME);

  const response = await fetch(
    "https://crowdbotics-slack-dev.herokuapp.com/api/v2/user/",
    {
      headers: {
        accept: "application/json",
        "content-type": "application/json",
        authorization: `Token ${token}`
      },
      method: "GET"
    }
  );

  if (!response.ok) {
    return invalid("Unable to make authenticated request to api.");
  }

  const body = await response.json();

  section("Current User:");
  console.table(body);
};
