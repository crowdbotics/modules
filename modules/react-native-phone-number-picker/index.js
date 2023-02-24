import React, { useState } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  FlatList,
  Modal
} from "react-native";
import { Input } from "react-native-elements";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { countryCodes } from "./codes";

const PhoneNumberPicker = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [dialCode, setDialCode] = useState("+376");
  const [flag, setFlag] = useState("🇦🇩");

  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity onPress={() => handleUpdate(item)} style={[styles.item]}>
        <Text style={styles.flag}>{item.flag}</Text>
        <Text style={[styles.title]}>
          {item.name} <Text>({item.dial_code})</Text>
        </Text>
      </TouchableOpacity>
    );
  };
  const handleUpdate = (item) => {
    setDialCode(item.dial_code);
    setFlag(item.flag);
    setModalVisible(false);
  };
  return (
    <View style={styles.container}>
      <View style={styles.InputContainer}>
        <TouchableOpacity style={styles.InputContainer} onPress={() => setModalVisible(true)}>
          <Text style={styles.dialCode}>{flag} {" "}<Text>{dialCode}</Text></Text>
        </TouchableOpacity>
        <Input
          placeholder="Enter Number"
          onChangeText={setPhoneNumber}
          value={phoneNumber}
          containerStyle={styles.searchBarContainerStyle}
          inputContainerStyle={styles.searchBarInputContainerStyle}
          inputStyle={styles.searchBarInputStyle}
        />
      </View>
      <Modal
        animationType="slide"
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <TouchableOpacity
          style={styles.mainIconView}
          onPress={() => setModalVisible(false)}
        >
          <MaterialCommunityIcons name="close-thick" color="black" size={30} />
        </TouchableOpacity>
        <FlatList
          data={countryCodes}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          style={styles.flatList}
        />
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 10
  },
  item: {
    padding: 10,
    marginVertical: 8,
    marginHorizontal: 16,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center"
  },
  InputContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center"
  },
  title: {
    fontSize: 18
  },
  flag: {
    marginRight: 10
  },
  dialCode: {
    fontSize: 16,
    marginBottom: 10,
    backgroundColor: "#c0c0c0",
    padding: 15,
    borderRadius: 5
  },
  flatList: {
    marginTop: 10
  },
  mainIconView: {
    alignSelf: "flex-end",
    paddingTop: 20,
    paddingRight: 20
  },
  searchBarContainerStyle: {
    width: "75%",
    backgroundColor: "white",
    borderBottomColor: "white",
    borderTopColor: "white",
    marginTop: 15
  },

  searchBarInputContainerStyle: {
    backgroundColor: "white"
  },

  searchBarInputStyle: {
    color: "black",
    fontSize: 16
  }
});

export default {
  title: "Phone Number Picker",
  navigator: PhoneNumberPicker
};
