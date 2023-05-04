import { OptionsContext } from "@options";
import React, { Fragment, useContext, useEffect, useState } from "react";
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  View
} from "react-native";
import { authorize } from "react-native-app-auth";
import { getListing } from "./api";

const BlackbaudSky = () => {
  const options = useContext(OptionsContext);
  const { localOptions } = options;
  const [listing, setListing] = useState(false);
  const [requesting, setRequesting] = useState(false);

  useEffect(() => {
    try {
      setRequesting(true);
      authorize(localOptions.config).then(response => {
        getListing(response?.accessToken)
          .then((response) => {
            setListing(response?.data?.value);
            setRequesting(false);
          })
          .catch((error) => {
            console.log(error.response);
            setRequesting(false);
          });
      }).catch(err => console.log("err", err));
    } catch (error) {
      console.log("error", error);
    }
  }, []);

  return (
    <View>
      <ScrollView style={{ marginTop: 10 }}>
        {requesting
          ? <ActivityIndicator
          size={"large"}
          color={"#065171"}
          style={{ alignSelf: "center" }}
        />
          : <Fragment>
            {listing &&
              listing.map((item, index) => (
                <View style={styles.listingComponent} key={index}>
                  <Text style={{ color: "#fff" }}>Name: {item.name}</Text>
                  <Text style={{ color: "#fff" }}>
                    Start date: {item.start_date}
                  </Text>
                  <Text style={{ color: "#fff" }}>
                    End date: {item.end_date}
                  </Text>
                </View>
              ))}
          </Fragment>
        }

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
  }
});

export default {
  title: "BlackbaudSky",
  navigator: BlackbaudSky
};
