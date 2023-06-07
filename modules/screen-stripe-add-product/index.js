import React, { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  TextInput,
  Pressable,
  ScrollView
} from "react-native";

const StripeAddProduct = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [model, setModel] = useState("");
  const [price, setPrice] = useState(0);
  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.imageContainer}>
          <Image
            source={require("./assets/defaultImage.png")}
            style={styles.image}
          />
        </View>
        <Input text="Product Name" value={name} onChange={setName} />
        <Input
          text="Product Description"
          value={description}
          onChange={setDescription}
          textArea={true}
        />
        <Input text="Product Model" value={model} onChange={setModel} />
        <Text style={styles.priceHeading}>Product Price</Text>
        <InputToken value={price} setValue={setPrice} />
        <Button buttonText="Add product" style={styles.button} />
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 20
  },
  heading: {
    fontSize: 20
  },
  imageContainer: {
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    width: "100%",
    height: 180,
    borderRadius: 10,
    marginVertical: 20,
    shadowColor: "rgba(0,0,0,0.5)",
    shadowOffset: {
      width: 0,
      height: 5
    },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 10
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 10
  },
  priceHeading: {
    fontSize: 14,
    marginLeft: 20,
    color: "#111112"
  },
  button: {
    marginTop: 20
  }
});

export default StripeAddProduct;

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
        onChangeText={() => props.onChange()}
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

const InputToken = ({ value, setValue }) => {
  const increment = () => {
    setValue(value + 1);
  };
  const decrement = () => {
    if (value > 0) {
      setValue(value - 1);
    } else {
      setValue(0);
    }
  };
  return (
    <View style={inputTokenStyles.container}>
      <Pressable onPress={() => decrement()}>
        <Image
          source={require("./assets/decrementIcon.png")}
          style={inputTokenStyles.icon}
        />
      </Pressable>
      <Text style={inputTokenStyles.text}>${value.toFixed(2)}</Text>
      <Pressable onPress={() => increment()}>
        <Image
          source={require("./assets/incrementIcon.png")}
          style={inputTokenStyles.icon}
        />
      </Pressable>
    </View>
  );
};

const inputTokenStyles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 10,
    paddingHorizontal: 60,
    borderWidth: 1,
    borderColor: "#E5E5E5",
    borderRadius: 10,
    height: 50
  },
  icon: {
    width: 30,
    height: 30
  },
  text: {
    fontSize: 20,
    color: "#313236"
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
