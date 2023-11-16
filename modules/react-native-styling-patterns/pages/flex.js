import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { Page } from "../page";
import { SourceCode } from "../code";

function FlexDemo() {
  return (
    <View style={styles.container}>
      <View style={[styles.center, styles.flex1]}>
        <Text style={styles.text}>flex: 1</Text>
      </View>
      <View style={[styles.center, styles.flex2]}>
        <Text style={styles.text}>flex: 2</Text>
      </View>
      <View style={[styles.center, styles.flex3]}>
        <Text style={styles.text}>flex: 1</Text>
      </View>
    </View>
  );
}

const code = `import React from "react"
import { StyleSheet, View, Text } from "react-native"

export function FlexDemo() {
  return (
      <View style={styles.container}>
        <View style={[styles.center, styles.flex1]}>
          <Text style={styles.text}>flex: 1</Text>
        </View>
        <View style={[styles.center, styles.flex2]}>
          <Text style={styles.text}>flex: 2</Text>
        </View>
        <View style={[styles.center, styles.flex3]}>
          <Text style={styles.text}>flex: 1</Text>
        </View>
      </View>
  )
}

const styles = StyleSheet.create({
  center: {
    justifyContent: "center",
    alignItems: "center"
  },
  flex1: {
    flex: 1,
    backgroundColor: "red"
  },
  flex2: {
    flex: 2,
    backgroundColor: "darkorange"
  },
  flex3: {
    flex: 1,
    backgroundColor: "green"
  },
  container: {
    margin: 5,
    height: 400
  },
  text: {
    color: "white",
    fontSize: 24,
    fontWeight: 700
  }
})`;

export function Flex() {
  return (
    <Page>
      <Text style={styles.normalText}>
        Flex controls how elements grow or shrink to fit the available space.
        The middle element <Text style={styles.bold}>flex: 2</Text> takes as
        much space as the other elements combined. It is{" "}
        <Text style={styles.bold}>twice</Text> as big as the other elements with{" "}
        <Text style={styles.bold}>flex: 1</Text>. There&apos;s no shorthand
        syntax support in React Native, only single integer values can be used.
      </Text>
      <FlexDemo />
      <SourceCode code={code} />
    </Page>
  );
}

const styles = StyleSheet.create({
  center: {
    justifyContent: "center",
    alignItems: "center"
  },
  flex1: {
    flex: 1,
    backgroundColor: "red"
  },
  flex2: { flex: 2, backgroundColor: "darkorange" },
  flex3: { flex: 1, backgroundColor: "green" },
  text: {
    color: "white",
    fontSize: 24,
    fontWeight: 700
  },
  normalText: {
    fontSize: 24,
    marginTop: 20,
    marginBottom: 20,
    padding: 5
  },
  bold: { backgroundColor: "yellow" },
  container: {
    margin: 5,
    height: 400
  }
});
