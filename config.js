import path from "path";

const SCAFFOLD_DIRECTORY = path.join("scaffold");
const DEMO_DIRECTORY = path.join("demo");
const DJANGO_DEMO_DIRECTORY = path.join("demo", "backend");
const DISTRIBUTION_DIRECTORY = path.join("dist");

export default {
  constants: {
    COOKIECUTTER_PACKAGE: "cookiecutter==1.7.3",
    MODULES_REPO_ORIGIN: "https://github.com/crowdbotics/modules.git"
  },
  scaffold: {
    directory: SCAFFOLD_DIRECTORY
  },
  dist: {
    directory: DISTRIBUTION_DIRECTORY
  },
  demo: {
    directory: DEMO_DIRECTORY,
    backendDirectory: DJANGO_DEMO_DIRECTORY,
    placeholderName: "demo",
    placeholderNameRegex: /demo/g
  }
};
