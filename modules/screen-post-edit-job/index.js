import React from "react";
import { Text, StyleSheet, View, Image, TextInput, ScrollView, TouchableHighlight } from "react-native";

const PostEditJobScreen = (params) => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Image source={require(

          "./assets/back.png")} style={styles.back} />
        <Text style={styles.heading}>Jobs</Text>
        <Text />
      </View>
      <Text style={styles.mr10}>Job title</Text>
      <View style={styles.textInput}>
        <Input placeholder="Enter" />
      </View>
      <Text style={styles.mr10}>Department</Text>
      <View style={styles.textInput}>
        <Input placeholder="Enter" />
      </View>
      <Text style={styles.mr10}>Job requirements</Text>
      <View style={styles.textInput}>
        <Input placeholder="Enter" />
      </View>
      <View style={styles.tags}>
        <Text style={styles.tagText}>Tag</Text>
        <Text style={styles.tagText}>Tag</Text>
        <Text style={styles.tagText}>Tag</Text>
        <Text style={styles.tagText}>Tag</Text>
        <Text style={styles.tagText}>Tag</Text>
      </View>
      <Text style={styles.mr10}>Job Description</Text>
      <View style={[styles.textInput, { height: 150 }]}>
        <Input placeholder="Enter" multiline={true} />
      </View>
      <Text style={styles.mr10}>Number of Hours</Text>
      <View style={styles.chooseContainer}>
        <Image source={require(

          "./assets/minus.png")} style={styles.priceImg} />
        <TextInput placeholder="8" placeholderTextColor="#000" style={styles.inputPrice} />
        <Image source={require(

          "./assets/plus.png")} style={styles.priceImg} />
      </View>
      <View style={styles.bidContainer}>
        <Text style={styles.bidText}>Input</Text>
      </View>
      <Text style={styles.mr10}>Starting date</Text>
      <View style={styles.textInput}>
        <Input placeholder="Enter" />
      </View>
      <Text style={styles.mr10}>Salary</Text>
      <View style={styles.sliderCOntainer}>
        <Image source={require(

          "./assets/slider.png")} style={styles.sliderImg} />
      </View>
      <View style={styles.sliderTextContainer}>
        <Text style={styles.sliderText}>$40k</Text>
        <Text style={[styles.sliderText, { marginLeft: 170 }]}>$80k</Text>
      </View>
      <Text style={styles.mr10}>Bonus, Incentives</Text>
      <View style={styles.textInput}>
        <Input placeholder="Enter" />
      </View>

      <Text style={styles.mr10}>Background check needed</Text>
      <View style={styles.sectionContainer}>
        <View style={styles.checkboxContainer}>
          <Image
            source={require(
              "./assets/checkbox.png")}
            style={styles.checkbox}
          />
          <Text style={styles.label}>Basic</Text>
        </View>
        <View style={styles.checkboxContainer}>
          <Image
            source={require(
              "./assets/box.png")}
            style={styles.checkbox}
          />
          <Text style={styles.label}>Criminal </Text>
        </View>
      </View>
      <View style={styles.buttonBottom}>
        <Button>Post a Job</Button>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    backgroundColor: "#FFF"
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 30,
    marginTop: 15,
    marginBottom: 40
  },
  back: { width: 11.25, height: 20, resizeMode: "contain", marginLeft: -15 },
  heading: { fontSize: 16, color: "#000" },
  mr10: {
    marginLeft: 25,
    marginBottom: 10
  },
  textInput: {
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "#C4C4C4",
    marginBottom: 10,
    marginHorizontal: 7,
    paddingHorizontal: 10
  },
  tags: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 10,
    marginTop: 15,
    marginBottom: 15
  },
  tagText: { paddingVertical: 10, paddingHorizontal: 15, backgroundColor: "#F1F1F1", borderRadius: 10 },
  mt10: {
    marginLeft: 25,
    marginBottom: 10,
    marginTop: 10
  },
  chooseContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    height: 55,
    borderColor: "#C4C4C4",
    borderWidth: 1,
    borderRadius: 10,
    paddingLeft: 10,
    paddingRight: 20,
    marginHorizontal: 5
  },
  error: {
    fontSize: 13,
    color: "#FA060D",
    paddingTop: 8
  },
  priceImg: { width: 27, height: 27, resizeMode: "contain" },
  inputPrice: { fontSize: 16 },
  bidContainer: { justifyContent: "center", alignItems: "center", marginTop: 3 },
  bidText: { fontSize: 12, color: "#939396" },
  sliderCOntainer: {
    marginHorizontal: 7,
    paddingHorizontal: 10
  },
  sliderImg: {
    width: 340,
    height: 15,
    resizeMode: "contain"
  },
  sliderTextContainer: { flexDirection: "row", justifyContent: "flex-start", alignItems: "center", marginBottom: 10 },
  sliderText: { color: "#77838F", marginLeft: 33, marginTop: 3 },
  sectionContainer: { flexDirection: "row", justifyContent: "flex-start", alignItems: "center" },
  checkboxContainer: {
    flexDirection: "row",
    marginBottom: 20,
    marginLeft: 30
  },
  checkbox: {
    alignSelf: "center",
    width: 18,
    height: 18,
    resizeMode: "contain"
  },
  label: {
    marginLeft: 15
  },
  buttonBottom: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center"
  }
});

const Input = (props) => {
  return (
    <View style={InputStyles.container}>
      <TextInput
        style={InputStyles.input}
        placeholder={props.placeholder}
        value={props.value}
        onChangeText={(num) => props.setValue(num)}
        placeholderTextColor="#000"
        multiline={props.multiline}
        numberOfLines={props.multiline ? 10 : null}
        editable={props.editable !== false}
      />
    </View>
  );
};

const InputStyles = StyleSheet.create({
  container: {
    width: "100%",
    borderRadius: 10
  },
  input: {
    backgroundColor: "#fff",
    height: 49,
    color: "#000",
    fontSize: 14
  },
  error: {
    fontSize: 13,
    color: "#FA060D",
    paddingTop: 8
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
export default PostEditJobScreen;
