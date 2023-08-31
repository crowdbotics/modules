import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  Pressable,
  ImageBackground,
  Image,
  FlatList
} from "react-native";

const FoodCategory = () => {
  const [selectedTab1, setSelectedTab1] = useState(0);
  const [selectedTab2, setSelectedTab2] = useState(0);
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    setCategories([
      {
        id: 1,
        name: "Burger",
        image: require("./assets/itemImage.png")
      },
      {
        id: 2,
        name: "Pizza",
        image: require("./assets/itemImage2.png")
      },
      {
        id: 3,
        name: "Chinese",
        image: require("./assets/itemImage.png")
      }
    ]);
  }, []);
  return (
    <View style={styles.container}>
      <View style={styles.body}>
        <TabView
          tabTitles={["Delivery", "Pickup"]}
          selected={selectedTab1}
          onPress={x => {
            setSelectedTab1(x);
          }}
          style={styles.header}
        />
        <ImageBackground
          style={styles.bannerImage}
          source={require("./assets/bannerImage.png")}>
          <View style={styles.bannerTitleContainer}>
            <Text style={styles.bannerText}>Discover</Text>
            <Text style={styles.bannerTitle}>Best Dinner of the day</Text>
          </View>
          <Image
            style={styles.arrowIcon}
            source={require("./assets/arrowIcon.png")}
          />
        </ImageBackground>
        <Text style={styles.heading}>Filter</Text>
        <TabView
          tabTitles={["Nearby", "Above 4.5", "Cheapest"]}
          icons={[
            require("./assets/locationIcon.png"),
            require("./assets/starIcon.png"),
            require("./assets/tagIcon.png")
          ]}
          selected={selectedTab2}
          onPress={x => {
            setSelectedTab2(x);
          }}
          backgroundColor="#fff"
          style={styles.tabView}
        />
      </View>
      <View style={styles.categoriesContainer}>
        <Text style={styles.categoryTitle}>Category</Text>
        <FlatList
          data={categories}
          keyExtractor={item => item.id.toString()}
          renderItem={({ item }) => (
            <ImageBackground style={styles.categoryImage} source={item.image}>
              <Text style={styles.categoryText}>{item.name}</Text>
            </ImageBackground>
          )}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
        />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  body: {
    paddingHorizontal: 20
  },
  header: {
    width: "70%"
  },
  bannerImage: {
    width: "100%",
    height: 200,
    borderRadius: 15,
    overflow: "hidden",
    shadowColor: "rgba(0, 0, 0, 0.5)",
    elevation: 10,
    marginTop: 20
  },
  bannerTitleContainer: {
    position: "absolute",
    top: 15,
    left: 15
  },
  bannerText: {
    fontSize: 14,
    color: "#77838F",
    fontWeight: "bold"
  },
  bannerTitle: {
    fontSize: 18,
    color: "#1E2022",
    fontWeight: "bold",
    width: 100
  },
  arrowIcon: {
    position: "absolute",
    bottom: 15,
    right: 15,
    width: 20,
    height: 16,
    resizeMode: "contain"
  },
  heading: {
    fontSize: 14,
    marginTop: 20,
    marginLeft: 20
  },
  tabView: {
    borderColor: "#c1c1c1",
    borderWidth: 1,
    padding: 5
  },
  categoryImage: {
    width: 150,
    height: 200,
    borderRadius: 15,
    overflow: "hidden",
    marginHorizontal: 10
  },
  categoryText: {
    fontSize: 14,
    color: "#1E2022",
    fontWeight: "bold",
    position: "absolute",
    top: 15,
    left: 15
  },
  categoryTitle: {
    fontSize: 16,
    color: "#1E2022",
    fontWeight: "bold",
    marginVertical: 20,
    marginLeft: 20
  }
});

export default FoodCategory;

const TabView = ({
  tabTitles,
  selected,
  onPress,
  tabColor,
  backgroundColor,
  style,
  icons
}) => {
  const tabColorStyle = {
    backgroundColor: tabColor || "#fff"
  };
  const backgroundColorStyle = {
    backgroundColor: backgroundColor || "#F1F1F1"
  };
  const propStyle = style || {};
  return (
    <View
      style={[tabViewStyles.paletteContainer, backgroundColorStyle, propStyle]}>
      {tabTitles.map((title, index) => (
        <Pressable
          onPress={() => (onPress ? onPress(index) : null)}
          style={
            index === selected
              ? [tabViewStyles.selected, tabColorStyle, tabViewStyles.tabItem]
              : [
                  tabViewStyles.unSelected,
                  backgroundColorStyle,
                  tabViewStyles.tabItem
                ]
          }
          key={index}>
          {icons
            ? (
            <Image
              source={icons[index]}
              style={[
                tabViewStyles.icon,
                index === selected
                  ? tabViewStyles.selectedIcon
                  : tabViewStyles.unSelectedIcon
              ]}
            />
              )
            : null}
          <Text>{title}</Text>
        </Pressable>
      ))}
    </View>
  );
};

const tabViewStyles = StyleSheet.create({
  paletteContainer: {
    height: 48,
    backgroundColor: "#E4E4E4",
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 10,
    padding: 6,
    marginVertical: 10
  },
  tabItem: {
    borderRadius: 10,
    flex: 1,
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row"
  },
  selected: {
    shadowColor: "gray",
    elevation: 10
  },
  unSelected: {
    backgroundColor: "#f1f1f1"
  },
  icon: {
    width: 20,
    height: 20,
    resizeMode: "contain",
    marginRight: 5
  },
  selectedIcon: {
    tintColor: "#000"
  },
  unSelectedIcon: {
    tintColor: "#7C7C7C"
  }
});
