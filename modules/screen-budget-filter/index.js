import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  TextInput,
  Pressable,
  ScrollView
} from "react-native";
import { Slider } from "react-native-elements";
const BudgetFilter = () => {
  const [options, setOptions] = useState([]);
  const [rangeStart, setRangeStart] = useState("");
  const [rangeEnd, setRangeEnd] = useState("");
  const [selectedOptions, setSelectedOptions] = useState([]);
  useEffect(() => {
    setOptions(["Per Hour", "Per Day", "Per Week", "Per Month"]);
  }, []);
  const handleSelect = option => {
    const newSelectedOptions = [...selectedOptions];
    if (newSelectedOptions.includes(option)) {
      newSelectedOptions.splice(newSelectedOptions.indexOf(option), 1);
    } else {
      newSelectedOptions.push(option);
    }
    setSelectedOptions(newSelectedOptions);
  };
  return (
    <View style={styles.container}>
      <ScrollView>
        <Text style={styles.heading}>Filter/Budget</Text>
        <View style={styles.frequencyList}>
          {options.map((option, index) => (
            <Tile
              key={index}
              option={option}
              selected={selectedOptions.includes(option)}
              onPress={() => handleSelect(option)}
            />
          ))}
        </View>
        <View style={styles.halfInputs}>
          <View style={styles.inputContainer}>
            <Text style={styles.inputText}>From</Text>
            <TextInput
              style={styles.input}
              onChangeText={text => setRangeStart(text)}
              value={rangeStart}
              placeholder="Enter"
              placeholderTextColor="#9B9B9B"
              autoCapitalize="none"
              autoCorrect={false}
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.inputText}>Search</Text>
            <TextInput
              style={styles.input}
              onChangeText={text => setRangeEnd(text)}
              value={rangeEnd}
              placeholder="Enter"
              placeholderTextColor="#9B9B9B"
              autoCapitalize="none"
              autoCorrect={false}
            />
          </View>
        </View>
        <View style={styles.sliderContainer}>
          <Text style={styles.heading}>Set Pricing</Text>
          <Slider
            minimumValue={0}
            maximumValue={100}
            minimumTrackTintColor="#000"
            maximumTrackTintColor="#9B9B9B"
            thumbTintColor="#000"
            step={1}
            value={50}
            // thumb size
            thumbStyle={styles.thumb}
          />
        </View>
        <View style={styles.button}>
          <Button buttonText={"Done"} />
        </View>
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
    fontSize: 16,
    marginVertical: 10
  },
  frequencyList: {
    marginTop: 40
  },
  tile: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
    borderBottomColor: "#F0F2F7",
    borderBottomWidth: 1,
    paddingHorizontal: 10
  },
  optionName: {
    flex: 1
  },
  halfInputs: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20
  },
  inputContainer: {
    flexDirection: "column",
    justifyContent: "center",
    marginHorizontal: 5,
    flex: 1
  },
  inputText: {
    fontSize: 16,
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
    height: 50
  },
  sliderContainer: {
    marginTop: 20
  },
  thumb: {
    width: 20,
    height: 20
  },
  button: {
    marginTop: 120
  },
  checkbox: {
    width: 25,
    height: 25
  }
});

export default BudgetFilter;

const Tile = ({ option, selected, onPress }) => {
  return (
    <View style={styles.tile}>
      <Text style={styles.optionName}>{option}</Text>
      <Pressable onPress={onPress}>
        <Image
          source={
            selected
              ? require("./assets/checkboxIconActive.png")
              : require("./assets/checkboxIcon.png")
          }
          style={styles.checkbox}
        />
      </Pressable>
    </View>
  );
};

const Button = params => {
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
