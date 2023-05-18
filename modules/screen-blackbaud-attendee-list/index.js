import React, { useState } from "react";
import { FlatList, Image, Pressable, StyleSheet, Text, TextInput, View } from "react-native";

const AttendeeList = props => {
  const attendees = [{
    name: "Test",
    email: "test@gmail.com"
  }, {
    name: "Test 2",
    email: "test2@gmail.com"
  }];
  const [searchText, setSearchText] = useState("");

  function searchAttendees() {
    const filteredObjs = attendees?.filter(obj => {
      const str = JSON.stringify(obj).toLowerCase();
      return str.includes(searchText.toLowerCase());
    });
    return filteredObjs;
  }

  const attendeesToMap = searchText ? searchAttendees() : attendees;

  const Item = ({ data }) => {
    return <View style={styles.userCard}>
        <Image source={require("./assets/userIcon.png")} style={styles.imageStyles} />
        <View style={styles.contentView}>
          <Text style={styles.nameText}>{data.name}</Text>
          <Text style={styles.emailText}>{data.email}</Text>
          <View style={styles.buttonView}>
            <Pressable style={styles.loginButton} onPress={() => {}} >
              <Text style={styles.textColor}>
                Attended
              </Text>
            </Pressable>
            <Pressable style={styles.loginButton} onPress={() => {}} >
              <Text style={styles.textColor}>
                Not Attended
              </Text>
            </Pressable>
          </View>
        </View>
      </View>;
  };

  return (
    <View style={styles.container}>
      <TextInput placeholder="Search..." style={styles.formInput} onChangeText={setSearchText} placeholderTextColor={"grey"} />
      <FlatList
        data={attendeesToMap}
        renderItem={({ item }) => <Item data={item} />}
        keyExtractor={item => item.email}
        ListEmptyComponent={() => <View style={styles.centeredView}><Text>No record found.</Text></View>} />
    </View>
  );
};

const styles = StyleSheet.create({
  formInput: {
    backgroundColor: "#d9d5d545",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#D3D3D3",
    marginTop: 10,
    marginHorizontal: 20,
    color: "#000"
  },
  contentView: {
    marginVertical: 19
  },
  centeredView: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10
  },
  buttonView: {
    width: "70%",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10
  },
  nameText: {
    color: "#1E2022",
    fontWeight: "600"
  },
  emailText: {
    color: "#23AAFA",
    fontSize: 12,
    marginTop: 5
  },
  imageStyles: {
    height: 86,
    width: 86,
    borderRadius: 14,
    marginVertical: 19,
    marginLeft: 19,
    marginRight: 10
  },
  userCard: {
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
    borderRadius: 10,
    height: 124,
    marginHorizontal: 14,
    marginVertical: 15,
    flexDirection: "row"
  },
  container: {
    flex: 1,
    backgroundColor: "#ECECEC"
  },
  loginButton: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    alignSelf: "center",
    marginBottom: 25,
    paddingHorizontal: 12,
    backgroundColor: "#075a7c",
    height: 35
  },
  textColor: {
    fontWeight: "500",
    color: "#fff",
    fontSize: 16
  }
});
export default AttendeeList;
