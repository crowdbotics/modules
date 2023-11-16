import React from "react";
import { Platform, StyleSheet, View, Text } from "react-native";
import { useMatchMedia } from "@helpers";
import { Page } from "../page";
import { SourceCode } from "../code";

function MatchMediaDemo() {
  if (!window.matchMedia) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>
          window.matchMedia is not supported in current platform:
        </Text>
        <Text style={[styles.text, styles.bold]}>{Platform.OS}</Text>
      </View>
    );
  }

  const size = useMatchMedia("(max-width: 800px)") ? "shorter" : "wider";

  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        The element below shows text based on the following media query:
      </Text>
      <Text style={styles.text}>
        <Text style={styles.bold}>&quot;(max-width: 800px)&quot;</Text>
      </Text>
      <Text style={styles.text}>
        Current screen is <Text style={styles.bold}>{size}</Text> than 800px.
      </Text>
    </View>
  );
}

const code = `import { useState, useEffect } from "react"
import { Platform, StyleSheet, View, Text } from "react-native"

const useMatchMedia = query => {
  const mediaMatch = window.matchMedia(query)
  const [matches, setMatches] = useState(mediaMatch.matches)

  useEffect(() => {
    const handler = e => setMatches(e.matches)
    mediaMatch.addListener(handler)
    return () => mediaMatch.removeListener(handler)
  }, [])

  return matches
}

export function MatchMediaDemo() {
  if (!window.matchMedia)
    return (
      <Page>
        <View style={styles.container}>
          <Text style={styles.text}>
            window.matchMedia is not supported in current platform:
          </Text>
          <Text style={[styles.text, styles.bold]}>{Platform.OS}</Text>
        </View>
      </Page>
    )

  const size = useMatchMedia("(max-width: 800px)") ? "shorter" : "wider"

  return (
      <View style={styles.container}>
        <Text style={styles.text}>
          The element below shows text based on the following media query:
        </Text>
        <Text style={styles.text}>
          <Text style={styles.bold}>"(max-width: 800px)"</Text>
        </Text>
        <Text style={styles.text}>
          Current screen is <Text style={styles.bold}>{size}</Text> than 800px.
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
    backgroundColor: "yellow",
    fontWeight: 700
  },
  container: {
    margin: 5
  }
})`;

export function MatchMedia() {
  return (
    <Page>
      <MatchMediaDemo />
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
    backgroundColor: "yellow",
    fontWeight: 700
  },
  container: {
    margin: 5
  }
});
