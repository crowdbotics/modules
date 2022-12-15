import SplashScreen from "react-native-splash-screen";

const duration = null; // In milliseconds
const onDurationEnd = null;// Callback function will be called as your duration ends and splash screen disappears.

const hide = () => SplashScreen.hide(); // hide splash screen
const show = () => SplashScreen.show(); // show splash screen

export default {
  duration: duration,
  onDurationEnd: onDurationEnd,
  hide: hide,
  show: show
};
