// import Icon from 'react-native-vector-icons/FontAwesome';
import React, { useEffect, useState } from 'react';
import { Text, View, ScrollView, TouchableOpacity, useWindowDimensions } from 'react-native';
import { styles } from './styles';
import HTML from "react-native-render-html";


const TermsAndConditions = ({ navigation }) => {
  const contentWidth = useWindowDimensions().width;

  const [htmlContent, setHtmlContent] = useState('<h1> No Terms and Conditions Loaded </h1>');
  
  useEffect(() => {
    
    //change the root url below to your projects url. 
    fetch('https://<APP_URL_HERE>.botics.co/modules/terms/termsandconditions/')
      .then(response => response.json())
      // .then(data => console.log(data[0]['body']))
      .then(data => setHtmlContent(data[0]['body']))
      .catch(err => alert(err));

  });


  return (
    <View
      style={{
        flex: 1,
      }}>
      <View style={styles.heading}>
        <TouchableOpacity
          style={{ padding: 5 }}
          onPress={() => {
            navigation.goBack();
          }}>
        </TouchableOpacity>
        <Text style={styles.header}>TERMS AND CONDITIONS</Text>
          <View></View>
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
