import React, { Fragment, useEffect } from "react"
import {
  View,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  FlatList
} from "react-native"

import { useDispatch, useSelector } from "react-redux"
import { getActivities } from "../../store/custom/activity.slice"

const Activities = ({ navigation }) => {
  const dispatch = useDispatch()
  const { entities } = useSelector(state => state.Activity.getActivities)

  const fetchData = async () => {
    await dispatch(getActivities())
  }

  useEffect(() => {
    fetchData()
  }, [])

  const renderItem = ({ item, index }) => {
    return (
      <Fragment>
        <TouchableOpacity
          onPress={() => navigation.navigate("activityDetails", { data: item })}
          style={{ position: "relative" }}
        >
          <Image source={{ uri: item?.image }} style={styles.imageStyles} />
          <View
            style={[
              styles.activityNameView,
              {
                alignSelf: index % 2 == 0 ? "flex-start" : "flex-end"
              }
            ]}
          >
            <Text allowFontScaling={false} style={styles.activityName}>{item?.title}</Text>
          </View>
        </TouchableOpacity>
      </Fragment>
    )
  }
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Image
          style={styles.topImageStyle}
          source={require("./assets/cycle.jpg")}
        />
        <Image
          source={require("./assets/SummitGraphic.jpg")}
          style={styles.logoImage}
        />

        <View style={styles.verticalView}>
          <Text allowFontScaling={false} style={styles.verticleText}>Activities</Text>
        </View>
      </View>

      <FlatList
        renderItem={renderItem}
        data={entities?.data}
        showsVerticalScrollIndicator={false}
        style={styles.parentView}
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  activityName: {
    fontSize: 24,
    color: "#fff",
    fontFamily: "GaramondPremrPro-It",
    zIndex: 112,
    paddingRight: 10
  },
  activityNameView: {
    backgroundColor: "rgba(0,0,0,0.4)",
    top: 35,
    paddingVertical: 9,
    position: "absolute",
    paddingHorizontal: 45,
    zIndex: 111
  },
  imageStyles: {
    height: 200,
    width: 200,
    alignSelf: "center",
    marginVertical: 10,
    backgroundColor: "#d3d3d3"
  },
  verticleText: {
    transform: [{ rotate: "360deg" }],
    fontSize: 28,
    color: "#fff",
    fontFamily: "GaramondPremrPro-It"
  },
  logoImage: {
    position: "absolute",
    width: 150,
    height: 100,
    alignSelf: "flex-end",
    opacity: 0.7,
    marginTop: 20,
    right: 20
  },
  verticalView: {
    position: "absolute",
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.6)",
    marginTop: 225,
    transform: [{ rotate: "270deg" }],
    paddingVertical: 7,
    paddingHorizontal: 25,
    marginLeft: -54
  },
  subSessionView: {
    width: "50%",
    alignItems: "flex-end"
  },
  sessionItem: {
    flexDirection: "row",
    height: 100
  },
  parentView: {
    marginHorizontal: 50,
    marginTop: 20
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
    height: 250,
    width: "80%",
    alignSelf: "center",
    position: "relative",
    marginTop: 40
  }
})

export default Activities
