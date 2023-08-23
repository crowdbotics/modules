import React, { useEffect, useState } from "react";
import { SafeAreaView, View, FlatList, Text } from "react-native";
import { styles } from "./styles";

const SimpleTable = () => {
  const [dataSource, setDataSource] = useState([]);

  useEffect(() => {
    const items = Array.apply(null, Array(10)).map((v, i) => {
      return {
        id: i,
        first_name: "dummy",
        last_name: "module",
        gender: "male",
        age: 23
      };
    });
    setDataSource(items);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={[styles.hText, styles.rowText]}>F.Name</Text>
        <Text style={[styles.hText, styles.rowText]}>L.Name</Text>
        <Text style={[styles.hText, styles.rowText]}>Age</Text>
        <Text style={[styles.hText, styles.rowText]}>Gender</Text>
      </View>
      <FlatList
        data={dataSource}
        renderItem={({ item }) => (
          <View style={[styles.tableRow]}>
            <Text style={styles.hText}>{item.first_name}</Text>
            <Text style={styles.hText}>{item.last_name}</Text>
            <Text style={styles.hText}>{item.age}</Text>
            <Text style={styles.hText}>{item.gender}</Text>
          </View>
        )}
        numColumns={1}
        keyExtractor={(item, index) => index}
      />
    </SafeAreaView>
  );
};
export default SimpleTable;
