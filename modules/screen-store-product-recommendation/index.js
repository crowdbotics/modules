import React, { useState, useEffect } from "react";
import { Text, StyleSheet, View, FlatList, Image } from "react-native";

const ProductRecommendationScreen = (params) => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    setProducts([
      {
        id: 1,
        name: "Product name",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Consequat in diam habitasse scelerisque in. Quisque lorem.",
        isFavorite: false,
        image: require("./assets/productImage.png")
      },
      {
        id: 2,
        name: "Product name",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Consequat in diam habitasse scelerisque in. Quisque lorem.",

        isFavorite: true,
        image: require("./assets/productImage2.png")
      },
      {
        id: 3,
        name: "Product name",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Consequat in diam habitasse scelerisque in. Quisque lorem.",

        isFavorite: false,
        image: require("./assets/productImage.png")
      },
      {
        id: 4,
        name: "Product name",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Consequat in diam habitasse scelerisque in. Quisque lorem.",

        isFavorite: true,
        image: require("./assets/productImage2.png")
      },
      {
        id: 5,
        name: "Product name",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Consequat in diam habitasse scelerisque in. Quisque lorem.",

        isFavorite: true,
        image: require("./assets/productImage.png")
      },
      {
        id: 6,
        name: "Product name",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Consequat in diam habitasse scelerisque in. Quisque lorem.",

        isFavorite: true,
        image: require("./assets/productImage2.png")
      }
    ]);
  }, []);
  return (
    <View style={styles.container}>
      <TabView tabTitles={["All", "Best Products"]} selected={1} />
      <View style={styles.productsContainer}>
        <FlatList
          data={products}
          numColumns={2}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <Product product={item} />}
          columnWrapperStyle={{
            justifyContent: "space-around"
          }}
          showsVerticalScrollIndicator={false}
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
  productsContainer: {
    paddingHorizontal: 20
  }
});
export default ProductRecommendationScreen;
const TabView = ({ tabTitles, selected }) => {
  return (
    <View style={tabViewStyles.paletteContainer}>
      {tabTitles.map((title, index) => (
        <View
          style={
            index === selected
              ? tabViewStyles.selected
              : tabViewStyles.unSelected
          }
          key={index}
        >
          <Text>{title}</Text>
        </View>
      ))}
    </View>
  );
};

const tabViewStyles = StyleSheet.create({
  paletteContainer: {
    width: "70%",
    height: 48,
    backgroundColor: "#F1F1F1",
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 10,
    padding: 6,
    marginVertical: 10,
    marginHorizontal: 20
  },
  selected: {
    borderRadius: 10,
    flex: 1,
    backgroundColor: "#fff",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "gray",
    elevation: 10
  },
  unSelected: {
    flex: 1,
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F1F1F1",
    borderRadius: 10
  }
});

const Product = ({ product }) => {
  return (
    <View style={productStyles.container}>
      <View style={productStyles.imageContainer}>
        <Image source={product.image} style={productStyles.productImage} />

        <Image
          source={
            product.isFavorite
              ? require("./assets/isFavouriteIcon.png")
              : require("./assets/favIcon.png")
          }
          style={productStyles.favIcon}
        />
      </View>
      <View style={productStyles.descriptionContainer}>
        <Text style={productStyles.bold}>{product.name}</Text>
        <View style={productStyles.descriptionTextContainer}>
          <Text style={productStyles.descriptionText}>
            {product.description}
          </Text>
        </View>
      </View>
    </View>
  );
};

const productStyles = StyleSheet.create({
  container: {
    height: 300,
    marginHorizontal: 15,
    flex: 1
  },
  imageContainer: {
    height: 180,
    width: 160,
    borderRadius: 10
  },
  productImage: {
    height: "100%",
    width: "100%",
    borderRadius: 10
  },
  descriptionContainer: {
    width: "100%",
    justifyContent: "center",
    paddingVertical: 10
  },
  descriptionTextContainer: {
    width: 160,
    justifyContent: "center"
  },
  descriptionText: {
    color: "#7C7C7C",
    fontSize: 12,
    textAlign: "left"
  },
  bold: {
    fontWeight: "bold"
  },
  favIcon: {
    position: "absolute",
    right: 10,
    top: 10
  }
});
