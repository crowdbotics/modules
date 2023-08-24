import React, { useState } from "react";
import { FlatList, Image, Pressable, StyleSheet, Text, TextInput, View } from "react-native";

const EventListing = ({
  navigation
}) => {
  const [searchText, setSearchText] = useState("");
  const events = [{
    id: "1",
    name: "Test",
    start_date: "2023-05-02",
    start_time: "17:55",
    category: {
      name: "Category test"
    }
  }, {
    id: "2",
    name: "Test 2",
    start_date: "2023-04-27",
    start_time: "13:22",
    category: {
      name: "Category test 2"
    }
  }];

  function searchEvents() {
    const filteredObjs = events?.filter(obj => {
      const str = JSON.stringify(obj).toLowerCase();
      return str.includes(searchText.toLowerCase());
    });
    return filteredObjs;
  }

  const eventsToMap = searchText ? searchEvents() : events;

  const Item = item => {
    return <View style={styles.box}>
      <View style={styles.itemContainer}>
        <Image source={require("./assets/blackbaudLogo.png")} style={styles.image} resizeMode="contain" />
        <View style={styles.Txt}>
          <Text style={styles.titleTxt}>{item?.data?.name}</Text>

          <View style={styles.nameContainer}>
            <Text style={styles.addressTxt}>
              {item?.data?.category?.name}
            </Text>
          </View>

          <View style={styles.dateTimeContainer}>
            <Image source={require("./assets/calendarIcon.png")} style={styles.calendarIcon} />
            <Text style={styles.dateTxt}>
              {item?.data?.start_date} {item?.data?.start_time}
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.itemActionContainer}>

        <Pressable style={styles.loginButton} onPress={() => navigation.navigate("blackbaudEventDetails", {
          id: item?.data?.id
        })} >
          <Text style={styles.textColor}>
            View Details
          </Text>
        </Pressable>

      </View>
    </View>;
  };

  return (
    <View style={styles.container}>
      <TextInput placeholder="Search..." style={styles.formInput} onChangeText={setSearchText} placeholderTextColor={"grey"} />
      <FlatList data={eventsToMap} renderItem={({ item }) => <Item data={item} />} keyExtractor={item => item.id} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f8f8f8",
    flex: 1
  },
  formInput: {
    backgroundColor: "#d9d5d545",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#D3D3D3",
    marginVertical: 10,
    marginHorizontal: 20,
    color: "#000"
  },
  box: {
    height: 200,
    width: "93%",
    backgroundColor: "white",
    alignSelf: "center",
    marginVertical: 20,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4
  },
  image: {
    height: 60,
    marginVertical: 20,
    marginHorizontal: 20,
    flex: 1
  },
  Txt: {
    flex: 3,
    marginVertical: 20,
    marginHorizontal: 0
  },
  titleTxt: {
    fontSize: 14
  },
  addressTxt: {
    fontSize: 14
  },
  dateTxt: {
    fontSize: 14
  },
  dateTimeContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 7
  },
  calendarIcon: {
    height: 15,
    width: 14,
    marginRight: 10
  },
  itemContainer: {
    flexDirection: "row"
  },
  nameContainer: {
    flexDirection: "row",
    alignItems: "center"
  },
  itemActionContainer: {
    marginTop: 20
  },
  loginButton: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    alignSelf: "center",
    marginBottom: 25,
    paddingHorizontal: 12,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#aeafb1",
    width: "80%",
    height: 50
  },
  textColor: {
    fontWeight: "500",
    color: "#212327",
    fontSize: 16
  }
});
export default EventListing;
