import React, { useEffect, useContext } from "react";
import { SafeAreaView, Text, View, FlatList } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { getReportedList } from "../../store";
import { OptionsContext } from "@options";

const BlockedUsers = () => {
  const dispatch = useDispatch();
  const { styles } = useContext(OptionsContext);

  // Get the reported list from the Redux store
  const { entities } = useSelector(
    (state) => state?.FlagUserContent?.getReportedList
  );

  // Fetch the reported list from backend when the component mounts
  useEffect(() => {
    dispatch(getReportedList());
  }, []);

  /**
   * Renders an individual reported item.
   * @param {object} item - The reported item data.
   */
  const Item = ({ item }) => (
    <View style={styles.reportedItem}>
      <Text style={styles.title}>Reported ID {item?.reported_id}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.blockedUserContainer}>
      <FlatList
        data={entities}
        keyExtractor={(item) => item.id}
        renderItem={Item}
      />
    </SafeAreaView>
  );
};

export default BlockedUsers;
