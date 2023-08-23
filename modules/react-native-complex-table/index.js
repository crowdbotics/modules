import React, { useState, useEffect } from "react";
import { View, FlatList, Text, Alert } from "react-native";
import { styles } from "./styles";
import options from "./options";
import { Input } from "./components/TextInput";
import { DropDown } from "./components/DropDown";

const ComplexTable = () => {
  const { headers, tableData } = options;
  const [initialData, setInitialData] = useState(tableData);
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState("");

  useEffect(() => {
    if (query.length > 0) {
      setInitialData(
        tableData.filter((item) =>
          item.name.toLowerCase().includes(query.toLowerCase())
        )
      );
    } else {
      setInitialData(tableData);
    }
  }, [query]);

  useEffect(() => {
    let sortedArr = [];
    switch (sort) {
      case "ascending":
        sortedArr = tableData.sort(function (a, b) {
          return a.ID - b.ID;
        });
        setInitialData(sortedArr);
        break;
      case "descending":
        tableData.forEach((element) => {
          sortedArr.unshift(element);
        });
        setInitialData(sortedArr);
        break;
      case "alphabatic":
        sortedArr = tableData.sort((a, b) => a.name.localeCompare(b.name));
        setInitialData(sortedArr);
        break;
      default:
        Alert.alert("Error: ", "Issue in sorting table content.");
    }
  }, [sort]);

  return (
    <View style={styles.container}>
      <View style={styles.feeContainer}>
        <View style={styles.inputContainer}>
          <Input onChange={setQuery} text={"Search"} />
        </View>
        <View style={styles.sortContainer}>
          <DropDown setSort={setSort} />
        </View>
      </View>
      <View style={styles.header}>
        {headers.map((head, index) => (
          <Text style={styles.hText} key={index}>
            {head}
          </Text>
        ))}
      </View>
      <FlatList
        data={initialData}
        renderItem={({ item }) => {
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
        }}
        numColumns={1}
        keyExtractor={(item, index) => index}
        extraData={true}
      />
    </View>
  );
};

export default {
  title: "Complex Table",
  navigator: ComplexTable
};
