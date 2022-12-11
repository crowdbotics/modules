import React from "react";
import {
  Text,
  View,
  StyleSheet
} from "react-native";

const OneColumn = () => {
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <View style={styles.rowContent}>
          <Text style={styles.textHeading1}>Heading 1</Text>
          <Text style={styles.textHeading2}>Heading 2</Text>
          <Text style={styles.textHeading3}>Heading 3</Text>
          <Text style={styles.textHeading4}>Heading 4</Text>
          <Text style={styles.textDescription}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s</Text>
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  row: {
    flex: 1,
    backgroundColor: "pink",
    marginHorizontal: 10,
    marginVertical: 15,
    padding: 15
  },
  rowContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  textHeading1: {
    fontSize: 24,
    fontWeight: "bold"
  },
  textHeading2: {
    fontSize: 24
  },
  textHeading3: {
    fontSize: 20
  },
  textHeading4: {
    fontSize: 18
  },
  textDescription: {
    fontSize: 16,
    fontWeight: "400",
    color: "#333",
    textAlign: "center"
  }
});

export default OneColumn;
