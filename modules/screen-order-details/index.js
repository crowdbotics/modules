import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  Pressable,
  Image,
  FlatList,
  TextInput
} from "react-native";

const OrderDetails = () => {
  const [productList, setProductList] = useState([]);
  const [promoCode, setPromoCode] = useState("");
  const [cardNumber, setCardNumber] = useState("");
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
      }
    ]);
  }, []);
  return (
    <View style={styles.container}>
      <FlatList
        style={styles.list}
        ListHeaderComponent={() => (
          <View>
            <View style={styles.flexRow}>
              <Text style={styles.fnt16}>Deliver to</Text>
              <Pressable>
                <Text style={styles.fnt16}>Edit</Text>
              </Pressable>
            </View>
            <View style={styles.separator} />
            <View style={styles.tile}>
              <View style={styles.flexRow}>
                <Image
                  source={require("./assets/locationIcon.png")}
                  style={styles.icon}
                />
                <Text style={styles.deliveryAddress}>1234 Street, City</Text>
                <Image
                  source={require("./assets/searchIcon.png")}
                  style={styles.icon}
                />
              </View>
            </View>
            <View style={styles.separator} />
            <View style={styles.tile}>
              <View style={styles.flexRow}>
                <Text style={styles.fnt16}>Your Order</Text>
                <Text style={[styles.fnt16, styles.green]}>Add Items</Text>
              </View>
            </View>
            <View style={styles.separator} />
          </View>
        )}
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
              <View style={styles.deliveryContainer}>
                <View style={styles.greenCircle}>
                  <Text style={[styles.white, styles.bold]}>%</Text>
                </View>
                <Text style={styles.fnt12}>Free delivery</Text>
              </View>
            </View>
            <Pressable>
              <Text style={styles.editText}>Edit</Text>
            </Pressable>
          </View>
        )}
        ListFooterComponent={() => (
          <View style={styles.footer}>
            <View style={styles.separator} />
            <View style={styles.tile}>
              <Input
                text="Promo code"
                value={promoCode}
                onChange={text => setPromoCode(text)}
                containerStyle={styles.inputContainer}
              />
              <Input
                text="Card number"
                value={cardNumber}
                onChange={text => setCardNumber(text)}
                containerStyle={styles.inputContainer}
                icon={require("./assets/arrowIcon.png")}
                placeholder="xxxx-xxxx-xxxx-xxxx"
              />
              <View style={styles.detailsContainer}>
                <View style={styles.flexRow}>
                  <Text style={styles.subText}>Promo code</Text>
                  <Text>$0</Text>
                </View>
                <View style={styles.flexRow}>
                  <Text style={styles.subText}>Delivery Fee</Text>
                  <Text>$0</Text>
                </View>
                <View style={styles.flexRow}>
                  <Text style={styles.subText}>Product Price</Text>
                  <Text>$10.00</Text>
                </View>
                <View style={styles.flexRow}>
                  <Text style={styles.subText}>Total Price</Text>
                  <Text>$10.00</Text>
                </View>
              </View>
              <Button buttonText="Place order" style={styles.button} />
            </View>
          </View>
        )}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f1f1f1",
    paddingTop: 20
  },
  separator: {
    height: 20,
    width: "100%",
    backgroundColor: "#f1f1f1"
  },
  flexRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20
  },
  tile: {
    backgroundColor: "#fff",
    paddingVertical: 10
  },
  fnt16: {
    fontSize: 16
  },
  icon: {
    width: 30,
    height: 30,
    resizeMode: "contain"
  },
  deliveryAddress: {
    fontSize: 16,
    color: "#22292E",
    flex: 1,
    marginLeft: 10
  },
  green: {
    color: "#12D790"
  },
  productContainer: {
    flexDirection: "row",
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: "#fff"
  },
  productImage: {
    height: 80,
    width: 70,
    borderRadius: 10
  },
  productDetails: {
    flex: 1,
    marginLeft: 20
  },
  productName: {
    fontSize: 16,
    color: "#000",
    fontWeight: "bold",
    marginBottom: 5
  },
  pricingText: {
    fontSize: 14,
    color: "#7E7E7E",
    marginBottom: 5
  },
  lineThrough: {
    textDecorationLine: "line-through",
    color: "#ccc",
    textDecorationStyle: "solid"
  },
  deliveryContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 5
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
  editText: {
    fontSize: 16,
    color: "#EA4335",
    marginRight: 10
  },
  inputContainer: {
    marginHorizontal: 20
  },
  detailsContainer: {
    marginTop: 20
  },
  subText: {
    color: "#8A8A8E"
  },
  button: {
    marginHorizontal: 40,
    flex: 1,
    marginTop: 30,
    marginBottom: 20
  },
  footer: {
    backgroundColor: "#fff",
    flex: 1
  }
});

export default OrderDetails;

const Input = props => {
  return (
    <View style={[inputStyles.inputContainer, props.containerStyle]}>
      {props.text
        ? (
        <Text style={inputStyles.inputText}>{props.text}</Text>
          )
        : null}

      <TextInput
        style={[
          inputStyles.input,
          props.style,
          props.textArea ? inputStyles.textArea : null
        ]}
        placeholder={props.placeholder ? props.placeholder : "Enter"}
        value={props.value}
        onChangeText={props.onChange()}
        placeholderTextColor={
          props.placeholderTextColor ? props.placeholderTextColor : "#9B9B9B"
        }
        editable={props.editable !== false}
        autoCapitalize="none"
        autoCorrect={false}
        multiline={!!props.textArea}
      />
      {props.errorText
        ? (
        <Text style={inputStyles.error}>{props.errorText}</Text>
          )
        : null}
      {props.icon
        ? (
        <Image
          source={props.icon}
          style={
            props.text ? inputStyles.iconWithText : inputStyles.iconWithoutText
          }
        />
          )
        : null}
      <View style={styles.children}>{props.children}</View>
    </View>
  );
};

const inputStyles = StyleSheet.create({
  inputContainer: {
    flexDirection: "column",
    justifyContent: "center"
  },
  inputText: {
    fontSize: 14,
    marginLeft: 20,
    color: "#111112"
  },
  input: {
    borderWidth: 1,
    borderColor: "#e6e6e6",
    borderRadius: 10,
    padding: 10,
    paddingLeft: 20,
    marginVertical: 10,
    width: "100%",
    height: 50,
    color: "#000"
  },
  iconWithText: {
    position: "absolute",
    right: 30,
    top: 48,
    width: 15,
    height: 15,
    resizeMode: "contain"
  },
  iconWithoutText: {
    position: "absolute",
    right: 30,
    top: 28,
    width: 15,
    height: 15,
    resizeMode: "contain"
  },
  textArea: {
    height: 150
  },
  children: {}
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
