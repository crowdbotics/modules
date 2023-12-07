import React, { Fragment } from "react"
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
  Platform
} from "react-native"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import Home from "../home"
import ConnectNavigator from "../../navigation/connectNavigator"
import SessionNavigator from "../../navigation/sessionNavigator"
import ActivitiesNavigator from "../../navigation/activitiesNavigator"
import AboutNavigator from "../../navigation/aboutNavigator"
import HomeNavigator from "../../navigation/homeNavigator"

const Tab = createBottomTabNavigator()

const HomeScreen = ({ navigation }) => {
  return (
    <Fragment>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({focused, color, size}) => {
            let iconName
            if (route.name === "HOME") {
              iconName = require("./assets/home.png")
            } else if (route.name === "CONNECT") {
              iconName = require("./assets/connect.png")
            } else if (route.name === "SESSIONS") {
              iconName = require("./assets/session.png")
            } else if (route.name === "ACTIVITIES") {
              iconName = require("./assets/sinagot.png")
            } else if (route.name === "3SEVEN") {
              iconName = require("./assets/3Seven.png")
            }
            return (
              <View
                style={[{
                  alignItems: "center",
                }, focused && {padding: 9,backgroundColor: "#2a2a2a",  borderRadius: 20 }]}
              > 
                  <Image source={iconName} style={{ height: 30, width: 30 }} />
              </View>
            )
          },
          tabBarStyle: {
            backgroundColor: "#000",
            height: 60,
          },
          tabBarItemStyle: {
            height: 60,
          },
          unmountOnBlur: true,
        })}
      >
        <Tab.Screen
          name="HOME"
          component={HomeNavigator}
          options={{ tabBarShowLabel: false, headerShown: false }}
          key={1}
        />
        <Tab.Screen
          name="CONNECT"
          component={ConnectNavigator}
          options={{ tabBarShowLabel: false, headerShown: false }}
          key={2}
        />
        <Tab.Screen
          name="3SEVEN"
          component={AboutNavigator}
          options={{ tabBarShowLabel: false, headerShown: false }}
          key={5}
        />
        <Tab.Screen
          name="SESSIONS"
          component={SessionNavigator}
          options={{ tabBarShowLabel: false, headerShown: false }}
          key={3}
        />
        <Tab.Screen
          name="ACTIVITIES"
          component={ActivitiesNavigator}
          options={{ tabBarShowLabel: false, headerShown: false }}
          key={4}
        />
        
      </Tab.Navigator>

      <View
        style={{
          flexDirection: "row",
          justifyContent: "flex-end",
          alignItems: "center",
          backgroundColor: "#1D0F55",
        }}
      >
        <TouchableOpacity
          style={styles.secondButton}
          onPress={() => navigation.navigate("aboutCB")}
        >
          <Text allowFontScaling={false} style={styles.bottomText}>Powered by   </Text>
          <Image
            source={require("./assets/cb.png")}
            style={{ height: 30, width: 140 }}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>
    </Fragment>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  secondButton: {
    alignItems: "center",
    flexDirection: "row",
    marginVertical: 7,
    marginRight: 12,
    
  },
  bottomButton: {
    marginLeft: 50,
    height: 50,
    alignItems: "center",
    flexDirection: "row"
  },
  bottomText: { fontSize: 16, color: "#fff", fontWeight: "500" },
  tabName: {
    alignSelf: "center",
    fontWeight: "700",
    color: "#fff",
    marginBottom: 3
  }
})
