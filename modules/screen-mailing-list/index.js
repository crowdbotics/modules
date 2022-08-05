import React from "react";
import { Text, StyleSheet, View, Image, TextInput, TouchableHighlight, ScrollView } from "react-native";

const MailingListScreen = () => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Image source={require("./assets/back.png")} style={styles.back} />
        <Text style={styles.heading}>Mailing list</Text>
        <Text />
      </View>
      <View style={styles.emailContainer}>
        <Text style={styles.mr10}>Search</Text>
        <Input placeholder="Enter" />
      </View>
      <View style={styles.wrapper}>
        <View style={styles.centerContainer}>
          <Image source={require("./assets/edit.png")} />
        </View>
      </View>

      <View style={styles.descriptionContainer}>
        <Text style={styles.descriptionText}>Description</Text>
        <Text style={styles.description}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Massa faucibus nisi egestas
          quis etiam nec feugiat. Scelerisque pellentesque at in accumsan cras tristique at id. At
          nullam lectus sapien nulla. At egestas cursus elit, tortor mattis gravida ornare proin
          ipsum. Duis purus turpis libero tristique dignissim.
        </Text>
        <Text style={styles.description}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Massa faucibus nisi egestas
          quis etiam nec feugiat. Scelerisque pellentesque at in accumsan cras tristique at id. At
          nullam lectus sapien nulla. At egestas cursus elit, tortor mattis gravida ornare proin
          ipsum. Duis purus turpis libero tristique dignissim.
        </Text>
      </View>
      <Button>Subscribe</Button>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
    paddingHorizontal: 10
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
  emailContainer: {
    marginBottom: 10
  },
  mr10: {
    marginLeft: 25,
    marginBottom: 10
  },
  wrapper: { justifyContent: "center", alignItems: "center", marginVertical: 20 },
  centerContainer: {
    width: 346,
    height: 168,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fdf1d6",
    borderRadius: 10,
    elevation: 10,
    shadowColor: "#ccc9c9"
  },
  descriptionContainer: { paddingHorizontal: 20, marginBottom: 20 },
  descriptionText: { marginHorizontal: 20, fontSize: 14, fontWeight: "500" },
  description: { fontSize: 12, marginVertical: 10 }
});

const Input = (props) => {
  return (
    <View>
      <TextInput
        style={textStyles.input}
        placeholder={props.placeholder}
        value={props.value}
        onChangeText={(num) => props.setValue(num)}
        placeholderTextColor="#000"
        editable={props.editable !== false}
      />
      {props.errorText ? <Text style={textStyles.error}>{props.errorText}</Text> : null}
    </View>
  );
};

const textStyles = StyleSheet.create({
  input: {
    backgroundColor: "#fff",
    height: 53,
    borderColor: "#C4C4C4",
    color: "#000",
    borderRadius: 10,
    fontSize: 14,
    borderWidth: 1,
    paddingHorizontal: 10,
    marginHorizontal: 5
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
    marginHorizontal: 20,
    marginVertical: 20
  },
  text: {
    fontWeight: "bold",
    fontSize: 15
  }
});

export default MailingListScreen;
