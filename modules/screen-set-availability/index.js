import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Image, Pressable } from "react-native";
const SetAvailability = () => {
  const [days, setDays] = useState([]);
  const [selectedDays, setSelectedDays] = useState([]);
  useEffect(() => {
    setDays([
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday"
    ]);
  }, []);
  const handleDayPress = (day) => {
    if (selectedDays.includes(day)) {
      setSelectedDays(
        selectedDays.filter((selectedDay) => selectedDay !== day)
      );
    } else {
      setSelectedDays([...selectedDays, day]);
    }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Availability</Text>
      <View style={styles.cardContainer}>
        <View style={styles.flexRow}>
          <Text style={styles.heading}>Select time</Text>
          <Image
            style={styles.icon}
            source={require("./assets/dropdownIcon.png")}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text>9:00 AM - 11:00 AM</Text>
          <Image
            style={styles.icon}
            source={require("./assets/clockIcon.png")}
          />
        </View>
      </View>
      <View style={styles.cardContainer}>
        <View style={styles.flexRow}>
          <Text style={styles.heading}>Select Days</Text>
          <Image
            style={styles.icon}
            source={require("./assets/dropdownIcon.png")}
          />
        </View>
        <View style={styles.daysContainer}>
          {days.map((day, index) => (
            <View style={styles.dayItem} key={index}>
              <Checkbox
                value={selectedDays.includes(day)}
                setValue={() => handleDayPress(day)}
              />
              <Text style={styles.dayText}>{day}</Text>
            </View>
          ))}
        </View>
      </View>
      <View style={styles.cardContainer}>
        <View style={styles.flexRow}>
          <Text style={styles.heading}>Dates Off</Text>
          <Image
            style={styles.icon}
            source={require("./assets/dropdownIcon.png")}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text>March 12, 2022</Text>
          <Image
            style={styles.icon}
            source={require("./assets/calendarIcon.png")}
          />
        </View>
      </View>
      <Footer
        titles={["Home", "Task", "Availability", "Account", "My Business"]}
        images={[
          require("./assets/homeIcon.png"),
          require("./assets/listIcon.png"),
          require("./assets/availabilityIconActive.png"),
          require("./assets/accountIcon.png"),
          require("./assets/businessIcon.png")
        ]}
        active={2}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  title: {
    fontSize: 25,
    fontWeight: "bold",
    marginLeft: 20
  },
  cardContainer: {
    backgroundColor: "#f1f1f1",
    marginVertical: 10,
    paddingHorizontal: 20,
    paddingVertical: 10
  },
  flexRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 10
  },
  icon: {
    width: 20,
    height: 20,
    resizeMode: "contain"
  },
  heading: {
    fontSize: 16,
    color: "#4A4A4A"
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 10,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    height: 50
  },
  daysContainer: {
    flexDirection: "row",
    flexWrap: "wrap"
  },
  dayItem: {
    width: "50%",
    flexDirection: "row",
    paddingHorizontal: 10,
    marginVertical: 5
  },
  dayText: {
    fontSize: 14,
    color: "#4A4A4A",
    marginLeft: 10
  }
});

export default SetAvailability;
const Footer = (props) => {
  return (
    <View style={footerStyles.footer}>
      {props.titles.map((title, index) => (
        <View style={footerStyles.footerItem} key={index}>
          <Image
            style={footerStyles.footerImage}
            source={props.images[index]}
          />
          <Text
            style={[
              footerStyles.footerItemText,
              index === props.active ? footerStyles.active : null
            ]}
          >
            {title}
          </Text>
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
    height: 70,
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
