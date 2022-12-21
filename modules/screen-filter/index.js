import React, { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  TextInput,
  ScrollView,
  Pressable
} from "react-native";

import { Slider } from "react-native-elements";

const Filter = () => {
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState([]);
  const [rangeStart, setRangeStart] = useState("");
  const [rangeEnd, setRangeEnd] = useState("");
  const [location, setLocation] = useState("");
  const [age, setAge] = useState("");
  const [grades, setGrades] = useState("");
  const [interests, setInterests] = useState("");
  const handleSelection = (title) => {
    if (selected.includes(title)) {
      setSelected(selected.filter((item) => item !== title));
    } else {
      setSelected([...selected, title]);
    }
  };
  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Input
          text="Filter"
          value={search}
          onChange={setSearch}
          icon={require("./assets/filterIcon.png")}
        />
        <Separator title={"Desired Days"} />
        <Tile
          title={"Sunday"}
          selected={selected.includes("Sunday")}
          onPress={(x) => handleSelection(x)}
        />
        <Tile
          title={"Wednesday"}
          selected={selected.includes("Wednesday")}
          onPress={(x) => handleSelection(x)}
        />
        <Separator title={"Desired Days"} />
        <Tile
          title={"Half-Day Mornins"}
          selected={selected.includes("Half-Day Mornins")}
          onPress={(x) => handleSelection(x)}
        />
        <Tile
          title={"Full Day"}
          selected={selected.includes("Full Day")}
          onPress={(x) => handleSelection(x)}
        />
        <Separator title={"Budget"} />
        <Tile
          title={"Per week"}
          selected={selected.includes("Per week")}
          onPress={(x) => handleSelection(x)}
        />
        <View style={styles.halfInputs}>
          <Input
            text="From"
            value={rangeStart}
            onChange={setRangeStart}
            containerStyle={styles.inputContainer}
          />
          <Input
            text="To"
            value={rangeEnd}
            onChange={setRangeEnd}
            containerStyle={styles.inputContainer}
          />
        </View>
        <Slider
          minimumValue={0}
          maximumValue={100}
          minimumTrackTintColor="#a1a1a1"
          maximumTrackTintColor="#e6e6e6"
          thumbTintColor="#000"
          thumbStyle={styles.thumb}
          step={1}
          value={50}
        />
        <Separator title={"Activity"} />
        <Input
          text="Location"
          value={location}
          onChange={setLocation}
          placeholder="10 miles"
        />
        <Input text="Age" value={age} onChange={setAge} />
        <Input text="Grades" value={grades} onChange={setGrades} />
        <Input text="Interests" value={interests} onChange={setInterests} />
        <TabView
          tabTitles={["Interest", "Interest", "Interest"]}
          style={styles.tabs}
          backgroundColor="#fff"
          selected={0}
          tabColor="#f1f1f1"
        />
        <Button buttonText="Apply" />
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
  halfInputs: {
    flexDirection: "row",
    marginTop: 20,
    justifyContent: "space-between"
  },
  inputContainer: {
    flex: 1,
    marginHorizontal: 10
  },
  thumb: {
    width: 20,
    height: 20
  },
  tabs: {
    backgroundColor: "#fff",
    justifyContent: "space-between",
    width: "100%"
  }
});

export default Filter;
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
        onChangeText={(text) => props.onChange(text)}
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
    // flex: 1
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

const TabView = ({
  tabTitles,
  selected,
  onPress,
  tabColor,
  backgroundColor,
  style
}) => {
  const tabColorStyle = {
    backgroundColor: tabColor || "#fff"
  };
  const backgroundColorStyle = {
    backgroundColor: backgroundColor || "#F1F1F1"
  };
  const propStyle = style || {};
  return (
    <View
      style={[tabViewStyles.paletteContainer, backgroundColorStyle, propStyle]}
    >
      {tabTitles.map((title, index) => (
        <Pressable
          onPress={() => (onPress ? onPress(index) : null)}
          style={
            index === selected
              ? [tabViewStyles.selected, tabColorStyle]
              : [tabViewStyles.unSelected, backgroundColorStyle]
          }
          key={index}
        >
          <Text>{title}</Text>
        </Pressable>
      ))}
    </View>
  );
};

const tabViewStyles = StyleSheet.create({
  paletteContainer: {
    width: "80%",
    height: 48,
    backgroundColor: "#E4E4E4",
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 10,
    padding: 6,
    marginVertical: 10
  },
  selected: {
    borderRadius: 10,
    flex: 1,
    backgroundColor: "#fff",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "gray",
    elevation: 10
  },
  unSelected: {
    flex: 1,
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#E4E4E4",
    borderRadius: 10
  }
});

const Separator = ({ title }) => {
  return (
    <View style={separatorStyles.separator}>
      <Text style={separatorStyles.separatorText}>{title}</Text>
      <TabView
        tabTitles={["Choose"]}
        selected={0}
        style={separatorStyles.tabView}
      />
    </View>
  );
};

const separatorStyles = StyleSheet.create({
  separator: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 10
  },
  separatorText: {
    fontSize: 16,
    color: "#12D790",
    flex: 1
  },
  tabView: {
    width: 120,
    marginVertical: 0
  }
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

const Tile = ({ title, onPress, selected }) => {
  return (
    <View style={tileStyles.container}>
      <Text style={tileStyles.title}>{title}</Text>
      <Checkbox
        style={tileStyles.checkbox}
        value={selected}
        setValue={() => onPress(title)}
      />
    </View>
  );
};

const tileStyles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    borderBottomColor: "#e6e6e6",
    borderBottomWidth: 1
  },
  title: {
    fontSize: 16,
    color: "#111112"
  }
});
const Button = (params) => {
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
