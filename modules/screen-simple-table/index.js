import React from "react";
import { SafeAreaView, View, FlatList, Text } from "react-native";
import { styles } from "./styles";
import options from "./options";

const SimpleTable = () => {
  const { headers, tableData } = options;

  const Item = ({ item }) => {
    const objLength = Object.keys(item).length;
    return (
      <View style={[styles.tableRow]}>
        {Array.apply(item, Array(objLength)).map((v, i) => (
          <Text style={styles.hText} key={i}>
            {Object.values(item)[i]}
          </Text>
        ))}
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        {headers.map((head, index) => (
          <Text style={styles.hText} key={index}>
            {head}
          </Text>
        ))}
      </View>
      <FlatList
        data={tableData}
        renderItem={Item}
        numColumns={1}
        keyExtractor={(_, index) => index}
      />
    </SafeAreaView>
  );
};
export default SimpleTable;
