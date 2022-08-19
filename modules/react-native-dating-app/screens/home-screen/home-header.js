import React from "react";
import { View, StyleSheet, Image, Text, TouchableOpacity } from "react-native";
import ChatIcon from "../../components/Icons/ChatIcon";
import LoveChat from "../../components/Icons/LoveChat";
import ProfileIcon from "../../components/Icons/ProfileIcon";
import UsersIcon from "../../components/Icons/UsersIcon";

export const HomeHeader = ({ navigation, user }) => {
  return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity style={styles.headerLeft} onPress={() => { navigation.navigate("Profile", { id: user?.id }); }}>
                    <ProfileIcon height={25} width={25}></ProfileIcon>
                </TouchableOpacity>
                <View style={styles.headerCenter}>
                    <View style={styles.headerCenterContainer}>
                        <TouchableOpacity style={[styles.tab1, styles.activeTab]}>
                            <LoveChat height={25} width={25} style={styles.tabIcon}></LoveChat>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.tab2]}>
                            <UsersIcon height={25} width={25} style={styles.tabIcon}></UsersIcon>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.headerRight}>
                    <TouchableOpacity onPress={() => navigation.navigate("Chat")}>
                        <ChatIcon height={25} width={25} />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    alignItems: "center",
    marginTop: 35,
    marginHorizontal: "10%"
  },
  header: {
    flexDirection: "row",
    alignItems: "center"
  },
  headerLeft: {

  },
  headerCenter: {
  },
  headerRight: {
  },
  iconLeft: {
    height: 20,
    width: 20
  },
  iconRight: {
    height: 20,
    width: 20
  },
  headerCenterContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 50,
    borderWidth: 1,
    height: 44,
    width: 120,
    borderRadius: 10,
    borderColor: "#E0E0E0",
    backgroundColor: "#F1F1F1"
  },
  tab1: {
    height: 36,
    width: 54,
    borderRadius: 10,
    backgroundColor: "transparent",
    marginLeft: 5,
    justifyContent: "center"
  },
  tab2: {
    height: 36,
    width: 50,
    borderRadius: 10,
    backgroundColor: "transparent",
    marginLeft: 5,
    justifyContent: "center"
  },
  activeTab: {
    backgroundColor: "#FFF"
  },
  tabIcon: {
    height: 25,
    width: 25,
    alignSelf: "center"
  }
});
