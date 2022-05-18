import React from "react";
import { Image, ScrollView, StyleSheet, Text, TextInput, TouchableHighlight, View } from "react-native";

const BlogPostScreen = () => {
  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <View style={styles.headerRight}>
            <Image
              source={require("./assets/addimg.png")}
              style={styles.headerRightImage}
            />
            <Image
              source={require("./assets/edit.png")}
              style={styles.headerRightImage}
            />
            <Image
              source={require("./assets/del.png")}
              style={styles.headerRightImage}
            />
          </View>
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.inputContainerText}>Text</Text>
          <Input></Input>
        </View>
        <View>
          <Text style={styles.addImageContainerText}>Add image</Text>
          <View style={styles.mainContainer}>
            <ImageSection backgroundColor="#FFEEEE"></ImageSection>
            <ImageSection backgroundColor="#FDF5CA"></ImageSection>
            <ImageSection backgroundColor="#C9CCD5"></ImageSection>
            <ImageSection backgroundColor="#E4D8DC"></ImageSection>
          </View>

        </View>
        <View style={styles.inputTagsContainer}>
          <Text style={styles.inputTagsContainerText}>Add tags</Text>
          <InputTags></InputTags>
        </View>
        <View>
          <Text style={styles.userSectionText}>Username</Text>
          <Text style={[styles.userSectionText, styles.subTextColor]}>13 June, 2022, 10:30 PM</Text>
        </View>
        <View style={styles.btnContainer}>
          <Button>Create</Button>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 10
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "flex-end"
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24
  },
  headerRight: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    width: 100
  },
  headerRightImage: {
    height: 20,
    width: 20
  },
  backText: {
    fontSize: 30,
    fontWeight: "bold",
    color: "black"
  },
  inputContainer: { marginTop: 35 },
  inputContainerText: {
    color: "#000",
    fontSize: 14,
    marginBottom: 10
  },
  addImageContainerText: { marginTop: 18, fontSize: 14, color: "#000" },
  inputTagsContainer: { marginVertical: 35 },
  inputTagsContainerText: { color: "#000", fontSize: 14, marginBottom: 10 },
  userSectionText: {
    color: "#1E2022",
    fontSize: 14,
    marginBottom: 8,
    fontWeight: "500"
  },
  subTextColor: {
    color: "#77838F"
  },
  btnContainer: {
    marginHorizontal: 50,
    marginTop: 35
  },
  mainContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    top: 10
  }
});

export default BlogPostScreen;

export const Input = props => {
  return (
    <View>
      <TextInput
        multiline={true}
        numberOfLines={10}
        style={textStyles.input}
        placeholder={props.placeholder}
        value={props.value}
        placeholderTextColor="#ddd"
        editable={props.editable !== false}
      />
      {props.errorText
        ? (
          <Text style={textStyles.error}>{props.errorText}</Text>
          )
        : null}
    </View>
  );
};

const textStyles = StyleSheet.create({
  input: {
    backgroundColor: "#fff",
    height: 150,
    borderColor: "#C4C4C4",
    color: "#000",
    borderRadius: 10,
    fontSize: 14,
    borderWidth: 1,
    paddingHorizontal: 10
  },
  error: {
    fontSize: 13,
    color: "#FA060D",
    paddingTop: 8
  }
});

export const ImageSection = props => {
  return (
    <View style={[imageStyles.imageSection, { backgroundColor: props.backgroundColor }]}>
      <Image
        source={require("./assets/pen.png")}
        style={imageStyles.image}
      />
    </View>

  );
};
const imageStyles = StyleSheet.create({
  imageSection: { borderRadius: 10, padding: 23 },
  image: { height: 30, width: 30 }
});

export const InputTags = props => {
  return (
    <View>
      <TextInput
        style={tagStyles.input}
        placeholder={props.placeholder}
        value={props.value}
        multiline={true}
        numberOfLines={5}
        placeholderTextColor="#ddd"
        editable={props.editable !== false}
      />
      {props.errorText
        ? (
          <Text style={tagStyles.error}>{props.errorText}</Text>
          )
        : null}
    </View>
  );
};

const tagStyles = StyleSheet.create({
  input: {
    backgroundColor: "#fff",
    height: 100,
    borderColor: "#C4C4C4",
    color: "#000",
    borderRadius: 10,
    fontSize: 14,
    borderWidth: 1,
    paddingHorizontal: 10
  },
  error: {
    fontSize: 13,
    color: "#FA060D",
    paddingTop: 8
  }
});

export const Button = props => {
  return (
    <TouchableHighlight onPress={props.onPress} underlayColor="#DDDDDD">
      <View
        style={[
          btnStyles.button,
          {
            backgroundColor: props.backgroundColor
              ? props.backgroundColor
              : "#000000",
            height: props.height ? props.height : 49,
            borderWidth: props.borderWidth ? props.borderWidth : 0,
            borderColor: props.borderColor ? props.borderColor : "#000000"
          }
        ]}>
        <Text
          style={[
            btnStyles.text,
            { color: props.color ? props.color : "#ffffff" }
          ]}>
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
    borderRadius: 10
  },
  text: {
    fontWeight: "bold",
    fontSize: 15
  }
});
