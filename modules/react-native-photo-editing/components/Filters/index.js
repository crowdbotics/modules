import React from "react";
import { View, StyleSheet, FlatList, Text, TouchableNativeFeedback } from "react-native";
import options from "../../options";

export default function Filter({ selectFilter }) {
  const colors = ["#FCF1D6", "#F9D8D9", "#D9DADD", "#FCF1D6", "#F9D8D9", "#D9DADD"];

  const titleColor = ["#d5f7cd", "#d1bfef", "#edc0c0", "#d5f7cd", "#d1bfef", "#edc0c0"];

  const pressFilter = (name) => {
    selectFilter(name);
  };
  const ItemRender = ({ name, index }) => (
    <TouchableNativeFeedback onPress={() => pressFilter(name)}>
    <View style={[styleSheet.item, { backgroundColor: colors[index % colors.length] }]} >
      <Text style={[styleSheet.itemText]}></Text>
      <Text style={[styleSheet.titleText, { backgroundColor: titleColor[index % colors.length] }]} >{name}</Text>
    </View>
    </TouchableNativeFeedback>
  );

  const Separator = () => {
    return (
      <View
        style={{
          height: 100,
          width: 7,
          backgroundColor: "white"
        }}
      />
    );
  };

  return (

    <FlatList
      data={options.FILTERS}
      renderItem={({ item, index }) => <ItemRender name={item.name} index={index} />}
      keyExtractor={item => item.id.toString()}
      ItemSeparatorComponent={Separator}
      horizontal={true}
      showsHorizontalScrollIndicator={false}
    />
  );
}

const styleSheet = StyleSheet.create({

  titleText: {
    fontSize: 14,
    textAlign: "center",
    padding: 5,
    width: "100%",
    color: "#FFF",
    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 4
  },

  item: {
    backgroundColor: "#FCF1D6",
    width: 120,
    height: 120,
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: 4,
    marginTop: 10,
    marginBottom: 20
  },

  itemText: {
    fontSize: 24,
    color: "white",
    textAlign: "center"
  }

});
