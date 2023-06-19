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
    ],
    "react-hooks/exhaustive-deps": [
      "error",
      {
        additionalHooks: "(useAnimatedStyle|useDerivedValue|useAnimatedProps)"
      }
    ]
  }
}
