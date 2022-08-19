import React, { useEffect, useContext, useState, useRef } from "react"
import {
  ScrollView,
  Dimensions,
} from 'react-native'
import { OptionsContext, GlobalOptionsContext } from "@options";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import ActionSheet from "react-native-actionsheet";
import {PostComponent} from "./post"

export function PostDetailScreen(props) {
  const { navigation, route } = props;
  const actionSheet = useRef(null);
  console.log("props", props)
  const { id } = route.params;
  const [postDetails, setPostDetails] = React.useState({});
  const gOptions = useContext(GlobalOptionsContext);
  const BASE_URL = gOptions.url
  const [loading, setLoading] = React.useState(true);
  const [PostOptions, setPostOptions] = React.useState(["Report Post", "Cancel"]);
  const baseOptions = ["Report Post", "Cancel",];

  useEffect(() => {
    // TODO: get post details
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