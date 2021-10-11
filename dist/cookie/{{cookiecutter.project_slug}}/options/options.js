import { StyleSheet } from "react-native";

export const globalOptions = {
  name: "{{cookiecutter.project_slug}}",
  url: "https://{{cookiecutter.project_slug}}.botics.co",
  api: "https://{{cookiecutter.project_slug}}.botics.co/api/v1"
}
export const modulesOptions = {
  "@modules/app-menu": {
    "copy": "Routes available!"
  }
}
