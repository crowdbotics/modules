import React from "react";
import { Text, StyleSheet, View, Image, ScrollView, TextInput, TouchableHighlight } from "react-native";

const UploadCovidVaccineProof = (params) => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.headerContainer}>
        <View style={styles.header}>
          <Image source={require(
            
            "./assets/back.png")} style={styles.back} />
          <Text style={styles.heading}>Covid Vaccine Proof</Text>
          <Text />
        </View>
        <View style={styles.uploadContainer}>
          <Image source={require(
            
            "./assets/shield.png")} style={styles.uploadImg} />
        </View>
      </View>
      <Text style={styles.subHeading}>Upload COVID Vaccine Proof</Text>
      <Text style={styles.mr10}>Institution</Text>
      <View style={styles.InputBox}>
      <TextInput placeholder="Enter" placeholderTextColor={"#000"} />
      </View>
      <Text style={styles.mr10}>Description</Text>
      <View style={styles.textInput}>
        <Input placeholder="Enter" multiline={true} />
      </View>

      <View style={styles.feeContainer}>
        <View>
          <Text style={[styles.mr10, { marginLeft: 15 }]}>Date issued</Text>
          <View style={styles.feeSection}>
            <TextInput placeholder="Enter" placeholderTextColor={"#000"} />
          </View>
        </View>
        <View>
          <Text style={[styles.mr10, { marginLeft: 15 }]}>Exp. Date</Text>
          <View style={styles.feeSection}>
            <TextInput placeholder="Enter" placeholderTextColor={"#000"} />
          </View>
        </View>
      </View>
      <View style={styles.certificateContainer}>
        <Text>Certificate</Text>
        <Image source={require(
          
          "./assets/plus.png")} style={styles.plusImg} />
      </View>
      <View style={styles.chooseContainer}>
        <Text>Upload</Text>
        <Image source={require(
          
          "./assets/upload.png")} style={styles.filterImg} />
      </View>
      <View style={styles.buttonBottom}>
          <Button>Next</Button>
      </View>
      <View style={styles.skipSection}>
        <Text style={{ fontSize: 16 }}>Skip for now</Text>
        <Image source={require(
          
          "./assets/skip.png")} style={styles.skipImg} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
    paddingBottom: 20
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 30,
    marginTop: 15,
    marginBottom: 20
  },
  back: { width: 11.25, height: 20, resizeMode: "contain", marginLeft: -15 },
  heading: { fontSize: 16, color: "#000" },
  headerContainer: { backgroundColor: "#F0F2F7", marginHorizontal: "-3%", paddingHorizontal: 15 },
  uploadContainer: { justifyContent: "center", alignItems: "center", paddingVertical: 50 },
  uploadImg: { height: 66, width: 54, resizeMode: "contain" },
  subHeading: { fontSize: 16, marginLeft: 25, marginTop: 30, marginBottom: 20 },
  mr10: {
    marginLeft: 25,
    marginBottom: 10
  },
  InputBox: { paddingHorizontal: 10, borderColor: "#C4C4C4", borderWidth: 1, marginHorizontal: 10, borderRadius: 10, marginBottom: 10 },
  textInput: { borderWidth: 1, borderRadius: 10, borderColor: "#C4C4C4", paddingHorizontal: 5, height: 140, marginHorizontal: 10 },
  feeContainer: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingHorizontal: 10, marginTop: 10 },
  feeSection: {
    justifyContent: "center",
    alignItems: "flex-start",
    height: 55,
    borderColor: "#C4C4C4",
    borderWidth: 1,
    borderRadius: 10,
    paddingLeft: 10,
    paddingRight: 20,
    width: 170
  },
  chooseContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: 55,
    borderColor: "#C4C4C4",
    borderWidth: 1,
    borderRadius: 10,
    paddingLeft: 15,
    paddingRight: 20,
    marginHorizontal: 10,
    marginBottom: 20
  },
  filterImg: {
    height: 24,
    width: 24,
    resizeMode: "contain"
  },
  certificateContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingLeft: 15,
    paddingRight: 20,
    marginHorizontal: 10,
    marginTop: 20,
    marginBottom: 10
  },
  plusImg: {
    height: 15,
    width: 15,
    resizeMode: "contain"
  },
  buttonBottom: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    marginBottom: 10
  },
  skipSection: { flexDirection: "row", justifyContent: "center", alignItems: "center", marginBottom: 20 },
  skipImg: { height: 9, width: 14, resizeMode: "contain", marginTop: 3, marginLeft: 7 }
});

const Input = (props) => {
  return (
    <View style={styles.container}>
      <TextInput
        style={inputStyles.input}
        placeholder={props.placeholder}
        value={props.value}
        onChangeText={(num) => props.setValue(num)}
        placeholderTextColor='#000'
        multiline={props.multiline}
        numberOfLines={props.multiline ? 10 : null}
        editable={props.editable !== false}
        borderWidth={props.borderWidth}
      />
    </View>
  );
};

const inputStyles = StyleSheet.create({
  container: {
    width: "100%",
    borderRadius: 10,
    paddingRight: 10
  },
  input: {
    backgroundColor: "#fff",
    height: 53,
    borderColor: "#C4C4C4",
    color: "#000",
    borderRadius: 10,
    fontSize: 14
  }
});

const Button = (props) => {
  return (
    <TouchableHighlight onPress={props.onPress} underlayColor="#DDDDDD">
      <View
        style={[
          btnStyles.button,
          {
            backgroundColor: props.backgroundColor ? props.backgroundColor : "#000000",
            height: props.height ? props.height : 49,
            borderWidth: props.borderWidth ? props.borderWidth : 0,
            borderColor: props.borderColor ? props.borderColor : "#000000"
          }
        ]}
      >
        <Text style={[btnStyles.text, { color: props.color ? props.color : "#ffffff" }]}>
          {props.children}
        </Text>
      </View>
    </TouchableHighlight>
  );
};

const btnStyles = StyleSheet.create({
  button: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    marginVertical: 10,
    width: 307
  },
  text: {
    fontWeight: "bold",
    fontSize: 15
  }
});

export default UploadCovidVaccineProof;
