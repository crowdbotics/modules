import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  TextInput,
  Pressable,
  ScrollView
} from "react-native";

const AddBankAccount = () => {
  const [user, setUser] = useState({});
  const [accountNumber, setAccountNumber] = useState("");
  const [confirmAccountNumber, setConfirmAccountNumber] = useState("");
  const [routingNumber, setRoutingNumber] = useState("");
  useEffect(() => {
    setUser({
      name: "Username",
      email: "username@email.com",
      image: require("./assets/profilePicture.png")
    });
  }, []);
  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.profileContainer}>
          <Image source={user.image} style={styles.profilePicture} />
          <Text style={styles.profileName}>{user.name}</Text>
          <Text style={styles.profilemail}>{user.email}</Text>
        </View>
        <View style={styles.inputs}>
          <View style={styles.inputContainer}>
            <Text style={styles.inputText}>Bank account number</Text>
            <TextInput
              style={styles.input}
              onChangeText={(text) => setAccountNumber(text)}
              value={accountNumber}
              placeholder="Enter bank account number"
              placeholderTextColor="#9B9B9B"
              autoCapitalize="none"
              autoCorrect={false}
            />
            <Image
              source={require("./assets/lockIcon.png")}
              style={styles.lockIcon}
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.inputText}>Confirm Bank account number</Text>
            <TextInput
              style={styles.input}
              onChangeText={(text) => setConfirmAccountNumber(text)}
              value={confirmAccountNumber}
              placeholder="Confirm bank account number"
              placeholderTextColor="#9B9B9B"
              autoCapitalize="none"
              autoCorrect={false}
            />
            <Image
              source={require("./assets/lockIcon.png")}
              style={styles.lockIcon}
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.inputText}>Bank routing number</Text>
            <TextInput
              style={styles.input}
              onChangeText={(text) => setRoutingNumber(text)}
              value={routingNumber}
              placeholder="Enter bank routing number"
              placeholderTextColor="#9B9B9B"
              autoCapitalize="none"
              autoCorrect={false}
            />
          </View>
        </View>
        <View style={styles.bottomTextContainer}>
          <Image source={require("./assets/lockIcon.png")} />
          <Text style={styles.bottomText}>
            Your personal informatino is securely stored and kept confidential!
          </Text>
        </View>
        <Button buttonText={"Save"} />
      </ScrollView>
      <Footer
        titles={["Home", "Task", "Availability", "Account", "My Business"]}
        images={[
          require("./assets/homeIcon.png"),
          require("./assets/listIcon.png"),
          require("./assets/availabilityIcon.png"),
          require("./assets/accountIconActive.png"),
          require("./assets/businessIcon.png")
        ]}
        active={3}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  profileContainer: {
    justifyContent: "center",
    alignItems: "center"
  },
  profilePicture: {
    width: 100,
    height: 100,
    borderRadius: 40
  },
  profileName: {
    fontSize: 20,
    marginTop: 10
  },
  profilemail: {
    fontSize: 14,
    color: "grey"
  },
  inputs: {
    marginTop: 40,
    paddingHorizontal: 20
  },
  inputContainer: {
    flexDirection: "column",
    justifyContent: "center"
  },
  inputText: {
    fontSize: 13,
    marginLeft: 20,
    color: "#111112"
  },
  input: {
    borderWidth: 1,
    borderColor: "#e6e6e6",
    borderRadius: 10,
    padding: 10,
    paddingLeft: 20,
    marginVertical: 10,
    width: "100%",
    height: 50
  },
  lockIcon: {
    position: "absolute",
    right: 20,
    top: 40,
    width: 20,
    height: 20,
    resizeMode: "contain"
  },
  bottomTextContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginHorizontal: 20,
    marginTop: 40
  },
  bottomText: {
    fontSize: 12,
    textAlign: "center",
    marginHorizontal: 20
  }
});

export default AddBankAccount;

const Footer = (props) => {
  return (
    <View style={footerStyles.footer}>
      {props.titles.map((title, index) => (
        <View style={footerStyles.footerItem} key={index}>
          <Image
            style={footerStyles.footerImage}
            source={props.images[index]}
          />
          <Text
            style={[
              footerStyles.footerItemText,
              index === props.active ? footerStyles.active : null
            ]}
          >
            {title}
          </Text>
        </View>
      ))}
    </View>
  );
};

const footerStyles = StyleSheet.create({
  footer: {
    // position: "absolute",
    // bottom: 0,
    // left: 0,
    // right: 0,
    height: 70,
    backgroundColor: "#C4C4C4",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20
  },
  footerItem: {
    // flex: 1,
    alignItems: "center",
    justifyContent: "center",
    height: "100%"
  },
  footerItemText: {
    fontSize: 13,
    color: "#fff",
    marginTop: 5
  },
  footerImage: {
    width: 20,
    height: 20,
    resizeMode: "contain"
  },
  active: {
    color: "#000"
  }
});

const Button = (params) => {
  const btnStyle = {
    backgroundColor: params.outline ? "#fff" : "#000",
    borderColor: params.outline ? "#000" : "#fff",
    borderWidth: 1
  };
  const btnText = {
    color: params.outline ? "#000" : "#fff"
  };
  return (
    <View style={buttonStyles.btnContainer}>
      <Pressable style={[buttonStyles.btn, btnStyle]} onPress={params.onPress}>
        <Text style={[buttonStyles.btnText, btnText]}>{params.buttonText}</Text>
        <View style={styles.childrenContainer}>{params.children}</View>
      </Pressable>
    </View>
  );
};

const buttonStyles = StyleSheet.create({
  btnContainer: {
    paddingHorizontal: 40,
    justifyContent: "center",
    marginVertical: 20
  },
  btn: {
    backgroundColor: "black",
    height: 50,
    width: "100%",
    padding: 10,
    paddingHorizontal: 25,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "rgba(0, 0, 0, 0.2)",
    elevation: 10,
    flexDirection: "row"
  },
  btnText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold"
  },
  childrenContainer: {
    justifyContent: "center",
    alignItems: "center"
  }
});
