import React, { useEffect } from "react"
import {
  View,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  ImageBackground
} from "react-native"
import { useDispatch, useSelector } from "react-redux"
import { ScrollView } from "react-native-gesture-handler"
import { getOfferings } from "../../store/custom/offering.slice"

const Offerings = ({ navigation }) => {
  navigation.setOptions({
    title: "Offerings",
    headerShown: true
   })
  const buttonNames = ["DISCOVERY", "PROGRAMS", "TRANSFORMATIONS", "M&A"]
  const { entities } = useSelector(state => state.Offering.getOfferings)
  const dispatch = useDispatch()

  const fetchData = async () => {
    await dispatch(getOfferings())
  }

  useEffect(() => {
    fetchData()
  }, [])
  useEffect(() => {
    console.log(entities)
  }, [entities]) 
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.parentView}>
      <Image
          source={require("./assets/offerings.png")}
          style={styles.logoImage}
          resizeMode="contain"
        />
          <View style={styles.buttonsParentView}>
            {entities?.data?.map(item => (
              <TouchableOpacity
                style={styles.itemView}
                onPress={() => navigation.navigate("offeringDetails", { data: item })}
              >
                <Text allowFontScaling={false} style={styles.buttonTitle}>{item?.title}</Text>
              </TouchableOpacity>
            ))}
          </View>
        
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  logoImage: { height: 250, width: 250, alignSelf: "center" },
  buttonTitle: { fontSize: 16, color: "#FFF", fontWeight: "700" },
  parentView: { flex: 1, paddingTop: 12, marginHorizontal: 10 },
  buttonsParentView: { marginTop: 30, alignItems: "center" },
  itemView: {
    backgroundColor: "black",
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
    height: "90%",
    position: "relative",
    marginTop: 30,
    width: "90%",
    marginLeft: 30
  },
  container: {
    backgroundColor: "#FFF",
    flex: 1,
    justifyContent: "center"
  }
})

export default Offerings
