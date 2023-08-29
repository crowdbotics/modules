import React, { useEffect, useState, useContext } from "react";
import { Text, View, SectionList } from "react-native";
import { getResponses } from "../store";
import Loader from "../components/Loader";
import Response from "../components/Response";
import { groupByToken, formatDate } from "../utils";
import { unwrapResult } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { OptionsContext } from "@options";

/**
 * Component for rendering responses to a form.
 * @param  {Object} route - React navigation route object containing the formId.
 * @returns {React.ReactNode}
 */
const Responses = ({ route }) => {
  const options = useContext(OptionsContext);
  const { styles } = options;

  const [responseList, setResponseList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { formId } = route.params;
  const dispatch = useDispatch();

  useEffect(() => {
    setIsLoading(true);
    // This action dispatches an api to fetch all the questions related to the current form
    dispatch(getResponses({ formId }))
      .then(unwrapResult)
      .then((res) => {
        setResponseList(groupByToken(res));
        setIsLoading(false);
      })
      .catch((e) => {
        console.log(e);
        setIsLoading(false);
      });
  }, []);

  // This component is rendered when there are no questions in the form
  const emptyComponent = () => <Text style={styles.colouredText}>No record found.</Text>;

  return (
    <View style={styles.p10}>
      {isLoading && <Loader />}
      <SectionList
        ListEmptyComponent={emptyComponent}
        sections={responseList}
        renderItem={({ item }) => <Response res={item} />}
        keyExtractor={(item) => item.id}
        renderSectionHeader={({ section: { title } }) => (
          <View style={styles.section}>
            <Text style={[styles.token, styles.colouredText]} numberOfLines={1} ellipsizeMode="middle">
              {title.token}
            </Text>
            <Text style={[styles.date, styles.colouredText]}>{formatDate(title.submitted_at)}</Text>
          </View>
        )}
      />
    </View>
  );
};

export default Responses;
