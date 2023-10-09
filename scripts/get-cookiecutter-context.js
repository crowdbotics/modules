import fs from "node:fs";
import path from "node:path";
import config from "../config.js";
import { XMLParser } from "fast-xml-parser";
import { warn, section } from "../utils.js";

export function getProjectCookiecutterContext(userdir, userVersion) {
  section("Detecting your project name, slug, and ssh key fingerprint");
  let context = {};
  if (userVersion !== "1.1.0") {
    context = JSON.parse(
      fs.readFileSync(
        path.join(userdir, config.constants.CROWDBOTICS_FILE),
        "utf8"
      )
    ).scaffold.cookiecutter_context;
    return context;
  }

  const options = {
    ignoreAttributes: false
  };
  const parser = new XMLParser(options);
  let xml, obj;

  xml = fs.readFileSync(
    path.join(
      userdir,
      "android",
      "app",
      "src",
      "main",
      "res",
      "values",
      "strings.xml"
    ),
    "utf8"
  );
  obj = parser.parse(xml);
  context.project_name = obj.resources.string.filter(
    (str) => str["@_name"] === "original_app_name"
  )[0]["#text"];

  context.project_slug = [];

  xml = fs.readFileSync(
    path.join(userdir, "android", "app", "src", "main", "AndroidManifest.xml"),
    "utf8"
  );
  obj = parser.parse(xml);
  const slug = obj.manifest["@_package"].replace(/^(com\.)/g, "");
  context.project_slug.push(slug);

  try {
    xml = fs.readFileSync(
      path.join(userdir, "ios", slug, "LaunchScreen.storyboard"),
      "utf8"
    );
    obj = parser.parse(xml);
    context.project_slug.push(
      obj.document.scenes.scene.objects.viewController.view.subviews.label[0][
        "@_text"
      ]
    );
    const json = JSON.parse(
      fs.readFileSync(path.join(userdir, "app.json"), "utf8")
    );
    context.project_slug.push(json.name);
    context.project_slug.push(json.displayName);

    const freqArray = context.project_slug;
    const freqMap = {};
    let mostFrequent = context.project_slug[0];
    let mostFrequentCount = 1;

    for (let i = 0; i < freqArray.length; i++) {
      const element = freqArray[i];

      if (freqMap[element]) {
        freqMap[element]++;
      } else {
        freqMap[element] = 1;
      }

      if (freqMap[element] > mostFrequentCount) {
        mostFrequent = element;
        mostFrequentCount = freqMap[element];
      }
    }

    context.project_slug = mostFrequent;
  } catch (err) {
    context.project_slug = context.project_slug[0];
    warn("project_slug extracted with low confidence:", err.message);
  }

  const txt = fs
    .readFileSync(
      path.join(userdir, ".circleci", "generate_mobile_ios_config.sh"),
      "utf8"
    )
    .split("\n");

  const index = txt.findIndex((line) => line.includes("fingerprints:")) + 1;

  context.ssh_key_fingerprint = txt[index]
    .trim()
    .replace("- '", "")
    .replace("'", "");

  return context;
}
