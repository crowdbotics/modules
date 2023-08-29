import React from "react";
import { Text, StyleSheet, View, TouchableHighlight, Image, ScrollView } from "react-native";

const DocumentsDetails = (params) => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Image source={require(

          "./assets/back.png")} style={styles.back} />
        <Text style={styles.heading}>Details</Text>
        <Text />
      </View>
      <Text style={styles.mr10}>Document ID</Text>
        <View style={styles.InputBox}>
          <Text >#21292923</Text>
        </View>
        <Text style={styles.mr10}>Document Title</Text>
        <View style={styles.InputBox}>
          <Text >Title of the document</Text>
        </View>
        <View style={styles.descriptionContainer}>
        <Text style={styles.descriptionText}>Content</Text>
        <Text style={styles.description}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Massa faucibus nisi egestas quis etiam nec feugiat. Scelerisque pellentesque at in accumsan cras tristique at id. </Text>
        <Text style={styles.description}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Massa faucibus nisi egestas quis etiam nec feugiat. Scelerisque pellentesque at in accumsan cras tristique at id. At nullam lectus sapien nulla. At egestas cursus elit, tortor mattis gravida ornare proin ipsum. Duis purus turpis libero tristique dignissim.
        </Text>
        <Text style={styles.description}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Massa faucibus nisi egestas quis etiam nec feugiat. Scelerisque pellentesque at in accumsan cras tristique at id. At nullam lectus sapien nulla. At egestas cursus elit, tortor mattis gravida ornare proin ipsum. Duis purus turpis libero tristique dignissim.
        </Text>
      </View>
      <Text style={styles.mr10}>Download</Text>
      <View style={styles.chooseContainer}>
        <Text>Download file</Text>
        <Image source={require(

          "./assets/upload.png")} style={styles.filterImg} />
      </View>
        <View style={styles.buttonBottom}>
          <Button>Sign</Button>
      </View>
    </ScrollView>

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
    marginBottom: 30
  },
  back: { width: 11.25, height: 20, resizeMode: "contain", marginLeft: -15 },
  heading: { fontSize: 16, color: "#000" },
  mr10: {
    marginLeft: 25,
    marginBottom: 10
  },
  InputBox: { paddingHorizontal: 10, borderColor: "#C4C4C4", borderWidth: 1, marginHorizontal: 10, borderRadius: 10, marginBottom: 10, paddingVertical: 15 },
  buttonBottom: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    marginBottom: 10
  },
  descriptionContainer: { paddingHorizontal: 10, marginBottom: 15, marginTop: 5 },
  descriptionText: { fontSize: 16, fontWeight: "400", marginLeft: 10, marginVertical: 5 },
  description: { fontSize: 12, marginVertical: 5, fontWeight: "500" },
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
  filterImg: {
    height: 24,
    width: 24,
    resizeMode: "contain"
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
    fontSize: 15
  }
});
export default DocumentsDetails;
