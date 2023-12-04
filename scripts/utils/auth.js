import inquirer from "inquirer";
import { invalid, section } from "../../utils.js";
import { configFile } from "./configFile.js";
import { TOKEN_CONFIG_NAME } from "./constants.js";
import { apiClient } from "./apiClient.js";

const doEmailLogin = async () => {
  const { email, password } = await inquirer.prompt([
    {
      message: "Enter your email:",
      name: "email",
      type: "input"
    },
    {
      message: "Enter your password:",
      name: "password",
      type: "password"
    }
  ]);

  const response = await apiClient.post({
    path: "/v2/login/",
    body: { email, password },
    anonymous: true
  });

  if (!response.ok) {
    return invalid(
      "Unable to log in with provided credentials. Check your email/password and try again."
    );
  }

  let token;

  const authBody = await response.json();
  if ("key" in authBody) {
    token = authBody.key;
  } else if ("login_with_otp" in authBody) {
    section(
      "2FA is required for this account. Please provide the code in your Authenticator app."
    );
    const { otp } = await inquirer.prompt([
      {
        message: "Enter the 6 digit code:",
        name: "otp",
        type: "input"
      }
    ]);

    const otpResponse = await apiClient.post({
      path: "/v2/totp-login/",
      body: { email, password, token: otp },
      anonymous: true
    });

    if (!otpResponse.ok) {
      return invalid("Incorrect code, please try again.");
    }

    const otpBody = await otpResponse.json();
    token = otpBody.key;
  }

  return token;
};

export const performLogin = async (type = "email/password") => {
  let token;

  // Authentication methods here.
  if (type === "email/password") {
    token = await doEmailLogin();
  }

  if (!token) {
    return false;
  }

  configFile.set(TOKEN_CONFIG_NAME, token);
  configFile.save();

  return true;
};
