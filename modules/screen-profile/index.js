import React from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableHighlight,
  Image,
  TextInput
} from "react-native";

const pressed = () => {
  console.log("pressed");
};

const Profile = () => {
  return (
      <View style={styles.mainContainer}>
        <View style={styles.mainHeader}>
          <Image source={require("./assets/back.png")} style={styles.backIcon} />
        </View>
        <View>
          <View style={styles.headerContainer}>
            <ProfileImage />
            <Text style={styles.headerText}>User Name</Text>
            <Text style={styles.headerSubText}>user@example.com</Text>
          </View>
          <View style={styles.subheaderContainer}>
            <Text style={styles.subheaderDetailText}>Edit Account</Text>
            <Text style={styles.subheaderRemoveText}>Delete Account</Text>
          </View>
        </View>
        <View style={styles.mainBody}>
          <View style={styles.mt15}>
            <Text style={styles.textLabel}>Name</Text>
            <Input placeholder="Name" />
          </View>
          <View style={styles.mt15}>
            <Text style={styles.textLabel}>Email address</Text>
            <Input placeholder="Email address" />
          </View>
          <View style={styles.mt15}>
            <Text style={styles.textLabel}>Gender</Text>
            <Input placeholder="Gender" />
          </View>
          <View style={styles.mt15}>
            <Text style={styles.textLabel}>Password</Text>
            <Input placeholder="Password" />
          </View>
        </View>
        <View style={styles.btnSave}>
          <Button onPress={pressed} height={49}>
            Save
          </Button>
        </View>
      </View>
  );
};
const styles = StyleSheet.create({
  mainContainer: {
    padding: 10,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    height: "100%",
    backgroundColor: "#FFF"
  },
  mainHeader: {
    marginTop: 25
  },
  backIcon: {
    height: 20,
    width: 11.5,
    marginLeft: 15
  },
  mt15: {
    marginTop: 15
  },
  headerContainer: {
    display: "flex",
    flexDirection: "column",
    alignSelf: "center",
    alignItems: "center"
  },
  headerText: {
    marginTop: 15,
    fontSize: 20,
    color: "#000000",
    fontWeight: "bold"
  },
  headerSubText: {
    marginTop: 5,
    fontSize: 12,
    color: "#1C1A19",
    opacity: 0.5
  },
  subheaderContainer: {
    marginTop: 15,
    marginBottom: 0,
    paddingTop: 10,
    marginHorizontal: 20,
    paddingBottom: 20,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomWidth: 0.5,
    borderBottomColor: "#C4C4C4"
  },
  subheaderDetailText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#4DE1AB"
  },
  subheaderRemoveText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#FF6848"
  },
  textLabel: {
    fontSize: 14,
    marginLeft: 15,
    marginBottom: 5,
    color: "#1F1F1F"
  },
  mainBody: {
    marginHorizontal: 10
  },
  btnSave: {
    display: "flex",
    alignSelf: "center",
    width: "80%",
    marginBottom: 30
  }
});

export default Profile;

const Button = (props) => {
  const {
    onPress,
    borderWidth,
    borderColor,
    height,
    color,
    backgroundColor,
    children
  } = props;
  return (
    <TouchableHighlight onPress={onPress} underlayColor="#DDDDDD">
      <View
        style={[
          btnStyles.button,
          {
            backgroundColor: backgroundColor || "#000000",
            height: height || 49,
            borderWidth: borderWidth || 0,
            borderColor: borderColor || "#000000"
          }
        ]}
      >
        <Text
          style={[
            btnStyles.text,
            { color: color || "#ffffff" }
          ]}
        >
          {children}
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

const ProfileImage = (props) => {
  return (
    <TouchableHighlight onPress={props.onPress} underlayColor="#DDDDDD">
      <View style={profileStyles.container}>
        <Image
          style={profileStyles.image}
          resizeMode="contain"
          source={require("./assets/edit.png")}
        />
      </View>
    </TouchableHighlight>
  );
};
const profileStyles = StyleSheet.create({
  container: {
    backgroundColor: "#DADADA",
    height: 108,
    width: 108,
    borderRadius: 54,
    display: "flex",
    alignItems: "center"
  },
  image: {
    width: 43,
    marginTop: 21
  }
});

const Input = (props) => {
  const {
    placeholder,
    value,
    setValue,
    errorText,
    editable
  } = props;
  return (
    <View>
      <TextInput
        style={inputStyles.input}
        placeholder={placeholder}
        value={value}
        onChangeText={(num) => setValue(num)}
        placeholderTextColor="#ddd"
        editable={editable !== false}
      />
      {errorText
        ? (
        <Text style={inputStyles.error}>{errorText}</Text>
          )
        : null}
    </View>
  );
};

const inputStyles = StyleSheet.create({
  input: {
    backgroundColor: "#fff",
    height: 53,
    borderColor: "#C4C4C4",
    color: "#000",
    borderRadius: 10,
    fontSize: 14,
    borderWidth: 1,
    paddingHorizontal: 15
  },
  error: {
    fontSize: 13,
    color: "#FA060D",
    paddingTop: 8
  }
});
