const LOGO_URL =
  "https://crowdbotics-slack-dev.s3.amazonaws.com/media/project_component_resources/cb-icon.png";
const BACKGROUND_URL =
  "https://crowdbotics-slack-dev.s3.amazonaws.com/media/project_component_resources/halfbg.png";
const validateEmail = /^[^\s]+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

// Change here the  name of the screen you want to redirect after Login
const HOME_SCREEN_NAME = "App Menu";

const title = "Login Signup";


export default {
  LOGO_URL: LOGO_URL,
  BACKGROUND_URL: BACKGROUND_URL,
  validateEmail: validateEmail,
  HOME_SCREEN_NAME: HOME_SCREEN_NAME,
  title: title,
};
