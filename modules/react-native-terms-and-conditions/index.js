import React, { useEffect, useState, useContext } from "react";
import { OptionsContext } from "@options";
import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  useWindowDimensions
} from "react-native";
import { unwrapResult } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { fetchTerms, slice } from "./store";
import HTML from "react-native-render-html";

const TermsAndConditions = ({
  navigation,
  headingContainerStyle = {},
  contentContainerStyle = {},
  headingTextStyle = {}
}) => {
  const options = useContext(OptionsContext);
  const contentWidth = useWindowDimensions().width;
  const [htmlContent, setHtmlContent] = useState("<h1>Loading...</h1>");
  const dispatch = useDispatch();

  useEffect(async () => {
    await dispatch(fetchTerms())
      .then(unwrapResult)
      .then((res) => {
        setHtmlContent(res[0]?.body);
      })
      .catch((err) => {
        console.log(err);
        return setHtmlContent("<h1>Error Loading Terms and Conditions</h1>");
      });
  });

  return (
    <View style={{ flex: 1 }}>
      <View style={[options.styles.heading, headingContainerStyle]}>
        <TouchableOpacity
          style={options.styles.touchableopacity}
          onPress={() => {
            navigation.goBack();
          }}
        ></TouchableOpacity>
        <Text style={[options.styles.header, headingTextStyle]}>
          {options.title}
        </Text>
      </View>
      <ScrollView style={[{ flex: 1 }, contentContainerStyle]}>
        <HTML source={{ html: htmlContent }} contentWidth={contentWidth} />
      </ScrollView>
    </View>
  );
};

export default {
  title: "Terms and Conditions",
  navigator: TermsAndConditions,
  slice
};
