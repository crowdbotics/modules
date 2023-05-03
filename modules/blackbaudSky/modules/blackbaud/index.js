import React, { useState, useContext } from "react";
import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet
} from "react-native";
import { OptionsContext } from "@options";
import { WebView } from "react-native-webview";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";
import { getListing, sendCode } from "./api";

const BlackbaudSky = () => {
  const options = useContext(OptionsContext);
  const { localOptions } = options;

  const [code, setCode] = useState(false);
  const [login, setLogin] = useState(false);
  const [listing, setListing] = useState(false);
  const [requesting, setRequesting] = useState(false);

  const checkUrl = (url) => {
    if (!url.includes("client_id")) {
      if (url.includes("state")) {
        // console.log("URLLL FROM STATE", url?.split("state=")[0]);
      } else {
        setCode(url?.split("code=")[1]);
        setRequesting(true);
        sendCode(url?.split("code=")[1])
          .then((response) => {
            getListing(response?.data?.access_token)
              .then((response) => {
                setListing(response?.data?.value);
                setRequesting(false);
              })
              .catch((error) => {
                console.log(error.response);
                setRequesting(false);
              });
          })
          .catch((error) => {
            setRequesting(false);
            console.log(error.response);
          });
      }
    }
  };

  return (
    <View>
      <ScrollView>
        {login ? (
          !code ? (
            <WebView
              source={{
                uri: `https://app.blackbaud.com/oauth/authorize?client_id=${localOptions.client_id}&response_type=code&redirect_uri=${localOptions.redirectUrl}`
              }}
              style={{ height: hp("90%"), width: wp("100%") }}
              onNavigationStateChange={(val) => checkUrl(val?.url)}
            />
          ) : requesting ? (
            <>
              <View style={{ height: hp("45%"), justifyContent: "flex-end" }}>
                <ActivityIndicator
                  size={"large"}
                  color={"#065171"}
                  style={{ alignSelf: "center" }}
                />
              </View>
            </>
          ) : (
            <>
              <ScrollView style={{ marginTop: 10 }}>
                {listing &&
                  listing.map((item) => (
                    <View style={styles.listingComponent}>
                      <Text style={{ color: "#fff" }}>Name: {item.name}</Text>
                      <Text style={{ color: "#fff" }}>
                        Start date: {item.start_date}
                      </Text>
                      <Text style={{ color: "#fff" }}>
                        End date: {item.end_date}
                      </Text>
                    </View>
                  ))}
              </ScrollView>
            </>
          )
        ) : (
          <View style={{ height: hp("45%"), justifyContent: "flex-end" }}>
            <TouchableOpacity onPress={() => setLogin(true)}>
              <View style={styles.loginButton}>
                <Text style={{ color: "#fff" }}>Log In</Text>
              </View>
            </TouchableOpacity>
          </View>
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
  }
});

export default {
  title: "BlackbaudSky",
  navigator: BlackbaudSky
};
