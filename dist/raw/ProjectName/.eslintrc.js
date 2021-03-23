module.exports = {
  root: true,
  extends: "@react-native-community",
  rules: {
    "prettier/prettier": [
      "error",
      {
        semi: false,
        parser: "babel",
        trailingComma: "none",
        arrowParens: "avoid"
      }
    ]
  }
}
