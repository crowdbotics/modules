import React from "react";
import {
  Text,
  Image,
  StyleSheet,
  View,
  TouchableHighlight,
  ScrollView
} from "react-native";

const MenuScreen = () => {
  return (
    <View style={styles.container}>
      <Image
        style={styles.closeImage}
        resizeMode="contain"
        source={require("./assets/close.png")}
      />
      <View style={styles.profileContainer}>
        <ProfileImage />
        <Text style={styles.profileText}>Hello, {"\n"} Username</Text>
      </View>
      <ScrollView>
        <View style={styles.main}>
          <View style={styles.menuItems}>
            <Image
              style={styles.Image}
              resizeMode="contain"
              source={require("./assets/profile.png")}
            />
            <Text style={styles.menuText}>View my profile</Text>
          </View>
          <View style={styles.border}></View>

          <View style={styles.menuItem}>
            <Image
              style={styles.Image}
              resizeMode="contain"
              source={require("./assets/editprofile.png")}
            />
            <Text style={styles.menuText}>Edit profile</Text>
          </View>
          <View style={styles.border}></View>

          <View style={styles.menuItem}>
            <Image
              style={styles.Image}
              resizeMode="contain"
              source={require("./assets/info.png")}
            />
            <Text style={styles.menuText}>About the app</Text>
          </View>
          <View style={styles.border}></View>

          <View style={styles.menuItem}>
            <Image
              style={styles.Image}
              resizeMode="contain"
              source={require("./assets/help.png")}
            />
            <Text style={styles.menuText}>Help Center</Text>
          </View>
          <View style={styles.border}></View>

          <View style={styles.menuItem}>
            <Image
              style={styles.Image}
              resizeMode="contain"
              source={require("./assets/settings.png")}
            />
            <Text style={styles.menuText}>Settings</Text>
          </View>
          <View style={styles.border}></View>

          <View style={styles.menuItem}>
            <Image
              style={styles.Image}
              resizeMode="contain"
              source={require("./assets/feedback.png")}
            />
            <Text style={styles.menuText}>Send feedback</Text>
          </View>
          <View style={styles.border}></View>

          <View style={styles.menuItem}>
            <Image
              style={styles.Image}
              resizeMode="contain"
              source={require("./assets/accountsetting.png")}
            />
            <Text style={styles.menuText}>Account Settings</Text>
          </View>
          <View style={styles.border}></View>

          <View style={styles.menuItem}>
            <Image
              style={styles.Image}
              resizeMode="contain"
              source={require("./assets/invite.png")}
            />
            <Text style={styles.menuText}>Invite Friends</Text>
          </View>
          <View style={styles.border}></View>

          <View style={styles.menuItem}>
            <Image
              style={styles.Image}
              resizeMode="contain"
              source={require("./assets/signout.png")}
            />
            <Text style={styles.menuText}>Sign out</Text>
          </View>
          <View style={styles.border}></View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "85%",
    flex: 1,
    backgroundColor: "white",
    height: "100%",
    padding: 24
  },
  profileContainer: {
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center"
  },
  closeImage: {
    alignSelf: "flex-end",
    alignItems: "flex-end",
    position: "absolute",
    top: 30,
    right: 20
  },
  menuText: {
    color: "#284752",
    fontSize: 14
  },
  profileText: {
    paddingTop: 7,
    fontSize: 12,
    fontWeight: "500",
    textAlign: "center"
  },
  Image: {
    marginRight: 10,
    marginLeft: 10
  },
  menuItems: {
    flexDirection: "row",
    alignItems: "center"
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 16
  },
  main: {
    marginTop: 30
  },
  border: {
    borderWidth: 1,
    borderColor: "#D8D8D8",
    opacity: 0.4,
    marginTop: 12
  }
});
export default MenuScreen;

const ProfileImage = (props) => {
  return (
    <TouchableHighlight onPress={props.onPress} underlayColor="#DDDDDD">
      <View style={profileStyles.container}>
        <Image
          style={profileStyles.image}
          resizeMode="contain"
          source={require("./assets/editprofiles.png")}
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
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center"
  },
  image: {
    width: 43
  }
});
