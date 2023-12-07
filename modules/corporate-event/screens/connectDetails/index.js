import React, { useState } from "react"
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  Pressable,
  Dimensions,
  Linking,
} from "react-native"
import { Text, Image } from "react-native"

import { useDispatch } from "react-redux"
import { connectionRequest } from "../../store/custom/connect.slice"

const WIDTH = Dimensions.get("window").width
const HEIGHT = Dimensions.get("window").height

const ConnectDetails = ({ route, navigation }) => {
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch()

  const onConnect = () => {
    setLoading(true)
    dispatch(
      connectionRequest({
        email: route?.params?.data?.user?.email
      })
    ).then(() => {
      setLoading(false)
    })
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.main}>
        <Pressable style={styles.sideTextMain} onPress={()=>{navigation.navigate("connect")}}>
          <Text allowFontScaling={false} style={styles.sideText}>Connect</Text>
        </Pressable>
        <View>
          <Image
            style={styles.userImage}
            source={{ uri: route?.params?.data?.image }}
          />
        </View>
        <View style={styles.aboutMain}>
          <View style={styles.about}>
            <Text allowFontScaling={false} style={styles.nameTitle}>
              {route?.params?.data?.user?.name}
            </Text>
            <Text allowFontScaling={false} style={styles.professional}
              numberOfLines={2}
            >
              {route?.params?.data?.designation}
            </Text>
            <Pressable style={styles.emailMain}
              onPress={() => {
                Linking.openURL(`mailto:${route?.params?.data?.user?.email}`)
              }}
            >
              <Image
                style={styles.profileIconStyles}
                source={require("./assets/envelope.png")}
              />
              <Text allowFontScaling={false} style={styles.email}
                numberOfLines={2}
              >
                {route?.params?.data?.user?.email}
              </Text>
            </Pressable>
            <Pressable style={styles.siteMain}
              onPress={() => {
                Linking.openURL(route?.params?.data?.website)
              }}
            >
              <Image
                style={styles.profileIconStyles}
                source={require("./assets/laptop.png")}
              />
              <Text allowFontScaling={false} style={styles.site}>{route?.params?.data?.website}</Text>
            </Pressable>
          </View>
        </View>
      </View>
      <View
        showsVerticalScrollIndicator={false}
        style={styles.scrollStyles}
      >
        <Text allowFontScaling={false} style={styles.details}>{route?.params?.data?.description}</Text>
        <TouchableOpacity
          style={styles.connectButton}
          onPress={onConnect}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator size={"small"} color={"#fff"} />
          ) : (
            <Text allowFontScaling={false} style={styles.buttonTitle}>Connect</Text>
          )}
        </TouchableOpacity>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  scrollStyles: { 
    marginHorizontal: 50, 
    marginBottom: 20,
  },
  profileIconStyles: { height: 20, width: 20 },
  buttonTitle: { color: "#fff", fontSize: 16, fontWeight: "700" },
  connectButton: {
    backgroundColor: "#000",
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 30,
    borderRadius: 10,
    marginHorizontal: 20
  },
  userImage: { height: 210, width: 210, backgroundColor: "#d3d3d3" },
  container: {
    flex: 1,
    backgroundColor: "white"
  },
  main: {
    position: "relative",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 10,
    marginTop: 40
  },
  sideTextMain: {
    backgroundColor: "rgba(0,0,0,0.7)",
    position: "absolute",
    paddingVertical: 7,
    left: -52,
    top: 269,
    transform: [{ rotate: "270deg" }],
    borderLeftWidth: 1,
    width: 140,
    alignItems: "center",
  },
  sideText: {
    fontSize: 22,
    fontWeight: "600",
    color: "#ffffff",
    fontFamily: "GaramondPremrPro-It"
  },
  about: {
    marginTop: 13,
    borderLeftWidth: 2,
    borderLeftColor: "black",
    paddingLeft: 20
  },
  nameTitle: {
    color: "#6C170B",
    fontSize: 20,
    fontWeight: "bold"
  },
  professional: {
    color: "gray",
    fontSize: 14,
    fontWeight: "400",
    fontFamily: "Avenir-Regular",
    maxWidth: WIDTH - 140
  },
  emailMain: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    gap: 10,
    marginTop: 8
  },
  email: {
    color: "gray",
    fontSize: 14,
    fontWeight: "400",
    fontFamily: "Avenir-Regular",
    maxWidth: WIDTH - 140
  },
  siteMain: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    gap: 10,
    marginTop: 8,
    maxWidth: WIDTH - 140
  },
  site: {
    color: "gray",
    fontSize: 14,
    fontWeight: "400",
    fontFamily: "Avenir-Regular"
  },
  details: {
    color: "#000",
    textAlign: "justify",
    marginTop: 10,
    fontFamily: "Avenir-Regular"
  }
})

export default ConnectDetails
