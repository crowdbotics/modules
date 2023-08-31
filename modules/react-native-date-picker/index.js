import React from "react";
import {
  SafeAreaView,
  ScrollView,
  Text,
  Platform,
  StyleSheet
} from "react-native";
import { DatePickerComponent } from "./datepicker";

const DatePicker = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <Text style={styles.text}>Date picker for {Platform.OS}</Text>
        <DatePickerComponent />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F8F8FC",
    height: "100%"
  },
  scrollView: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    padding: 20
  },
  text: {
    textAlign: "center",
    fontSize: 28,
    color: "#828AB0",
    fontWeight: 700,
    padding: 20
  }
});

export default {
  title: "Date Picker",
  navigator: DatePicker
};
