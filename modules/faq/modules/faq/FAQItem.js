import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useDispatch } from "react-redux";
import { Images } from "./assets";
import { colors } from "./options";
import { slice } from "./store";

export const FAQItem = (props) => {
  const { question, answer, isExpanded, prefixQuestion, prefixAnswer, id } =
    props;
  const dispatch = useDispatch();

  const _onClick = () => {
    dispatch(slice.actions.updateItem(id));
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.questionContainer} onPress={_onClick}>
        <Text
          style={[styles.questionText, { marginBottom: !isExpanded ? 20 : 5 }]}
        >
          <Text>{`${prefixQuestion} `}</Text>
          {`${question}`}
        </Text>
        <Image
          style={styles.icon}
          source={isExpanded ? Images.expandedIcon : Images.collapsedIcon}
          resizeMode="contain"
        />
      </TouchableOpacity>
      {isExpanded && (
        <Text style={styles.answerText}>
          <Text
            style={[
              styles.questionText,
              { lineHeight: styles.answerText.lineHeight }
            ]}
          >{`${prefixAnswer} `}</Text>
          {`${answer}`}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { marginTop: 20, paddingHorizontal: 20 },
  questionContainer: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  questionText: {
    fontWeight: "500",
    fontSize: 16,
    lineHeight: 28,
    color: colors.ivoryBlack
  },
  answerText: {
    fontWeight: "400",
    fontSize: 12,
    lineHeight: 20,
    color: colors.ivoryBlack,
    marginBottom: 20
  },
  icon: { width: 14, height: 20, marginTop: 5 }
});
