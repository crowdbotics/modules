import React, { useState, useEffect } from "react";
import {
  Text,
  StyleSheet,
  View,
  TextInput,
  Image,
  FlatList,
  ScrollView,
  Pressable
} from "react-native";

const CreateAppointmentScreen = params => {
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [reminder, setReminder] = useState("");
  const [timeSlots, setTimeSlots] = useState([]);
  useEffect(() => {
    setTimeSlots([
      {
        id: 1,
        slot: "10:00",
        selected: false
      },
      {
        id: 2,
        slot: "11:00",
        selected: false
      },
      {
        id: 3,
        slot: "12:00",
        selected: true
      },
      {
        id: 4,
        slot: "13:00",
        selected: false
      },
      {
        id: 5,
        slot: "14:00",
        selected: false
      },
      {
        id: 6,
        slot: "15:00",
        selected: false
      },
      {
        id: 7,
        slot: "16:00",
        selected: false
      },
      {
        id: 8,
        slot: "17:00",
        selected: false
      },
      {
        id: 9,
        slot: "18:00",
        selected: false
      },
      {
        id: 10,
        slot: "19:00",
        selected: false
      },
      {
        id: 11,
        slot: "20:00",
        selected: false
      },
      {
        id: 12,
        slot: "21:00",
        selected: false
      }
    ]);
  }, []);
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerBlock}>
          <Text style={styles.headerMainText}>16/01/2022</Text>
          <Text style={styles.headerSubText}>Appointment date</Text>
        </View>
        <View style={styles.headerBlock}>
          <Text style={styles.headerMainText}>12:00</Text>
          <Text style={styles.headerSubText}>Time</Text>
        </View>
        <View style={styles.headerBlock}>
          <Text style={styles.headerMainText}>1 hour</Text>
          <Text style={styles.headerSubText}>Duration</Text>
        </View>
      </View>
      <ScrollView>
        <View style={styles.body}>
          <View style={styles.inputContainer}>
            <Text style={styles.inputText}>Title</Text>
            <TextInput
              style={styles.input}
              onChangeText={text => setTitle(text)}
              value={title}
              placeholder="Enter the title "
              placeholderTextColor="#9B9B9B"
              autoCapitalize="none"
              autoCorrect={false}
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.inputText}>Location</Text>
            <TextInput
              style={styles.input}
              onChangeText={text => setLocation(text)}
              value={location}
              placeholder="Search Username"
              placeholderTextColor="#9B9B9B"
              autoCapitalize="none"
              autoCorrect={false}
            />
            <Image
              source={require("./assets/locationIcon.png")}
              style={styles.searchIcon}
            />
          </View>
          <View style={[styles.inputContainer, styles.textAreaContainer]}>
            <Text style={[styles.inputText]}>Description</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              onChangeText={text => setDescription(text)}
              value={description}
              placeholder="Enter the description "
              placeholderTextColor="#9B9B9B"
              autoCapitalize="none"
              autoCorrect={false}
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.inputText}>Select Reminder</Text>
            <TextInput
              style={styles.input}
              onChangeText={text => setReminder(text)}
              value={reminder}
              placeholder="Select a reminder "
              placeholderTextColor="#9B9B9B"
              autoCapitalize="none"
              autoCorrect={false}
            />
          </View>
        </View>
        <View style={styles.timeSlots}>
          <Text style={styles.timeSlotsText}>Time slot</Text>
          <FlatList
            data={timeSlots}
            renderItem={({ item }) => (
              <Slot style={styles.timeSlotText} slot={item} />
            )}
            numColumns={4}
            keyExtractor={item => item.id}
            columnWrapperStyle={{
              justifyContent: "space-around"
            }}
          />
        </View>
        <Button buttonText={"Create Appointment"} onPress={() => {}} />
      </ScrollView>
    </View>
  );
};

const Slot = ({ slot }) => {
  const borderColor = {
    borderColor: slot.selected ? "#12D790" : "#e6e6e6"
  };
  return (
    <View style={[styles.slotPill, borderColor]}>
      <Text>{slot.slot}</Text>
      <Image source={require("./assets/arrowIcon.png")} style={styles.arrow} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  header: {
    flexDirection: "row",
    marginHorizontal: 20,
    height: 100,
    alignItems: "center",
    justifyContent: "space-between",
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: "#ccc"
  },
  headerBlock: {
    flexDirection: "column",
    // justifyContent: 'center',
    alignItems: "center",
    justifyContent: "space-between",
    height: 55
  },
  headerMainText: {
    fontSize: 22,
    color: "#000"
  },
  headerSubText: {
    fontSize: 14,
    color: "grey"
  },
  body: {
    height: 400,
    paddingHorizontal: 20,
    marginTop: 10
  },
  inputContainer: {
    flexDirection: "column",
    justifyContent: "center",
    marginTop: 5
  },
  inputText: {
    fontSize: 16,
    marginLeft: 20,
    color: "#111112"
  },
  input: {
    borderWidth: 1,
    borderColor: "#e6e6e6",
    borderRadius: 10,
    paddingLeft: 20,
    marginVertical: 5,
    width: "100%",
    height: 50
  },
  textArea: {
    height: 100
  },
  searchIcon: {
    position: "absolute",
    right: 20,
    top: 40
  },
  timeSlots: {
    paddingHorizontal: 20,
    paddingTop: 20
  },
  timeSlotsText: {
    fontSize: 16,
    marginLeft: 20,
    marginVertical: 5,
    color: "#111112",
    fontWeight: "bold"
  },
  slotPill: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 8,
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#e6e6e6"
  },
  arrow: {
    marginLeft: 10,
    marginTop: 2
  }
});
export default CreateAppointmentScreen;

const Button = ({ onPress, buttonText }) => {
  return (
    <View style={buttonStyles.btnContainer}>
      <Pressable style={buttonStyles.btn} onPress={onPress}>
        <Text style={buttonStyles.btnText}>{buttonText}</Text>
      </Pressable>
    </View>
  );
};

const buttonStyles = StyleSheet.create({
  btnContainer: {
    padding: 30,
    paddingTop: 10,
    paddingHorizontal: 40,
    justifyContent: "center",
    marginTop: 20
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
    elevation: 10
  },
  btnText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold"
  }
});
