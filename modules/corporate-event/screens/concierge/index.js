import React from "react"
import {
  View,
  StyleSheet,
  Text,
  Platform
} from "react-native"
import Webview from "./webview"

const platform = Platform.OS

const Concierge = ({ navigation }) => {
  navigation.setOptions({
    title: "Concierge",
    headerShown: true
  })
  return (
    platform == "web" ? (
      <View style={{ flex: 1 }}>
        <Text>Web</Text>
      </View>
    ) : (
      <Webview />
    )
  )
}

const styles = StyleSheet.create({
  
})

export default Concierge
