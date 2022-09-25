import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  Modal,
  Pressable,
  Image,
  TextInput,
  FlatList
} from "react-native";

const ARDevices = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedTab, setSelectedTab] = useState(0);
  const [selectedDevice, setSelectedDevice] = useState(null);
  const [devices, setDevices] = useState([]);
  useEffect(() => {
    setDevices(["iPhone 14", "iPhone 13", "iPhone X", "iPhone 12"]);
  }, []);
  return (
    <View style={styles.container}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.modalContainer}>
          <View style={styles.modalView}>
            <Input
              text="Search"
              placeholder="Search"
              value={search}
              onChange={setSearch}
              icon={require("./assets/searchIcon.png")}
              backgroundColor="#f6f6f6"
            />
            <Text style={styles.heading}>Categories</Text>
            <TabView
              tabTitles={["All", "Mobile", "Laptops"]}
              selected={selectedTab}
              onPress={setSelectedTab}
            />
            <View style={styles.flexRow}>
              <Text style={styles.heading}>Popolar products</Text>
              <Pressable>
                <Text style={styles.subText}>See all</Text>
              </Pressable>
            </View>
            <FlatList
              showsHorizontalScrollIndicator={false}
              data={devices}
              renderItem={({ item }) => (
                <Pressable
                  style={[
                    styles.deviceContainer,
                    item === selectedDevice && styles.selectedDevice
                  ]}
                  onPress={() => setSelectedDevice(item)}>
                  <Image
                    source={require("./assets/phoneIcon.png")}
                    style={styles.deviceIcon}
                  />
                  <Text style={styles.deviceName}>{item}</Text>
                </Pressable>
              )}
              keyExtractor={item => item}
              horizontal={true}
            />
            <View style={styles.flexRow}>
              <Button
                buttonText="Save"
                style={styles.modalButton}
                hideShadow
                onPress={() => setModalVisible(!modalVisible)}
              />
              <Button
                buttonText="Discard"
                style={styles.modalButton}
                backgroundColor="#fff"
                borderColor="#000"
                textColor="#000"
                hideShadow={true}
                onPress={() => setModalVisible(!modalVisible)}
              />
            </View>
          </View>
        </View>
      </Modal>
      <Button
        buttonText="Open Modal"
        style={styles.button}
        onPress={() => setModalVisible(true)}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  background: {
    resizeMode: "cover",
    height: "100%",
    width: "100%"
  },
  heading: {
    fontSize: 14,
    fontWeight: "bold",
    marginLeft: 20,
    textTransform: "uppercase"
  },
  button: {
    marginHorizontal: 40,
    bottom: 50,
    position: "absolute",
    left: 0,
    right: 0
  },
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
    width: "100%",
    marginTop: 22
  },
  modalView: {
    backgroundColor: "white",
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: "100%",
    paddingHorizontal: 20,
    paddingVertical: 30
  },
  flexRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 20
  },
  subText: {
    color: "#9B9B9B",
    fontSize: 12
  },
  deviceContainer: {
    width: 150,
    height: 150,
    backgroundColor: "#F6F6F6",
    borderRadius: 10,
    padding: 20,
    justifyContent: "space-between",
    marginRight: 20
  },
  deviceIcon: {
    width: 40,
    height: 70,
    alignSelf: "center",
    resizeMode: "contain"
  },
  deviceName: {
    fontSize: 16,
    color: "#000"
  },
  selectedDevice: {
    backgroundColor: "#D2E6FF"
  },
  modalButton: {
    flex: 1,
    marginHorizontal: 20
  }
});

export default ARDevices;
const Button = params => {
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
    top: 45,
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
  style,
  icons
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
      style={[tabViewStyles.paletteContainer, backgroundColorStyle, propStyle]}>
      {tabTitles.map((title, index) => (
        <Pressable
          onPress={() => (onPress ? onPress(index) : null)}
          style={
            index === selected
              ? [tabViewStyles.selected, tabColorStyle, tabViewStyles.tabItem]
              : [
                  tabViewStyles.unSelected,
                  backgroundColorStyle,
                  tabViewStyles.tabItem
                ]
          }
          key={index}>
          {icons
            ? (
            <Image
              source={icons[index]}
              style={[
                tabViewStyles.icon,
                index === selected
                  ? tabViewStyles.selectedIcon
                  : tabViewStyles.unSelectedIcon
              ]}
            />
              )
            : null}
          <Text>{title}</Text>
        </Pressable>
      ))}
    </View>
  );
};

const tabViewStyles = StyleSheet.create({
  paletteContainer: {
    height: 48,
    backgroundColor: "#E4E4E4",
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 10,
    padding: 6,
    marginVertical: 10
  },
  tabItem: {
    borderRadius: 10,
    flex: 1,
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row"
  },
  selected: {
    shadowColor: "rgba(0, 0, 0, 0.5)",
    elevation: 10,
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.2,
    shadowRadius: 5
  },
  unSelected: {
    backgroundColor: "#f1f1f1"
  },
  icon: {
    width: 20,
    height: 20,
    resizeMode: "contain",
    marginRight: 5
  },
  selectedIcon: {
    tintColor: "#000"
  },
  unSelectedIcon: {
    tintColor: "#7C7C7C"
  }
});
