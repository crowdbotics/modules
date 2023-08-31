import { View, StyleSheet, Image, Pressable, FlatList, Text } from "react-native";
import React, { useEffect, useState } from "react";

const ChooseCategory = ({ navigation }) => {
  const [categoriesList, setCategoriesList] = useState([]);
  const categoryImages = [
    require("./assets/heart.png"),
    require("./assets/eye.png"),
    require("./assets/germs.png"),
    require("./assets/lungs.png"),
    require("./assets/stomach.png"),
    require("./assets/muscles.png"),
    require("./assets/teeth.png"),
    require("./assets/bone.png")
  ];

  useEffect(() => {
    setCategoriesList([
      { id: 1, title: "Cardiologist" },
      { id: 2, title: "Ophthalmologist" },
      { id: 3, title: "Virologist" },
      { id: 4, title: "Pulmonologist" },
      { id: 5, title: "Gastroenterologist" },
      { id: 6, title: "Rheumatologist" },
      { id: 7, title: "Stomatologist" },
      { id: 8, title: "Orthopedic" }

    ]);
  }, []);

  const handleSelectCategory = (itemIndex) => {
    const newState = categoriesList.map((obj, index) => {
      if (index === itemIndex) {
        if (obj.isSelected) {
          return { ...obj, isSelected: false };
        }
        if (!obj.isSelected) {
          return { ...obj, isSelected: true };
        }
      }
      return obj;
    });
    setCategoriesList(newState);
  };

  return (
        <View style={styles.container}>

            <Text style={styles.heading}>Choose your category</Text>
            <FlatList
                style={styles.courseList}
                data={categoriesList}
                renderItem={({ item, index }) => <Category category={item} index={index} categoryImages={categoryImages} handleSelectCategory={handleSelectCategory} />}
                numColumns={2}
                keyExtractor={item => item.id.toString()}
                columnWrapperStyle={styles.columnWrapper}
            />
        </View>
  );
};

export default ChooseCategory;

const styles = StyleSheet.create({
  container: {
    paddingTop: "15%",
    flex: 1,
    backgroundColor: "#23AAFA",
    paddingHorizontal: 5
  },
  heading: { color: "#fff", fontWeight: "bold", fontSize: 18, paddingLeft: 10, paddingBottom: 15, lineHeight: 23 },
  courseList: {
    flex: 1
  },
  columnWrapper: {
    justifyContent: "space-around"
  }
});

const Category = ({ category, index, categoryImages, handleSelectCategory }) => {
  return (
        <Pressable onPress={() => handleSelectCategory(index)} style={courseStyles.container}>
            <Image source={categoryImages[index]} style={courseStyles.image} tintColor={category.isSelected ? "#23AAFA" : "#DBDBDB"} />
            <Text style={[courseStyles.text, { color: category.isSelected ? "#23AAFA" : "#000" }]}>{category.title}</Text>
        </Pressable>
  );
};

const courseStyles = StyleSheet.create({
  container: {
    marginBottom: 10,
    height: 140,
    width: 165,
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: "8%"
  },
  image: { height: 48, width: 38, resizeMode: "contain" },
  text: { color: "#989DA0", textAlign: "center" }

});
