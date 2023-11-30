import inquirer from "inquirer";
import { invalid, section } from "../../utils.js";
import { configFile } from "./configFile.js";
import { TOKEN_CONFIG_NAME } from "./constants.js";

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

  const response = await fetch(
    "https://crowdbotics-slack-dev.herokuapp.com/api/v2/login/",
    {
      body: JSON.stringify({ email, password }),
      headers: {
        accept: "application/json",
        "content-type": "application/json"
      },
      method: "POST"
    }
  );

  if (!response.ok) {
    return invalid(
      "Unable to log in with provided credentials. Check your email/password and try again."
    );
  }

  const authBody = await response.json();
  let token;

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

    const otpResponse = await fetch(
      "https://crowdbotics-slack-dev.herokuapp.com/api/v2/totp-login/",
      {
        body: JSON.stringify({ email, password, token: otp }),
        headers: {
          accept: "application/json",
          "content-type": "application/json"
        },
        method: "POST"
      }
    );

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
