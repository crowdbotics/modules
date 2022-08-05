import React from "react";
import { Text, StyleSheet, View, TextInput, TouchableHighlight, Image, ScrollView } from "react-native";

const FileConversion = (params) => {
  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.main}>
          <View>
            <Text style={styles.searchText}>Search</Text>
            <View style={styles.searchBar}>
              <View style={styles.wp90}>
                <Input placeholder="Enter" />
              </View>
              <Image source={require("./assets/search.png")} />
            </View>
          </View>
          <Text style={styles.text}>File conversion format</Text>
          <View style={styles.tabView}>
            <View style={styles.csv}>
              <Text>csv</Text>
            </View>
            <View style={styles.xlsx}>
              <Text>XLSX</Text>
            </View>
            <View style={styles.xlsx}>
              <Text>PDF</Text>
            </View>
            <View style={styles.xlsx}>
              <Text>PNG</Text>
            </View>
            <View style={styles.xlsx}>
              <Text>SVG</Text>
            </View>
            <View style={styles.xlsx}>
              <Text>JPG</Text>
            </View>
          </View>
        </View>
        <View>
          <FileCard />
          <FileCard />
          <FileCard />
        </View>
        <View style={styles.bar}></View>
        <View style={styles.btn}>
          <Button>Convert</Button>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  main: {
    padding: 20
  },
  searchBar: {
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "#C4C4C4",
    flexDirection: "row",
    alignItems: "center"
  },
  searchText: {
    marginLeft: 10,
    marginBottom: 10
  },
  wp90: {
    width: "90%"
  },
  text: {
    marginVertical: 20
  },
  tabView: {
    width: "100%",
    height: 48,
    backgroundColor: "#F1F1F1",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    borderRadius: 10,
    paddingVertical: 6,
    marginVertical: 20
  },
  csv: {
    borderRadius: 10,
    backgroundColor: "#fff",
    width: "15%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center"
  },
  xlsx: {
    width: "15%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F1F1F1",
    borderRadius: 10
  },
  btn: {
    paddingHorizontal: "15%",
    marginBottom: 20
  },
  bar: {
    marginHorizontal: "15%",
    marginVertical: 20,
    height: 8,
    backgroundColor: "#C4C4C4"
  }
});

export default FileConversion;

const FileCard = () => {
  return (
    <View style={fileStyles.container}>
      <View style={fileStyles.innerContainer}>
        <View style={fileStyles.img}>
          <Image source={require("./assets/edit.png")}/>
        </View>
        <View style={fileStyles.textContainer}>
          <Text>File name.CSV</Text>
          <Text>18 June 2022</Text>
        </View>
      </View>
    </View>
  );
};
const fileStyles = StyleSheet.create({
  container: {
    borderRadius: 10,
    padding: 10,
    shadowColor: "rgba(0, 0, 0, 0.2)",
    elevation: 5
  },
  innerContainer: {
    borderRadius: 10,
    flexDirection: "row",
    padding: 10
  },
  img: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FCF1D6",
    height: 80,
    width: 80,
    borderRadius: 10
  },
  textContainer: {
    paddingVertical: 10,
    paddingHorizontal: 20
  }
});
const Button = (props) => {
  return (
    <TouchableHighlight onPress={props.onPress} underlayColor='#DDDDDD'>
      <View style={[btnStyles.button, {
        backgroundColor: props.backgroundColor ? props.backgroundColor : "#000000",
        height: props.height ? props.height : 49,
        borderWidth: props.borderWidth ? props.borderWidth : 0,
        borderColor: props.borderColor ? props.borderColor : "#000000"
      }]}>
        <Text style={[btnStyles.text, { color: props.color ? props.color : "#ffffff" }]}>{props.children}</Text>
      </View>
    </TouchableHighlight>
  );
};

const btnStyles = StyleSheet.create({
  button: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10
  },
  text: {
    fontWeight: "bold",
    fontSize: 15
  }
});

const Input = (props) => {
  return (
    <View>
      <TextInput
        style={textStyles.input}
        placeholder={props.placeholder}
        value={props.value}
        onChangeText={(num) => props.setValue(num)}
        placeholderTextColor='#ddd'
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
    color: "#000",
    borderRadius: 10,
    fontSize: 14,
    paddingHorizontal: 10
  },
  error: {
    fontSize: 13,
    color: "#FA060D",
    paddingTop: 8
  }
});
