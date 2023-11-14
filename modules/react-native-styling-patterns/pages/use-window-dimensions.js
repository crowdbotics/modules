import React from "react";
import { StyleSheet, View, Text, useWindowDimensions } from "react-native";
import { Page } from "../page";
import { SourceCode } from "../code";

function UseWindowDimensionsDemo() {
  const { width, height, scale, fontScale } = useWindowDimensions();

  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        Resize this window and zoom in and out and watch the values below
        change.
      </Text>
      <Text style={styles.text}>
        Width: <Text style={styles.bold}>{Math.round(width)}</Text>
      </Text>
      <Text style={styles.text}>
        Height: <Text style={styles.bold}>{Math.round(height)}</Text>
      </Text>
      <Text style={styles.text}>
        Scale: <Text style={styles.bold}>{scale}</Text>
      </Text>
      <Text style={styles.text}>
        Font Scale: <Text style={styles.bold}>{fontScale}</Text>
      </Text>
    </View>
  );
}

const code = `import React from "react"
import { StyleSheet, View, Text, useWindowDimensions } from "react-native"

function UseWindowDimensionsDemo() {
  const { width, height, scale, fontScale } = useWindowDimensions()

  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        Resize this window and zoom in and out and watch the values below
        change.
      </Text>
      <Text style={styles.text}>
        Width: <Text style={styles.bold}>{Math.round(width)}</Text>
      </Text>
      <Text style={styles.text}>
        Height: <Text style={styles.bold}>{Math.round(height)}</Text>
      </Text>
      <Text style={styles.text}>
        Scale: <Text style={styles.bold}>{scale}</Text>
      </Text>
      <Text style={styles.text}>
        Font Scale: <Text style={styles.bold}>{fontScale}</Text>
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  text: {
    fontSize: 24,
    marginTop: 20,
    marginBottom: 20
  },
  bold: {
    backgroundColor: "yellow"
  },
  container: {
    margin: 5
  }
})`;

export function UseWindowDimensions() {
  return (
    <Page>
      <UseWindowDimensionsDemo />
      <SourceCode code={code} />
    </Page>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 24,
    marginTop: 20,
    marginBottom: 20
  },
  bold: {
    backgroundColor: "yellow"
  },
  container: {
    margin: 5
  }
});
