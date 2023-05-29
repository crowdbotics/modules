import path from "path";

const SCAFFOLD_DIRECTORY = path.join("scaffold");
const DEMO_DIRECTORY = path.join("demo");
const DJANGO_DEMO_DIRECTORY = path.join("demo", "backend");
const DEMO_NODE_MODULES_DIRECTORY = path.join("demo", "node_modules");
const DISTRIBUTION_DIRECTORY = path.join("dist");
const RAW_DISTRIBUTION_DIRECTORY = path.join("dist", "raw");
const COOKIE_DISTRIBUTION_DIRECTORY = path.join("dist", "cookie");

export default {
  constants: {},
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
    placeholderName: "demo"
  },
  upgrade: {
    manifest: "upgrade-manifest.js",
    slugPlaceholder: "{{slug}}",
    ignoreTemplatize: [
      "ios/fastlane/metadata/review_information/review_demo_password.txt",
      "ios/fastlane/metadata/review_information/review_demo_user.txt"
    ],
    ignoreDirectories: [DJANGO_DEMO_DIRECTORY, DEMO_NODE_MODULES_DIRECTORY]
  }
};
