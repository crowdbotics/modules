import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  Pressable,
  TextInput,
  Image
} from "react-native";

const DiagnoseInformation = () => {
  const [country, setCountry] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [gender, setGender] = useState("");
  const [age, setAge] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [others, setOthers] = useState("");
  const [options, setOptions] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [isPregnant, setIsPregnant] = useState(false);
  useEffect(() => {
    setOptions([
      "Chronic Lung Disease",
      "Currently under chemotherapy",
      "Congestive Heart Failure",
      "Hemodialysis",
      "Type 1 Diabetes",
      "Type 2 Diabetes",
      "None of these",
      "Other"
    ]);
  }, []);
  const handleSelect = option => {
    if (selectedOptions.includes(option)) {
      setSelectedOptions(selectedOptions.filter(item => item !== option));
    } else {
      setSelectedOptions([...selectedOptions, option]);
    }
  };
  return (
    <View style={styles.container}>
      <ScrollView style={styles.body}>
        <Text style={styles.title}>Step 2</Text>
        <Text style={styles.subHeading}>Bio Metrics</Text>
        <Text style={styles.heading}>Basic Information</Text>
        <Input text="Country" value={country} onChange={setCountry} />
        <Input
          text="Phone Number"
          value={phoneNumber}
          onChange={setPhoneNumber}
        />
        <View style={styles.halfInputs}>
          <Input
            text="Gender"
            value={gender}
            onChange={setGender}
            style={styles.input1}
          />
          <Input
            text="Age"
            value={age}
            onChange={setAge}
            style={styles.input2}
          />
        </View>
        <View style={styles.halfInputs}>
          <Input
            text="Height"
            value={height}
            onChange={setHeight}
            style={styles.input1}
          />
          <Input
            text="Weight"
            value={weight}
            onChange={setWeight}
            style={styles.input2}
          />
        </View>
        <Text style={styles.heading}>Medical Information</Text>
        {options.map((option, index) => (
          <View style={styles.optionContainer} key={index}>
            <Pressable onPress={() => handleSelect(option)}>
              <Image
                source={
                  selectedOptions.includes(option)
                    ? require("./assets/checkboxIconActive.png")
                    : require("./assets/checkboxIcon.png")
                }
              />
            </Pressable>
            <Text style={styles.optionText}>{option}</Text>
          </View>
        ))}
        <Input
          text="If you selected 'Other', please indicate here"
          value={others}
          onChange={setOthers}
          textArea={true}
        />
        <View style={styles.questionContainer}>
          <Text style={styles.questionText}>Are you currently Pregnant?</Text>
          <View style={styles.checkboxContainer}>
            <Pressable onPress={() => setIsPregnant(!isPregnant)}>
              <Image
                source={
                  isPregnant
                    ? require("./assets/checkboxIconActive.png")
                    : require("./assets/checkboxIcon.png")
                }
              />
            </Pressable>
            <Text style={styles.questionText}>Yes</Text>
            <Pressable onPress={() => setIsPregnant(!isPregnant)}>
              <Image
                source={
                  !isPregnant
                    ? require("./assets/checkboxIconActive.png")
                    : require("./assets/checkboxIcon.png")
                }
              />
            </Pressable>
            <Text style={styles.questionText}>No</Text>
          </View>
        </View>
        <Button buttonText="Next" />
      </ScrollView>
      <Footer
        titles={["Home", "Diagnose", "Stats", "Map"]}
        images={[
          require("./assets/homeIcon.png"),
          require("./assets/diagnoseIconActive.png"),
          require("./assets/statsIcon.png"),
          require("./assets/mapIcon.png")
        ]}
        active={1}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  body: {
    paddingHorizontal: 20,
    flex: 1,
    marginBottom: 60
  },
  title: {
    fontSize: 42,
    textAlign: "center",
    marginBottom: 10,
    color: "#000"
  },
  subHeading: {
    fontSize: 16,
    textAlign: "center",
    color: "#000",
    marginBottom: 10
  },
  heading: {
    fontSize: 16,
    color: "#000",
    marginVertical: 10,
    textTransform: "uppercase"
  },
  halfInputs: {
    flexDirection: "row"
  },
  input1: {
    flex: 1,
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
    borderRightWidth: 0
  },
  input2: {
    flex: 1,
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
    borderLeftWidth: 0
  },
  optionContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10
  },
  optionText: {
    fontSize: 18,
    color: "#464D4E",
    marginLeft: 20
  },
  questionContainer: {
    alignItems: "center",
    marginVertical: 20
  },
  questionText: {
    fontSize: 18,
    color: "#464D4E"
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
    justifyContent: "space-between",
    width: "50%"
  }
});

export default DiagnoseInformation;

const Footer = props => {
  const generator = props.hideTitle ? props.images : props.titles;
  return (
    <View style={footerStyles.footer}>
      {generator.map((title, index) => (
        <View style={footerStyles.footerItem} key={index}>
          <Image
            style={footerStyles.footerImage}
            source={props.images[index]}
          />
          {props.hideTitle
            ? null
            : (
            <Text
              style={[
                footerStyles.footerItemText,
                index === props.active ? footerStyles.active : null
              ]}>
              {title}
            </Text>
              )}
        </View>
      ))}
    </View>
  );
};

const footerStyles = StyleSheet.create({
  footer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 60,
    backgroundColor: "#C4C4C4",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20
  },
  footerItem: {
    alignItems: "center",
    justifyContent: "center",
    height: "100%"
  },
  footerItemText: {
    fontSize: 13,
    color: "#fff",
    marginTop: 5
  },
  footerImage: {
    width: 20,
    height: 20,
    resizeMode: "contain"
  },
  active: {
    color: "#000"
  }
});

const Input = props => {
  return (
    <View style={[inputStyles.inputContainer]}>
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
        onChangeText={text => props.onChange(text)}
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
    justifyContent: "center",
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
  iconWithText: {
    position: "absolute",
    right: 30,
    top: 50
  },
  iconWithoutText: {
    position: "absolute",
    right: 30,
    top: 28
  },
  textArea: {
    height: 150
  },
  children: {}
});

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
