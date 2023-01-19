import React, { useState, useEffect, useCallback } from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  TextInput,
  FlatList,
  Pressable
} from "react-native";

const SearchBank = () => {
  const [searchText, setSearchText] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [banks, setBanks] = useState([]);
  const [selectedBank, setSelectedBank] = useState(null);
  useEffect(() => {
    setBanks([
      {
        name: "Bank of America",
        id: "1",
        image: require("./assets/bankImage.png")
      },
      {
        name: "Chase",
        id: "2",
        image: require("./assets/bankImage.png")
      },
      {
        name: "Wells Fargo",
        id: "3",
        image: require("./assets/bankImage.png")
      },
      {
        name: "Citibank",
        id: "4",
        image: require("./assets/bankImage.png")
      },
      {
        name: "Capital One",
        id: "5",
        image: require("./assets/bankImage.png")
      },
      {
        name: "PNC Bank",
        id: "6",
        image: require("./assets/bankImage.png")
      },
      {
        name: "U.S. Bank",
        id: "7",
        image: require("./assets/bankImage.png")
      },
      {
        name: "TD Bank",
        id: "8",
        image: require("./assets/bankImage.png")
      },
      {
        name: "BB&T",
        id: "9",
        image: require("./assets/bankImage.png")
      }
    ]);
  }, []);
  const searchBanks = useCallback(
    x => {
      setSearchText(x);
      if (x.length > 0) {
        const results = banks.filter(bank => {
          return bank.name.toLowerCase().includes(x.toLowerCase());
        });
        setSearchResults(results);
      } else {
        setSearchResults([]);
      }
    },
    [banks]
  );
  return (
    <View style={styles.container}>
      <Input
        text="Search"
        placeholder="Search for your bank"
        value={searchText}
        onChangeText={searchBanks}
        containerStyle={styles.inputContainer}
        icon={require("./assets/searchIcon.png")}
      />
      <View style={styles.separator}>
        <Text style={styles.separatorText}>Choose your bank</Text>
      </View>
      <FlatList
        data={searchResults.length > 0 ? searchResults : banks}
        renderItem={({ item }) => (
          <Pressable
            style={[
              styles.bankItem,
              item === selectedBank && styles.selectedBank
            ]}
            onPress={() => setSelectedBank(item)}>
            <Image source={item.image} style={styles.bankImage} />
            <Text
              style={[
                styles.bankName,
                item === selectedBank && styles.selectedBank
              ]}>
              {item.name}
            </Text>
          </Pressable>
        )}
        keyExtractor={item => item.id}
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
  inputContainer: {
    margin: 20
  },
  separator: {
    backgroundColor: "#F2F2F2",
    height: 60,
    justifyContent: "center",
    paddingLeft: 20
  },
  separatorText: {
    color: "#7C7C7C",
    fontSize: 16,
    textTransform: "uppercase"
  },
  bankItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
    borderBottomColor: "#e6e6e6",
    borderBottomWidth: 1
  },
  bankImage: {
    width: 30,
    height: 30,
    marginRight: 10,
    borderRadius: 15
  },
  bankName: {
    fontSize: 16,
    color: "#231F20"
  },
  selectedBank: {
    backgroundColor: "#000",
    color: "#fff"
  }
});

export default SearchBank;

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
        onChangeText={text => props.onChangeText(text)}
        placeholderTextColor={
          props.placeholderTextColor ? props.placeholderTextColor : "#9B9B9B"
        }
        editable={props.editable !== false}
        autoCapitalize="none"
        autoCorrect={false}
        multiline={!!props.textArea}
        backgroundColor={props.backgroundColor}
        secureTextEntry={props.secureTextEntry}
      />
      {props.errorText
        ? (
        <Text style={inputStyles.error}>{props.errorText}</Text>
          )
        : null}
      {props.icon
        ? (
        <Image source={props.icon} style={inputStyles.iconWithText} />
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
    bottom: 25,
    width: 20,
    height: 20,
    resizeMode: "contain"
  },
  textArea: {
    height: 150
  },
  children: {}
});
