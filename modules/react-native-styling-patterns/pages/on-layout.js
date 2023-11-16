import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { useComponentLayout } from "@helpers";
import { Page } from "../page";
import { SourceCode } from "../code";

function Box({ boxStyle }) {
  const [{ height, width, x, y }, onLayout] = useComponentLayout();

  return (
    <View style={boxStyle} onLayout={onLayout}>
      <Text style={styles.text}>height: {Math.round(height)}</Text>
      <Text style={styles.text}>width: {Math.round(width)}</Text>
      <Text style={styles.text}>x: {Math.round(x)}</Text>
      <Text style={styles.text}>y: {Math.round(y)}</Text>
    </View>
  );
}

function OnLayoutDemo() {
  return (
    <View style={styles.container}>
      <Box boxStyle={styles.big} />
      <Box boxStyle={styles.small} />
    </View>
  );
}

const code = `import React, { useState, useCallback } from "react"
import { StyleSheet, View, Text } from "react-native"

function useComponentLayout() {
  const [layout, setLayout] = useState({})

  const onLayout = useCallback(event => {
    setLayout(event.nativeEvent.layout)
  }, [])

  return [layout, onLayout]
}

function Box({ boxStyle }) {
  const [{ height, width, x, y }, onLayout] = useComponentLayout()

  return (
    <View style={boxStyle} onLayout={onLayout}>
      <Text style={styles.text}>height: {Math.round(height)}</Text>
      <Text style={styles.text}>width: {Math.round(width)}</Text>
      <Text style={styles.text}>x: {Math.round(x)}</Text>
      <Text style={styles.text}>y: {Math.round(y)}</Text>
    </View>
  )
}

export function OnLayoutDemo() {
  return (
    <View style={styles.container}>
      <Box boxStyle={styles.big} />
      <Box boxStyle={styles.small} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    height: 200,
    margin: 5
  },
  big: {
    flex: 2,
    backgroundColor: "darkorange",
    justifyContent: "center",
    alignItems: "center"
  },
  small: {
    flex: 1,
    backgroundColor: "blue",
    justifyContent: "center",
    alignItems: "center"
  },
  text: {
    color: "white",
    fontSize: 18,
    fontWeight: 700,
    paddingTop: 5,
    paddingBottom: 5
  },
})`;

export function OnLayout() {
  return (
    <Page>
      <Text style={styles.normalText}>
        Resize this window and watch the values below change{" "}
        <Text style={styles.bold}>for each element</Text>.
      </Text>
      <OnLayoutDemo />
      <SourceCode code={code} />
    </Page>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    height: 200,
    margin: 5
  },
  big: {
    flex: 2,
    backgroundColor: "darkorange",
    justifyContent: "center",
    alignItems: "center"
  },
  small: {
    flex: 1,
    backgroundColor: "blue",
    justifyContent: "center",
    alignItems: "center"
  },
  text: {
    color: "white",
    fontSize: 18,
    fontWeight: 700,
    paddingTop: 5,
    paddingBottom: 5
  },
  bold: {
    backgroundColor: "yellow"
  },
  normalText: {
    fontSize: 24,
    padding: 5,
    marginTop: 20,
    marginBottom: 20
  }
});
