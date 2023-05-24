import React from "react"
import { View, Image, Text, ScrollView, SafeAreaView } from "react-native"
import { styles } from "./styles"

const WelcomeScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <View style={styles.group} />
        <View style={styles.group}>
          <Image style={styles.logo} source={require("./logo.png")} />
          <Text style={styles.text}>
            Let's build something amazing together!
          </Text>
        </View>
        <Text style={styles.footer}>Made with ❤️ by Crowdbotics</Text>
      </ScrollView>
    </SafeAreaView>
  )
}

export default WelcomeScreen
