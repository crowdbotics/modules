import React, { useEffect, useState, useContext } from "react";
import { OptionsContext, GlobalOptionsContext } from "@options";
import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  useWindowDimensions
} from "react-native";
import HTML from "react-native-render-html";

const TermsAndConditions = ({ navigation }) => {
  const options = useContext(OptionsContext);
  const globalOptions = useContext(GlobalOptionsContext);
  const contentWidth = useWindowDimensions().width;
  const [htmlContent, setHtmlContent] = useState("<h1>Loading...</h1>");

  useEffect(() => {
    // Set your API's URL via Module Options - in options.js
    fetch(globalOptions.url + options.path)
      .then((response) => response.json())
      .then((data) => setHtmlContent(data[0].body))
      .catch((err) => {
        console.log(err);
        return setHtmlContent("<h1>Error Loading Terms and Conditions</h1>");
      });
  });

  return (
    <View style={{ flex: 1 }}>
      <View style={options.styles.heading}>
        <TouchableOpacity
          style={options.styles.touchableopacity}
          onPress={() => {
            navigation.goBack();
          }}
        ></TouchableOpacity>
        <Text style={options.styles.header}>{options.title}</Text>
      </View>
      <ScrollView style={{ flex: 1 }}>
        <HTML source={{ html: htmlContent }} contentWidth={contentWidth} />
      </ScrollView>
    </View>
  );
};

export default {
  title: "Terms and Conditions",
  navigator: TermsAndConditions
};
