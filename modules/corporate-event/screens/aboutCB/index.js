import React, { useState, useEffect } from "react"
import {
  Text,
  StyleSheet,
  View,
  SafeAreaView,
  Image,
  Pressable,
  Linking,
  Platform
} from "react-native"

const AboutCB = params => {
  if (Platform.OS === "ios" || Platform.OS === "android") {
    params.navigation.setOptions({
      title: "About Crowdbotics",
      headerShown: true,
    })
  }

  const [ImageSource, setImageSource] = useState()
  const [text1, setText1] = useState("")
  const [text2, setText2] = useState("")
  useEffect(() => {
    setText1(
      "Crowdbotics makes it faster than ever to build complete, scalable apps for business. With Crowdbotics, professionals can turn ideas into real code using a matched library of components and a network of on-call experts."
    )
    setText2(
      "Crowdbotics references a library of millions of production-grade software packages to identify the most effective components and workflows for a given project. Crowdbotics then handles infrastructure, implementation, maintenance, operations, monitoring, and security for the life of the project."
    )
    setImageSource(
      "https://assets.website-files.com/5b5cd6b75bb9b0dce50e212f/603437298e88e642f6a92964_EstimateCalcBGimage.png"
    )
  }, [])
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.imgScroller}>
        <Image
          source={{
            uri: ImageSource
          }}
          style={styles.NgnmCnVN}
        />
      </View>
      <View style={styles.textContainer}>
        <Text allowFontScaling={false} style={styles.textHeader}>Welcome to Crowdbotics</Text>
        <Text allowFontScaling={false} style={styles.text}>{text1}</Text>
        <Text allowFontScaling={false} style={styles.text}>{text2}</Text>

        <Pressable
          onPress={() => {
            Linking.openURL("https://hubs.la/Q01rJl390")
          }}
        >
          <Text allowFontScaling={false} style={styles.kRCtpSOC}>LEARN MORE</Text>
        </Pressable>
      </View>
      <View style={styles.imgScroller}>
        <Image
          source={{
            uri: ImageSource
          }}
          style={styles.NgnmCnVN}
        />
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    backgroundColor: "#fff"
  },
  imgScroller: {
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 20,
    height: 120
  },
  threeDots: {
    marginTop: 20
  },
  textContainer: {
    paddingHorizontal: 20
  },
  textHeader: {
    fontSize: 23,
    fontWeight: "700"
  },
  text: {
    fontSize: 16,
    textAlign: "justify",
    lineHeight: 18,
    marginVertical: 10
  },
  NgnmCnVN: {
    height: 120,
    width: "100%"
  },
  yQtgIWnC: {
    left: 116,
    top: 271,
    position: "absolute",
    width: 100,
    height: 50,
    lineHeight: 14,
    fontSize: 14,
    borderRadius: 0
  },
  NhCjRFNR: {
    left: 116,
    top: 331,
    position: "absolute",
    width: 100,
    height: 50,
    lineHeight: 14,
    fontSize: 14,
    borderRadius: 0
  },
  kRCtpSOC: {
    alignSelf: "center",
    fontSize: 25,
    color: "blue",
    textDecorationLine: "underline"
  }
})
export default AboutCB
