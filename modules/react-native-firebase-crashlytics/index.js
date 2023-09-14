import React, { useState, useContext } from "react";
import { Text, View, Switch, TouchableOpacity, FlatList } from "react-native";
import { OptionsContext } from "@options";
import { eventButtons } from "./utils";
import crashlytics from "@react-native-firebase/crashlytics";

const App = () => {
  const { styles } = useContext(OptionsContext);

  // State to track Crashlytics collection enabled status
  const [enabled, setEnabled] = useState(
    crashlytics().isCrashlyticsCollectionEnabled
  );

  /**
   * Render an item in the FlatList.
   * @param {Object} item - The item to render.
   */
  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={item?.function} style={styles.buttonStyles}>
      <Text style={styles.buttonTitle}>{item?.title}</Text>
    </TouchableOpacity>
  );

  /**
   * Toggle Crashlytics collection status and update the state.
   */
  const toggleCrashlytics = async () => {
    await crashlytics()
      .setCrashlyticsCollectionEnabled(!enabled)
      .then(() => setEnabled(crashlytics().isCrashlyticsCollectionEnabled));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.screenTitle}>Firebase Crashlytics</Text>

      <View style={styles.switchView}>
        <Text>Send Crash Reports</Text>
        <Switch
          trackColor={{ false: "#767577", true: "#81b0ff" }}
          thumbColor={enabled ? "#f5dd4b" : "#f4f3f4"}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleCrashlytics}
          value={enabled}
        />
      </View>
      <FlatList
        data={eventButtons}
        renderItem={renderItem}
        numColumns={2}
        style={{
          marginTop: 50
        }}
      />
    </View>
  );
};

export default {
  title: "FirebaseCrashlytics",
  navigator: App
};
