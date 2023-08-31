import React from "react";
import { StyleSheet, useWindowDimensions } from "react-native";

import { TabView, TabBar, SceneMap } from "react-native-tab-view";
import QrGenerator from "../../components/QrGenerator";
import QrScanner from "../../components/QrScanner";
;

const Home = (props) => {
  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: "first", title: "Qr Scanner" },
    { key: "second", title: "Qr Generator" }
  ]);

  const renderScene = SceneMap({
    first: () => <QrScanner navigation={props.navigation}/>,
    second: () => <QrGenerator navigation={props.navigation}/>
  });

  const renderTabBar = props => (
    <TabBar
      {...props}
      indicatorStyle={styles.indicator}
      indicatorContainerStyle={styles.indicatorContainer}
      labelStyle={styles.label}
      style={styles.tab}
    />
  );

  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      renderTabBar={renderTabBar}
      onIndexChange={setIndex}
      initialLayout={{ width: layout.width }}
    />
  );
};

export default Home;

const styles = StyleSheet.create({
  tab: {
    backgroundColor: "#F1F1F1",
    height: 48,
    borderRadius: 10,
    marginLeft: 10,
    marginRight: 10,
    marginVertical: 10
  },
  indicator: { backgroundColor: "#FFFFFF", borderRadius: 10, height: 37, shadowColor: "#000", elevation: 5 },
  indicatorContainer: { height: 37, marginTop: 6 },
  label: { color: "#000000", fontSize: 14, textTransform: "capitalize", width: "100%" }

});
