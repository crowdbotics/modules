import React, { useEffect, useState} from "react"
import {
  View,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  Pressable,
} from "react-native"

import { useDispatch, useSelector } from "react-redux"
import { getHomeDetails } from "../../store/custom/home.slice"
import moment from "moment"
import { useIsFocused } from "@react-navigation/native"
import { ScrollView } from "react-native-gesture-handler"

const Home = ({navigation}) => {
  const { entities } = useSelector(state => state.Home.getHomeDetails)
  const [loading, setLoading] = useState(false)
  const isFocused = useIsFocused()
  const dispatch = useDispatch()

  const fetchData = async () => {
    await dispatch(getHomeDetails())
  }
  useEffect(() => {
    if (isFocused) {
      fetchData()
    }
  }, [isFocused])

  const renderItem = ({ item }) => {
    return (
      <View style={{
        marginBottom: 12, borderBottomWidth:1, borderBottomColor: "#f9f9f9", paddingBottom: 10
      }}>
        <Text allowFontScaling={false} style={styles.dateText}>
          {moment(item.date).format("dddd MMM DD").toUpperCase()}
        </Text>
        <FlatList data={item?.session_data} renderItem={renderSubItem} />
      </View>
    )
  }

  const renderSubItem = ({ item }) => {
    return (
      <Pressable style={styles.eventNameViews} onPress={()=>{
        if(item?.type === "session"){
          navigation.navigate("sessionDetails", {data: item})
        }else {
          navigation.navigate("activityDetails", {data: item})
        }
      }}>
        <Text allowFontScaling={false} style={styles.eventTime}>
          {moment(item?.start_time, "HH:mm A").format("LT")}
        </Text>
        <Text allowFontScaling={false} style={styles.eventName}>{item?.title}</Text>
      </Pressable>
    )
  }
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
      <Image
        source={require("./assets/background.png")}
        resizeMode="stretch"
        style={styles.topImageStyle}
      />

      <View style={styles.introView}>
        <Text allowFontScaling={false} style={styles.introHeading}>Welcome {entities?.user},</Text>
        {/* <Text allowFontScaling={false} style={styles.introDescription}>
          We look forward to a full weekend ahead,
        </Text> */}
        <Text allowFontScaling={false} style={styles.includesText}>
          Your current itinerary includes:
        </Text>
      </View>
      <View>
      <FlatList
        data={entities?.data}
        renderItem={renderItem}
        style={styles.eventList}
        showsVerticalScrollIndicator={false}
      /></View>
      {/* Button for Conceirge */}
      <TouchableOpacity
          style={styles.connectButton}
          onPress={() => navigation.navigate("concierge")}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator size={"small"} color={"#fff"} />
          ) : (
            <Text allowFontScaling={false} style={styles.buttonTitle}>Concierge</Text>
          )}
        </TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  dateText: {
    color: "#6C170B",
    fontWeight: "bold",
    fontSize: 19,
    fontFamily: "Avenir-Heavy"
  },
  eventName: {
    color: "#000",
    marginLeft: 7,
    fontSize: 16,
    fontFamily: "Novecento-WideNormal",
    width: "80%"
  },
  eventTime: {
    color: "#000",
    fontWeight: "bold",
    fontSize: 16,
    fontFamily: "Avenir-Heavy",
    width: 45,
    textAlign: "right"
  },
  eventNameViews: {
    flexDirection: "row",
    marginLeft: 30,
    marginTop: 8,
  },
  eventList: {
    marginHorizontal: 40,
    marginTop: 15
  },
  topImageStyle: {
    height: 280,
    width: "100%"
  },
  includesText: {
    color: "#000",
    fontFamily: "Avenir-Regular",
    marginTop: 8,
  },
  container: {
    backgroundColor: "#FFF",
    flex: 1
  },
  introDescription: {
    color: "#000",
    fontSize: 16,
    fontWeight: "normal",
    fontFamily: "Avenir-Regular"
  },
  introView: {
    marginHorizontal: 38,
    marginTop: 25
  },
  introHeading: {
    fontWeight: "500",
    color: "#000",
    fontSize: 18
  },
  buttonTitle: {
    color: "#fff", 
    fontSize: 16, 
    fontWeight: "700" 
  },
  connectButton: {
    backgroundColor: "#000",
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 30,
    borderRadius: 10,
    marginHorizontal: 20,
    marginBottom: 20
  }
})

export default Home
