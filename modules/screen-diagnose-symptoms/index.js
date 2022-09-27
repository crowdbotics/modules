import React, { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  ScrollView,
  Pressable,
  TextInput
} from "react-native";

const DiagnoseSymptoms = () => {
  const [feverLevel, setFeverLevel] = useState(0);
  const [temperature, setTemperature] = useState("");
  const [feverTime, setFeverTime] = useState("");
  const [isFeverIncreasing, setIsFeverIncreasing] = useState(false);
  const [coughtLevel, setCoughtLevel] = useState(0);
  const [coughtTime, setCoughtTime] = useState("");
  const [wetCought, setWetCought] = useState("");
  const [isMucus, setIsMucus] = useState(false);
  const [coughColor, setCoughColor] = useState("");
  const [shortBreathLevel, setShortBreathLevel] = useState(0);
  const [shortBreathTime, setShortBreathTime] = useState("");
  const [isBreathingPain, setIsBreathingPain] = useState(false);
  const [musclePainLevel, setMusclePainLevel] = useState(0);
  const [chestPressureLevel, setChestPressureLevel] = useState(0);
  return (
    <View style={styles.container}>
      <ScrollView style={styles.body}>
        <View style={styles.header}>
          <Text style={styles.title}>Step 3</Text>
          <Text style={styles.subHeading}>Symptoms</Text>
          <Text style={styles.subHeading}>
            Symptoms will be ticked from 1 to 5, 5 being unwell.
          </Text>
        </View>
        <View style={styles.symptomItem}>
          <Text style={styles.symptomText}>Fever</Text>
          <SymptomLevel level={feverLevel} setLevel={x => setFeverLevel(x)} />
          <View style={styles.halfInputs}>
            <Input
              text="Faremheit for US Celcius for all other"
              value={temperature}
              onChange={x => setTemperature(x)}
              containerStyle={styles.input}
            />
            <Input
              text="How long have you had your fever?"
              value={feverTime}
              onChange={x => setFeverTime(x)}
              containerStyle={styles.input}
            />
          </View>
          <BinaryQuestion
            question="Has your temperature increase over this time?"
            value={isFeverIncreasing}
            setValue={x => setIsFeverIncreasing(x)}
          />
        </View>
        <View style={styles.symptomItem}>
          <Text style={styles.symptomText}>Cough</Text>
          <SymptomLevel level={coughtLevel} setLevel={x => setCoughtLevel(x)} />
          <View style={styles.halfInputs}>
            <Input
              text="How long have you had your cough?"
              value={coughtTime}
              onChange={x => setCoughtTime(x)}
              containerStyle={styles.input}
            />
            <Input
              text="Is your cought wet or dry?"
              value={wetCought}
              onChange={x => setWetCought(x)}
              containerStyle={styles.input}
            />
          </View>
          <BinaryQuestion
            question="Are you choughing up mucus?"
            value={isMucus}
            setValue={x => setIsMucus(x)}
          />
          <Input
            text="What color is mucus?"
            value={coughColor}
            onChange={x => setCoughColor(x)}
          />
        </View>
        <View style={styles.symptomItem}>
          <Text style={styles.symptomText}>Shortness of Breath</Text>
          <SymptomLevel
            level={shortBreathLevel}
            setLevel={x => setShortBreathLevel(x)}
          />
          <Input
            text="How long have you had shortness of breath?"
            value={shortBreathTime}
            onChange={x => setShortBreathTime(x)}
            containerStyle={styles.input}
          />
          <BinaryQuestion
            question="Has your temperature increase over this time?"
            value={isBreathingPain}
            setValue={x => setIsBreathingPain(x)}
          />
        </View>
        <View style={styles.symptomItem}>
          <Text style={styles.symptomText}>Muscle/Joint Pain</Text>
          <SymptomLevel
            level={musclePainLevel}
            setLevel={x => setMusclePainLevel(x)}
          />
        </View>
        <View style={styles.symptomItem}>
          <Text style={styles.symptomText}>Chest Pressure</Text>
          <SymptomLevel
            level={chestPressureLevel}
            setLevel={x => setChestPressureLevel(x)}
          />
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
    flex: 1,
    marginBottom: 60
  },
  header: {
    borderBottomColor: "#e6e6e6",
    borderBottomWidth: 1,
    marginHorizontal: 20,
    paddingBottom: 20
  },
  title: {
    fontSize: 42,
    textAlign: "center",
    marginBottom: 10,
    color: "#000"
  },
  subHeading: {
    fontSize: 15,
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
  symptomItem: {
    paddingVertical: 10,
    borderBottomColor: "#e6e6e6",
    borderBottomWidth: 1,
    marginHorizontal: 20
  },
  symptomText: {
    fontSize: 16,
    fontWeight: "bold",
    textTransform: "uppercase"
  },
  halfInputs: {
    flexDirection: "row"
  },
  input: {
    marginHorizontal: 5
  }
});

