import React, { useState } from "react";
import { StyleSheet, View, Text, ScrollView, Switch } from "react-native";
import Slider from "@react-native-community/slider";

// Note: Tabs/tab navigator at the top
export const SettingsScreen = (props) => {
  // const [loading, setLoading] = useState(false);
  // useEffect(() => {
  //   getProfiles(setLoading).then((data) => {
  //     console.log("API Data:", data)
  //   })
  // }, [loading]);
  // const { navigation, params } = props;
  return (
    <View style={styles.container}>
      {/* <TouchableOpacity style={{ borderWidth: 1, width: 85,}}
        onPress={()=>{navigation.navigate("TestScreen")}}>
        <Text>Next Screen</Text>
      </TouchableOpacity> */}
      <Text style={{ fontSize: 15, paddingHorizontal: 10, paddingTop: 5, marginLeft: 15 }}>Locations</Text>
      <ScrollView>
        <View style={{ marginTop: -5, marginLeft: 25 }}>
          <View style={{ marginTop: -1 }}>
            <SliderSetting settingName={"Maximum Distance"}/>
          </View >
          <View style={{ marginTop: -30 }}>
            <SliderSetting settingName={"Gender"}/>
          </View>
          <View style={{ marginTop: -30 }}>
            <SliderSetting settingName={"Age Range"}/>
          </View>
        </View>
        <Text style={{ fontSize: 15, paddingHorizontal: 10, paddingTop: 5, marginLeft: 15 }}>Notifications</Text>
        <View style={{ paddingRight: 10, marginTop: -1 }}>
        <ToggleSetting settingName={"Show Me On Search"}/>
        </View>
        <View style={{ paddingRight: 10, marginTop: -30 }}>
        <ToggleSetting settingName={"Swipe with Friends"}/>
        </View>
        <View style={{ backgroundColor: "rgba(241, 241, 241, 1)", padding: 15, marginTop: -15 }}>
          <Text></Text>
        </View>
        <View style={{ paddingRight: 10, marginTop: -10 }}>
          <ToggleSetting settingName={"New matches"}/>
        </View>
        <View style={{ paddingRight: 10, marginTop: -30 }}>
          <ToggleSetting settingName={"Message Likes"}/>
        </View>
        <View style={{ backgroundColor: "rgba(241, 241, 241, 1)", padding: 15, marginTop: -15 }}>
          <Text></Text>
        </View>
        <View style={{ paddingRight: 10, marginTop: -10 }}>
          <ToggleSetting settingName={"In-App Vibrations"}/>
        </View>
        <View style={{ paddingRight: 10, marginTop: -30 }}>
          <ToggleSetting settingName={"In-App Sound"}/>
        </View>
        <View style={{ backgroundColor: "rgba(241, 241, 241, 1)", padding: 20, marginTop: -15 }}>
          <Text style={{ marginLeft: 15 }}>Legal</Text>
        </View>
        <View style={{ paddingRight: 10, marginLeft: 32, padding: 10 }}>
          <NewPageSetting newPageName={"Terms & Privacy"}/>
        </View>
        <View style={{ paddingRight: 10, marginLeft: 32, padding: 10 }}>
          <NewPageSetting newPageName={"Contact Us"}/>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  settingContainer: {
    marginVertical: 20
  },
  toggleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 30
  },
  text: {
    fontSize: 20
  },
  nonSliderSettingText: {
    color: "#231F20",
    fontSize: 16
  }
});

const SliderSetting = ({ settingName }) => {
  return (
    <View style={styles.settingContainer}>
      <Text style={styles.nonSliderSettingText}>
        {settingName}
      </Text>
      <Slider
        style={{ width: 200, height: 40 }}
        minimumValue={0}
        maximumValue={1}
        minimumTrackTintColor="#FFFFFF"
        maximumTrackTintColor="#000000"
      />
    </View>
  );
};

const ToggleSetting = ({ settingName }) => {
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  return (
    <View style={[styles.toggleContainer, styles.settingContainer]}>
      <Text>{settingName}</Text>
      <Switch
        trackColor={{ false: "#767577", true: "#81b0ff" }}
        thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
        ios_backgroundColor="#3e3e3e"
        onValueChange={toggleSwitch}
        value={isEnabled}
      />
    </View>
  );
};

const NewPageSetting = ({ newPageName }) => {
  return (
    <View>
        <Text>{newPageName}</Text>
    </View>
  );
};
