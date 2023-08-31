import path from "path";

const SCAFFOLD_DIRECTORY = path.join("scaffold");
const DEMO_DIRECTORY = path.join("demo");
const DJANGO_DEMO_DIRECTORY = path.join("demo", "backend");
const DEMO_NODE_MODULES_DIRECTORY = path.join("demo", "node_modules");
const DISTRIBUTION_DIRECTORY = path.join("dist");
const RAW_DISTRIBUTION_DIRECTORY = path.join("dist", "raw");
const COOKIE_DISTRIBUTION_DIRECTORY = path.join("dist", "cookie");
const MANIFEST_OUT_DIR = path.join("manifest");

export default {
  constants: {
    CROWDBOTICS_FILE: ".crowdbotics.json",
    COOKIECUTTER_PACKAGE: "cookiecutter==1.7.3",
    MODULES_REPO_ORIGIN: "https://github.com/crowdbotics/modules.git"
  },
  scaffold: {
    directory: SCAFFOLD_DIRECTORY
  },
  dist: {
    directory: DISTRIBUTION_DIRECTORY,
    builds: {
      raw: {
        directory: RAW_DISTRIBUTION_DIRECTORY,
        // Avoids react-native cli error:
        // "Project name shouldn't contain "HelloWorld" name in it,
        // because it is CLI's default placeholder name."
        placeholderName: "ProjectName",
        // Matches template title placeholder
        titlePlaceholder: "Hello App Display Name"
      },
      cookie: {
        directory: COOKIE_DISTRIBUTION_DIRECTORY,
        config: {
          project_name: "{{cookiecutter.project_name}}",
          project_slug:
            "{{cookiecutter.project_name|lower|replace(' ', '')|replace('-', '_')}}",
          project_dash_slug: "{{cookiecutter.project_slug|replace('_', '-')}}",
          project_description: "",
          owner_email: "",
          ssh_key_fingerprint: ""
        }
      }
    }
  },
  demo: {
    directory: DEMO_DIRECTORY,
    backendDirectory: DJANGO_DEMO_DIRECTORY,
    placeholderName: "demo",
    placeholderNameRegex: /demo/g
  },
  upgrade: {
    versions: [
      {
        text: "Upgrade my scaffold (1.1.0 -> 2.0.0)",
        previousVersion: "1.1.0",
        previousVersionSHA: "b89bf7efd2818b69673961d87378321cc6e8afc4",
        nextVersion: "2.0.0",
        nextVersionSHA: "13908cdefd87a5e50063303b27c688dae507a34d",
        ignoreTemplatize: [
          "ios/fastlane/metadata/review_information/review_demo_password.txt",
          "ios/fastlane/metadata/review_information/review_demo_user.txt"
        ],
        upgradeManifestImport: "./manifest/110-to-200.json"
      },
      {
        text: "Upgrade my scaffold (2.0.0 -> 2.1.0)",
        previousVersion: "2.0.0",
        previousVersionSHA: "13908cdefd87a5e50063303b27c688dae507a34d",
        nextVersion: "2.1.0",
        nextVersionSHA: "03d0e48891aaf96bd0f2653ac1f7b0950f2c6289",
        ignoreTemplatize: [
          "ios/fastlane/metadata/review_information/review_demo_password.txt",
          "ios/fastlane/metadata/review_information/review_demo_user.txt"
        ],
        upgradeManifestImport: "./manifest/200-to-210.json"
      },
      {
        text: "Upgrade my scaffold (2.1.0 -> 2.1.1)",
        previousVersion: "2.1.0",
        previousVersionSHA: "03d0e48891aaf96bd0f2653ac1f7b0950f2c6289",
        nextVersion: "2.1.1",
        nextVersionSHA: "67204d92e9b460edc36099ebdd6c2cd691c48a57",
        ignoreTemplatize: [
          "ios/fastlane/metadata/review_information/review_demo_password.txt",
          "ios/fastlane/metadata/review_information/review_demo_user.txt"
        ],
        upgradeManifestImport: "./manifest/210-to-211.json"
      },
      {
        text: "Upgrade my scaffold (2.1.1 -> 2.2.0)",
        previousVersion: "2.1.1",
        previousVersionSHA: "67204d92e9b460edc36099ebdd6c2cd691c48a57",
        nextVersion: "2.2.0",
        nextVersionSHA: "54ea9645723f5c0f38cabb6f443a3701e5f5ae00",
        ignoreTemplatize: [
          "ios/fastlane/metadata/review_information/review_demo_password.txt",
          "ios/fastlane/metadata/review_information/review_demo_user.txt"
        ],
        upgradeManifestImport: "./manifest/211-to-220.json"
      },
      {
        text: "Upgrade my scaffold (2.2.0 -> 2.3.0)",
        previousVersion: "2.2.0",
        previousVersionSHA: "54ea9645723f5c0f38cabb6f443a3701e5f5ae00",
        nextVersion: "2.3.0",
        nextVersionSHA: "6602a5aca5c44d9b3bcd5c4976116b64af7ba20b",
        ignoreTemplatize: [
          "ios/fastlane/metadata/review_information/review_demo_password.txt",
          "ios/fastlane/metadata/review_information/review_demo_user.txt"
        ],
        upgradeManifestImport: "./manifest/220-to-230.json"
      },
      {
        text: "Upgrade my scaffold (2.3.0 -> 2.4.0)",
        previousVersion: "2.3.0",
        previousVersionSHA: "6602a5aca5c44d9b3bcd5c4976116b64af7ba20b",
        nextVersion: "2.4.0",
        nextVersionSHA: "54727ce225986c9473b0c188cbd6a1ea737d43a0",
        ignoreTemplatize: [
          "ios/fastlane/metadata/review_information/review_demo_password.txt",
          "ios/fastlane/metadata/review_information/review_demo_user.txt"
        ],
        upgradeManifestImport: "./manifest/230-to-240.json"
      }
    ],
    manifest: {
      slugPlaceholder: "{{slug}}",
      slugPlaceholderRegex: /\{\{slug\}\}/g,
      ignoreDirectories: [DJANGO_DEMO_DIRECTORY, DEMO_NODE_MODULES_DIRECTORY],
      outputDir: MANIFEST_OUT_DIR
    },
    build: {
      modulesRepoDir: "build/crowdbotics",
      diff: "build/diff",
      templatePrevious: "build/v1",
      templateNext: "build/v2",
      contextYaml: "build/context.yaml"
    }
  }
};

const VALID_MARK = "\u2705";
const INVALID_MARK = "\u274C";
const WARNING_MARK = "\u26A0";

export const valid = (...args) => {
  console.log(VALID_MARK, ...args);
};

export const invalid = (...args) => {
  console.error(INVALID_MARK, ...args);
  process.exit(1);
};

export const warn = (...args) => {
  console.log(WARNING_MARK, ...args);
};

export const section = (msg) => {
  console.log("");
  console.log(">", msg);
};
