import React, {useContext} from "react";
import { View, StyleSheet, FlatList, Text, TouchableNativeFeedback, Image } from "react-native";
import { OptionsContext } from "@options";

import Warm from "../../assets/warm1.jpg";

import classic from "../../assets/classic1.jpg";

import vintage from "../../assets/vintage1.jpg";

import sharp from "../../assets/sharp1.jpg";

import negative from "../../assets/negative1.jpg";

import sepia from "../../assets/sepia1.jpg";

import cool from "../../assets/cool1.jpg";

import bright from "../../assets/bright1.jpg";

export default function Filter({ selectFilter }) {
  const {FILTERS} = useContext(OptionsContext)
  const warmUri = Image.resolveAssetSource(Warm).uri;
  const classicUri = Image.resolveAssetSource(classic).uri;
  const sharpUri = Image.resolveAssetSource(sharp).uri;
  const vintageUri = Image.resolveAssetSource(vintage).uri;
  const negativeUri = Image.resolveAssetSource(negative).uri;
  const sepiaUri = Image.resolveAssetSource(sepia).uri;
  const coolUri = Image.resolveAssetSource(cool).uri;
  const brightUri = Image.resolveAssetSource(bright).uri;
  const Uris = [warmUri, classicUri, vintageUri, sharpUri, negativeUri, sepiaUri, coolUri, brightUri];
  const colors = ["#FCF1D6", "#F9D8D9", "#D9DADD", "#FCF1D6", "#F9D8D9", "#D9DADD"];
  const titleColor = ["#d5f7cd", "#d1bfef", "#edc0c0", "#d5f7cd", "#d1bfef", "#edc0c0"];

  const pressFilter = (settings) => {
    selectFilter(settings);
  };

  const ItemRender = ({ name, index, settings }) => (
    <TouchableNativeFeedback onPress={() => pressFilter(settings)}>
      <View style={[styleSheet.item, { backgroundColor: colors[index % colors.length] }]} >
        <Image source={{ uri: Uris[index] }} style={styleSheet.itemText} />
        <Text style={[styleSheet.titleText, { backgroundColor: titleColor[index % colors.length] }]} >{name}</Text>
      </View>
    </TouchableNativeFeedback>
  );

  const Separator = () => {
    return (
      <View
        style={{
          height: 100,
          width: 7
        }}
      />
    );
  };

  return (
    <FlatList
      data={FILTERS}
      renderItem={({ item, index }) => <ItemRender name={item.name} index={index} settings={item.settings} />}
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
    fontWeight: "bold",
    width: "100%",
    color: "#FFF",
    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 4
  },
  item: {
    width: 100,
    height: 100,
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: 4,
    marginTop: 10,
    marginBottom: 20
  },
  itemText: {
    height: 70,
    width: 100,
    resizeMode: "stretch"
  }
});
