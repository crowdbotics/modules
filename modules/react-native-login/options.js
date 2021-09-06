const LOGO_URL =
  "https://crowdbotics-slack-dev.s3.amazonaws.com/media/project_component_resources/cb-icon.png";
const BACKGROUND_URL =
  "https://crowdbotics-slack-dev.s3.amazonaws.com/media/project_component_resources/halfbg.png";

// Change this the  name of the screen you want to redirect after a succesful login.
const HOME_SCREEN_NAME = "Home Screen";

const validateEmail = /^[^\s]+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

//These two options control the what the navigation tabs say, keep them short!
const SignInNavText = "Sign In";
const SignUpNavText = "Sign Up";

//These two options control your button text.
const SignInButtonText = "Login";
const SignUpButtonText ="Sign Up";


export default {
  LOGO_URL: LOGO_URL,
  BACKGROUND_URL: BACKGROUND_URL,
  HOME_SCREEN_NAME: HOME_SCREEN_NAME,
  validateEmail: validateEmail,
  SignInNavText: SignInNavText,
  SignUpNavText: SignUpNavText,
  SignInButtonText: SignInButtonText,
  SignUpButtonText: SignUpButtonText,
};
