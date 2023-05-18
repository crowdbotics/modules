import React from "react";
import { ScrollView, StyleSheet, View, TextInput, Text, Pressable } from "react-native";

const AttendeeForm = () => {
  return <View style={styles.container}>
      <ScrollView>
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
            <Text style={styles.label}>Name *</Text>
            <TextInput placeholder="Please type your response" style={styles.formInput} />
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
  }
});
export default AttendeeForm;
