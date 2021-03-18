import Icon from 'react-native-vector-icons/FontAwesome';
import React from 'react';
import {
  View,
  Image,
  Text,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import ParallaxScrollView from 'react-native-parallax-scroll-view';
import {styles} from './styles';
import {Linking} from 'react-native';

const PRIVACY_WEBSITE_URL = 'https://www.crowdbotics.com/privacy-policy'

const PrivacyPolicy = ({ navigation }) => {
  const privacyText =
    'PRIVACY POLICY - SAMPLE\nLast updated November 30, 2020\n\n\nThank you for choosing to be' +
    ' part of our community at Crowdbotics (“Company”, “we”, “us”' +
    ', or “our”). We are committed to protecting your personal information and your r' +
    'ight to privacy. If you have any questions or concerns about our policy, or our ' +
    'practices with regards to your personal information, please contact us at info' +
    '@crowdbotics.com.\n\n\nWhen you visit our mobile application, and use our ser' +
    'vices, you trust us with your personal information. We take your privacy very se' +
    'riously. In this privacy policy, we seek to explain to you in the clearest way p' +
    'ossible what information we collect, how we use it and what rights you have in r' +
    'elation to it. We hope you take some time to read through it carefully, as it is' +
    ' important. If there are any terms in this privacy policy that you do not agree ' +
    'with, please discontinue use of our Apps and our services.\n\nThis privacy polic' +
    'y applies to all information collected through our mobile application, (“Apps”),' +
    ' and/or any related services, sales, marketing or events (we refer to them colle' +
    'ctively in this privacy policy as the “Services”).\n\nPlease read this privacy p' +
    'olicy carefully as it will help you make informed decisions about sharing your p' +
    'ersonal information with us.';

  return (
    <ParallaxScrollView
      contentBackgroundColor={'#F3F3F3'}
      renderBackground={() => (
        <View
          key="background"
          style={{
            paddingBottom: 30,
            height: 257,
            justifyContent: 'flex-end',
            alignItems: 'center',
          }}>
          <Image
            resizeMode={'contain'}
            style={{
              height: 115,
              width: 125,
            }}
            source={{
              uri:
                'https://d3tklmlrp1a8c2.cloudfront.net/media/project_component_resources/cb-icon.png',
            }}
          />
        </View>
      )}
      renderForeground={() => (
        <ImageBackground
          source={{
            uri:
              'https://d3tklmlrp1a8c2.cloudfront.net/media/project_component_resources/halfbg.png',
          }}
          resizeMode={'contain'}
          style={styles.header}>
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}>
            <Icon
              style={styles.icon}
              name={'arrow-left'}
              size={18}
              color="#fff"
            />
          </TouchableOpacity>
          <Text style={styles.headerText}>Privacy Policy</Text>
        </ImageBackground>
      )}
      parallaxHeaderHeight={257}>
      <View style={styles.parallaxHeader}>
        <View
          style={{
            paddingHorizontal: 16,
          }}>
          <Text style={styles.parallaxText}>{privacyText}</Text>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() =>
              Linking.openURL(PRIVACY_WEBSITE_URL)
            }>
            <Text style={styles.buttonText}>READ FULL PRIVACY POLICY</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ParallaxScrollView>
  );
};

export default {
  title: 'Privacy Policy',
  navigator: PrivacyPolicy,
};
