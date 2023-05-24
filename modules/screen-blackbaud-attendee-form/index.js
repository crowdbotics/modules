import React, {useEffect, useState} from "react";
import { ScrollView, StyleSheet, View, TextInput, Text, Pressable } from "react-native";
import { useDispatch, useSelector } from "react-redux"
import { useIsFocused } from "@react-navigation/native"
import { attendeeList } from "../../modules/blackbaud/store"

const AttendeeForm = props => {
  const dispatch = useDispatch()
  const { route } = props
  const { params } = route
  const isFocused = useIsFocused()
  const token = useSelector(state => state.Events.accessToken)
  const { entities: attendees } = useSelector(
    state => state.Events.attendeeList
  )
  useEffect(() => {
    if (isFocused) {
      dispatch(
        attendeeList({
          id: params?.eventId,
          token: token
        })
      )
    }
  }, [isFocused])

  const [selectedAttendee, setSelectedAttendee] = useState(null)

  const selectAttendee = (id) => {
    // toggle selection
    if (selectedAttendee === id) {
      setSelectedAttendee(null)
    }
    else {
      setSelectedAttendee(id)
    }
  }

  return <View style={styles.container}>
      <ScrollView>
        <Text style={styles.title}>Attendee Form</Text>
        <View style={styles.attendeeForm}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Name *</Text>
            <TextInput placeholder="Please type your response" style={styles.formInput} />
          </View>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Email *</Text>
            <TextInput placeholder="Please type your response" style={styles.formInput} />
          </View>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Status (dropdown) *</Text>
            <TextInput placeholder="Please type your response" style={styles.formInput} />
          </View>
          <View style={styles.inputGroup}>
          {attendees.length > 0 && (<><Text style={styles.attendingWith}>Attending with</Text>
              <View style={styles.inputGroup}>
                {attendees?.map((item, index) => {
                  return <Text key={index} style={[
                        styles.formInput,
                       {
                        backgroundColor: selectedAttendee === item.id ? "#075a7c" : "#fff",
                        color: selectedAttendee === item.id ? "#fff" : "#000"
                      }
                  ]} onPress={() => selectAttendee(item.id)} >
                      {item.name} - {item.email}
                    </Text>;
                }
                )}
              </View></>)
            }
          </View>
          <View style={styles.buttonGroup}>
            <Pressable style={styles.loginButton} onPress={() => {}} >
              <Text style={styles.textColor}>
                Submit
              </Text>
            </Pressable>

          </View>
        </View>
      </ScrollView>
    </View>;
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#212327",
    marginTop: 20,
    marginLeft: 20
  },
  buttonGroup: {
    marginTop: 30
  },
  inputGroup: {
    marginTop: 18
  },
  attendeeForm: {
    paddingHorizontal: 15
  },
  formInput: {
    backgroundColor: "#d9d5d545",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#D3D3D3",
    marginTop: 10
  },
  label: {
    marginLeft: 15,
    fontSize: 14,
    fontWeight: "700"
  },
  loginButton: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    alignSelf: "center",
    marginBottom: 25,
    paddingHorizontal: 12,
    backgroundColor: "#075a7c",
    width: "80%",
    height: 50
  },
  textColor: {
    fontWeight: "500",
    color: "#fff",
    fontSize: 16
  },
  attendingWith: {
    marginTop: 20,
    fontSize: 16,
    fontWeight: "bold",
    color: "#212327",
    marginLeft: 15,
  }
});
export default AttendeeForm;
