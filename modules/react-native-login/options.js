/*
Login Module Options

You can use either this file or the Module Options UI, found
in the Crowdbotics Storyboard by clicking on "Properties" of
the module after it has been installed.

Here is an explanation of these values:

LOGO_URL: Set a Logo image for your login screen.
For best results, use a similar size to the sample provided.

BACKGROUND_URL: Set a Background image for your login screen.
For best results, use a similar size to the sample provided.

HOME_SCREEN_NAME: Use this to set the name of the screen to redirect to after
a succesful login.

validateEmail: This Regex expression can be customized for additional email
validation logic.

SignInNavText/SignUpNavText: These two options control the what the navigation tabs say, keep them short!

SignInButtonText/SignUpButtonText: These two options control your button text.

*/

export default {
  LOGO_URL:
    "https://crowdbotics-slack-dev.s3.amazonaws.com/media/project_component_resources/cb-icon.png",
  BACKGROUND_URL:
    "https://crowdbotics-slack-dev.s3.amazonaws.com/media/project_component_resources/halfbg.png",
  HOME_SCREEN_NAME: "Home Screen",
  validateEmail: "^[^\\s]+([.-]?\\w+)*@\\w+([.-]?\\w+)*(.\\w{2,3})+$",
  SignInNavText: "Sign In",
  SignUpNavText: "Sign Up",
  SignInButtonText: "Login",
  SignUpButtonText: "Sign Up"
};
