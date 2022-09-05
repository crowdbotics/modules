import React from "react";
import {
  Text,
  View,
  StyleSheet, Image, ScrollView, TouchableHighlight, TextInput
} from "react-native";

const WriteReviewAndRate = () => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.walletCard}>
        <View style={styles.walletInner}>
          <View style={styles.imgContainer}>
            <Image
              source={require("./assets/edit.png")}
              style={styles.image}
            />
          </View>
          <View style={styles.walletCarder}>
            <View style={styles.cardTop}>
              <Text style={styles.eventName}>Tasker name</Text>
              <Text style={styles.view}>$40/hr</Text>
            </View>
            <Text style={styles.eventType}><Text style={styles.rating}>4.9</Text> (15 Review)</Text>
            <Text style={styles.date}>15 Cleaning Jobs</Text>
          </View>
        </View>
      </View>

      <Text style={styles.mr10}>Text review</Text>
      <View style={styles.textInput}>
        <Input placeholder="Enter" multiline={true} />
      </View>

      <View style={styles.lineContainer}>
        <View style={styles.line} />
        <Text style={styles.lineText}>Or</Text>
        <View style={styles.line} />
      </View>

      <View style={styles.TextContainer}>
        <Text style={styles.title}>How was your experience?</Text>
        <Text style={styles.description}>Use 5 star rating to rate an app or leave a text review</Text>

        <View style={styles.ratingContainer}>
          <View>
            <Image
              source={require("./assets/star.png")}
              style={styles.star}
            />
            <Text style={styles.lightText}>Poor</Text>
          </View>
          <View>
            <Image
              source={require("./assets/star.png")}
              style={styles.star}
            />
            <Text style={styles.lightText}>Bad</Text>
          </View>
          <View>
            <Image
              source={require("./assets/star.png")}
              style={styles.star}
            />
            <Text style={[styles.lightText, styles.selected]}>Good</Text>
          </View>
          <View>
            <Image
              source={require("./assets/light-star.png")}
              style={styles.star}
            />
            <Text style={styles.lightText}>Very Good</Text>
          </View>
          <View>
            <Image
              source={require("./assets/light-star.png")}
              style={styles.star}
            />
            <Text style={styles.lightText}>Excellent</Text>
          </View>
        </View>
      </View>

      <Button>Submit</Button>

    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: { backgroundColor: "#FFF", flex: 1 },
  walletCard: {
    padding: 10,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 20
  },
  walletInner: {
    display: "flex",
    flexDirection: "row"
  },
  walletCarder: {
    alignSelf: "center",
    display: "flex",
    flexDirection: "column"
  },
  eventName: {
    fontSize: 14,
    marginLeft: 10,
    width: 115
  },
  eventType: {
    fontSize: 12,
    marginLeft: 10,
    width: 200,
    marginVertical: 5,
    color: "#7E7D7D"
  },
  date: {
    fontSize: 14,
    marginLeft: 10,
    width: 200
  },
  imgContainer: {
    height: 80,
    width: 80,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#dadada",
    borderRadius: 10
  },
  image: { height: 32, width: 32, resizeMode: "contain" },
  cardTop: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", width: 250 },
  view: { fontSize: 30, fontWeight: "bold", marginBottom: -30, marginRight: -30 },
  mr10: {
    marginLeft: 20,
    marginBottom: 10,
    marginTop: 10
  },
  textInput: { borderWidth: 1, borderRadius: 10, borderColor: "#C4C4C4", marginBottom: 10, paddingHorizontal: 5, height: 150, marginHorizontal: 10 },
  line: {
    borderBottomColor: "#E5E5E5",
    borderBottomWidth: StyleSheet.hairlineWidth,
    width: "40%"
  },
  lineText: { color: "#231F20", paddingHorizontal: 20, fontSize: 16 },
  lineContainer: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginTop: 30, marginBottom: 20, paddingHorizontal: 45 },
  TextContainer: { justifyContent: "center", alignItems: "center", marginBottom: 10 },
  title: { fontSize: 25, fontWeight: "bold" },
  description: { fontSize: 15, fontWeight: "bold", marginHorizontal: 50, textAlign: "center", marginVertical: 10 },
  ratingContainer: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", width: "100%", paddingHorizontal: 30 },
  star: {
    height: 47,
    width: 47,
    resizeMode: "contain"
  },
  lightText: { fontSize: 11, color: "#979797", textAlign: "center", marginTop: 10 },
  selected: { color: "#000" }
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
    <TouchableHighlight onPress={props.onPress} underlayColor="#DDDDDD" style={btnStyles.buttonContainer}>
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
  buttonContainer: { justifyContent: "center", alignItems: "center" },
  button: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    width: 307,
    marginVertical: 40
  },
  text: {
    fontWeight: "bold",
    fontSize: 15
  }
});

export default WriteReviewAndRate;