export default DiagnoseSymptoms;
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

const SymptomLevel = ({ level, setLevel }) => {
  let currentLevel = level;
  let width = 20;
  let height = 20;
  let radius = 5;
  const giveDimentions = () => {
    return {
      width: (width += 4),
      height: (height += 4),
      borderRadius: (radius += 1)
    };
  };
  return (
    <View style={symptomLevelStyles.container}>
      {[1, 2, 3, 4, 5].map((item, index) => (
        <Pressable
          onPress={() => {
            setLevel(item);
            currentLevel = item;
          }}
          key={index}
          style={[
            symptomLevelStyles.check,
            giveDimentions(),
            item === currentLevel ? symptomLevelStyles.fill : null
          ]}
        />
      ))}
    </View>
  );
};

const symptomLevelStyles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 20,
    marginVertical: 10
  },
  check: {
    borderWidth: 2,
    borderColor: "#C4C4C4",
    marginHorizontal: 5
  },
  fill: {
    backgroundColor: "#C4C4C4"
  }
});

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

const BinaryQuestion = props => {
  return (
    <View style={binaryQuestionStyles.questionContainer}>
      <Text style={binaryQuestionStyles.questionText}>{props.question}</Text>
      <View style={binaryQuestionStyles.checkboxContainer}>
        <Pressable onPress={() => props.setValue(!props.value)}>
          <Image
            source={
              props.value
                ? require("./assets/checkboxIconActive.png")
                : require("./assets/checkboxIcon.png")
            }
            style={binaryQuestionStyles.checkbox}
          />
        </Pressable>
        <Text style={binaryQuestionStyles.questionText}>Yes</Text>
        <Pressable onPress={() => props.setValue(!props.value)}>
          <Image
            source={
              !props.value
                ? require("./assets/checkboxIconActive.png")
                : require("./assets/checkboxIcon.png")
            }
            style={binaryQuestionStyles.checkbox}
          />
        </Pressable>
        <Text style={binaryQuestionStyles.questionText}>No</Text>
      </View>
    </View>
  );
};

const binaryQuestionStyles = StyleSheet.create({
  questionContainer: {
    marginVertical: 10
  },
  questionText: {
    fontSize: 14,
    color: "#464D4E"
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
    justifyContent: "flex-start",
    width: "50%"
  },
  checkbox: {
    width: 20,
    height: 20,
    marginHorizontal: 10
  }
});

const Button = params => {
  const backgroundColor = params.color ? params.color : "#000";
  const textColor = params.textColor ? params.textColor : "#fff";
  const btnStyle = {
    backgroundColor: params.outline ? "#fff" : backgroundColor,
    borderColor: params.outline ? backgroundColor : null,
    borderWidth: params.outline ? 1 : 0
  };
  const btnText = {
    color: params.outline ? "#000" : textColor
  };
  return (
    <View style={buttonStyles.btnContainer}>
      <View style={!params.hideShadow ? buttonStyles.shadowContainer : null}>
        <Pressable
          style={[buttonStyles.btn, btnStyle, params.style]}
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
    paddingHorizontal: 40,
    justifyContent: "center",
    marginVertical: 20
  },
  shadowContainer: {
    shadowColor: "rgba(0, 0, 0, 0.5)",
    elevation: 10,
    backgroundColor: "#fff",
    borderRadius: 10
  },
  btn: {
    height: 50,
    width: "100%",
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
