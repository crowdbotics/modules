import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  Pressable,
  Switch,
  Image,
  ScrollView
} from "react-native";
import { Slider } from "react-native-elements";

const LocationSearch = () => {
  const [searchValue, setSearchValue] = useState("");
  const [useMyLocation, setUseMyLocation] = useState(false);
  const [distanceOptions, setDistanceOptions] = useState([]);
  const [customDistance, setCustomDistance] = useState(50);
  const [selectedOption, setSelectedOption] = useState(null);
  useEffect(() => {
    setDistanceOptions(["10 miles", "20 miles", "30 miles", "Custom"]);
  }, []);
  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <View style={styles.flexRow}>
            <Text style={styles.heading}>Use my location</Text>
            <Switch
              value={useMyLocation}
              onValueChange={() => setUseMyLocation(!useMyLocation)}
              trackColor={{ false: "#e5e5e5", true: "#e5e5e5" }}
              thumbColor={"#000"}
              style={styles.switch}
            />
          </View>
          <Input
            placeholder="Search for a location"
            value={searchValue}
            onChange={setSearchValue}
          />
          <View style={styles.flexRow}>
            <Text style={styles.heading}>Mile Range from this location</Text>
            <Image
              source={require("./assets/dropdownIcon.png")}
              style={styles.icon}
            />
          </View>
        </View>
        <View style={styles.rangeContainer}>
          {distanceOptions.map((option, index) => (
            <View key={index} style={styles.flexRow}>
              <Checkbox
                value={option === selectedOption}
                setValue={() => setSelectedOption(option)}
                style={styles.checkbox}
              />
              <Text style={styles.heading}>{option}</Text>
            </View>
          ))}
          {selectedOption === "Custom" && (
            <Slider
              style={styles.slider}
              value={customDistance}
              onValueChange={setCustomDistance}
              minimumValue={10}
              maximumValue={80}
              step={1}
              thumbStyle={styles.sliderThumb}
              trackStyle={styles.sliderTrack}
              thumbProps={{
                children: (
                  <View style={styles.sliderTextContainer}>
                    <Text style={styles.sliderText}>
                      {customDistance} miles
                    </Text>
                  </View>
                )
              }}
              minimumTrackTintColor="#000"
              maximumTrackTintColor="#ccc"
              thumbTintColor="#000"
            />
          )}
        </View>
        <Button buttonText="Done" style={styles.button} />
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 10
  },
  heading: {
    fontSize: 16,
    flex: 1
  },
  flexRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 5
  },
  switch: {
    transform: [{ scaleX: 0.9 }, { scaleY: 0.9 }]
  },
  icon: {
    width: 20,
    height: 20,
    resizeMode: "contain"
  },
  rangeContainer: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: "#F5F5F5"
  },
  checkbox: {
    marginRight: 10,
    width: 25,
    height: 25
  },
  slider: {
    marginTop: 30,
    marginHorizontal: 20
  },
  sliderThumb: {
    width: 22,
    height: 22,
    borderColor: "#fff",
    borderWidth: 3
  },
  sliderTrack: {
    height: 3
  },
  sliderTextContainer: {
    position: "absolute",
    top: -40,
    left: -35,
    height: 30,
    width: 80,
    alignSelf: "center",
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 10,
    shadowColor: "rgba(0, 0, 0, 0.5)",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowRadius: 4,
    shadowOpacity: 0.3,
    elevation: 5
  },
  sliderText: {
    color: "#000",
    fontSize: 12,
    alignSelf: "center",
    textAlign: "center"
  },
  button: {
    marginHorizontal: 40,
    marginTop: 60,
    marginBottom: 20
  }
});

export default LocationSearch;

const Input = (props) => {
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

const Checkbox = (props) => {
  return (
    <Pressable
      onPress={() => {
        props.setValue(!props.value);
      }}
      style={[checkboxStyles.container, props.style]}
    >
      <Image
        source={
          props.value
            ? require("./assets/checkboxIconActive.png")
            : require("./assets/checkboxIcon.png")
        }
        style={[checkboxStyles.checkbox]}
      />
    </Pressable>
  );
};

const checkboxStyles = StyleSheet.create({
  container: {
    height: 20,
    width: 20
  },
  checkbox: {
    height: "100%",
    width: "100%"
  }
});
const Button = (params) => {
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
          onPress={params.onPress}
        >
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
