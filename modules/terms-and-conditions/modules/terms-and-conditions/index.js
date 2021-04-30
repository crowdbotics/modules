import React, { useEffect, useState } from 'react';
import { Text, View, ScrollView, TouchableOpacity, useWindowDimensions } from 'react-native';
import { styles } from './styles';
import HTML from "react-native-render-html";


const TermsAndConditions = ({ navigation }) => {

  const contentWidth = useWindowDimensions().width;
  const [htmlContent, setHtmlContent] = useState('<h1> No Terms and Conditions Loaded </h1>');
  
  useEffect(() => {
    //change the root url below to your project's url. 
    fetch('https://<APP_URL_HERE>.botics.co/modules/terms/termsandconditions/')
      .then(response => response.json())
      .then(data => setHtmlContent(data[0]['body']))
      .catch(err => alert("Terms and Conditions could not be loaded at this time."));
  });


  return (
    <View
      style={{
        flex: 1,
      }}>
      <View style={styles.heading}>
        <TouchableOpacity
          style={ styles.touchableopacity}
          onPress={() => {
            navigation.goBack();
          }}>
        </TouchableOpacity>
        <Text style={styles.header}>TERMS AND CONDITIONS</Text>
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
}
