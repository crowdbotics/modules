import React,{useState, useEffect} from "react";
import { StyleSheet, View, Text, Image, ScrollView, TouchableOpacity } from "react-native";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { useSelector, useDispatch } from "react-redux";

import { TextInput } from "react-native-gesture-handler";
import  Conversations from "./conversations"
export const ChatScreen = (props) => {
  const { navigation } = props;
  return (
    <Conversations navigation={navigation}/>
  )
};
