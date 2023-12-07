import React from "react"
import {
  View,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  ImageBackground,
  ScrollView
} from "react-native"
import { useDispatch } from "react-redux"
import { logout } from "../../store/custom/auth.slice"

const About = ({ navigation }) => {
  const buttonNames = ["TEAM", "BOARD", "OFFERINGS", "MATURITY MODEL"]
  const dispatch = useDispatch()

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.parentView}>
        <ImageBackground
          source={require("./assets/background.png")}
          style={styles.backgroundImage}
        >
          <Text allowFontScaling={false} style={styles.aboutText}>About</Text>
          <View style={styles.buttonsParentView}>
            {buttonNames.map(item => (
              <TouchableOpacity
                style={styles.itemView}
                onPress={() => {
                  if (item == "LOGOUT") {
                    dispatch(logout()).then(() => {
                      navigation.reset({
                        index: 0,
                        routes: [{ name: "login" }]
                      })})
                  }else{
                    navigation.navigate(item.toLowerCase())
                  }
                }}
              >
                <Text allowFontScaling={false} style={styles.buttonTitle}>{item}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </ImageBackground>
        {/* Logout Button */}
        <TouchableOpacity
          style={{
            marginTop: 30,
            marginBottom: 30,
            backgroundColor: "#000",
            borderRadius: 10,
            width: 170,
            height: 40,
            justifyContent: "center",
            alignItems: "center",
            alignSelf: "center",

          }}
          onPress={() => {
            dispatch(logout()).then(() => {
              navigation.reset({
                index: 0,
                routes: [{ name: "login" }]
              })
            })
          }}
        >
          <Text allowFontScaling={false} style={styles.buttonTitle}>LOGOUT</Text>
        </TouchableOpacity>


        <Image
          source={require("./assets/SummitGraphic.jpg")}
          style={styles.logoImage}
          resizeMode="contain"
        />
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  logoImage: { position: "absolute", height: 100, width: 200, opacity: 0.6 },
  buttonTitle: { fontSize: 16, color: "#FFF", fontWeight: "700" },
  parentView: { flex: 1, marginTop: 40, marginHorizontal: 10 },
  buttonsParentView: { marginTop: 30, alignItems: "center" },
  itemView: {
    backgroundColor: "rgba(0,0,0,0.6)",
    width: 170,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10
  },
  aboutText: {
    fontSize: 28,
    fontFamily: "GaramondPremrPro-It",
    color: "#fff",
    marginLeft: 20,
    marginTop: 70
  },
  backgroundImage: {
    position: "relative",
    marginHorizontal: 40,
    paddingVertical: 20,
    marginTop: 40,
  },
  container: {
    backgroundColor: "#FFF",
    flex: 1,
    justifyContent: "center"
  }
})

export default About
