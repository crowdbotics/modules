import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  Pressable,
  TextInput,
  ScrollView
} from "react-native";

const SetYourRate = () => {
  const [userRate, setUserRate] = useState(10);
  const [clientRate, setClientRate] = useState(0);
  const [skills, setSkills] = useState([]);
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [description, setDescription] = useState("");
  useEffect(() => {
    setClientRate(17);
    setSkills([
      "Skills name",
      "Skills name",
      "Skills name",
      "Skills name",
      "Skills name",
      "Skills name",
      "Skills name",
      "Skills name",
      "Skills name"
    ]);
  }, []);
  const handleSkills = index => {
    if (selectedSkills.includes(index)) {
      setSelectedSkills(selectedSkills.filter(s => s !== index));
    } else {
      setSelectedSkills([...selectedSkills, index]);
    }
  };
  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.heading}>Set your rate/hr</Text>
        <InputToken value={userRate} setValue={setUserRate} />
        <View style={styles.rateContainer}>
          <Text style={styles.heading}>Your Rate</Text>
          <View
            style={[styles.rateCircle, userRate < clientRate && styles.red]}>
            <Text
              style={[styles.rateText, userRate < clientRate && styles.red]}>
              ${userRate}/hr
            </Text>
            <Text style={userRate < clientRate ? styles.red : styles.greenText}>
              Client Rate:
            </Text>
            <Text style={userRate < clientRate ? styles.red : styles.greenText}>
              ${clientRate && clientRate.toFixed(2)}
            </Text>
          </View>
          <View style={[styles.pillBox, userRate < clientRate && styles.red]}>
            <Text style={userRate < clientRate ? styles.red : styles.greenText}>
              {userRate < clientRate ? "Low" : "Good"}
            </Text>
          </View>
          <Text style={styles.description}>
            {userRate < clientRate
              ? "Based on market supply & demand and similar Tasker experience, you could be earning more at a Tasker rate of $" +
                clientRate +
                "/hr"
              : "Based on market supply & demand and similar Tasker experience, you are earning good at a rate of $" +
                userRate +
                "/hr"}
          </Text>
          <Pressable>
            <Text style={userRate < clientRate ? styles.red : styles.greenText}>
              How is this determined?
            </Text>
          </Pressable>
        </View>
        <View style={styles.skillsContainer}>
          <Text style={styles.heading}>Choose your skills</Text>
          <Text style={styles.subText}>You can select multiple skills</Text>
          <View style={styles.skillsItems}>
            {skills.map((skill, index) => (
              <Pressable
                style={[
                  styles.skill,
                  selectedSkills.includes(index) && styles.selectedSkill
                ]}
                key={index}
                onPress={() => handleSkills(index)}>
                <Text>{skill}</Text>
              </Pressable>
            ))}
          </View>
        </View>
        <Text style={styles.heading}>Description</Text>
        <Input
          placeholder="Type instructions here ..."
          textArea={true}
          value={description}
          onChange={setDescription}
        />
        <Button buttonText="Continue to Verification" style={styles.button} />
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
    fontSize: 18,
    color: "#4A4A4A"
  },
  rateContainer: {
    alignItems: "center"
  },
  rateCircle: {
    marginTop: 10,
    width: 150,
    height: 150,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 75,
    borderColor: "#009245",
    borderWidth: 10
  },
  rateText: {
    fontSize: 32,
    color: "#009245",
    fontWeight: "bold"
  },
  red: {
    borderColor: "#FF0000",
    color: "#FF0000"
  },
  greenText: {
    color: "#009245"
  },
  pillBox: {
    width: 150,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    borderColor: "#009245",
    borderWidth: 1,
    marginVertical: 10
  },
  description: {
    fontSize: 14,
    color: "#4A4A4A",
    textAlign: "center",
    width: "90%",
    marginBottom: 10
  },
  skillsContainer: {
    marginVertical: 20
  },
  subText: {
    fontSize: 12
  },
  skillsItems: {
    marginTop: 10,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    alignItems: "center"
  },
  skill: {
    width: "30%",
    height: 35,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    borderColor: "#000",
    borderWidth: 1,
    marginVertical: 5,
    marginHorizontal: 5
  },
  selectedSkill: {
    backgroundColor: "#e6e6e6"
  },
  button: {
    marginVertical: 20
  }
});

export default SetYourRate;

const InputToken = ({ value, setValue }) => {
  const increment = () => {
    setValue(value + 1);
  };
  const decrement = () => {
    if (value > 0) {
      setValue(value - 1);
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
      <Text style={inputTokenStyles.text}>${value}/hr</Text>
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
    marginVertical: 20,
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
