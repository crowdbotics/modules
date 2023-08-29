export const dateFunc = date => {
  const yyyy = date.getFullYear().toString();
  const mm = (date.getMonth() + 1).toString();
  const dd = date.getDate().toString();
  const mmChars = mm.split("");
  const ddChars = dd.split("");
  return yyyy + "-" + (mmChars[1] ? mm : "0" + mmChars[0]) + "-" + (ddChars[1] ? dd : "0" + ddChars[0]);
};

export const validateEmail = new RegExp("^[^\\s]+([.-]?\\w+)*@\\w+([.-]?\\w+)*(.\\w{2,3})+$"); // eslint-disable-line

export const appointmentDurations = [{
  label: "30 min",
  value: "00:30:00"
}, {
  label: "1 hour",
  value: "01:00:00"
}, {
  label: "1 hour 30 min",
  value: "01:30:00"
}, {
  label: "2 hour",
  value: "02:00:00"
}, {
  label: "2 hour 30 min",
  value: "02.30:00"
}, {
  label: "3 hour",
  value: "03:00:00"
}];

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
