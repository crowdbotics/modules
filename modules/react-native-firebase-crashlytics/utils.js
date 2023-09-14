import crashlytics from "@react-native-firebase/crashlytics";
import { Alert } from "react-native";

/**
 * Logs a test message to Crashlytics.
 */
const log = () => {
  crashlytics().log("Test Log");
};

/**
 * Simulates a crash in the application to test Crashlytics reporting.
 */
const crashApp = () => {
  crashlytics().crash();
};

/**
 * Sets a user ID in Crashlytics.
 */
const setUserId = () => {
  crashlytics().setUserId("2");
};

/**
 * Sets a single attribute in Crashlytics.
 */
const setSingleAttribute = () => {
  crashlytics().setAttribute("credits", "No credits available.");
};

/**
 * Sets multiple attributes in Crashlytics.
 */
const setMultipleAttributes = () => {
  crashlytics().setAttributes({
    role: "admin",
    followers: "13",
    email: "testUser1@example.com",
    username: "test1"
  });
};

/**
 * Records an error in Crashlytics.
 */
const recordError = () => {
  try {
    throw new Error();
  } catch (error) {
    crashlytics().recordError(error);
  }
};

/**
 * Checks for unsent reports in Crashlytics and displays an alert.
 */
const checkForUnsentReports = async () => {
  const reportCheck = await crashlytics().checkForUnsentReports();
  Alert.alert("Are there any unsent reports?", reportCheck);
};

/**
 * List of buttons for triggering Crashlytics functions.
 */
export const eventButtons = [
  {
    title: "Log",
    function: log
  },
  {
    title: "Crash App",
    function: crashApp
  },
  {
    title: "Set UserID",
    function: setUserId
  },
  {
    title: "Single Attribute",
    function: setSingleAttribute
  },
  {
    title: "Multiple Attributes",
    function: setMultipleAttributes
  },
  {
    title: "Record Error",
    function: recordError
  },
  {
    title: "Check Unsent Reports",
    function: checkForUnsentReports
  }
];
