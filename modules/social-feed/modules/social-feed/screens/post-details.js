import React, { useEffect, useContext, useState, useRef } from "react"
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  Dimensions,
  TextInput, TouchableOpacity, Alert
} from 'react-native'
import { OptionsContext, GlobalOptionsContext } from "@options";
import { likePost, unLikePost, userToken } from "../api";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import ActionSheet from "react-native-actionsheet";
import {PostComponent} from "../components/post";

export default function PostDetailScreen({ navigation, route }) {
  const actionSheet = useRef(null);
  const { id } = route.params;
  const [postDetails, setPostDetails] = React.useState({});
  const gOptions = useContext(GlobalOptionsContext);
  const BASE_URL = gOptions.url
  const [loading, setLoading] = React.useState(true);
  const [PostOptions, setPostOptions] = React.useState(["Report Post", "Cancel"]);
  const baseOptions = ["Report Post", "Cancel",];

  useEffect(() => {
    fetch(`${BASE_URL}/modules/social-feed/post/${id}/`,{
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${userToken}`
      }
    })
      .then((response) => response.json())
      .then((json) => setPostDetails(json))
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
 
  }, [loading]);
  

  return (
    <ScrollView
      bounces={false}
      showsVerticalScrollIndicator={false}
      style={{ height: Dimensions.get('window').height }}
      
    >
      <ActionSheet
        ref={actionSheet}
        title={"Take Action"}
        options={PostOptions}
        cancelButtonIndex={1}
        onPress={async (index) => {
          let res;
          switch (index) {
            case 0:
              res = await pickFromCamera();
              break;
            case 1:
              res = await pickFromGallery(cropWidth=400, cropHeight=230);
              break;
          }
        }}
      />
      <PostComponent postDetails={postDetails} setLoading={setLoading} 
      navigation={navigation} actionSheet={actionSheet}
      baseOptions={baseOptions} setPostOptions={setPostOptions}
      />
    </ScrollView>
  )
}