import React, { useEffect, useState, useContext } from "react";
import { View, StyleSheet, Image } from "react-native";
import { storage } from "@modules/storage";
import { useDispatch } from "react-redux";
import { setToken, profileRequest } from "../../api/redux";
import { OptionsContext, GlobalOptionsContext } from "@options";
const NEXT_SCREEN_NAME_GUEST = "";
const NEXT_SCREEN_NAME_LOGGED = "";
const NEXT_COMPLETE_PROFILE_SCREEN = "";

export const Splash = ({ navigation }) => {
  // Consume module's own options in this component
  const options = useContext(OptionsContext);

  const [nextScreenAnonymous, setNextScreenAnonymous] = useState(NEXT_SCREEN_NAME_GUEST);
  const [nextScreenLoggedIn, setNextScreenLoggedIn] = useState(NEXT_SCREEN_NAME_LOGGED);
  const [nextCompleteProfileScreen, setNextCompleteProfileScreen] = useState(NEXT_COMPLETE_PROFILE_SCREEN);

  const dispatch = useDispatch();
  useEffect(() => {
    setNextScreenAnonymous(options.nextScreenAnonymous);
    setNextScreenLoggedIn(options.nextScreenLoggedIn);
    setNextCompleteProfileScreen(options.nextCompleteProfileScreen);

    dispatch(profileRequest()).then(
      (res) => {
        setUser(res.payload);
        storage.getToken().then(token => {
          if (token) {
            dispatch(setToken(token));
            // if the profile is not set, go to profile setup
            const profileInfo = res?.payload?.profile_info;
            if (profileInfo === undefined) {
              navigation.replace(nextCompleteProfileScreen);
            } else {
              navigation.replace(nextScreenLoggedIn);
            }
          } else {
            navigation.replace(nextScreenAnonymous);
          }
        }
        );
      }
    );
  }, [nextCompleteProfileScreen]);

  return (
    <View style={styles.container}>
      <Image
        resizeMode="cover"
        style={styles.image}
        source={{
          uri:
            "https://crowdbotics-slack-dev.s3.amazonaws.com/media/resources/project/20577/3d82cb85-9133-48e4-bb4a-a1c8dd140bc4.png"
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF"
  },
  image: { width: "100%", height: "100%" }
});
