import React, { useEffect, useState } from 'react';
import { Text, View, ScrollView, TouchableOpacity, useWindowDimensions } from 'react-native';
import { styles } from './styles';
import HTML from "react-native-render-html";


const PrivacyPolicy = ({ navigation }) => {

  const contentWidth = useWindowDimensions().width;
  const [htmlContent, setHtmlContent] = useState('<h3> Loading Privacy Policy... </h3>');
  
  useEffect(() => {
    //change the root url below to your project's url. 
    fetch('https://privacy-mod-test-1-26188.botics.co/modules/privacy-policy/')
      .then(response => response.json())
      .then(data => setHtmlContent(data[0]['body']))
      .catch(err => {
        setHtmlContent('<h3> Privacy Policy could not be loaded at this time.</h3>');
        alert("Privacy Policy could not be loaded at this time.");
       })
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
        <Text style={styles.header}>Privacy Policy</Text>
      </View>
      <ScrollView style={{ flex: 1 }}>
        <HTML source={{ html: htmlContent }} contentWidth={contentWidth} style={styles.heading}/>
      </ScrollView>
    </View>
  );
};

export default {
  title: "Privacy Policy",
  navigator: PrivacyPolicy
}
