import path from "path";

const SCAFFOLD_DIRECTORY = path.join("scaffold");
const DEMO_DIRECTORY = path.join("demo");
const DISTRIBUTION_DIRECTORY = path.join("dist");

export default {
  versions: {
    rn: "0.64.0",
    node: "14.15.4"
  },
  constants: {},
  scaffold: {
    directory: SCAFFOLD_DIRECTORY
  },
  dist: {
    directory: DISTRIBUTION_DIRECTORY,
    builds: {
      raw: {
        directory: path.join(DISTRIBUTION_DIRECTORY, "raw"),
        // Avoids react-native cli error:
        // "Project name shouldn't contain "HelloWorld" name in it,
        // because it is CLI's default placeholder name."
        placeholderName: "ProjectName",
        // Matches template title placeholder
        titlePlaceholder: "Hello App Display Name"
      },
      cookie: {
        directory: path.join(DISTRIBUTION_DIRECTORY, "cookie"),
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
    placeholderName: "demo"
  }
};
