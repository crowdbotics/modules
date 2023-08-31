import { StyleSheet } from "react-native"

export const globalOptions = {
  name: "{{cookiecutter.project_dash_slug}}",
  url: "https://{{cookiecutter.project_dash_slug}}.botics.co",
  api: "https://{{cookiecutter.project_dash_slug}}.botics.co/api/v1",
  screenOptions: {
    headerShown: false
  }
}
export const modulesOptions = {
  "@modules/app-menu": {
    copy: "Routes available!"
  }
}
