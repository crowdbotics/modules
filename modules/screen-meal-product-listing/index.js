import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  Pressable,
  Image,
  FlatList
} from "react-native";

const MealProductListing = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  const [productList, setProductList] = useState([]);
  const [addedProducts, setAddedProducts] = useState([]);
  useEffect(() => {
    setProductList([
      {
        id: 1,
        name: "Product name",
        price: 12.59,
        discountedPrice: 10,
        deliveryType: "Free delivery",
        rating: 4.8,
        image: require("./assets/productImage.png")
      },
      {
        id: 2,
        name: "Product name",
        price: 12.59,
        discountedPrice: 10,
        deliveryType: "Free delivery",
        rating: 4.8,
        image: require("./assets/productImage.png")
      },
      {
        id: 3,
        name: "Product name",
        price: 12.59,
        discountedPrice: 10,
        deliveryType: "Free delivery",
        rating: 4.8,
        image: require("./assets/productImage.png")
      }
    ]);
  }, []);
  const handleAddProduct = product => {
    if (addedProducts.includes(product)) {
      setAddedProducts(addedProducts.filter(item => item.id !== product.id));
    } else {
      setAddedProducts([...addedProducts, product]);
    }
  };
  return (
    <View style={styles.container}>
      <TabView
        tabTitles={["All", "Best Products"]}
        selected={selectedTab}
        onPress={setSelectedTab}
        style={styles.tabView}
      />
      <FlatList
        data={productList}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.productContainer}>
            <Image source={item.image} style={styles.productImage} />
            <View style={styles.productDetails}>
              <Text style={styles.productName}>{item.name}</Text>
              <Text style={styles.pricingText}>
                ${item.discountedPrice.toFixed(2)}{" "}
                <Text style={styles.lineThrough}>${item.price.toFixed(2)}</Text>
              </Text>
              <View style={styles.flexRow}>
                <View style={styles.greenCircle}>
                  <Text style={[styles.white, styles.bold]}>%</Text>
                </View>
                <Text style={styles.fnt12}>Free delivery</Text>
              </View>
              <View style={styles.flexRow}>
                <Image
                  source={require("./assets/starIcon.png")}
                  style={styles.starIcon}
                />
                <Text>{item.rating}</Text>
              </View>
            </View>
            <View style={styles.buttons}>
              <Pressable style={styles.heartIconContainer}>
                <Image
                  source={require("./assets/heartIcon.png")}
                  style={styles.heartIcon}
                />
              </Pressable>
              <Pressable
                style={[
                  styles.button,
                  addedProducts.includes(item) ? null : styles.redBtn
                ]}
                onPress={() => handleAddProduct(item)}>
                <Image
                  source={
                    addedProducts.includes(item)
                      ? require("./assets/doubleTickIcon.png")
                      : require("./assets/addIcon.png")
                  }
                  style={styles.btnIcon}
                />
                <Text style={styles.btnText}>
                  {addedProducts.includes(item) ? "Added" : "Add"}
                </Text>
              </Pressable>
            </View>
          </View>
        )}
      />
      <Button buttonText="Checkout" style={styles.footerButton} />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  tabView: {
    width: "70%",
    marginHorizontal: 20
  },
  productContainer: {
    flexDirection: "row",
    marginHorizontal: 20,
    paddingVertical: 10,
    borderBottomColor: "#ccc",
    borderBottomWidth: 1
  },
  productImage: {
    height: 140,
    width: 100
  },
  productDetails: {
    flex: 1,
    marginLeft: 10
  },
  productName: {
    fontSize: 16,
    color: "#000",
    fontWeight: "bold",
    marginVertical: 5
  },
  pricingText: {
    fontSize: 14,
    color: "#7E7E7E",
    marginBottom: 5
  },
  lineThrough: {
    textDecorationLine: "line-through",
    color: "#CACACA"
  },
  flexRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5
  },
  greenCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: "#12D790",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 5
  },
  white: {
    color: "#fff"
  },
  fnt12: {
    fontSize: 12
  },
  bold: {
    fontWeight: "bold"
  },
  starIcon: {
    height: 20,
    width: 20,
    resizeMode: "contain",
    marginRight: 10
  },
  heartIconContainer: {
    width: 30,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 15,
    backgroundColor: "#fff",
    shadowColor: "#000",
    elevation: 10,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5
  },
  buttons: {
    justifyContent: "space-between",
    alignItems: "flex-end"
  },
  heartIcon: {
    height: 20,
    width: 20,
    resizeMode: "contain"
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: 100,
    height: 40,
    backgroundColor: "#12D790",
    borderRadius: 10
  },
  btnText: {
    color: "#fff"
  },
  btnIcon: {
    height: 12,
    width: 12,
    marginRight: 5,
    resizeMode: "contain"
  },
  redBtn: {
    backgroundColor: "#E84C4F"
  },
  footerButton: {
    marginHorizontal: 20,
    marginBottom: 20,
    marginTop: 5
  }
});

export default MealProductListing;

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

const Button = params => {
  const backgroundColor = params.color || "#000";
  const textColor = params.textColor || "#fff";
  const btnStyle = {
    backgroundColor: backgroundColor,
    borderColor: params.outlineColor || backgroundColor,
    borderWidth: 1
  };
  const btnText = {
    color: textColor
  };
  return (
    <View style={[buttonStyles.btnContainer, params.style]}>
      <View style={!params.hideShadow ? buttonStyles.shadowContainer : null}>
        <Pressable
          style={[buttonStyles.btn, btnStyle]}
          onPress={params.onPress}>
          <Text style={[buttonStyles.btnText, btnText]}>
            {params.buttonText}
          </Text>
          <View style={styles.childrenContainer}>{params.children}</View>
        </Pressable>
      </View>
    </View>
  );
};

const buttonStyles = StyleSheet.create({
  btnContainer: {
    justifyContent: "center"
  },
  shadowContainer: {
    shadowColor: "rgba(0, 0, 0, 0.5)",
    elevation: 10,
    backgroundColor: "#fff",
    borderRadius: 10
  },
  btn: {
    height: 50,
    padding: 10,
    paddingHorizontal: 25,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",

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
