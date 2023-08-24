import React, { useEffect, useState } from "react"
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  FlatList,
  Pressable
} from "react-native"
import { eventList } from "../../modules/blackbaud/store"
import { useDispatch, useSelector } from "react-redux"

const EventListing = ({ navigation }) => {
  const dispatch = useDispatch()
  const { entities: events } = useSelector(state => state.Events.eventList)
  const loading = useSelector(state => state.Events.eventList.api.loading)
  const token = useSelector(state => state.Events.accessToken)
  useEffect(() => {
    dispatch(eventList(token))
  }, [])
  const [searchText, setSearchText] = useState("")
  function searchEvents() {
    const filteredObjs = events?.filter(obj => {
      const str = JSON.stringify(obj).toLowerCase()
      return str.includes(searchText.toLowerCase())
    })
    return filteredObjs
  }

  const eventsToMap = searchText ? searchEvents() : events

  const Item = item => {
    return (
      <View style={styles.box}>
        <View style={styles.GcBtZoqe}>
          <Image
            source={require("./assets/blackbaudLogo.png")}
            style={styles.image}
            resizeMode="contain"
          />
          <View style={styles.Txt}>
            <Text style={styles.titleTxt}>{item?.data?.name}</Text>

            <View style={styles.RwhMCuJW}>
              <Text style={styles.addressTxt}>
                {item?.data?.category?.name}
              </Text>
            </View>

            <View style={styles.kccFuoDx}>
              <Image
                source={require("./assets/calendarIcon.png")}
                style={styles.phOEFPES}
              />
              <Text style={styles.dateTxt}>
                {item?.data?.start_date},{item?.data?.start_time}
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.TqLXmWzz}>
          <Pressable
            style={styles.loginButton}
            onPress={() =>
              navigation.navigate("blackbaudEventDetails", {
                id: item?.data?.id
              })
            }
          >
            <Text style={styles.textColor}>View Details</Text>
          </Pressable>
        </View>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Event Listing</Text>
      {loading === "pending" ? (
        <ActivityIndicator
          size={"large"}
          color={"#065171"}
          style={styles.QYGilPoi}
        />
      ) : (
        <TextInput
          placeholder="Search..."
          style={styles.formInput}
          onChangeText={setSearchText}
          placeholderTextColor={"grey"}
        />
      )}

      <FlatList
        data={eventsToMap}
        renderItem={({ item }) => <Item data={item} />}
        keyExtractor={item => item.id}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f8f8f8",
    flex: 1
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#212327",
    marginTop: 20,
    marginLeft: 20
  },
  formInput: {
    backgroundColor: "#d9d5d545",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#D3D3D3",
    marginVertical: 10,
    marginHorizontal: 12,
    color: "#000"
  },
  backIconStyles: {
    height: 20,
    width: 11
  },
  backButtonTouch: {
    marginLeft: 20,
    marginVertical: 20,
    width: 20
  },
  box: {
    height: 200,
    width: "93%",
    backgroundColor: "white",
    alignSelf: "center",
    marginVertical: 8,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4
  },
  image: {
    height: 60,
    marginVertical: 20,
    marginHorizontal: 20,
    flex: 1
  },
  Txt: {
    flex: 3,
    marginVertical: 20,
    marginHorizontal: 0
  },
  titleTxt: {
    fontSize: 14
  },
  addressTxt: {
    fontSize: 14
  },
  dateTxt: {
    fontSize: 14
  },
  buttonBackground: {
    marginTop: 20,
    width: "80%",
    height: 54,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    borderWidth: 1.2,
    alignSelf: "center",
    borderColor: "#aeafb1"
  },
  buttonText: {
    fontSize: 18,
    color: "#212327",
    fontWeight: "500"
  },
  kccFuoDx: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 7
  },
  phOEFPES: {
    height: 15,
    width: 14,
    marginRight: 10
  },
  ZysPvVGe: {
    marginTop: 10
  },
  QYGilPoi: {
    alignSelf: "center"
  },
  GcBtZoqe: {
    flexDirection: "row"
  },
  RwhMCuJW: {
    flexDirection: "row",
    alignItems: "center"
  },
  vIHnOqvq: {
    width: 100,
    height: 50,
    lineHeight: 14,
    fontSize: 14,
    borderRadius: 0
  },
  TqLXmWzz: {
    marginTop: 20
  },
  loginButton: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    alignSelf: "center",
    marginBottom: 25,
    paddingHorizontal: 12,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#aeafb1",
    width: "80%",
    height: 50
  },
  textColor: {
    fontWeight: "500",
    color: "#212327",
    fontSize: 16
  }
})
export default EventListing
