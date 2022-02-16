import React, { useState, useEffect } from 'react';
import { View, Text, Button } from "react-native";
import ZoomUs from 'react-native-zoom-us';
import { WebView } from 'react-native-webview';

const ZoomCalling = () => {

  useEffect(() => {
    ZoomUs.initialize({
      clientKey: 'uGpAnqHR2dfkUkXi7vTmP4wqtRll4xZeQlio',
      clientSecret: 'xJOm6daNiIR0FCDJSTQSegxa0Loc0AeaYdIn',
    }).then(response => {
      console.log('response', response)
    })
  }, [])

  const startMeeting = () => {
    // Start Meeting
    console.log('startMeeting here...')
    ZoomUs.startMeeting({
      userName: 'Johny',
      meetingNumber: '7776788669',
      userId: '480386',
      zoomAccessToken: '5pUP5hFRRC2nC2H4FR2L1w',
    })
  }

  const joinMeeting = () => {
    // Start Meeting
    console.log('joinMeeting here...')
    ZoomUs.joinMeeting({
      userName: 'Johny',
      meetingNumber: '7776788669',
    })
  }

  return (
    <View style={{flex: 1}}>
      {/* <Text onPress={startMeeting}>Start Meeting</Text>
      <Text onPress={joinMeeting}>Join Meeting</Text> */}
      <WebView
        userAgent="Mozilla/5.0 (Linux; Android 4.1.1; Galaxy Nexus Build/JRO03C) AppleWebKit/535.19 (KHTML, like Gecko) Chrome/18.0.1025.166 Mobile Safari/535.19" 
        onMessage={(event)=>{
          let message  = event.nativeEvent.data;
          console.log('event', event)
        }}
        onNavigationStateChange={(evt)=>{}}
        onError={(e) => {
            console.warn('error occured', e)
        }}
        source={{uri: `https://zoom.us/oauth/authorize?response_type=code&client_id=O5o5klrbQWq3L6PBWbRjoA&redirect_uri=https://oauth.pstmn.io/v1/callback` }}
      />
    </View>
  );
};

export default {
  title: "ZoomCalling",
  navigator: ZoomCalling
}
