import React, { useCallback, useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import { Images } from './assets';
import { colors } from './options'

export const FAQItem = React.memo((props) => {
  const { question, answer, isExpanded = false, prefixQuestion,
    prefixAnswer } = props;
  const [expanded, toggleExpanded] = useState(isExpanded);

  const _onClick = useCallback(() => {
    toggleExpanded(!expanded);
  }, [expanded, toggleExpanded]);

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.questionContainer} onPress={_onClick} >
        <Text style={[styles.questionText, { marginBottom: !expanded ? 20 : 5 }]}>
          <Text>{`${prefixQuestion} `}</Text>
          {`${question}`}</Text>
        <Image style={styles.icon}
          source={expanded ? Images.expandedIcon : Images.collapsedIcon}
          resizeMode='contain' />
      </TouchableOpacity>
      {expanded && <Text style={styles.answerText}>
        <Text style={[styles.questionText, { lineHeight: styles.answerText.lineHeight }]}>{`${prefixAnswer} `}</Text>
        {`${answer}`}</Text>}
    </View>
  )

}, (prevProps, nextProps) => {
  return prevProps.id === nextProps.id
});

const styles = StyleSheet.create({
  container: { marginTop: 20, paddingHorizontal: 20, borderBottomColor: colors.darkCharcoal, borderBottomWidth: StyleSheet.hairlineWidth, },
  questionContainer: {
    flexDirection: 'row', justifyContent: 'space-between'
  },
  questionText: { fontWeight: '500', fontSize: 16, lineHeight: 28, color: colors.IvoryBlack, },
  answerText: { fontWeight: '400', fontSize: 12, lineHeight: 20, color: colors.IvoryBlack, marginBottom: 20, },
  icon: { width: 14, height: 20, marginTop: 5 },
})