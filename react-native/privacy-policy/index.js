import Icon from 'react-native-vector-icons/FontAwesome5';
import React from 'react';
import {
  View,
  Image,
  Text,
  ImageBackground,
  TouchableOpacity
} from 'react-native';
import ParallaxScrollView from 'react-native-parallax-scroll-view';
import { styles } from './styles';
import { Linking } from 'react-native';

export default class App extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      privacyText: "PRIVACY POLICY - SAMPLE\nLast updated November 30, 2020\n\n\nThank you for choosing to be" +
        " part of our community at Crowdbotics (“Company”, “we”, “us”" +
        ", or “our”). We are committed to protecting your personal information and your r" +
        "ight to privacy. If you have any questions or concerns about our policy, or our " +
        "practices with regards to your personal information, please contact us at info" +
        "@crowdbotics.com.\n\n\nWhen you visit our mobile application, and use our ser" +
        "vices, you trust us with your personal information. We take your privacy very se" +
        "riously. In this privacy policy, we seek to explain to you in the clearest way p" +
        "ossible what information we collect, how we use it and what rights you have in r" +
        "elation to it. We hope you take some time to read through it carefully, as it is" +
        " important. If there are any terms in this privacy policy that you do not agree " +
        "with, please discontinue use of our Apps and our services.\n\nThis privacy polic" +
        "y applies to all information collected through our mobile application, (“Apps”)," +
        " and/or any related services, sales, marketing or events (we refer to them colle" +
        "ctively in this privacy policy as the “Services”).\n\nPlease read this privacy p" +
        "olicy carefully as it will help you make informed decisions about sharing your p" +
        "ersonal information with us."
    }
  }

  background() {
    return (
      <ImageBackground
        style={{
          height: 250,
          width: '100%'
        }}
        resizeMode={"cover"}
        source={{ uri: "https://d3tklmlrp1a8c2.cloudfront.net/media/project_component_resources/rectangle_QyfDF1b.png" }}></ImageBackground>
    )
  }

  render() {
    return (
      <ParallaxScrollView
        ref='_scrollView'
        contentBackgroundColor={"#F3F3F3"}
        renderBackground={() => (
          <View
            key="background"
            style={{
              paddingBottom: 30,
              height: 257,
              justifyContent: 'flex-end',
              alignItems: 'center'
            }}>
            <Image
              resizeMode={'contain'}
              style={{
                height: 115,
                width: 125
              }}
              source={{ uri: "https://d3tklmlrp1a8c2.cloudfront.net/media/project_component_resources/cb-icon.png" }} />
          </View>
        )}
        renderForeground={() => (
          <ImageBackground
            source={{ uri: "https://d3tklmlrp1a8c2.cloudfront.net/media/project_component_resources/halfbg.png" }}
            resizeMode={"contain"}
            style={styles.header}>
            <TouchableOpacity
              onPress={() => { this.props.navigation.navigate('Articles5195461') }}>
              <Icon
                style={{
                  width: 18,
                  height: 16
                }}
                name={'arrow-left'}
                size={18}
                color="#fff" />
              {/* <Text>hkjhaskhakjhsakjs</Text> */}
            </TouchableOpacity>
            <Text
              style={{
                fontSize: 27,
                color: '#fff',
                fontFamily: "Avenir-Medium"
              }}>Privacy Policy</Text>
            <View
              style={{
                width: 18,
                height: 16
              }}></View>
          </ImageBackground>
        )}
        parallaxHeaderHeight={257}>
        <View style={styles.parallaxHeader}>
          <View
            style={{
              paddingHorizontal: 16
            }}>
            <Text style={{ fontFamily: "Avenir-Medium", fontSize: 16, textAlign: 'center', color: '#8D8D8D' }}>{this.state.privacyText}</Text>
          </View>

          <View
            style={{
              paddingHorizontal: 16,
              alignItems: 'center',
              paddingBottom: 50,
              paddingTop: 60
            }}>

            <TouchableOpacity
              onPress={() => Linking.openURL('https://www.crowdbotics.com/privacy-policy')}
              style={{
                borderRadius: 23,
                alignItems: "center",
                justifyContent: 'center',
                backgroundColor: "#7AA741",
                height: 46,
                width: 293,
                marginTop: 10,
                marginBottom: 50
              }}>
              <Text
                style={{
                  fontSize: 15,
                  color: "#fff",
                  fontFamily: 'Avenir Heavy'
                }}>READ FULL PRIVACY POLICY</Text>
            </TouchableOpacity>
          </View>

        </View>
      </ParallaxScrollView>
    );
  }
}
