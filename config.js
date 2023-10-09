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
    REACT_NATIVE_SCAFFOLD_REPO_ORIGIN:
      "https://github.com/crowdbotics/react-native-scaffold"
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
    manifest: {
      slugPlaceholder: "{{slug}}",
      slugPlaceholderRegex: /\{\{slug\}\}/g,
      ignoreDirectories: [DJANGO_DEMO_DIRECTORY, DEMO_NODE_MODULES_DIRECTORY],
      outputDir: MANIFEST_OUT_DIR
    },
    build: {
      dir: "build",
      scaffoldRepoDir: "build/crowdbotics",
      diff: "build/diff",
      templatePrevious: "build/v1",
      templateNext: "build/v2",
      contextYaml: "build/context.yaml"
    }
  }
};
