import React from "react"
import { View, StyleSheet, ScrollView, Pressable, Dimensions } from "react-native"
import { Text, Image } from "react-native"

const WIDTH = Dimensions.get("window").width
const HEIGHT = Dimensions.get("window").height

const TeamDetails = ({ route, navigation }) => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.main}>
        <Pressable style={styles.sideTextMain} onPress={()=>{navigation.navigate("team")}}>
          <Image
            source={require("./assets/3SevenLogo.png")}
            style={styles.companyLogo}
          />

          <Text allowFontScaling={false} style={styles.sideText}>TEAM</Text>
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
              {route?.params?.data?.connect_user?.user?.name}
            </Text>
            <Text allowFontScaling={false} style={styles.professional}
               numberOfLines={2}
            >
              {route?.params?.data?.connect_user?.designation}
            </Text>
            <View style={styles.emailMain}>
              <Image
                style={{ height: 20, width: 20 }}
                source={require("./assets/envelope.png")}
              />
              <Text allowFontScaling={false} style={styles.email}
                numberOfLines={2}
              >
                {route?.params?.data?.connect_user?.user?.email}
              </Text>
            </View>
            <View style={styles.siteMain}>
              <Image
                style={{ height: 20, width: 20 }}
                source={require("./assets/laptop.png")}
              />
              <Text allowFontScaling={false} style={styles.site}
                 numberOfLines={2}
              >
                {route?.params?.data?.connect_user?.website}
              </Text>
            </View>
          </View>
        </View>
      </View>
      <View
        showsVerticalScrollIndicator={false}
        style={{ marginHorizontal: 40, marginBottom: 20 }}
      >
        <Text allowFontScaling={false} style={styles.details}>
          {route?.params?.data?.connect_user?.description}
        </Text>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  companyLogo: { height: 25, width: 80, marginRight: 30 },
  userImage: { height: 210, width: 210, backgroundColor:'#d3d3d3' },
  container: {
    flex: 1,
    backgroundColor: "white"
  },
  main: {
    position: "relative",
    display: "flex",
    paddingTop: 60,
    paddingBottom: 20,
    alignItems: "center",
  },
  sideTextMain: {
    backgroundColor: "rgba(0,0,0,0.8)",
    position: "absolute",
    paddingVertical: 7,
    flexDirection: "row",
    left: -100,
    top: 249,
    width: 240,
    justifyContent: "flex-end",
    transform: [{ rotate: "270deg" }],
    alignItems: "flex-end",
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
    paddingLeft: 20,
    
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

export default TeamDetails
