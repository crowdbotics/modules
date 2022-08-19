import React from "react";
import { StyleSheet, View, useWindowDimensions, Dimensions } from "react-native";
import MapView, { PROVIDER_GOOGLE, Circle } from "react-native-maps";
import { SceneMap, TabView, TabBar } from "react-native-tab-view";
import { SettingsScreen } from "./settings-screen";
const deviceWidth = Dimensions.get("window").width;

const renderTabBar = props => (
  <TabBar
  {...props}
  indicatorStyle={styles.indicator}
  indicatorContainerStyle={styles.indicatorContainer}
  labelStyle={styles.label}
  style={styles.tab}
  />
);
const region = {
  latitude: 34.04760406652406,
  longitude: -118.25889327646094,
  latitudeDelta: 0.0922,
  longitudeDelta: 0.0421
};
const FirstRoute = () => (
  <View style={{ flex: 1, padding: 15 }}>
    <SettingsScreen></SettingsScreen>
  </View>
);
const SecondRoute = () => (
  <View style={{ flexDirection: "column", backgroundColor: "white", marginTop: -70 }}>
<MapView provider={PROVIDER_GOOGLE} zoomControlEnabled={true} style={styles.map} initialRegion={region} followsUserLocation={true} zoomEnabled={true}>
{/* <Marker coordinate={region} /> */}
<Circle style={styles.MapCircle} radius={1000} center={region} strokeColor={"rgba(255,0,0,.3)"} fillColor={"rgba(255,0,0,.1)"} />
<Circle style={styles.MapCircle} radius={1500} center={region} strokeColor={"rgba(255,0,0,.1)"} fillColor={"rgba(255,0,0,.07)"} />
</MapView>
</View>
);
const renderScene = SceneMap({
  first: FirstRoute,
  second: SecondRoute
});
export function SettingScreen() {
  const layout = useWindowDimensions();
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: "first", title: "Settings" },
    { key: "second", title: "Map" }

  ]);
  return (
  <TabView
    navigationState={{ index, routes }}
    renderScene={renderScene}
    onIndexChange={setIndex}
    initialLayout={{ width: layout.width }}
    renderTabBar={renderTabBar}
    style={{ backgroundColor: "white" }}
    />
  );
}

const styles = StyleSheet.create({
  settingsButton: {
    borderRadius: 3,
    marginRight: 20
  },
  map: {
    ...StyleSheet.absoluteFillObject,
    padding: 20,
    marginTop: 100,
    height: 550,
    width: 400,
    alignItems: "center",
    justifyContent: "flex-end"
  },
  EmptyContainer: {
    borderRadius: 10
  },
  indicator: {
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    height: 38,
    width: deviceWidth / 2.5,
    marginLeft: 10,
    shadowColor: "#000",
    elevation: 5,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2
  },
  indicatorContainer: {
    height: 37,
    marginTop: 6
  },
  label: {
    color: "#000",
    fontSize: 14,
    textTransform: "capitalize"

  },
  tab: {
    backgroundColor: "#F1F1F1",
    marginHorizontal: 20,
    borderRadius: 10,
    marginTop: 10,
    borderWidth: 0,
    shadowOffset: { width: 0, height: 0 }
  }
});
