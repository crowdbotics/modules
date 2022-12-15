import React, { useContext } from "react";
import { View, StyleSheet, FlatList, Image, TouchableNativeFeedback } from "react-native";
import { OptionsContext } from "@options";

const ShadowsList = ({ handleBlurImage }) => {
  const options = useContext(OptionsContext);
  const colors = ["#FCF1D6", "#F9D8D9", "#D9DADD", "#FCF1D6", "#F9D8D9", "#D9DADD"];
  const pressShadow = (index) => {
    handleBlurImage(index);
  };

  const ItemRender = ({ url, index }) => (
    <TouchableNativeFeedback onPress={() => pressShadow(url)}>
      <View style={[styleSheet.item, { backgroundColor: colors[index % colors.length] }]} >
        <Image source={{ uri: url }} style={styleSheet.shadowImage} />
      </View>
    </TouchableNativeFeedback>
  );

  const Separator = () => {
    return (
      <View
        style={{
          height: 100,
          width: 12,
          backgroundColor: "white"
        }}
      />
    );
  };

  return (
    <FlatList
      data={options.SHADOWS}
      renderItem={({ item, index }) => <ItemRender url={item.url} index={index} />}
      keyExtractor={item => item.id.toString()}
      ItemSeparatorComponent={Separator}
      horizontal={true}
      showsHorizontalScrollIndicator={false}
    />
  );
};

const styleSheet = StyleSheet.create({
  shadowImage: {
    height: "100%",
    width: "100%"
  },

  item: {
    backgroundColor: "#FCF1D6",
    width: 90,
    height: 90,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
    marginTop: 10,
    marginBottom: 20
  }

});

export default ShadowsList;
