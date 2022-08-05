import * as React from "react";
import { Text, View, Image, StyleSheet } from "react-native";

const Settings = () => {
  return (
    <View style={styles.container}>

      <View style={styles.mainSection}>
        <View style={styles.faqSupport}>
          <Image style={styles.faqIcon} source={require("./assets/faq.png")}/>
          <Text style={styles.faqText}>FAQ&apos;s</Text>
        </View>
        <View style={styles.emailSupport}>
          <Image style={styles.emailsupportIcon} source={require("./assets/emailsupport.png")}/>
          <Text style={styles.emailsupportText}>Email Support</Text>
        </View>
        <View style={styles.invitefriendsSupport}>
          <Image style={styles.inviteFriendsIcon} source={require("./assets/invitefriends.png")}/>
          <Text style={styles.inviteFriendsText}>Invite Friends</Text>
        </View>
        <View style={styles.pushNotifications}>
          <View style={styles.pushnoti}>
            <Image style={styles.pushnotificationsIcon} source={require("./assets/bell.png")}/>
            <Text style={styles.pushnotificationsText}>Push Notifications</Text>
          </View>
          <View style={styles.switchbutton}>
              <View style={styles.ballicon}></View>
          </View>
        </View>
        <View style={styles.pushNotifications}>
          <View style={styles.pushnoti}>
            <Image style={styles.pushnotificationsIcon} source={require("./assets/updates.png")}/>
            <Text style={styles.pushnotificationsText}>Auto Updates</Text>
          </View>
          <View style={styles.switchbutton}>
              <View style={styles.ballicon}></View>
          </View>
        </View>
          <View style={styles.invitefriendsSupport}>
          <Image style={styles.inviteFriendsIcon} source={require("./assets/abouticon.png")}/>
          <Text style={styles.inviteFriendsText}>About Us</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  topHead: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  },
  mainHeading: {
    fontSize: 24
  },
  container: {
    padding: 10,
    backgroundColor: "#FFF",
    height: "100%"
  },
  mainSection: {
    marginTop: 20
  },
  emailSupport: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    marginLeft: 10,
    marginRight: 10,
    borderBottomColor: "rgba(51,51,51,0.05)",
    marginTop: 20
  },
  emailsupportIcon: {
    height: 20,
    width: 20,
    marginRight: 20,
    marginBottom: 20
  },
  emailsupportText: {
    fontSize: 18,
    fontWeight: "500",
    marginBottom: 20
  },
  faqSupport: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    marginLeft: 10,
    marginRight: 10,
    borderBottomColor: "rgba(51,51,51,0.05)"
  },
  faqIcon: {
    height: 20,
    width: 20,
    marginRight: 20,
    marginBottom: 20
  },
  faqText: {
    fontSize: 18,
    fontWeight: "500",
    marginBottom: 20
  },
  invitefriendsSupport: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 20,
    borderBottomColor: "rgba(51,51,51,0.05)"
  },
  inviteFriendsIcon: {
    height: 20,
    width: 20,
    marginRight: 20,
    marginBottom: 20
  },
  inviteFriendsText: {
    fontSize: 18,
    fontWeight: "500",
    marginBottom: 20
  },
  pushNotifications: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 20,
    borderBottomColor: "rgba(51,51,51,0.05)"
  },
  pushnoti: {
    display: "flex",
    flexDirection: "row"
  },
  pushnotificationsIcon: {
    height: 20,
    width: 20,
    marginBottom: 20,
    marginRight: 20
  },
  pushnotificationsText: {
    fontSize: 18,
    fontWeight: "500",
    marginBottom: 20
  },
  switchbutton: {
    height: 22,
    width: 44,
    backgroundColor: "#E6E6E6",
    borderRadius: 12,
    marginBottom: 20
  },
  ballicon: {
    height: 20,
    width: 20,
    backgroundColor: "#000000",
    borderRadius: 10
  }
});

export default Settings;
