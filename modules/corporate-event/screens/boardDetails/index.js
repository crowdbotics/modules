import React from "react"
import { View, StyleSheet, ScrollView, Pressable, Dimensions, Linking } from "react-native"
import { Text, Image } from "react-native"


const WIDTH = Dimensions.get("window").width
const HEIGHT = Dimensions.get("window").height

const BoardDetails = ({ route, navigation }) => {
  return (
      <ScrollView style={styles.container}>
        <View style={styles.main}>
          <Pressable style={styles.sideTextMain} onPress={()=>{navigation.navigate("board")}}>
            <Image
              source={require("./assets/3SevenLogo.png")}
              style={{ height: 25, width: 80, marginRight: 30 }}
            />
            <Text allowFontScaling={false} style={styles.sideText}>BOARD</Text>
          </Pressable>
          <View>
            <Image
              style={styles.userImage}
              source={{ uri: route?.params?.data?.connect_user?.image }}
            />
          </View>
          <View style={styles.aboutMain}>
            <View style={styles.about}>
              <Text allowFontScaling={false} style={styles.nameTitle}>
                {route?.params?.data?.connect_user?.user.name.toUpperCase()}
              </Text>
              <Text allowFontScaling={false} style={styles.professional}
                numberOfLines={2}
              >
                {route?.params?.data?.connect_user?.designation}
              </Text>
              <Pressable style={styles.emailMain}
                onPress={() => {
                  Linking.openURL(
                    `mailto:${route?.params?.data?.connect_user?.user.email}`
                  )
                }}
              >
                <Image
                  style={{ height: 20, width: 20 }}
                  source={require("./assets/envelope.png")}
                />
                <Text allowFontScaling={false} style={styles.email}
                  numberOfLines={2}
                >
                  {route?.params?.data?.connect_user?.user.email}
                </Text>
              </Pressable>
              <Pressable style={styles.siteMain}
                onPress={() => {
                  Linking.openURL(
                    `${route?.params?.data?.connect_user?.website}`
                  )
                }}
              >
                <Image
                  style={{ height: 20, width: 20 }}
                  source={require("./assets/laptop.png")}
                />
                <Text allowFontScaling={false} style={styles.site}
                numberOfLines={2}
                >
                  {route?.params?.data?.connect_user?.website}
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
        <View
          style={{ marginHorizontal: 45, marginBottom: 20}}
          showsVerticalScrollIndicator={false}
        >
          <Text allowFontScaling={false} style={styles.details}>
            {route?.params?.data?.connect_user?.description}
          </Text>
        </View>
      </ScrollView>
  )
}

const styles = StyleSheet.create({
  userImage: { height: 210, width: 210 , backgroundColor:'#d3d3d3'},
  container: {
    flex: 1,
    backgroundColor: "white"
  },
  main: {
    position: "relative",
    display: "flex",
    paddingTop: 40,
    paddingBottom: 20,
    alignItems: "center",
  },
  sideTextMain: {
    backgroundColor: "rgba(0,0,0,0.8)",
    position: "absolute",
    paddingVertical: 7,
    paddingHorizontal: 40,
    flexDirection: "row",
    left: -143,
    top: 249,
    transform: [{ rotate: "270deg" }],
    alignItems: "flex-end"
  },
  sideText: {
    fontSize: 22,
    fontWeight: "600",
    color: "#ffffff",
    marginRight: 60
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
    fontWeight: "bold",
    letterSpacing: 1
  },
  professional: {
    color: "gray",
    fontSize: 14,
    fontWeight: "400",
    fontFamily: "Avenir-Regular",
    maxWidth: WIDTH - 150
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
    maxWidth: WIDTH - 150

  },
  siteMain: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    gap: 10,
    marginTop: 8
  },
  site: {
    color: "gray",
    fontSize: 14,
    fontWeight: "400",
    fontFamily: "Avenir-Regular",
    maxWidth: WIDTH - 150
  },
  details: {
    color: "#000",
    textAlign: "justify",
    marginTop: 10,
    fontFamily: "Avenir-Regular"
  }
})

export default BoardDetails
