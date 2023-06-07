import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  Image,
  Pressable
} from "react-native";

const DaysFilter = () => {
  const [days, setDays] = useState([]);
  const [selectedDays, setSelectedDays] = useState([]);
  useEffect(() => {
    setDays([
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday"
    ]);
  }, []);
  const handleDayPress = day => {
    const newSelectedDays = [...selectedDays];
    if (newSelectedDays.includes(day)) {
      newSelectedDays.splice(newSelectedDays.indexOf(day), 1);
    } else {
      newSelectedDays.push(day);
    }
    setSelectedDays(newSelectedDays);
    console.log(selectedDays);
  };
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Desired days</Text>
      <ScrollView style={styles.list}>
        {days.map((day, index) => (
          <View style={styles.dayContainer} key={index}>
            <Text style={styles.text}>{day}</Text>
            <Pressable onPress={() => handleDayPress(day)}>
              <Image
                source={
                  selectedDays.includes(day)
                    ? require("./assets/checkboxIconActive.png")
                    : require("./assets/checkboxIcon.png")
                }
                style={styles.checkbox}
              />
            </Pressable>
          </View>
        ))}
      </ScrollView>
      <Button buttonText={"Done"} />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20
  },
  heading: {
    fontSize: 16
  },
  list: {
    flex: 1,
    marginTop: 50
  },
  dayContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
    borderBottomColor: "#eee",
    borderBottomWidth: 1,
    paddingHorizontal: 10
  },
  text: {
    fontSize: 16
  },
  checkbox: {
    width: 25,
    height: 25
  }
});

export default DaysFilter;

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
