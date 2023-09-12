import React, { useContext, useState, Fragment, useEffect } from "react";
import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Modal,
  FlatList,
  TextInput
} from "react-native";
import { OptionsContext } from "@options";

import { useDispatch, useSelector } from "react-redux";
import { getReportedList } from "../../store";

const BlockedUsers = () => {
  const dispatch = useDispatch();

  const { entities } = useSelector(
    (state) => state?.FlagUserContent?.getReportedList
  );
  console.log("entities", entities);

  useEffect(() => {
    console.log("working")
    dispatch(getReportedList());
  }, []);

  return <SafeAreaView style={styles.container}></SafeAreaView>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center"
  }
});

export default BlockedUsers;
