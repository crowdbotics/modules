import React from "react";
import { Text, StyleSheet, View, SafeAreaView, Image, TouchableHighlight } from "react-native";

const UploadDocuments = (params) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
       <View style={styles.header}>
        <Image source={require(

          "./assets/back.png")} style={styles.back} />
        <Text style={styles.heading}>Upload documents</Text>
        <Text />
      </View>
      <View style={styles.uploadContainer}>
        <Image source={require(

          "./assets/light-upload.png")} style={styles.uploadImg} />
        </View>
      </View>
      <Text style={styles.subHeading}>Upload documents</Text>
      <Text style={styles.mr10}>Document front</Text>
      <View style={styles.chooseContainer}>
      <Text>Upload</Text>
        <Image source={require(

          "./assets/upload.png")} style={styles.filterImg} />
      </View>
      <Text style={styles.mr10}>Document back</Text>
      <View style={styles.chooseContainer}>
        <Text>Upload</Text>
        <Image source={require(

          "./assets/upload.png")} style={styles.filterImg} />
      </View>
      <View style={styles.buttonBottom}>
          <Button>Next</Button>
      </View>

      <View style={styles.skipSection}>
<Text style={styles.skipText}>Skip for now</Text>
<Image source={require(

  "./assets/skip.png")} style={styles.skipImg}/>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
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
  headerContainer: { backgroundColor: "#F0F2F7", marginHorizontal: "-5%", paddingHorizontal: 15 },
  uploadContainer: { justifyContent: "center", alignItems: "center", paddingVertical: 50 },
  uploadImg: { height: 44, width: 63, resizeMode: "contain" },
  chooseContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: 55,
    borderColor: "#C4C4C4",
    borderWidth: 1,
    borderRadius: 10,
    paddingLeft: 10,
    paddingRight: 20,
    marginHorizontal: 5,
    marginBottom: 20
  },
  subHeading: { fontSize: 16, marginLeft: 25, marginTop: 30, marginBottom: 20 },
  mr10: {
    marginLeft: 25,
    marginBottom: 10
  },
  filterImg: {
    height: 24,
    width: 24,
    resizeMode: "contain"
  },
  buttonBottom: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    marginBottom: 10
  },
  skipSection: { flexDirection: "row", justifyContent: "center", alignItems: "center" },
  skipImg: { height: 9, width: 14, resizeMode: "contain", marginTop: 3, marginLeft: 7 },
  skipText: { fontSize: 16 }
});

export default UploadDocuments;

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
