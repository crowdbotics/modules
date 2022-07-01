import React from "react";
import { StyleSheet, Text, View } from "react-native";

const Response = ({ res }) => {
  const Choice = (input) => {
    return (
      input.map((item, index) => {
        return <Text key={index}>{`${index + 1}. ${item.label}`}</Text>;
      })
    );
  };

  return (

      <View style={styles.cardContainer}>
        <View style={styles.card}>
          <Text style={styles.question}>{`Q. ${res.title}`}</Text>
          {res.type === "multiple_choice" && Choice(res.choices)}
          <Text>{`A. ${res.form_answers.answer ? res.form_answers.answer : ""}`}</Text>
        </View>

      </View>

  );
};

export default Response;

const styles = StyleSheet.create({

  card: {
    justifyContent: "center",
    alignItems: "flex-start"

  },
  cardContainer: {
    shadowColor: "gray",
    elevation: 10,
    borderLeftWidth: 3,
    marginVertical: 5,
    backgroundColor: "#fff",
    borderRadius: 5,
    padding: 10
  },
  question: {
    fontWeight: "bold",
    fontSize: 16
  }
});
