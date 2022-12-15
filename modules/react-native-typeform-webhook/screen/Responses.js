import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, SectionList } from "react-native";
import { getResponses } from "../api";
import Loader from "../components/Loader";
import Response from "../components/Response";
import { groupByToken, formatDate } from "../utils";

const Responses = ({ route }) => {
  const [responseList, setResponseList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { formId } = route.params;

  useEffect(() => {
    setIsLoading(true);
    getResponses(formId)
      .then(res => res.json())
      .then(res => {
        setResponseList(groupByToken(res));
        setIsLoading(false);
      })
      .catch(e => {
        console.log(e);
        setIsLoading(false);
      });
  }, []);

  return (

    <View style={styles.p10}>
      {isLoading && <Loader />}
      <SectionList
        sections={responseList}
        renderItem={({ item }) => <Response res={item} />}
        keyExtractor={(item) => item.id}
        renderSectionHeader={({ section: { title } }) => (
          <View style={styles.section}>
            <Text style={styles.token} numberOfLines={1} ellipsizeMode='middle'>{title.token}</Text>
            <Text style={styles.date}>{formatDate(title.submitted_at)}</Text>
          </View>

        )}
      />

    </View>
  );
};

export default Responses;

const styles = StyleSheet.create({
  p10: {
    padding: 10
  },
  section: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 15
  },
  token: {
    width: 100,
    fontWeight: "bold"
  },
  date: {
    fontWeight: "bold"
  }
});
