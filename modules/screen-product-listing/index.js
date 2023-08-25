import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  Pressable,
  FlatList
} from "react-native";

const ProductListing = () => {
  const [products, setProducts] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  useEffect(() => {
    setProducts([
      {
        id: 1,
        title: "Dish name",
        count: 1,
        image: require("./assets/productImage.png")
      },
      {
        id: 2,
        title: "Dish name",
        count: 1,
        image: require("./assets/productImage.png")
      },
      {
        id: 3,
        title: "Dish name",
        count: 1,
        image: require("./assets/productImage.png")
      },
      {
        id: 4,
        title: "Dish name",
        count: 1,
        image: require("./assets/productImage.png")
      }
    ]);
  }, []);
  const handleProductSelect = product => {
    if (selectedProducts.includes(product)) {
      const newSelectedProducts = selectedProducts.filter(
        selectedProduct => selectedProduct.id !== product.id
      );
      setSelectedProducts(newSelectedProducts);
    } else {
      setSelectedProducts([...selectedProducts, product]);
    }
  };
  const handleCountChange = (type, product) => {
    const newProducts = products.map(item => {
      if (item.id === product.id) {
        if (type === "increase") {
          item.count++;
        } else if (type === "decrease") {
          if (item.count > 1) {
            item.count--;
          }
        }
      }
      return item;
    });
    setProducts(newProducts);
  };
  return (
    <View style={styles.container}>
      <FlatList
        data={products}
        renderItem={({ item }) => (
          <View style={styles.productContainer}>
            <View style={styles.imageContainer}>
              <Image style={styles.image} source={item.image} />
              <Radio
                style={styles.radio}
                selected={selectedProducts.includes(item)}
                onPress={() => handleProductSelect(item)}
              />
            </View>
            <View style={styles.flexRow}>
              <Text style={styles.productName}>{item.title}</Text>
              <View style={styles.flexRow}>
                <Text style={styles.counterText}>
                  {item.count} item{item.count > 1 && "s"}
                </Text>
                <Pressable onPress={() => handleCountChange("decrease", item)}>
                  <Image
                    style={styles.icon}
                    source={require("./assets/decrementIcon.png")}
                  />
                </Pressable>
                <Pressable onPress={() => handleCountChange("increase", item)}>
                  <Image
                    style={styles.icon}
                    source={require("./assets/incrementIcon.png")}
                  />
                </Pressable>
              </View>
            </View>
            <Button buttonText="Order" style={styles.button} hideShadow />
          </View>
        )}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  heading: {
    fontSize: 20
  },
  productContainer: {
    paddingHorizontal: 20,
    width: "100%",
    marginVertical: 10
  },
  imageContainer: {
    width: 350,
    height: 150,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
    shadowColor: "rgba(0, 0, 0, 0.5)",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  radio: {
    position: "absolute",
    top: 10,
    right: 10
  },
  image: {
    width: "100%",
    height: "100%",
    alignSelf: "center",
    borderRadius: 10
  },
  flexRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  productName: {
    fontSize: 18,
    color: "#313633",
    marginLeft: 10,
    flex: 1
  },
  counterText: {
    fontSize: 18,
    color: "#12D790"
  },
  icon: {
    width: 25,
    height: 25,
    marginLeft: 10
  },
  button: {
    marginHorizontal: 20,
    marginVertical: 15
  }
});

export default ProductListing;

const Button = params => {
  const backgroundColor = params.backgroundColor || "#000";
  const textColor = params.textColor || "#fff";
  const btnStyle = {
    backgroundColor: backgroundColor,
    borderColor: params.borderColor || backgroundColor,
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
    shadowOffset: {
      width: 0,
      height: 5
    },
    shadowOpacity: 0.5,
    shadowRadius: 10,
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

const Radio = props => {
  return (
    <Pressable
      style={[radioStyles.container, props.style]}
      onPress={props.onPress}>
      {props.selected && <View style={radioStyles.radio} />}
    </Pressable>
  );
};

const radioStyles = StyleSheet.create({
  container: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#000",
    justifyContent: "center",
    alignItems: "center"
  },
  radio: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#000"
  }
});
