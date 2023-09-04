import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  useWindowDimensions
} from "react-native";
import { styles } from "./styles";
import HTML from "react-native-render-html";
import { unwrapResult } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { fetchPrivacy, slice } from "./store";

const PrivacyPolicy = ({ navigation, headingContainerStyle = {}, headingTextStyle = {}, contentContainerStyle = {} }) => {
  const contentWidth = useWindowDimensions().width;
  const [htmlContent, setHtmlContent] = useState(
    "<h3> Loading Privacy Policy... </h3>"
  );
  const dispatch = useDispatch();

  useEffect(async () => {
    await dispatch(fetchPrivacy())
      .then(unwrapResult)
      .then((res) => {
        setHtmlContent(res[0]?.body);
      })
      .catch((err) => {
        console.log(err);
        setHtmlContent(
          "<h3> Privacy Policy could not be loaded at this time.</h3>"
        );
        alert("Privacy Policy could not be loaded at this time.");
      });
  });

  return (
    <View
      style={{
        flex: 1
      }}
    >
      <View style={[styles.heading, headingContainerStyle]}>
        <TouchableOpacity
          style={styles.touchableopacity}
          onPress={() => {
            navigation.goBack();
          }}
        ></TouchableOpacity>
        <Text style={[styles.header, headingTextStyle]}>Privacy Policy</Text>
      </View>
      <ScrollView style={styles.privacyContainer}>
        <HTML
          source={{ html: htmlContent }}
          contentWidth={contentWidth}
          style={[styles.heading, contentContainerStyle]}
        />
      </ScrollView>
    </View>
  );
};

export default {
  title: "Privacy Policy",
  navigator: PrivacyPolicy,
  slice
};
