import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";

const Button = (props) => {
  return (
    <TouchableOpacity onPress={props.onPress}>
      <View style={styles.CardBody}>
        <View style={styles.InnerCard}>
          <View>
            <Text style={styles.HostMeetingText}>{props.title}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  CardBody: {
    minHeight: 50,
    height: "100%",
    backgroundColor: "#2D8CFF",
    borderRadius: 5
  },
  InnerCard: {
    padding: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 0
    },
    shadowOpacity: 0.23,
    shadowRadius: 1.62,
    elevation: 15,
    display: "flex",
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  HostMeetingText: {
    color: "white",
    textTransform: "uppercase"
  }
});

export default Button;
