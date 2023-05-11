import { OptionsContext } from "@options";
import React, { Fragment, useContext, useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity
} from "react-native";
import { authorize } from "react-native-app-auth";
import { eventList, slice } from "../../store";
import { useDispatch, useSelector } from "react-redux";
import calendarIcon from "../../assets/calendarIcon.png";
import logo from "../../assets/blackbaudLogo.png";
import backIcon from "../../assets/backIcon.png";

const EventListing = ({ navigation }) => {
  const options = useContext(OptionsContext);
  const { config } = options;
  const dispatch = useDispatch();

  const events = useSelector((state) => state.Events.events);
  const loading = useSelector((state) => state.Events.api.loading);

  const [browserRequesting, setBrowserRequesting] = useState(false);

  useEffect(() => {
    setBrowserRequesting(true);
    try {
      authorize(config)
        .then((response) => {
          dispatch(eventList(response?.accessToken));
          dispatch(slice.actions.saveAccessToken(response?.accessToken));
          setBrowserRequesting(false);
        })
        .catch((err) => {
          Alert.alert("Error", err.message);
          navigation.goBack();
          setBrowserRequesting(false);
        });
    } catch (error) {
      Alert.alert("Error", error.message);
      navigation.goBack();
      setBrowserRequesting(false);
    }
  }, []);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.backButtonTouch}
        onPress={() => navigation.goBack()}
      >
        <Image source={backIcon} style={styles.backIconStyles} />
      </TouchableOpacity>
      <ScrollView style={{ marginTop: 10 }}>
        {loading === "pending" || browserRequesting
          ? (
          <ActivityIndicator
            size={"large"}
            color={"#065171"}
            style={{ alignSelf: "center" }}
          />
            )
          : (
          <Fragment>
            {events?.length !== 0 &&
              events.map((item, index) => (
                <View style={styles.box} key={index}>
                  <View style={{ flexDirection: "row" }}>
                    <Image source={logo} style={styles.image} />
                    <View style={styles.Txt}>
                      <Text style={styles.titleTxt}>{item?.name}</Text>

                      <View
                        style={{ flexDirection: "row", alignItems: "center" }}
                      >
                        {/* <Image
                          source={locationIcon}
                          style={{
                            height: 18,
                            width: 14,
                            marginRight: 10
                          }}
                        /> */}
                        <Text style={styles.addressTxt}>
                          {item?.category?.name}
                        </Text>
                      </View>

                      <View
                        style={{
                          flexDirection: "row",
                          alignItems: "center",
                          marginTop: 7
                        }}
                      >
                        <Image
                          source={calendarIcon}
                          style={{ height: 15, width: 14, marginRight: 10 }}
                        />
                        <Text style={styles.dateTxt}>
                          {item?.start_date},{item?.start_time}
                        </Text>
                      </View>
                    </View>

                    {/* <Text style={styles.priceTxt}>$240</Text> */}
                  </View>
                  <TouchableOpacity
                    style={styles.buttonBackground}
                    onPress={() =>
                      navigation.navigate("EventDetails", { id: item.id })
                    }
                  >
                    <Text style={styles.buttonText}>View Details</Text>
                  </TouchableOpacity>
                </View>
              ))}
          </Fragment>
            )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  textColor: {
    color: "#fff"
  },
  container: {
    backgroundColor: "#f8f8f8",
    flex: 1
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
    marginVertical: 20,
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
    width: "40%",
    height: "67%",
    marginHorizontal: 20,
    marginVertical: 20,
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
  priceTxt: {
    flex: 1,
    marginVertical: 20,
    marginHorizontal: 0,
    fontSize: 20,
    fontWeight: "bold"
  },
  buttonBackground: {
    marginTop: 20,
    width: "80%",
    height: 54,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    borderWidth: 1.2,
    alignSelf: "center",
    borderColor: "black"
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "bold"
  }
});

export default EventListing;
