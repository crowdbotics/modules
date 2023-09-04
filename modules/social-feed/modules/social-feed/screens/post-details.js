import React, { useEffect, useState, useRef } from "react";
import { ScrollView, Dimensions } from "react-native";
import ActionSheet from "react-native-actionsheet";
import { PostComponent } from "../components/post";
import { useDispatch, useSelector } from "react-redux";
import { getPostDetails } from "../store";

export default function PostDetailScreen(props) {
  const dispatch = useDispatch();
  const { navigation, route } = props;
  // Extract the 'id' parameter from the route params
  const { id } = route.params;
  const actionSheet = useRef(null);

  const [callbackVariable, setCallbackVariable] = useState(true);
  const [postOptions, setPostOptions] = useState(["Report Post", "Cancel"]);
  const actionSheetOptions = ["Report Post", "Cancel"];

  // Fetch post details from store.
  const { entities } = useSelector((state) => state.Social.getPostDetails);

  // Fetch post details when 'callbackVariable' changes
  useEffect(() => {
    dispatch(getPostDetails(id));
  }, [callbackVariable]);

  /**
   * Handle action selection in the ActionSheet.
   * @param {number} index - The index of the selected action.
   */
  const handleActionSelection = async (index) => {
    switch (index) {
      case 0:
        // Handle 'Report Post' action
        break;
      case 1:
        // Handle 'Cancel' action
        break;
    }
  };

  return (
    <ScrollView
      bounces={false}
      showsVerticalScrollIndicator={false}
      style={{ height: Dimensions.get("window").height }}
    >
      <ActionSheet
        ref={actionSheet}
        title={"Take Action"}
        options={postOptions}
        cancelButtonIndex={1}
        onPress={handleActionSelection}
      />
      <PostComponent
        postDetails={entities}
        setCallbackVariable={setCallbackVariable}
        navigation={navigation}
        actionSheet={actionSheet}
        baseOptions={actionSheetOptions}
        setPostOptions={setPostOptions}
      />
    </ScrollView>
  );
}
