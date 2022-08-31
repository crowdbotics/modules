import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  Pressable,
  ScrollView,
  TextInput
} from "react-native";

const TaskDetails = () => {
  const [sizeOptions, setSizeOptions] = useState([]);
  const [selectedSize, setSelectedSize] = useState(null);
  const [workOptions, setWorkOptions] = useState([]);
  const [selectedWork, setSelectedWork] = useState(null);
  const [description, setDescription] = useState("");
  const [expanded, setExpanded] = useState([]);
  useEffect(() => {
    setSizeOptions([
      {
        label: "Small",
        estimatedTime: "1 hr",
        description: "A closet, stove or refrigerator"
      },
      {
        label: "Medium",
        estimatedTime: "2-3 hrs",
        description: "1-2 bedroom apartments"
      },
      {
        label: "Large",
        estimatedTime: "4+ hrs",
        description: "2-3 bedroom home"
      }
    ]);
    setWorkOptions([
      {
        label: "Weekly",
        description: "Save 10%"
      },
      {
        label: "Medium - Est. 2-3 hrs",
        description: "Save 25% - Most popular"
      },
      {
        label: "Large - Est. 4+ hrs",
        description: "Save 5%"
      },
      {
        label: "Just Once"
      }
    ]);
  }, []);
  const handleExpand = index => {
    if (expanded.includes(index)) {
      setExpanded(expanded.filter(i => i !== index));
    } else {
      setExpanded([...expanded, index]);
    }
  };
  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.felxRow}>
          <Text style={styles.heading}>Task Details</Text>
          <Image
            style={styles.icon}
            source={require("./assets/closeIcon.png")}
          />
        </View>
        <View style={styles.cardContainer}>
          <Text style={styles.title}>Booking schedule</Text>
          <View style={styles.input}>
            <Text>Address, Location</Text>
            <Image
              style={styles.icon}
              source={require("./assets/locationIcon.png")}
            />
          </View>
          <View style={styles.input}>
            <Text>Date</Text>
            <Image
              style={styles.icon}
              source={require("./assets/calendarIcon.png")}
            />
          </View>
          <View style={styles.input}>
            <Text>Time</Text>
            <Image
              style={styles.icon}
              source={require("./assets/clockIcon.png")}
            />
          </View>
        </View>
        <Pressable style={styles.felxRow} onPress={() => handleExpand(0)}>
          <Text style={styles.title}>
            What is the estimated size of your task?
          </Text>
          <Image
            style={styles.icon}
            source={
              expanded.includes(0)
                ? require("./assets/dropdownIconExpanded.png")
                : require("./assets/dropdownIconCollapsed.png")
            }
          />
        </Pressable>
        {expanded.includes(0) && (
          <View style={styles.cardContainer}>
            {sizeOptions.map((option, index) => (
              <View key={index} style={styles.optionContainer}>
                <Checkbox
                  value={option === selectedSize}
                  setValue={() => setSelectedSize(option)}
                />
                <Text style={styles.optionText}>
                  {option.label} - Est. {option.estimatedTime}{" "}
                  <Text style={styles.subText}>{option.description}</Text>
                </Text>
              </View>
            ))}
          </View>
        )}

        <Pressable style={styles.felxRow} onPress={() => handleExpand(1)}>
          <Text style={styles.title}>
            What is the amount of work you can handle?
          </Text>
          <Image
            style={styles.icon}
            source={
              expanded.includes(0)
                ? require("./assets/dropdownIconExpanded.png")
                : require("./assets/dropdownIconCollapsed.png")
            }
          />
        </Pressable>
        {expanded.includes(1) && (
          <View style={styles.cardContainer}>
            {workOptions.map((option, index) => (
              <View key={index} style={styles.optionContainer}>
                <Checkbox
                  value={option === selectedWork}
                  setValue={() => setSelectedWork(option)}
                />
                <Text style={styles.optionText}>
                  {option.label} {"\t"}
                  <Text style={[styles.subText, styles.blueText]}>
                    {option.description}
                  </Text>
                </Text>
              </View>
            ))}
          </View>
        )}

        <View style={styles.felxRow}>
          <Text style={styles.title}>What else should we know?</Text>
        </View>
        <Input
          text="Add instructions"
          value={description}
          onChange={setDescription}
          placeholder="Type instructions here..."
          textArea={true}
          containerStyle={styles.inputContainer}
        />
        <Button buttonText="Show available freelancers" style={styles.button} />
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  heading: {
    fontSize: 20,
    color: "#4A4A4A"
  },
  felxRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    marginVertical: 10
  },
  icon: {
    width: 18,
    height: 18,
    resizeMode: "contain"
  },
  cardContainer: {
    backgroundColor: "#f7f7f7",
    padding: 20
  },
  title: {
    fontSize: 16
  },
  input: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
    height: 50,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    marginVertical: 5
  },
  optionContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 5
  },
  optionText: {
    flex: 1,
    marginLeft: 10
  },
  subText: {
    fontSize: 12,
    color: "#4A4A4A",
    marginLeft: 10
  },
  blueText: {
    color: "#3444CE"
  },
  inputContainer: {
    marginVertical: 10,
    marginHorizontal: 20
  },
  button: {
    marginHorizontal: 40,
    marginVertical: 20
  }
});

export default TaskDetails;

const Checkbox = props => {
  return (
    <Pressable
      onPress={() => {
        props.setValue(!props.value);
      }}
      style={[checkboxStyles.container, props.style]}>
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
