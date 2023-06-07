import React, { useState, useEffect } from "react";
import {
  Text,
  StyleSheet,
  View,
  FlatList,
  Image,
  Pressable
} from "react-native";

const ProductFavoritesScreen = (params) => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    setProducts([
      {
        id: 1,
        name: "Product name",
        status: true,
        isFavorite: false,
        image: require("./assets/productImage.png")
      },
      {
        id: 2,
        name: "Product name",
        status: true,
        isFavorite: true,
        image: require("./assets/productImage.png")
      },
      {
        id: 3,
        name: "Product name",
        status: true,
        isFavorite: false,
        image: require("./assets/productImage.png")
      },
      {
        id: 4,
        name: "Product name",
        status: true,
        isFavorite: true,
        image: require("./assets/productImage.png")
      }
    ]);
  }, []);
  return (
    <View style={styles.container}>
      <TabView tabTitles={["Products", "Wishlists"]} selected={0} />
      <View style={styles.productsContainer}>
        <FlatList
          data={products}
          numColumns={2}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <Product product={item} />}
          columnWrapperStyle={{
            justifyContent: "space-around"
          }}
        />
      </View>
      <Button buttonText={"Checkout"} />
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
export default ProductFavoritesScreen;

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
  const availability = {
    color: product.status ? "#12D790" : "#FF0000",
    fontSize: 12,
    fontWeight: "bold"
  };
  return (
    <View style={productStyles.container}>
      <View style={productStyles.imageContainer}>
        <Image source={product.image} style={productStyles.productImage} />
        <View style={productStyles.descriptionContainer}>
          <Text style={productStyles.bold}>{product.name}</Text>
          <View style={productStyles.availabilityTextContainer}>
            <Text style={productStyles.availabilityText}>Purchase: </Text>
            <Text style={availability}>
              {product.status ? "Available" : "Unavailable"}
            </Text>
          </View>
        </View>
        <Image
          source={
            product.isFavorite
              ? require("./assets/isFavouriteIcon.png")
              : require("./assets/favIcon.png")
          }
          style={productStyles.favIcon}
        />
      </View>
      <View style={productStyles.purchaseContainer}>
        <View style={productStyles.quantityContainer}>
          <View style={productStyles.quantity}>
            <Text>-</Text>
            <Text
              style={{
                fontWeight: "bold"
              }}
            >
              1
            </Text>
            <Text>+</Text>
          </View>
          <Text style={[productStyles.grey, productStyles.fnt12]}>Qty</Text>
        </View>
        <View style={productStyles.cartContainer}>
          <Image source={require("./assets/cartIcon.png")} />
          <Text style={[productStyles.grey, productStyles.fnt12]}>Cart</Text>
        </View>
      </View>
    </View>
  );
};

const productStyles = StyleSheet.create({
  container: {
    height: 240,
    width: 160,
    margin: 10
  },
  imageContainer: {
    height: 180,
    width: 160,
    borderRadius: 10
  },
  productImage: {
    height: "75%",
    width: "100%",
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10
  },
  descriptionContainer: {
    height: "25%",
    backgroundColor: "#F1F1F1",
    justifyContent: "center",
    padding: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10
  },
  availabilityTextContainer: {
    flexDirection: "row",
    alignItems: "center"
  },
  availabilityText: {
    color: "#7C7C7C",
    fontSize: 12,
    fontWeight: "bold"
  },
  bold: {
    fontWeight: "bold"
  },
  purchaseContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    marginTop: 10,
    height: 50
  },
  quantityContainer: {
    alignItems: "center",
    justifyContent: "space-around",
    height: "80%"
  },
  quantity: {
    width: 80,
    height: 30,
    backgroundColor: "#F1F1F1",
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 10,
    marginBottom: 10
  },
  cartContainer: {
    alignItems: "center",
    justifyContent: "space-between",
    height: "100%"
  },
  grey: {
    color: "#7C7C7C"
  },
  fnt12: {
    fontSize: 12
  },
  favIcon: {
    position: "absolute",
    right: 10,
    top: 10
  }
});

const Button = (params) => {
  const btnStyle = {
    backgroundColor: params.outline ? "#fff" : "#000",
    borderColor: params.outline ? "#000" : "#fff",
    borderWidth: 1
  };
  const btnText = {
    color: params.outline ? "#000" : "#fff"
  };
  return (
    <View style={buttonStyles.btnContainer}>
      <Pressable style={[buttonStyles.btn, btnStyle]} onPress={params.onPress}>
        <Text style={[buttonStyles.btnText, btnText]}>{params.buttonText}</Text>
        <View style={styles.childrenContainer}>{params.children}</View>
      </Pressable>
    </View>
  );
};

const buttonStyles = StyleSheet.create({
  btnContainer: {
    paddingHorizontal: 40,
    justifyContent: "center",
    marginVertical: 20
  },
  btn: {
    backgroundColor: "black",
    height: 50,
    width: "100%",
    padding: 10,
    paddingHorizontal: 25,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "rgba(0, 0, 0, 0.2)",
    elevation: 10,
    flexDirection: "row"
  },
  btnText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold"
  },
  childrenContainer: {
    justifyContent: "center",
    alignItems: "center"
  }
});
