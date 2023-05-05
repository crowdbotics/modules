import { OptionsContext } from "@options";
import React, { Fragment, useContext, useEffect } from "react";
import {
  ActivityIndicator,
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  View
} from "react-native";
import { authorize } from "react-native-app-auth";
import { slice, eventList } from "./store";
import { useDispatch, useSelector } from "react-redux";

const BlackbaudSky = () => {
  const options = useContext(OptionsContext);
  const { config } = options;
  const dispatch = useDispatch();

  const events = useSelector((state) => state.Events.events);
  const loading = useSelector((state) => state.Events.api.loading);

  useEffect(() => {
    try {
      authorize(config)
        .then((response) => {
          dispatch(eventList(response?.accessToken));
        })
        .catch((err) => Alert.alert("Error", err));
    } catch (error) {
      Alert.alert("Error", error);
    }
  }, []);

  return (
    <View>
      <ScrollView style={{ marginTop: 10 }}>
        {loading === "pending"
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
                <View style={styles.listingComponent} key={index}>
                  <Text style={styles.textColor}>Name: {item.name}</Text>
                  <Text style={styles.textColor}>
                    Start date: {item.start_date}
                  </Text>
                  <Text style={styles.textColor}>
                    End date: {item.end_date}
                  </Text>
                </View>
              ))}
          </Fragment>
            )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  loginButton: {
    backgroundColor: "#065171",
    width: 80,
    justifyContent: "center",
    alignItems: "center",
    height: 30,
    borderRadius: 3,
    alignSelf: "center"
  },
  listingComponent: {
    backgroundColor: "#065171",
    marginHorizontal: 10,
    borderRadius: 10,
    justifyContent: "center",
    paddingLeft: 10,
    paddingVertical: 10,
    marginVertical: 5
  },
  textColor: {
    color: "#fff"
  }
});

export default {
  title: "BlackbaudSky",
  navigator: BlackbaudSky,
  slice
};
