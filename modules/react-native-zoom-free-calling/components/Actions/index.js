import React from "react";
import { View, StyleSheet, Text, Pressable } from "react-native";

const Actions = (props) => {
  return (
    <View style={styles.ActionsMain}>
      <Pressable
        style={[styles.button, styles.buttonOpen]}
        onPress={() => props.setModalVisible(false)}
      >
        <Text style={styles.textStyle}>Cancel</Text>
      </Pressable>

      <Pressable
        style={[styles.button, styles.buttonClose]}
        onPress={props.handleSave}
        disabled={props.isMeetingScheduleSave}
      >
        <Text style={styles.textStyle}>{props.isMeetingScheduleSave ? "Saving" : "Save"}</Text>
      </Pressable>
    </View>
  );
};
const styles = StyleSheet.create({
  ActionsMain: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 20
  },
  button: {
    borderRadius: 5,
    padding: 8,
    elevation: 12,
    marginLeft: 10,
    width: 100
  },
  buttonOpen: {
    backgroundColor: "#FA060D"
  },
  buttonClose: {
    backgroundColor: "#2D8CFF"
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  }
});

export default Actions;
