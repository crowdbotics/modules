import React, { useContext } from "react";
import { Text, View } from "react-native";
import { OptionsContext } from "@options";

/**
 * Component for response list
 * @param  {String} title title of the response
 * @param  {String} type Question type
 * @param  {String} choices Available choices to the specific question
 * @param  {String} form_answers Answer of the question
 * @return {React.ReactNode}
 */
const Response = ({ res }) => {
  const { title, type, choices } = res;

  const options = useContext(OptionsContext);
  const { styles } = options;

  // This function lists all the available choices for an question
  const Choice = (input) => (
    input.map((item, index) => <Text style={styles.colouredText} key={index}>{`${index + 1}. ${item.label}`}</Text>)
  );

  return (
    <View style={styles.cardContainer}>
      <View style={styles.responseCard}>
        <Text style={[styles.question, styles.colouredText]}>{`Q. ${title}`}</Text>
        {type === "multiple_choice" && Choice(choices)}
        <Text style={styles.colouredText}>{`A. ${res.form_answers.answer ? res.form_answers.answer : ""}`}</Text>
      </View>
    </View>
  );
};

export default Response;
