import path from "node:path";

export const manifest = [
  {
    old: path.join("App.js"),
    new: path.join("App.tsx"),
    type: "babel"
  },
  {
    old: path.join("babel.config.js"),
    new: path.join("babel.config.js"),
    type: "babel"
  },
  {
    old: path.join(".crowdbotics.json"),
    new: path.join(".crowdbotics.json"),
    type: "json"
  }
];
