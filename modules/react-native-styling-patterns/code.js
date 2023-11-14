import React from "react";
import { StyleSheet, View, Text } from "react-native";
import SyntaxHighlighter from "react-native-syntax-highlighter";
import { prism } from "react-syntax-highlighter/styles/prism";

export function SourceCode({ code }) {
  return (
    <View style={styles.code}>
      <Text style={styles.codeText}>Source Code</Text>
      <SyntaxHighlighter
        language="javascript"
        style={prism}
        highlighter={"prism"}
        fontSize={18}
        customStyle={styles.custom}
      >
        {code}
      </SyntaxHighlighter>
    </View>
  );
}

const styles = StyleSheet.create({
  code: {
    marginTop: 25,
    margin: 5,
    marginBottom: 150
  },
  codeText: {
    fontSize: 28,
    marginTop: 10,
    marginBottom: 25
  },
  custom: {
    margin: 0,
    padding: 0
  }
});
