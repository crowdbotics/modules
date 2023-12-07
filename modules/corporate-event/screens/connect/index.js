import React, { useEffect, useState } from "react"
import {
  View,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  FlatList,
  TouchableOpacity
} from "react-native"

import { useDispatch, useSelector } from "react-redux"
import { getConnects } from "../../store/custom/connect.slice"

const Connect = ({ navigation }) => {
  const { entities } = useSelector(state => state.Connect.getConnects)
  const [filteredDataSource, setFilteredDataSource] = useState([])
  const dispatch = useDispatch()

  const fetchData = async () => {
    await dispatch(getConnects())
  }

  useEffect(() => {
    fetchData()
  }, [])

  useEffect(() => {
    setFilteredDataSource(entities?.data)
  }, [entities])

  
  // local search
  const searchFilterFunction = text => {
    const newData = entities?.data?.filter(item => {
      const itemData = `${item?.user?.name?.toUpperCase()}
      ${item?.designation?.toUpperCase()} ${item?.company?.toUpperCase()}`
      const textData = text.toUpperCase()
      return itemData.indexOf(textData) > -1
    })
    setFilteredDataSource(newData)
  }


  const renderItem = ({ item }) => {
    const name = item?.user?.name && item?.user?.name?.split(" ")
    return (
      <TouchableOpacity
        style={styles.itemView}
        onPress={() => navigation.navigate("connectDetails", { data: item })}
      >
        <Image
          style={styles.userImage}
          source={{ uri: item?.image }}
          resizeMode="cover"
        />

        <View style={styles.userTextContainer}>
          <Text allowFontScaling={false} style={styles.userName} numberOfLines={2}>
            {name && name[0].toString()} {"\n"}
            {name?.length > 0 && name[1]}
          </Text>

          <Text allowFontScaling={false} style={styles.designationText} numberOfLines={3}>
            {item?.designation}, {item?.company}
          </Text>
        </View>
      </TouchableOpacity>
    )
  }
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.firstView}>
        <Image
          style={styles.topImageStyle}
          source={require("./assets/background.png")}
        />
        <Image
          source={require("./assets/SummitGraphic.jpg")}
          style={styles.logoImage}
        />

        <View style={styles.connectView}>
          <Text allowFontScaling={false} style={styles.connectText}>Connect</Text>
        </View>
      </View>

      <FlatList
        data={filteredDataSource}
        renderItem={renderItem}
        numColumns={2}
        style={styles.flatlistStyle}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  userTextContainer: { width: "50%" },
  firstView: { marginTop: 10, marginRight: 10 },
  flatlistStyle: { marginHorizontal: 8, marginTop: 20 },
  designationText: {
    color: "#000",
    fontSize: 12,
    fontWeight: "400",
    marginLeft: 5,
    fontFamily: "Avenir-Regular"
  },
  itemView: {  
    flexDirection: "row", 
    marginVertical: 5,
    maxWidth: "50%",
  },
  userImage: { width: 80, height: 100, backgroundColor: "#d3d3d3" },
  userName: {
    color: "#6C170B",
    fontSize: 16,
    fontWeight: "500",
    marginHorizontal: 5,
    marginTop: 10
  },
  connectView: {
    backgroundColor: "rgba(0,0,0,0.6)",
    position: "absolute",
    alignSelf: "flex-end",
    marginTop: 230,
    marginLeft: -20
  },
  connectText: {
    fontSize: 28,
    fontWeight: "500",
    color: "#fff",
    paddingVertical: 5,
    paddingHorizontal: 30,
    fontFamily: "GaramondPremrPro-It"
  },
  sessionTitle: {
    color: "#6C170B",
    fontSize: 26,
    fontWeight: "700",
    alignSelf: "center",
    textAlign: "center"
  },
  verticleTitle: { color: "#6C170B", fontSize: 18, fontWeight: "700" },
  verticleTitleView: {
    flexDirection: "column",
    transform: [{ rotate: "270deg" }],
    marginTop: 150,
    marginLeft: -90,
    padding: 10,
    width: 220
  },
  verticalText: {
    transform: [{ rotate: "180deg" }],
    fontSize: 22,
    color: "#fff",
    fontStyle: "italic"
  },
  logoImage: {
    position: "absolute",
    width: 150,
    height: 100,
    alignSelf: "flex-start",
    opacity: 0.7,
    marginTop: 20
  },
  verticalView: {
    flexDirection: "column",
    backgroundColor: "rgba(0,0,0,0.6)",
    marginTop: 50,
    marginLeft: -60,
    width: 150,
    transform: [{ rotate: "90deg" }],
    paddingVertical: 7,
    paddingHorizontal: 30
  },
  scrollView: {
    flex: 1
  },
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  topImageStyle: {
    height: 200,
    width: "60%",
    position: "relative",
    alignSelf: "center",
    marginTop: 70
  }
})

export default Connect
