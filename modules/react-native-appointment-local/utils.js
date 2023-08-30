import moment from "moment";

// This function formats the date passed into a specific manner
export const formatDate = (date) => {
  const yyyy = date.getFullYear().toString();
  const mm = (date.getMonth() + 1).toString();
  const dd = date.getDate().toString();

  const mmChars = mm.split("");
  const ddChars = dd.split("");
  return (
    yyyy +
    "-" +
    (mmChars[1] ? mm : "0" + mmChars[0]) +
    "-" +
    (ddChars[1] ? dd : "0" + ddChars[0])
  );
};

// This function extracts the error message from the error object
export const mapErrors = (error) => {
  let errorMessage = null;
  const errorsList = error.response.data;
  if (error.message === "Network Error") {
    errorMessage = "Network Error";
  } else if (errorsList) {
    const message = Object.keys(errorsList).map((element) => {
      if (typeof errorsList[element] === "object") {
        return Object.keys(errorsList[element]).map(
          (el) => `${element}: ${errorsList[element][el]}`
        );
      } else {
        return `${element}: ${errorsList[element]}`;
      }
    });
    errorMessage = message.join("\n");
  } else {
    errorMessage = error.message;
  }
  return errorMessage;
};

// This function checks if any of its params is in loading state
export const checkLoading = (...params) =>
  params.some((param) => param.loading === "pending");

// This function gets the ending time of the appointment by getting its start time and total duration in params
export const getEndTime = (startTime, duration) => {
  if (startTime && duration) {
    // Parse the time strings into Moment.js duration objects
    const duration1 = moment.duration(startTime);
    const duration2 = moment.duration(duration);

    // Add the durations together
    const totalDuration = duration1.add(duration2);

    // Get the total time in "HH:mm:ss" format
    const totalTime = moment
      .utc(totalDuration.asMilliseconds())
      .format("HH:mm:ss");
    return totalTime;
  }
};

// This function calculates the duration between start and end time passed through params
export const getDuration = (startTime, endTime) =>
  moment
    .utc(moment(endTime, "HH:mm:ss").diff(moment(startTime, "HH:mm:ss")))
    .format("HH:mm:ss");

export const availableTimeSlots = [
  { label: "30 min", value: "00:30:00" },
  { label: "1 hour", value: "01:00:00" },
  { label: "1 hour 30 min", value: "01:30:00" },
  { label: "2 hour", value: "02:00:00" },
  { label: "2 hour 30 min", value: "02:30:00" },
  { label: "3 hour", value: "03:00:00" }
];

export const timeSlots = [
  "10:00:00",
  "11:00:00",
  "12:00:00",
  "13:00:00",
  "14:00:00",
  "15:00:00",
  "16:00:00",
  "17:00:00",
  "18:00:00",
  "19:00:00",
  "20:00:00"
];
