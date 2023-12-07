import React, { useEffect } from "react"
import {
  View,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  FlatList
} from "react-native"
import { getSessions } from "../../store/custom/sessions.slice"
import { useDispatch, useSelector } from "react-redux"

const Sessions = ({ navigation }) => {
  const { entities } = useSelector(state => state.Session.getSessions)
  const dispatch = useDispatch()

  const fetchData = async () => {
    await dispatch(getSessions())
  }

  useEffect(() => {
    fetchData()
  }, [])

  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        style={styles.sessionItem}
        onPress={() => navigation.navigate("sessionDetails", { data: item })}
      >
        <View style={styles.subSessionView}>
          <Text allowFontScaling={false} style={styles.sessionNumber}>
            SESSION {item?.session_number?.toUpperCase()}:
          </Text>
          <Text allowFontScaling={false} style={styles.sessionTitle}>{item?.title}</Text>
        </View>
        <View style={styles.subSessionViewRight}>
          <Text allowFontScaling={false} style={styles.sessionDescription} numberOfLines={3}>
            {item?.description}
          </Text>
        </View>
      </TouchableOpacity>
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Image
          style={styles.topImageStyle}
          source={require("./assets/background.jpg")}
        />
        <Image
          source={require("./assets/SummitGraphic.jpg")}
          style={styles.logoImage}
        />

        <View style={styles.verticleView}>
          <Text allowFontScaling={false} style={styles.verticleText}>Sessions</Text>
        </View>
      </View>

      <Text allowFontScaling={false} style={styles.infoText}>
        Click on a session for more infomation.
      </Text>

      <FlatList
        style={styles.parentView}
        data={entities?.data}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  sessionDescription: {
    color: "#000",
    fontSize: 18,
    marginLeft: 10,
    fontFamily: "Avenir-Regular"
  },
  sessionTitle: {
    color: "#000",
    fontSize: 18,
    fontWeight: "500",
    letterSpacing: 1,
    textAlign: "right"
  },
  sessionNumber: {
    color: "#6C170B",
    fontSize: 18,
    fontWeight: "700",
    letterSpacing: 1,
    textAlign: "right"
  },
  verticleText: {
    transform: [{ rotate: "360deg" }],
    fontSize: 28,
    color: "#fff",
    fontFamily: "GaramondPremrPro-It"
  },
  verticleView: {
    position: "absolute",
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.6)",
    marginTop: 130,
    transform: [{ rotate: "270deg" }],
    paddingVertical: 7,
    paddingHorizontal: 30,
    marginLeft: -24
  },
  logoImage: {
    position: "absolute",
    width: 150,
    height: 100,
    alignSelf: "flex-end",
    opacity: 0.7,
    marginTop: 20,
    right: 10
  },
  subSessionView: {
    width: "50%",
    alignItems: "flex-end"
  },
  subSessionViewRight: {
    width: "50%",
    alignItems: "flex-start"
  },
  sessionItem: {
    flexDirection: "row",
    borderBottomColor: "#f9f9f9",
    borderBottomWidth: 1,
    paddingVertical: 10
  },
  parentView: {
    marginHorizontal: 50,
    marginTop: 20,
    marginBottom: 10
  },
  infoText: {
    alignSelf: "center",
    fontStyle: "italic",
    fontSize: 16,
    marginTop: 15,
    color: "#000"
  },
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  topImageStyle: {
    height: 200,
    width: "70%",
    position: "relative",
    alignSelf: "center",
    marginTop: 40
  }
})

export default Sessions
